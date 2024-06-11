import { BASE_PROPS, MAPPED_PROPS } from "./global.js";
import {
  EventName,
  MappedAttribute,
  ComponentAttributes,
  Options,
  GlobalEvent,
} from "./types.js";
import {
  RESERVED_WORDS,
  createEventName,
  getModulePath,
  getPackageJson,
  normalizeOutdir,
  saveReactUtils,
  saveScopeProvider,
} from "./utils.js";
import {
  createOutDir,
  logBlue,
  logYellow,
  saveFile,
} from "../../../tools/integrations/index.js";
import {
  CEM,
  Component,
  getComponentDetailsTemplate,
  getComponentMethods,
  getComponents,
  getCustomEventTypes,
} from "../../../tools/cem-utils/index.js";
import type {
  Attribute,
  ClassField,
  ClassMethod,
  Parameter,
} from "custom-elements-manifest";
import { has, toCamelCase } from "../../../tools/utilities/index.js";
import path from "path";
import { BaseOptions } from "../../../tools/configurations/index.js";

const packageJson = getPackageJson();
let config: Options = {
  outdir: () => `./react`,
};
let globalEvents: GlobalEvent[] = [];

export function generateReactWrappers(
  customElementsManifest: CEM,
  options: Options
) {
  if (options.skip) {
    logYellow("[react-wrappers] - Skipped", options.hideLogs);
    return;
  }
  logBlue("[react-wrappers] - Generating wrappers...", options.hideLogs);

  updateConfig(options);

  const components = getComponents(customElementsManifest, config.exclude);

  const uniqueOutDirs = new Set<string>(
    components
      .map((c) => {
        const outdir = config.outdir;
        return typeof outdir === "function"
          ? outdir(c.name, c.tagName!)
          : outdir;
      })
      .filter((dir): dir is string => typeof dir === "string")
  );

  const commonRoot = getCommonRoot(Array.from(uniqueOutDirs));

  if (!commonRoot) {
    throw new Error(
      "Common root directory could not be determined. Ensure all component directories have a common path."
    );
  }

  createOutDir(commonRoot);
  saveScopeProvider(commonRoot, config.ssrSafe);

  components.forEach((component) => {
    const componentOutDir =
      typeof config.outdir === "function"
        ? config.outdir(component.name, component.tagName!)
        : config.outdir;
    if (!componentOutDir) return;

    createOutDir(componentOutDir);
    saveReactUtils(commonRoot, config.ssrSafe);

    const events = getEventNames(component);
    const { booleanAttributes, attributes } = getAttributes(component);
    const properties = getProperties(component, attributes, booleanAttributes);
    const componentModulePath = getModulePath(
      config.modulePath,
      component,
      config.outdir!,
      packageJson
    );

    const relativePathToCommonRoot = path
      .relative(componentOutDir, commonRoot)
      .replace(/\\/g, "/");

    generateReactWrapper(
      component,
      events,
      booleanAttributes,
      attributes,
      componentModulePath,
      relativePathToCommonRoot,
      properties
    );

    generateTypeDefinition(
      component,
      events,
      booleanAttributes,
      attributes,
      componentModulePath,
      properties
    );
  });

  generateManifests(components, config.outdir!, commonRoot);

  logBlue(
    `[react-wrappers] - Generated wrappers in "${config.outdir}".`,
    config.hideLogs
  );
}

function updateConfig(options: Options) {
  config = {
    ...config,
    outdir: normalizeOutdir(options.outdir || config.outdir),
    exclude: [],
    typesSrc: "types",
    attributeMapping: {},
    ...options,
  };

  globalEvents = options.globalEvents || [];
}

function generateReactWrapper(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  componentModulePath: string,
  relativePathToCommonRoot: string,
  properties?: ClassField[]
) {
  /**  Ensure outdir is always treated as a function */
  const outdir = config.outdir!;
  const componentOutDir =
    typeof outdir === "function"
      ? outdir(component.name, component.tagName!)
      : outdir;

  /** Handle empty relative path case */
  const adjustedRelativePathToCommonRoot =
    relativePathToCommonRoot === "" ? "." : relativePathToCommonRoot;

  const result = getReactComponentTemplate(
    component,
    events,
    booleanAttributes,
    attributes,
    componentModulePath,
    adjustedRelativePathToCommonRoot,
    properties
  );

  saveFile(componentOutDir, `${component.name}.js`, result, "typescript");
}

function generateTypeDefinition(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  modulePath: string,
  properties?: ClassField[]
) {
  const result = getTypeDefinitionTemplate(
    component,
    events,
    booleanAttributes,
    attributes,
    modulePath,
    properties
  );

  const componentOutDir =
    typeof config.outdir === "function"
      ? config.outdir(component.name, component.tagName!)
      : config.outdir;
  saveFile(componentOutDir!, `${component.name}.d.ts`, result, "typescript");
}

function generateManifests(
  components: Component[],
  outdir: (className: string, tagName: string) => string | string,
  commonRoot: string
) {
  const uniqueOutDirs = new Set<string>();

  components.forEach((component) => {
    const componentOutDir =
      typeof outdir === "function"
        ? outdir(component.name, component.tagName!)
        : outdir;
    uniqueOutDirs.add(componentOutDir);
  });

  createOutDir(commonRoot);

  const manifestContent = getManifestContentTemplate(
    components,
    outdir,
    commonRoot
  );

  saveFile(commonRoot, "index.js", manifestContent, "typescript");
  saveFile(commonRoot, "index.d.ts", manifestContent, "typescript");
}

function getCommonRoot(dirs: string[]): string {
  if (!dirs.length) return "./react";

  const normalizedDirs = dirs.map((dir) => path.normalize(dir));
  const splitDirs = normalizedDirs.map((dir) => dir.split(path.sep));
  const minLength = Math.min(...splitDirs.map((split) => split.length));
  const commonRootSegments: string[] = [];

  for (let i = 0; i < minLength; i++) {
    const segment = splitDirs[0][i];
    if (splitDirs.every((split) => split[i] === segment)) {
      commonRootSegments.push(segment);
      logBlue(`Common segment '${segment}' found at index ${i}`);
    } else {
      logBlue(`Segment mismatch at index ${i}, stopping`);
      break;
    }
  }

  let commonRoot = commonRootSegments.join(path.sep);
  if (!commonRoot) {
    commonRoot = "./react";
  }

  logBlue(`Calculated common root: ${commonRoot}`);
  return commonRoot;
}

function getProperties(
  component: Component,
  attributes: MappedAttribute[],
  booleanAttributes: MappedAttribute[]
) {
  const attributeFieldNames = attributes.map((attr) => attr.fieldName);
  return component?.members?.filter(
    (member) =>
      member.kind === "field" &&
      !member.static &&
      member.privacy !== "private" &&
      member.privacy !== "protected" &&
      !attributeFieldNames.includes(member.name) &&
      (member.description || member.deprecated) &&
      !booleanAttributes.find((x) => x.propName === member.name) &&
      !attributes.find((x) => x.propName === member.name)
  ) as ClassField[];
}

function getEventNames(component: Component): EventName[] {
  return (
    component?.events?.map((event) => {
      return {
        name: event.name,
        reactName: createEventName(event),
        description: event.description,
        type: event.type?.text,
      };
    }) || []
  );
}

function getAttributes(component: Component): ComponentAttributes {
  const result: {
    attributes: MappedAttribute[];
    booleanAttributes: MappedAttribute[];
  } = {
    attributes: [],
    booleanAttributes: [],
  };

  component?.attributes?.forEach((attr) => {
    if (!attr?.name) {
      return;
    }

    /** Handle reserved keyword attributes */
    if (RESERVED_WORDS.includes(attr?.name)) {
      /** If we have a user-specified mapping, rename */
      if (attr.name in config.attributeMapping!) {
        const attribute = getMappedAttribute(attr);
        addAttribute(attribute, result);
        return;
      }
      throwKeywordException(attr, component);
    }

    addAttribute(attr as MappedAttribute, result);
  });

  addGlobalAttributes(result.attributes);

  return result;
}

function addGlobalAttributes(attributes: MappedAttribute[]) {
  MAPPED_PROPS.forEach((baseAttr: MappedAttribute) => {
    if (!attributes.find((x) => x.name === baseAttr.name)) {
      attributes.push(baseAttr);
    }
  });
}

function throwKeywordException(attr: Attribute, component: Component) {
  throw new Error(
    `Attribute \`${attr.name}\` in custom element \`${component.name}\` is a reserved keyword and cannot be used. Please provide an \`attributeMapping\` in the plugin options to rename the JavaScript variable that gets passed to the attribute.`
  );
}

function addAttribute(
  attribute: MappedAttribute,
  componentAttributes: ComponentAttributes
) {
  const existingAttr = componentAttributes.attributes.find(
    (x) => x.name === attribute.name
  );
  const existingBool = componentAttributes.booleanAttributes.find(
    (x) => x.name === attribute.name
  );

  if (existingAttr || existingBool) {
    return;
  }

  attribute.propName = toCamelCase(attribute.name);

  if (attribute?.type?.text.includes("boolean")) {
    componentAttributes.booleanAttributes.push(attribute);
  } else {
    componentAttributes.attributes.push(attribute);
  }
}

function getMappedAttribute(attr: Attribute): MappedAttribute {
  return {
    ...attr,
    originalName: attr.name,
    name: config.attributeMapping![attr.name],
  };
}

function getEventTemplates(eventNames: EventName[]) {
  return (
    eventNames.map(
      (event) =>
        `useEventListener(ref, '${event.name}', props.${event.reactName});`
    ) || []
  );
}

function getBooleanAttributeTemplates(booleanAttributes: MappedAttribute[]) {
  return (
    booleanAttributes?.map(
      (attr) => `'${attr.name}': props.${attr?.propName} ? '' : undefined`
    ) || []
  );
}

function getAttributeTemplates(attributes: MappedAttribute[]) {
  const excludedProps = ["ref", "children", "key", "style"];
  return (
    attributes
      ?.filter((x) => !excludedProps.includes(x.name))
      .map(
        (attr) =>
          `'${attr.originalName || attr?.name}': props.${attr?.propName} ${
            attr.name.includes("-") ? `|| props['${attr.name}']` : ""
          }`
      ) || []
  );
}

function getPropTemplates(properties?: ClassField[]) {
  return properties?.map(
    (member) => `useProperties(ref, '${member.name}', props.${member.name});`
  );
}

function getReactComponentTemplate(
  component: Component,
  events: EventName[],
  booleanAttributes: MappedAttribute[],
  attributes: MappedAttribute[],
  modulePath: string,
  relativePathToCommonRoot: string,
  properties?: ClassField[]
) {
  const eventTemplates = getEventTemplates(events);
  const booleanAttrTemplates = getBooleanAttributeTemplates(booleanAttributes);
  const attrTemplates = getAttributeTemplates(attributes);
  const propTemplates = getPropTemplates(properties);
  const methods = getComponentMethods(component);
  const unusedProps = getUnusedProps(attributes, booleanAttributes, properties);

  const useEffect = has(eventTemplates) || has(propTemplates) || config.ssrSafe;

  return `
    ${config.ssrSafe ? '"use client"' : ""}
    import React, { forwardRef, useImperativeHandle ${
      config.scopedTags ? ", useContext" : ""
    } ${useEffect ? ", useRef, useEffect" : ""} } from "react";
    ${!config.ssrSafe ? `import '${modulePath}';` : ""}
    ${
      config.scopedTags
        ? `import { ScopeContext } from "${relativePathToCommonRoot}/ScopeProvider.js";`
        : ""
    }
    ${
      has(eventTemplates) || has(propTemplates)
        ? `import { 
          ${has(eventTemplates) ? "useEventListener," : ""} 
          ${has(propTemplates) ? "useProperties" : ""}
        } from '${relativePathToCommonRoot}/react-utils.js';`
        : ""
    }

    export const ${component.name} = forwardRef((props, forwardedRef) => {
      ${useEffect ? `const ref = useRef(null);` : ""}
      ${
        has(unusedProps)
          ? `const { ${unusedProps.join(", ")}, ...filteredProps } = props;`
          : ""
      }
      ${config.scopedTags ? "const scope = useContext(ScopeContext);" : ""}

      ${
        config.ssrSafe
          ? `
      /** Waits for the client before loading the custom element */
      useEffect(() => {
        import('${modulePath}');
      }, []);
      `
          : ""
      }

      ${has(eventTemplates) ? "/** Event listeners - run once */" : ""}
      ${eventTemplates?.join("") || ""}

      ${
        has(propTemplates)
          ? "/** Properties - run whenever a property has changed */"
          : ""
      }
      ${propTemplates?.join("") || ""}

      ${
        has(methods)
          ? "/** Methods - uses `useImperativeHandle` hook to pass ref to component */"
          : ""
      }
      useImperativeHandle(forwardedRef, () => ({
        ${getPublicMethodsForRef(methods)}
      }));

      return React.createElement(
        ${getTagName(component)},
        { 
          ${useEffect ? "ref," : ""} 
          ${has(unusedProps) ? "...filteredProps" : "...props"},
          ${[...attrTemplates, ...booleanAttrTemplates].join(",")},
          style: {...props.style},
          ${globalEvents.map((x) => `${x.event}: props.${x.event}`).join(", ")}
        },
        props.children
      );
    });
  `;
}

function convertOptionsToBaseOptions(options: Options): BaseOptions {
  return {
    ...options,
    outdir:
      typeof options.outdir === "string"
        ? options.outdir
        : options.outdir
        ? options.outdir("", "")
        : undefined,
  };
}

function getTypeDefinitionTemplate(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  modulePath: string,
  properties?: ClassField[]
) {
  const props = getPropsInterface(
    component.name,
    booleanAttributes,
    attributes,
    events,
    properties
  );
  const eventTypes = getCustomEventTypes(component);
  const baseConfig = convertOptionsToBaseOptions(config);

  return `
    import { 
      ${config.defaultExport ? "default" : component.name} as ${
    component.name
  }Element
      ${eventTypes?.length ? `, ${eventTypes}` : ""}
    } from '${modulePath}';

    export type { 
      ${component.name}Element 
      ${eventTypes?.length ? `, ${eventTypes}` : ""}  
    };
    
    export interface ${component.name}Props ${getExtendedProps()} { 
      ${props} 
    }

    /**
     ${getComponentDetailsTemplate(component, baseConfig, true)}
     */
     export const ${component.name}: React.ForwardRefExoticComponent<${
    component.name
  }Props>;
  `;
}

function getExtendedProps() {
  return config.reactProps === true
    ? "extends React.AllHTMLAttributes<HTMLElement>"
    : `extends Pick<React.AllHTMLAttributes<HTMLElement>, ${[
        ...BASE_PROPS,
        ...(config.reactProps || []),
      ]
        .map((x) => `'${x}'`)
        .join(" | ")}>`;
}

function getMethodParameters(parameters?: Parameter[]) {
  return parameters
    ? "(" + parameters.map((x) => `${x.name}`).join(", ") + ")"
    : "()";
}

function getPropsInterface(
  componentName: string,
  booleanAttributes: MappedAttribute[],
  attributes: MappedAttribute[],
  events: EventName[],
  properties?: ClassField[]
) {
  return [
    ...getBooleanPropsTemplate(booleanAttributes),
    ...getAttributePropsTemplate(attributes, componentName),
    ...getPropertyPropsTemplate(properties, componentName),
    ...getEventPropsTemplate(events),
    ...getGlobalEventPropsTemplate(globalEvents),
  ]?.join("");
}

function getUnusedProps(
  attributes: MappedAttribute[],
  booleanAttributes: MappedAttribute[],
  properties?: ClassField[]
) {
  return [
    "className",
    ...[...(booleanAttributes || []), ...(attributes || [])].map(
      (x) => x.propName
    ),
    ...(properties || []).map((x) => x.name),
  ]?.filter(
    (prop) =>
      !RESERVED_WORDS.includes(prop!) &&
      !MAPPED_PROPS.some((x) => x.propName === prop) &&
      prop !== "for"
  );
}

function getTagName(component: Component) {
  return config.scopedTags
    ? `\`\${scope.prefix || ''}${component.tagName}\${scope.suffix || ''}\``
    : `"${component.tagName}"`;
}

function getPublicMethodsForRef(methods: ClassMethod[]) {
  return (
    methods
      ?.map(
        (method) =>
          `${method.name}: ${getMethodParameters(
            method.parameters
          )} => ref.current.${method.name}${getMethodParameters(
            method.parameters
          )}`
      )
      .join(",\n") || ""
  );
}

function getBooleanPropsTemplate(booleanAttributes: MappedAttribute[]) {
  return (
    booleanAttributes?.map(
      (attr) => `
      /** ${attr.description} */
      ${attr?.propName}?: ${attr?.type?.text || "boolean"};
    `
    ) || []
  );
}

function getAttributePropsTemplate(
  attributes: MappedAttribute[],
  componentName: string
) {
  return (
    (attributes || []).map(
      (attr) => `
      /** ${attr.description} */
      ${attr.propName}?: ${
        MAPPED_PROPS.some((base) => base.propName === attr.propName)
          ? attr.type?.text || "string"
          : `${componentName}Element['${attr.originalName || attr.propName}']`
      };
    `
    ) || []
  );
}

function getPropertyPropsTemplate(
  properties: ClassField[] | undefined,
  componentName: string
) {
  return (
    [...(properties || []), ...(config.globalProps || [])]?.map(
      (prop) => `
    /** ${prop.description} */
    ${prop.name}?: ${
        MAPPED_PROPS.some(
          (base: MappedAttribute) => base.propName === prop.name
        )
          ? prop.type?.text || "string"
          : `${componentName}Element['${prop.name}']`
      };
  `
    ) || []
  );
}

function getEventPropsTemplate(events: EventName[] | undefined) {
  return (
    events?.map(
      (event) => `
      /** ${event.description} */
      ${event.reactName}?: (event: ${getEventType(
        event.type,
        event.custom
      )}) => void;
    `
    ) || []
  );
}

function getGlobalEventPropsTemplate(events: GlobalEvent[] | undefined) {
  return (
    globalEvents?.map(
      (event) => `
      /** ${event.description} */
      ${event.event}?: (event: ${event.type}) => void;
    `
    ) || []
  );
}

function getManifestContentTemplate(
  components: Component[],
  outdir: ((className: string, tagName: string) => string) | string,
  commonRoot: string
) {
  const resolveOutDir = typeof outdir === "function" ? outdir : () => outdir;

  let exports = components
    .map((component) => {
      const componentOutDir = resolveOutDir(component.name, component.tagName!);
      let relativePath = path.relative(commonRoot, componentOutDir).replace(/\\/g, "/");
      if (!relativePath.startsWith('.')) {
        relativePath = `./${relativePath}`;
      }
      return `export * from '${relativePath}/${component.name}.js';`;
    })
    .join("\n");

  if (config.scopedTags) {
    exports += `\nexport * from './ScopeProvider.js';`;
  }

  // Remove any duplicate slashes in the path
  exports = exports.replace(/\/\//g, '/');

  return exports;
}

function getEventType(eventType?: string, eventCustom?: boolean) {
  if (eventCustom) {
    return eventType;
  }

  const base = "CustomEvent";

  if (!eventType || eventType === "Event" || eventType === "CustomEvent") {
    return base;
  }

  return base + `<${eventType}>`;
}

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
  saveReactUtils,
  saveScopeProvider,
} from "./utils.js";
import { createOutDir, logBlue, logYellow, saveFile } from "../../../tools/integrations/index.js";
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

const packageJson = getPackageJson();
let config: Options = {};
let globalEvents: GlobalEvent[] = [];

export function generateReactWrappers(
  customElementsManifest: CEM,
  options: Options
) {
  if (options.skip) {
    logYellow("[react-wrappers] - Skipped", options.hideLogs);
    return;
  }
  logBlue(
    "[react-wrappers] - Generating wrappers...",
    options.hideLogs
  );

  updateConfig(options);
  const components = getComponents(customElementsManifest, config.exclude);
  createOutDir(config.outdir!);
  saveReactUtils(config.outdir!, config.ssrSafe);
  if (config.scopedTags) {
    saveScopeProvider(config.outdir!, config.ssrSafe);
  }

  components.forEach((component) => {
    const events = getEventNames(component);
    const { booleanAttributes, attributes } = getAttributes(component);
    const properties = getProperties(component, attributes, booleanAttributes);
    const componentModulePath = getModulePath(
      config.modulePath,
      component,
      config.outdir!,
      packageJson
    );

    generateReactWrapper(
      component,
      events,
      booleanAttributes,
      attributes,
      componentModulePath,
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

  generateManifests(components, config.outdir!);
  logBlue(`[react-wrappers] - Generated wrappers in "${config.outdir}".`, config.hideLogs);
}

function updateConfig(options: Options) {
  config = {
    outdir: "./react",
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
  properties?: ClassField[]
) {
  const result = getReactComponentTemplate(
    component,
    events,
    booleanAttributes,
    attributes,
    componentModulePath,
    properties
  );

  saveFile(config.outdir!, `${component.name}.js`, result, "typescript");
}

function generateTypeDefinition(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  componentModulePath: string,
  properties?: ClassField[]
) {
  const result = getTypeDefinitionTemplate(
    component,
    events,
    booleanAttributes,
    attributes,
    componentModulePath,
    properties
  );

  saveFile(config.outdir!, `${component.name}.d.ts`, result, "typescript");
}

function generateManifests(components: Component[], outdir: string) {
  saveFile(
    outdir,
    "index.js",
    getManifestContentTemplate(components),
    "typescript"
  );
  saveFile(
    outdir,
    "index.d.ts",
    getManifestContentTemplate(components),
    "typescript"
  );
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
      useEffect ? ", useRef, useEffect" : ""
    } ${config.scopedTags ? ", useContext" : ""} } from "react";
    ${!config.ssrSafe ? `import '${modulePath}';` : ""}
    ${
      has(eventTemplates) || has(propTemplates)
        ? `import { 
      ${has(eventTemplates) ? "useEventListener," : ""} 
      ${has(propTemplates) ? "useProperties" : ""}
    } from './react-utils.js';`
        : ""
    }
    ${
      config.scopedTags
        ? 'import { ScopeContext } from "./ScopeProvider.js";'
        : ""
    }

    export const ${component.name} = forwardRef((props, forwardedRef) => {
      ${useEffect ? `const ref = useRef(null);` : ""}
      ${has(unusedProps) ? `const { ${unusedProps.join(", ")}, ...filteredProps } = props;` : ''}
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
     ${getComponentDetailsTemplate(component, config, true)}
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

function getManifestContentTemplate(components: Component[]) {
  let exports = components
    .map((component) => `export * from './${component.name}.js';`)
    .join("");

  if (config.scopedTags) {
    exports += `
        export * from "./ScopeProvider.js";
      `;
  }

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

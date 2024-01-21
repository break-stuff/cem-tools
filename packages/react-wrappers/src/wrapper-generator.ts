import { baseEvents, baseProperties } from "./global.js";
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
} from "./utils.js";
import { createOutDir, saveFile } from "../../../tools/integrations/index.js";
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
  Parameter,
} from "custom-elements-manifest";
import { has, toCamelCase } from "../../../tools/utilities/index.js";

const packageJson = getPackageJson();
const config: Options = {};
let globalEvents: GlobalEvent[] = [];

export function generateReactWrappers(
  customElementsManifest: CEM,
  options: Options
) {
  updateConfig(options);
  const components = getComponents(customElementsManifest, config.exclude);
  createOutDir(config.outdir!);
  saveReactUtils(config.outdir!);

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
}

function updateConfig(options: Options) {
  config.outdir = options.outdir || "./react";
  config.exclude = options.exclude || [];
  config.typesSrc = options.typesSrc || "types";
  config.modulePath = options.modulePath;
  config.attributeMapping = options.attributeMapping || {};
  globalEvents = [...baseEvents, ...(options.globalEvents || [])];
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
  baseProperties.forEach((baseAttr: MappedAttribute) => {
    if (!attributes.find((x) => x.name === baseAttr.name)) {
      attributes.push(baseAttr);
    }
  });
}

function getParams(
  booleanAttributes: MappedAttribute[] = [],
  attributes: MappedAttribute[] = [],
  properties: ClassField[] = [],
  eventNames: EventName[] = []
) {
  return [
    ...[
      ...booleanAttributes,
      ...attributes.filter((x) => x.name !== "ref"),
    ].map((attr) => attr.propName),
    ...(properties?.map((prop) => prop.name) || []),
    ...(eventNames?.map((event) => event.reactName) || []),
    ...globalEvents.map((x) => x.event),
  ]?.join(", ");
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
      (attr) => `'${attr.name}': props.${attr?.propName}`
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
          `'${attr.originalName || attr?.name}': props.${attr?.propName}`
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
  const useEffect = has(eventTemplates) || has(propTemplates);

  return `
    import React, { forwardRef, useImperativeHandle ${
      useEffect ? ", useRef" : ""
    } } from "react";
    import { 
      ${has(eventTemplates) ? "useEventListener," : ""} 
      ${has(propTemplates) ? "useProperties" : ""}
    } from './react-utils.js';
    import { ${component.name} as ${
    component.name
  }Element } from '${modulePath}';

    export const ${component.name} = forwardRef((props, forwardedRef) => {
      ${useEffect ? `const ref = useRef(null);` : ""}

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
        ${
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
        }
      }));

      return React.createElement(
        ${component.name}Element.customTag || "${component.tagName}",
        { 
          ${useEffect ? "ref," : ""} 
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
      ${component.name} as ${component.name}Element
      ${eventTypes?.length ? `, ${eventTypes}` : ""}
    } from '${modulePath}';

    export type { 
      ${component.name}Element 
      ${eventTypes?.length ? `, ${eventTypes}` : ""}  
    };
    
    export interface ${component.name}Props { 
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
        baseProperties.some((base) => base.propName === attr.propName)
          ? attr.type?.text || "string"
          : `${componentName}Element['${attr.propName}']`
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
    properties?.map(
      (prop) => `
    /** ${prop.description} */
    ${prop.name}?: ${
        baseProperties.some((base) => base.propName === prop.name)
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
  return components
    .map((component) => `export * from './${component.name}';`)
    .join("");
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

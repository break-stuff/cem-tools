import {
  getCssPropsTemplate,
  getEventsTemplate,
  getMethodsTemplate,
  getPartsTemplate,
  getSlotsTemplate,
} from "./description-templates.js";
import { toKebabCase, removeQuoteWrappers } from "./utilities.js";
import { getReferencesByComponent } from "./references.js";
import type {
  Attribute,
  CssValue,
  CustomElementsManifest,
  Declaration,
  Options,
  TagAttribute,
  Value,
  VsCssProperty,
} from "../../types";

const EXCLUDED_TYPES = ["string", "boolean", "undefined", "number", "null"];
const defaultLabels = {
  slots: "Slots",
  events: "Events",
  cssProperties: "CSS Properties",
  cssParts: "CSS Parts",
  methods: "Methods",
};

export let config: Options = {
  outdir: "./",
  htmlFileName: "vscode.html-custom-data.json",
  cssFileName: "vscode.css-custom-data.json",
  exclude: [],
  descriptionSrc: undefined,
  slotDocs: true,
  eventDocs: true,
  cssPropertiesDocs: true,
  cssPartsDocs: true,
  methodDocs: true,
  labels: {},
  cssSets: [],
};

export function updateConfig(params: Options) {
  config = { ...config, ...params };
  config.labels = { ...defaultLabels, ...params?.labels };
}

export function getCssPropertyList(
  customElementsManifest: CustomElementsManifest
): VsCssProperty[] {
  const components = getComponents(customElementsManifest);
  return (
    components?.map((component) => {
      return (
        component.cssProperties?.map((prop) => {
          return {
            name: prop.name,
            description: prop.description,
            values: getCssPropertyValues(prop?.type?.text),
          };
        }) || []
      );
    }) || []
  ).flat();
}

export function getCssPartList(customElementsManifest: CustomElementsManifest) {
  const components = getComponents(customElementsManifest);
  return (
    components?.map((component) => {
      return (
        component.cssParts?.map((prop) => {
          return {
            name: `::part(${prop.name})`,
            description: prop.description,
          };
        }) || []
      );
    }) || []
  ).flat();
}

export function getCssPropertyValues(value?: string): CssValue[] {
  if (!value) {
    return [];
  }

  if (value.trim().startsWith("set")) {
    return getValueSet(value);
  }

  return getCssValues(value);
}

export function getValueSet(value: string): CssValue[] {
  const setName = value.split(":")[1];
  const valueSet =
    config.cssSets?.find((x) => x.name.trim() === setName)?.values || [];

  return valueSet.map((x) => {
    if (typeof x === "string") {
      return {
        name: getCssNameValue(x),
      };
    } else {
      x.name = getCssNameValue(x.name);
      return x;
    }
  });
}

export function getCssValues(value: string): CssValue[] {
  return value
    ? (value.includes("|") ? value.split("|") : value.split(",")).map((x) => {
        const propName = x.trim();
        return {
          name: getCssNameValue(propName),
        };
      })
    : [];
}

function getCssNameValue(value: string) {
  return !value ? "" : value.startsWith("--") ? `var(${value})` : value;
}

export function getTagList(customElementsManifest: CustomElementsManifest) {
  const components = getComponents(customElementsManifest);
  return components.map((component) => {
    const slots = getSlotsTemplate(config, component.slots);
    const events = getEventsTemplate(config, component.events);
    const cssProps = getCssPropsTemplate(config, component.cssProperties);
    const parts = getPartsTemplate(config, component.cssParts);
    const methods = getMethodsTemplate(config, getMethods(component));

    return {
      name: component.tagName || toKebabCase(component.name),
      description:
        getDescription(component) +
        "\n\n\n---\n\n\n" +
        events +
        methods +
        slots +
        cssProps +
        parts,
      attributes: getComponentAttributes(component),
      references: getReferencesByComponent(component.name),
    };
  });
}

function getDescription(component: Declaration) {
  return (
    (config.descriptionSrc
      ? component[config.descriptionSrc]
      : component.summary || component.description
    )?.replace(/\\n/g, "\n") || ""
  );
}

function getComponents(customElementsManifest: CustomElementsManifest) {
  return customElementsManifest.modules
    ?.map((mod) =>
      mod?.declarations?.filter(
        (dec: Declaration) =>
          config.exclude &&
          !config.exclude.includes(dec.name) &&
          (dec.customElement || dec.tagName)
      )
    )
    .flat();
}

function getComponentAttributes(component: Declaration) {
  const attributes: TagAttribute[] = [];
  component?.attributes?.forEach((attr) => {
    const existingAttr = attributes.find(
      (x) => x.name === attr.name || x.name === attr.fieldName
    );
    if (existingAttr) {
      return;
    }

    attributes.push({
      name: attr.name || attr.fieldName,
      description: attr.description,
      values: getAttributeValues(attr),
    } as TagAttribute);
  });

  return attributes;
}

function getAttributeValues(attr: Attribute): Value[] {
  const value = attr.type?.text;
  return !value
    ? []
    : (value.includes("|") ? value.split("|") : value.split(","))
        .filter((type) => !EXCLUDED_TYPES.includes(type.trim()))
        .map((type) => {
          return {
            name: removeQuoteWrappers(type),
          } as Value;
        });
}

export function getMethods(component: Declaration) {
  return component.members?.filter(
    (member) =>
      member.kind === "method" &&
      member.privacy !== "private" &&
      member.description?.length
  );
}

import type { Component } from "../../../tools/cem-utils";
import {
  getAttributeValueOptions,
  getCssPropsTemplate,
  getDescription,
  getEventsTemplate,
  getMethods,
  getMethodsTemplate,
  getPartsTemplate,
  getSlotsTemplate,
} from "../../../tools/cem-utils";
import type {
  CssSet,
  CssValue,
  Reference,
  Tag,
  TagAttribute,
  Value,
  VsCssProperty,
} from "./types";
import type * as schema from "custom-elements-manifest/schema";
import { toKebabCase } from "../../../tools/utilities";

export function getCssPropertyList(
  components: Component[],
  cssSets?: CssSet[]
): VsCssProperty[] {
  return (
    components?.map((component) => {
      return (
        (component as Component).cssProperties?.map((prop) => {
          return {
            name: prop.name,
            description: prop.description,
            values: getCssPropertyValues(prop?.type?.text, cssSets),
          };
        }) || []
      );
    }) || []
  ).flat();
}

export function getCssPartList(components: Component[]) {
  return (
    components?.map((component) => {
      return (
        (component as Component).cssParts?.map((prop) => {
          return {
            name: `::part(${prop.name})`,
            description: prop.description,
          };
        }) || []
      );
    }) || []
  ).flat();
}

export function getCssPropertyValues(
  value?: string,
  cssSets?: CssSet[]
): CssValue[] {
  if (!value) {
    return [];
  }

  if (value.trim().startsWith("set")) {
    return getValueSet(value, cssSets);
  }

  return getCssValues(value);
}

export function getValueSet(value: string, cssSets?: CssSet[]): CssValue[] {
  const setName = value.split(":")[1];
  const valueSet =
    cssSets?.find((x) => x.name.trim() === setName)?.values || [];

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

export function getTagList(
  components?: Component[],
  referenceTemplate?: (name: string, tag?: string) => Reference[]
): Tag[] {
  return components?.map((comp) => {
    const component = comp as Component;
    const slots = getSlotsTemplate(component?.slots);
    const events = getEventsTemplate(component?.events);
    const cssProps = getCssPropsTemplate(component?.cssProperties);
    const parts = getPartsTemplate(component?.cssParts);
    const methods = getMethodsTemplate(getMethods(component));

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
      references: referenceTemplate
        ? referenceTemplate(component.name, component.tagName)
        : [],
    };
  }) || [];
}

export function getComponentAttributes(component: Component) {
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

export function getAttributeValues(attr: schema.Attribute): Value[] {
  const options = getAttributeValueOptions(attr);
  return (
    options?.map((option) => {
      return {
        name: option,
      };
    }) || []
  );
}

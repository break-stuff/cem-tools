import type { Component } from "../../../tools/cem-utils";
import {
  getAttributeValueOptions,
  getComponentDetailsTemplate,
} from "../../../tools/cem-utils";
import type {
  CssSet,
  CssValue,
  Options,
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

export function getTagList(components: Component[], options: Options): Tag[] {
  return (
    components?.map((component) => {
      return {
        name: `${options.prefix}${component.tagName || toKebabCase(component.name)}${options.suffix}`,
        description: getComponentDetailsTemplate(component, options!),
        attributes: getComponentAttributes(component, options?.typesSrc),
        references: options?.referencesTemplate
          ? options.referencesTemplate(component.name, component.tagName)
          : [],
      };
    }) || []
  );
}

export function getComponentAttributes(component: Component, typesSrc?: string) {
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
      values: getAttributeValues(attr, typesSrc),
    } as TagAttribute);
  });

  return attributes;
}

export function getAttributeValues(attr: schema.Attribute, typesSrc?: string): Value[] {
  const options = getAttributeValueOptions(attr, typesSrc);
  return (
    options?.map((option) => {
      return {
        name: option,
      };
    }) || []
  );
}

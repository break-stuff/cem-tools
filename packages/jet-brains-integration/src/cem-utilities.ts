import type { Component } from "../../../tools/cem-utils";
import type { WebTypeAttribute, WebTypeCssProperty, WebTypePseudoElement } from "./types";

export function getCssPropertyList(
  components: Component[]
): WebTypeCssProperty[] {
  return (
    components?.map((component: Component) => {
      return (
        component.cssProperties?.map((prop) => {
          return {
            name: prop.name,
            description: prop.description,
          };
        }) || []
      );
    }) || []
  ).flat();
}

export function getCssPartList(
  components: Component[]
): WebTypePseudoElement[] {
  return (
    components?.map((component: Component) => {
      return (
        component.cssParts?.map((prop) => {
          return {
            name: `part(${prop.name})`,
            description: prop.description,
          };
        }) || []
      );
    }) || []
  ).flat();
}

export function getCssPropertyValues(value?: string): string[] {
  return value
    ? (value.includes("|") ? value.split("|") : value.split(",")).map((x) =>
        getCssNameValue(x.trim())
      )
    : [];
}

function getCssNameValue(value: string) {
  return !value ? "" : value.startsWith("--") ? `var(${value})` : value;
}

export function getComponentAttributes(component: Component) {
  const attributes: WebTypeAttribute[] = [];
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
      value: {
        type: attr.type?.text,
      },
    } as WebTypeAttribute);
  });

  return attributes;
}

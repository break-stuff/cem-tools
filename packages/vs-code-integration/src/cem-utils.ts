import { getComponents, getSlotsTemplate } from "cem-utils";
import { TagAttribute, Value, VsCssProperty } from "./types";
import * as schema from 'custom-elements-manifest/schema';

export function getCssPropertyList(
  customElementsManifest: schema.Package
): VsCssProperty[] {
  const components = getComponents(customElementsManifest);
  return (
    components?.map((component) => {
      return (
        (component as schema.CustomElementDeclaration).cssProperties?.map(
          (prop) => {
            return {
              name: prop.name,
              description: prop.description,
              values: getCssPropertyValues(prop?.type?.text),
            };
          }
        ) || []
      );
    }) || []
  ).flat();
}

export function getCssPartList(customElementsManifest: schema.Package) {
  const components = getComponents(customElementsManifest);
  return (
    components?.map((component) => {
      return (
        (component as schema.CustomElementDeclaration).cssParts?.map((prop) => {
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

export function getTagList(customElementsManifest: schema.Package) {
  const components = getComponents(customElementsManifest);
  return components.map((comp) => {
    const component  = comp as schema.CustomElementDeclaration;
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
      references: getReferencesByComponent(component.name),
    };
  });
}

export function getComponentAttributes(component: schema.CustomElementDeclaration) {
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

export function getAttributeValues(options: string[]): Value[] {
  return options?.map((option) => {
    return {
      name: option,
    };
  }
  ) || [];
}
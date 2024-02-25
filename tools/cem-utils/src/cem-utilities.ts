import { removeQuoteWrappers } from "../../utilities";
import type * as schema from "custom-elements-manifest";
import type { CEM, Component } from "./types";

export const EXCLUDED_TYPES = [
  "any",
  "bigint",
  "boolean",
  "never",
  "null",
  "number",
  "string",
  "Symbol",
  "undefined",
  "unknown",
];

/**
 * Gets the description from a CEM based on a specified source
 * @param component CEM component/declaration object
 * @param descriptionSrc property name of the description source
 * @returns string
 */
export function getComponentDescription(
  component: Component,
  descriptionSrc?: string
): string {
  let description =
    (descriptionSrc
      ? (component as any)[descriptionSrc]
      : component.summary || component.description
    )?.replace(/\\n/g, "\n") || "";

  if (component.deprecated) {
    const deprecation =
      typeof component.deprecated === "string"
        ? `@deprecated ${component.deprecated}`
        : "@deprecated";
    description = `${deprecation}\n\n${description}`;
  }

  return description;
}

/**
 * Gets a list of components from a CEM object
 * @param customElementsManifest CEM object
 * @param exclude and array of component names to exclude
 * @returns Component[]
 */
export function getComponents(
  customElementsManifest: CEM,
  exclude?: string[]
): Component[] {
  return (
    customElementsManifest.modules?.map(
      (mod) =>
        mod?.declarations?.filter(
          (dec) =>
            !exclude?.includes(dec.name) &&
            ((dec as Component).customElement || (dec as Component).tagName)
        ) || []
    ) || []
  ).flat() as Component[];
}
/**
 * Gets a list of public properties from a CEM component
 * @param component CEM component/declaration object
 * @returns an array of public properties for a given component
 */
export function getComponentProperties(component: Component) {
  return component.members?.filter(
    (member) =>
      member.kind === "field" &&
      member.privacy !== "private" &&
      member.privacy !== "protected" &&
      !member.static &&
      !(member as schema.CustomElementField).attribute &&
      !member.name.startsWith("#")
  ) as schema.ClassMember[];
}

/**
 * This is intended for providing tooling a list of viable options for an attribute (excluding Js primitives).
 * @param attr CEm attribute object
 * @param typeSrc property name of the type source
 * @returns list of values for a given attribute
 */
export function getAttributeValueOptions(
  attr: schema.Attribute,
  typeSrc: string = "type"
): string[] {
  const value: string = (attr as any)[`${typeSrc}`]?.text || attr.type?.text;
  return !value
    ? []
    : (value.includes("|") ? value.split("|") : value.split(","))
        .filter((type) => !EXCLUDED_TYPES.includes(type.trim()))
        .map((type) => removeQuoteWrappers(type));
}

/**
 * Get all public methods for a component
 * @param component CEM component/declaration object
 * @returns ClassMethod[]
 */
export function getComponentMethods(
  component: Component
): schema.ClassMethod[] {
  return component.members?.filter(
    (member) =>
      member.kind === "method" &&
      member.privacy !== "private" &&
      member.description?.length &&
      !member.name.startsWith("#") 
  ) as schema.ClassMethod[];
}

/**
 * Gets a list of event names for a given component
 * @param component The component you want to get the event types for
 * @param excludedTypes Any types you want to exclude from the list
 * @returns A string array of event types for a given component
 */
export function getCustomEventTypes(
  component: Component,
  excludedTypes?: string[]
) {
  const types = component.events
    ?.map((e) => {
      const eventType = e.type?.text
        .replace("[]", "")
        .replace(" | undefined", "");
      return eventType &&
        !excludedTypes?.includes(eventType) &&
        !EXCLUDED_TYPES.includes(eventType) &&
        !eventType.includes("<") &&
        !eventType.includes(`{`) &&
        !eventType.includes("'") &&
        !eventType.includes(`"`)
        ? eventType
        : undefined;
    })
    .filter((e) => e !== undefined && !e?.startsWith("HTML"));

  return types?.length ? [...new Set(types)].join(", ") : undefined;
}

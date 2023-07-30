import { removeQuoteWrappers } from "../../utilities";
import type * as schema from "custom-elements-manifest";
import type { CEM, Component } from "./types";
import type { BaseOptions } from "../../configurations";

const EXCLUDED_TYPES = ["string", "boolean", "undefined", "number", "null"];

export function getDescription(
  component: schema.Declaration,
  descriptionSrc?: string
) {
  return (
    (descriptionSrc
      ? (component as any)[descriptionSrc]
      : component.summary || component.description
    )?.replace(/\\n/g, "\n") || ""
  );
}

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

export function getAttributeValueOptions(attr: schema.Attribute): string[] {
  const value = attr.type?.text;
  return !value
    ? []
    : (value.includes("|") ? value.split("|") : value.split(","))
        .filter((type) => !EXCLUDED_TYPES.includes(type.trim()))
        .map((type) => removeQuoteWrappers(type));
}

export function getMethods(component: Component) {
  return component.members?.filter(
    (member) =>
      member.kind === "method" &&
      member.privacy !== "private" &&
      member.description?.length
  ) as schema.ClassMethod[];
}

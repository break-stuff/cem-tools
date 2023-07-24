import { removeQuoteWrappers } from "utilities";
import * as schema from "custom-elements-manifest/schema";

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
  customElementsManifest: schema.Package,
  exclude?: string[]
) {
  return customElementsManifest.modules
    ?.map((mod) =>
      mod?.declarations?.filter(
        (dec) =>
          exclude &&
          !exclude.includes(dec.name) &&
          ((dec as schema.CustomElementDeclaration).customElement ||
            (dec as schema.CustomElementDeclaration).tagName)
      )
    )
    .flat();
}

export function getAttributeValueOptions(attr: schema.Attribute): string[] {
  const value = attr.type?.text;
  return !value
    ? []
    : (value.includes("|") ? value.split("|") : value.split(","))
        .filter((type) => !EXCLUDED_TYPES.includes(type.trim()))
        .map((type) => removeQuoteWrappers(type));
}

export function getMethods(component: schema.CustomElementDeclaration) {
  return component.members?.filter(
    (member) =>
      member.kind === "method" &&
      member.privacy !== "private" &&
      member.description?.length
  ) as schema.ClassMethod[];
}

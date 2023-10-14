import fs from "fs";
import type {
  JsProperties,
  Options,
  Reference,
  WebTypeAttribute,
  WebTypeCssProperty,
  WebTypeElement,
  WebTypeEvent,
  WebTypePseudoElement,
} from "./types";
import {
  getComponents,
  type CEM,
  Component,
  getComponentDetailsTemplate,
} from "../../../tools/cem-utils";
import type * as schema from "custom-elements-manifest/schema";
import {
  getComponentAttributes,
  getCssPartList,
  getCssPropertyList,
} from "./cem-utilities";
import {
  createOutDir,
  logBlue,
  logRed,
  saveFile,
} from "../../../tools/integrations";
import { toKebabCase } from "../../../tools/utilities";
import { updateConfig } from "../../../tools/configurations";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

export function getTagList(
  components: Component[],
  options: Options,
  referenceTemplate?: (name: string, tag?: string) => Reference
): WebTypeElement[] {
  return components.map((component: Component) => {
    const reference = referenceTemplate
      ? referenceTemplate(component.name, component.tagName)
      : undefined;

    return {
      name: `${options.prefix}${
        component.tagName || toKebabCase(component.name)
      }${options.suffix}`,
      description: getComponentDetailsTemplate(component, options),
      ["doc-url"]: reference?.url || "",
      attributes: getComponentAttributes(component, options.typesSrc),
      slots: component.slots?.map((slot) => {
        return {
          name: slot.name,
          description: slot.description,
        };
      }),
      events: getWebTypeEvents(component),
      js: getJsProperties(component, options.typesSrc),
    };
  });
}

function getJsProperties(
  component: Component,
  typesSrc?: string
): JsProperties {
  return {
    properties: getWebTypeProperties(component, typesSrc),
    events: getWebTypeEvents(component),
  };
}

function getWebTypeProperties(
  component: Component,
  typesSrc = "types"
): WebTypeAttribute[] {
  return (
    ((component.attributes || component.members) as schema.Attribute[])?.map(
      (attr) => {
        return {
          name: attr.name,
          description: attr.description,
          value: {
            type: (attr as any)[`${typesSrc}`]?.text || attr.type?.text,
          },
        };
      }
    ) || []
  );
}

function getWebTypeEvents(component: Component): WebTypeEvent[] {
  return (
    component.events?.map((event) => {
      return {
        name: event.name,
        description: event.description,
      };
    }) || []
  );
}

export function generateJetBrainsWebTypes(
  customElementsManifest: CEM,
  options: Options
) {
  options = getOptions(options);
  const components = getComponents(
    customElementsManifest,
    options.exclude
  ).filter((x) => x.tagName);

  if (!components.length) {
    logRed("No components found in custom-elements.json");
    return;
  }

  const elements = options.webTypesFileName
    ? getTagList(components, options)
    : [];
  const cssProperties = getCssPropertyList(components);
  const cssParts = getCssPartList(components);

  const outputPath = saveWebTypeFile(
    elements,
    cssProperties,
    cssParts,
    options
  );
  logBlue(`[jet-brains-web-type-generator] - Generated "${outputPath}".`);
}

export function getOptions(options: Options) {
  options = updateConfig(options);
  options.webTypesFileName =
    options.webTypesFileName === undefined
      ? "web-types.json"
      : options.webTypesFileName;
  options.prefix = options.prefix === undefined ? "" : options.prefix;
  options.suffix = options.suffix === undefined ? "" : options.suffix;

  return options;
}

//
// OUTPUTS
//

export function saveWebTypeFile(
  tags: WebTypeElement[],
  cssProperties: WebTypeCssProperty[],
  parts: WebTypePseudoElement[],
  options: Options
) {
  createOutDir(options.outdir!);

  if (options.webTypesFileName) {
    savePackageJson(packageJson, options);
    return saveFile(
      options.outdir!,
      options.webTypesFileName!,
      getWebTypesFileContents(tags, cssProperties, parts, options)
    );
  }

  return "";
}

function savePackageJson(packageJson: any, options: Options) {
  packageJson["web-types"] =
    (!options.outdir?.endsWith("/")
      ? options.outdir + "/"
      : options.outdir || "") + options.webTypesFileName;
  saveFile("./", "package.json", JSON.stringify(packageJson, null, 2));
}

function getWebTypesFileContents(
  tags: WebTypeElement[],
  cssProperties: WebTypeCssProperty[],
  parts: WebTypePseudoElement[],
  options: Options
) {
  return `{
    "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    "name": "${packageJson.name}",
    "version": "${packageJson.version}",
    "description-markup": "markdown",
    "contributions": {
      ${
        options.excludeHtml
          ? ""
          : `"html": {
        "elements": ${JSON.stringify(tags)}
      },`
      }
      ${
        options.excludeCss
          ? ""
          : `"css": {
        "properties": ${JSON.stringify(cssProperties)},
        "pseudo-elements": ${JSON.stringify(parts)}
      }`
      }
    }
  }`;
}

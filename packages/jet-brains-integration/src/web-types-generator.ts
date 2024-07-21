import fs from "fs";
import type {
  JsProperties,
  Options,
  Reference,
  WebTypeCssProperty,
  WebTypeElement,
  WebTypeEvent,
  WebTypeJsProperty,
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
  log,
  logGreen,
  logRed,
  logYellow,
  saveFile,
} from "../../../tools/integrations";
import { toKebabCase } from "../../../tools/utilities";
import { updateConfig } from "../../../tools/configurations";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

export function getTagList(
  components: Component[],
  options: Options,
  referenceTemplate?: (name: string, tag?: string) => Reference,
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
  typesSrc?: string,
): JsProperties {
  return {
    properties: getWebTypeProperties(component, typesSrc),
    events: getWebTypeEvents(component),
  };
}

/**
 * @param field The Custom Elements Manifest class field to evaluate
 * @return Whether the Custom Elements Manifest class field is a public property
 */
function isPublicProperty(field: schema.ClassField): boolean {
  // It appears that JetBrains Web Types assumes that all properties are public (TS only) and not
  // static.
  return (
    field.static !== true &&
    (field.privacy === "public" || field.privacy === undefined)
  );
}

function getWebTypeProperties(
  component: Component,
  typesSrc = "type",
): WebTypeJsProperty[] {
  return (
    (
      component.members?.filter((member) => member.kind === "field") as
        | schema.ClassField[]
        | undefined
    )
      ?.filter(isPublicProperty)
      .map((field) => {
        return {
          name: field.name,
          description: field.description,
          type: (field as any)[typesSrc]?.text || field.type?.text,
        };
      }) || []
  );
}

function getWebTypeEvents(component: Component): WebTypeEvent[] {
  return (
    // The CEM analyzer will generate a custom event without a name if it is dispatched inside the
    // custom element using a predefined constructor, but JetBrains IDEs seemingly can't do anything
    // with unnamed Web Type events, so ignore them.
    component.events
      ?.filter((event) => event.name !== undefined && event.name !== null)
      .map((event) => {
        return {
          name: event.name,
          type: event.type?.text,
          description: event.description,
        };
      }) || []
  );
}

export function generateJetBrainsWebTypes(
  customElementsManifest: CEM,
  options: Options,
) {
  if (options?.skip) {
    logYellow("[jet-brains-web-type-generator] - Skipped", options.hideLogs);
    return;
  }
  log(
    "[jet-brains-web-type-generator] - Updating Custom Elements Manifest...",
    options?.hideLogs,
  );

  options = getOptions(options);
  const components = getComponents(
    customElementsManifest,
    options.exclude,
  ).filter((x) => x.tagName);

  if (!components.length) {
    logRed(
      "[jet-brains-web-type-generator] - No components found in custom-elements.json",
    );
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
    options,
  );
  logGreen(`[jet-brains-web-type-generator] - Generated "${outputPath}".`);
}

export function getWebTypesData(customElementsManifest: CEM, options: Options) {
  options = getOptions(options);
  const components = getComponents(
    customElementsManifest,
    options.exclude,
  ).filter((x) => x.tagName);

  const elements = getTagList(components, options);
  const cssProperties = getCssPropertyList(components);
  const cssParts = getCssPartList(components);

  return getWebTypesFileContents(elements, cssProperties, cssParts, options);
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
  options: Options,
) {
  createOutDir(options.outdir!);

  if (options.webTypesFileName) {
    if (options.packageJson) {
      savePackageJson(packageJson, options);
    }

    return saveFile(
      options.outdir!,
      options.webTypesFileName!,
      getWebTypesFileContents(tags, cssProperties, parts, options),
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
  options: Options,
) {
  return `{
    "$schema": "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    "name": "${packageJson.name}",
    "version": "${packageJson.version}",
    "description-markup": "markdown",${
      options.defaultIcon
        ? `
    "default-icon": "${options.defaultIcon}",
    `
        : ""
    }    "contributions": {
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

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createOutDir,
  logBlue,
  logRed,
  logYellow,
  saveFile,
} from "../../../tools/integrations";
import {
  getCssPartList,
  getCssPropertyList,
  getTagList,
} from "./cem-utilities.js";
import type { Options, Tag, VsCssProperty } from "./types";
import { getComponents, type CEM } from "../../../tools/cem-utils";
import { updateConfig } from "../../../tools/configurations";

export function generateVsCodeCustomElementData(
  customElementsManifest: CEM,
  options: Options,
) {
  if (options.skip) {
    logYellow(
      "[custom-element-vs-code-integration] - Skipped",
      options.hideLogs,
    );
    return;
  }
  logBlue(
    "[custom-element-vs-code-integration] - Updating Custom Elements Manifest...",
    options.hideLogs,
  );

  options = getOptions(options);
  const components = getComponents(
    customElementsManifest,
    options.exclude,
  ).filter((x) => x.tagName);

  if (!components.length) {
    logRed("[custom-element-vs-code-integration] - No components found.");
    return;
  }

  const htmlTags = options.htmlFileName ? getTagList(components, options) : [];
  const cssProperties = options.cssFileName
    ? getCssPropertyList(components, options.cssSets)
    : [];
  const cssParts = options.cssFileName ? getCssPartList(components) : [];

  const outputPath = saveCustomDataFiles(
    options,
    htmlTags,
    cssProperties,
    cssParts,
  );
  logBlue(`[vs-code-custom-data-generator] - Generated ${outputPath}.`);
}

export function getOptions(options: Options) {
  options = updateConfig(options);
  options.htmlFileName =
    options.htmlFileName === undefined
      ? "vscode.html-custom-data.json"
      : options.htmlFileName;
  options.cssFileName =
    options.cssFileName === undefined
      ? "vscode.css-custom-data.json"
      : options.cssFileName;
  options.prefix = options.prefix === undefined ? "" : options.prefix;
  options.suffix = options.suffix === undefined ? "" : options.suffix;

  return options;
}

function saveCustomDataFiles(
  options: Options,
  tags: Tag[],
  cssProperties: VsCssProperty[],
  cssParts: VsCssProperty[],
) {
  const outputPaths = [];
  createOutDir(options.outdir!);

  if (options.htmlFileName) {
    const htmlOutput = saveFile(
      options.outdir!,
      options.htmlFileName!,
      getCustomHtmlDataFileContents(tags),
    );

    outputPaths.push(`"${htmlOutput}"`);
  }

  if (options.cssFileName) {
    const cssOutput = saveFile(
      options.outdir!,
      options.cssFileName!,
      getCustomCssDataFileContents(cssProperties, cssParts),
    );

    outputPaths.push(`"${cssOutput}"`);
  }

  return outputPaths.join(", ");
}

function getCustomHtmlDataFileContents(tags: Tag[]) {
  return `{
      "$schema": "https://raw.githubusercontent.com/microsoft/vscode-html-languageservice/main/docs/customData.schema.json",
      "version": 1.1,
      "tags": ${JSON.stringify(tags)}
    }`;
}

function getCustomCssDataFileContents(
  properties: VsCssProperty[],
  parts: VsCssProperty[],
) {
  return `{
      "$schema": "https://raw.githubusercontent.com/microsoft/vscode-css-languageservice/main/docs/customData.schema.json",
      "version": 1.1,
      "properties": ${JSON.stringify(properties)},
      "pseudoElements": ${JSON.stringify(parts)}
    }`;
}

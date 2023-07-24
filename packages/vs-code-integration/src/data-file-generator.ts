/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createOutdir, saveFile } from "cem-utils/integrations.js";
import { getCssPartList, getCssPropertyList, getTagList, config } from "cem-utils/cem-utilities.js";
import { CustomElementsManifest, Options, Tag, VsCssProperty } from "../../types";

export function generateCustomDataFile(
  customElementsManifest: CustomElementsManifest
) {
  const htmlTags = config.htmlFileName
    ? getTagList(customElementsManifest)
    : [];
  const cssProperties = config.cssFileName
    ? getCssPropertyList(customElementsManifest)
    : [];
  const cssParts = config.cssFileName
    ? getCssPartList(customElementsManifest)
    : [];

  saveCustomDataFiles(config, htmlTags, cssProperties, cssParts);
}

function saveCustomDataFiles(
  config: Options,
  tags: Tag[],
  cssProperties: VsCssProperty[],
  cssParts: VsCssProperty[]
) {
  createOutdir(config.outdir!);

  if (config.htmlFileName) {
    saveFile(
      config.outdir!,
      config.htmlFileName!,
      getCustomHtmlDataFileContents(tags)
    );
  }

  if (config.cssFileName) {
    saveFile(
      config.outdir!,
      config.cssFileName!,
      getCustomCssDataFileContents(cssProperties, cssParts)
    );
  }
}

function getCustomHtmlDataFileContents(tags: Tag[]) {
  return `{
      "$schema": "https://raw.githubusercontent.com/microsoft/vscode/master/extensions/html-language-features/server/src/htmlTags.schema.json",
      "version": 1.1,
      "tags": ${JSON.stringify(tags)}
    }`;
}

function getCustomCssDataFileContents(
  properties: VsCssProperty[],
  parts: VsCssProperty[]
) {
  return `{
      "$schema": "https://raw.githubusercontent.com/microsoft/vscode/master/extensions/css-language-features/server/src/data/browsers.schema.json",
      "version": 1.1,
      "properties": ${JSON.stringify(properties)},
      "pseudoElements": ${JSON.stringify(parts)}
    }`;
}

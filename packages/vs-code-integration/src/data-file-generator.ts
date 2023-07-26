/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createOutDir, saveFile } from "integrations";
import { getCssPartList, getCssPropertyList, getTagList } from "./cem-utilities";
import { Options, Tag, VsCssProperty } from "./types";
import { CEM } from "cem-utils";

export function generateCustomElementDataFiles(
  customElementsManifest: CEM,
  options: Options
) {
  const htmlTags = options.htmlFileName
    ? getTagList(customElementsManifest)
    : [];
  const cssProperties = options.cssFileName
    ? getCssPropertyList(customElementsManifest, options.cssSets)
    : [];
  const cssParts = options.cssFileName
    ? getCssPartList(customElementsManifest)
    : [];

  saveCustomDataFiles(options, htmlTags, cssProperties, cssParts);
}

function saveCustomDataFiles(
  options: Options,
  tags: Tag[],
  cssProperties: VsCssProperty[],
  cssParts: VsCssProperty[]
) {
  createOutDir(options.outdir!);

  if (options.htmlFileName) {
    saveFile(
      options.outdir!,
      options.htmlFileName!,
      getCustomHtmlDataFileContents(tags)
    );
  }

  if (options.cssFileName) {
    saveFile(
      options.outdir!,
      options.cssFileName!,
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

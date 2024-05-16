import { CEM, Component } from "../../../tools/cem-utils/index.js";
import {
  createOutDir,
  logBlue,
  saveFile,
} from "../../../tools/integrations/index.js";
import { Options } from "./types.js";

let userConfig: Options = {};

export function updateCemDeprecations(cem: CEM, options: Options = {}) {
  logBlue("[cem-inheritance-generator] - Updating Custom Elements Manifest...", options.hideLogs);
  const newCem = generateUpdatedCem(cem, options);
  createOutDir(userConfig.outdir!);
  saveFile(
    userConfig.outdir!,
    userConfig.fileName!,
    JSON.stringify(newCem, null, 2)
  );
  logBlue("[cem-inheritance-generator] - Custom Elements Manifest updated.", options.hideLogs);
}

function updateOptions(options: Options = {}) {
  return {
    indicator: "(@deprecated)",
    fileName: "custom-elements.json",
    outdir: "./",
    exclude: [],
    ...options,
  };
}

export function generateUpdatedCem(cem: any, options: Options = {}) {
  if (!cem) {
    throw new Error(
      "Custom Elements Manifest is required to update inheritance."
    );
  }

  userConfig = updateOptions(options);
  const cemEntities = getDeclarations(cem, userConfig.exclude);
  cemEntities.forEach((component) => {
    component.cssProperties?.forEach(updateMetaData);
    component.cssParts?.forEach(updateMetaData);
    component.attributes?.forEach(updateMetaData);
    component.events?.forEach(updateMetaData);
    component.members?.forEach(updateMetaData);
    component.slots?.forEach(updateMetaData);
  });

  return cem;
}

function updateMetaData(data: any) {
  if (data.description?.includes(userConfig.indicator!)) {
    const message = userConfig.preserveIndicator
      ? data.description
      : data.description.replace(userConfig.indicator!, "").trim();
    data.deprecated = message.length > 0 ? message : false;
    data.description = "";
  }
}
/**
 * Gets a list of components from a CEM object
 * @param customElementsManifest CEM object
 * @param exclude and array of component names to exclude
 * @returns Component[]
 */
export function getDeclarations(
  customElementsManifest: CEM,
  exclude?: string[]
): Component[] {
  return (
    customElementsManifest.modules?.map(
      (mod) =>
        mod?.declarations?.filter((dec) => !exclude?.includes(dec.name)) || []
    ) || []
  ).flat() as Component[];
}

import { Options, CemAnalyzerParams } from "./types";
import { updateConfig } from "configurations";
import { generateCustomDataFile } from "./data-file-generator";
import { greenConsoleLog } from "integrations";


export function generateCustomData(params: Options = {}) {
  updateConfig(params);

  return {
    name: "cem-plugin-vs-code-custom-data-generator",
    packageLinkPhase({ customElementsManifest }: CemAnalyzerParams) {
      console.log(
        "[vs-code-custom-data-generator] - Generating config files..."
      );
      generateCustomDataFile(customElementsManifest);
      greenConsoleLog(
        "[vs-code-custom-data-generator] - File generation complete."
      );
    },
  };
}
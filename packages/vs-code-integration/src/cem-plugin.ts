import type { Options, CemAnalyzerParams } from "./types";
import { updateConfig } from "configurations";
import { generateCustomElementDataFiles } from "./data-file-generator.js";
import { greenConsoleLog } from "integrations";

export function customElementVsCodePlugin(params: Options = {}) {
  updateConfig(params);

  return {
    name: "custom-element-vs-code-integration",
    packageLinkPhase({ customElementsManifest }: CemAnalyzerParams) {
      console.log(
        "[vs-code-custom-data-generator] - Generating config files..."
      );
      generateCustomElementDataFiles(customElementsManifest, params);
      greenConsoleLog(
        "[vs-code-custom-data-generator] - File generation complete."
      );
    },
  };
}

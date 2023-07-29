import type { Options, CemAnalyzerParams } from "./types";
import { generateVsCodeCustomElementData } from "./data-file-generator.js";
import { logGreen } from "../../../tools/integrations";

export function customElementVsCodePlugin(params: Options = {}) {
  return {
    name: "custom-element-vs-code-integration",
    packageLinkPhase({ customElementsManifest }: CemAnalyzerParams) {
      console.log(
        "[vs-code-custom-data-generator] - Generating config files..."
      );
      generateVsCodeCustomElementData(customElementsManifest, params);
      logGreen(
        "[vs-code-custom-data-generator] - File generation complete."
      );
    },
  };
}

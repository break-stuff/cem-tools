import type { Options, CemAnalyzerParams } from "./types";
import { generateVsCodeCustomElementData } from "./data-file-generator.js";

export function customElementVsCodePlugin(params: Options = {}) {
  return {
    name: "custom-element-vs-code-integration",
    packageLinkPhase({ customElementsManifest }: CemAnalyzerParams) {
      generateVsCodeCustomElementData(customElementsManifest, params);
    },
  };
}

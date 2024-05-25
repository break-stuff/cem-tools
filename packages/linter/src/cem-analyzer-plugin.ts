import { Options, generateEsLintLintRules } from "./linter-generator.js";
import type { CEM } from "../../../tools/cem-utils/index.js";

export interface Params {
  customElementsManifest: CEM;
}

export function customEsLintRuleGeneratorPlugin(options: Options) {
  return {
    name: "custom-element-eslint",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateEsLintLintRules(customElementsManifest, options);
    },
  };
}

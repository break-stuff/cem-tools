import { generateEsLintLintRules } from "./lint-rule-generator.js";
import type { CEM } from "../../../tools/cem-utils/index.js";
import type { Options } from "./types.js";

export interface Params {
  customElementsManifest: CEM;
}

export function customEsLintRuleGeneratorPlugin(options: Options) {
  return {
    name: "custom-element-eslint-rules-generator",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateEsLintLintRules(customElementsManifest, options);
    },
  };
}

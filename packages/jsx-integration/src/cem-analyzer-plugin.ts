import { generateJsxTypes } from "./type-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementJsxPlugin(options: Options = {}) {
  return {
    name: "custom-element-jsx-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log("[jsx-type-generator] - Generating types...");
      generateJsxTypes(customElementsManifest, options);
      logGreen("[jsx-type-generator] - Type generation complete.");
    },
  };
}

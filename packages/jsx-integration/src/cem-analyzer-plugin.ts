import { generateJsxTypes } from "./type-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementPreactPlugin(options: Options = {}) {
  return {
    name: "custom-element-preact-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[preact-type-generator] - Generating types..."
      );
      generateJsxTypes(customElementsManifest, options);
      logGreen("[preact-type-generator] - Type generation complete.");
    },
  };
}

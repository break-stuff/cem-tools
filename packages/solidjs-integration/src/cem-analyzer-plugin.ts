import { generateSolidJsTypes } from "./type-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementSolidJsPlugin(options: Options = {}) {
  return {
    name: "custom-element-solidjs-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[solidjs-type-generator] - Generating config files..."
      );
      generateSolidJsTypes(customElementsManifest, options);
      logGreen("[solidjs-type-generator] - File generation complete.");
    },
  };
}

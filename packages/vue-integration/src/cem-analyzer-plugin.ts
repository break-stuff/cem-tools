import { generateVueTypes } from "./type-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementVuePlugin(options: Options = {}) {
  return {
    name: "custom-element-vue-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[vue-type-generator] - Generating types..."
      );
      generateVueTypes(customElementsManifest, options);
      logGreen("[vue-type-generator] - Type generation complete.");
    },
  };
}

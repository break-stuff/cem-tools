import { generateVuejsTypes } from "./type-generator";
import type { Options, Params } from "./types";
import { logGreen } from "@tools/integrations";

export function customElementVuejsPlugin(options: Options = {}) {
  return {
    name: "custom-element-vue-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log("[vue-type-generator] - Generating types...");
      generateVuejsTypes(customElementsManifest, options);
      logGreen("[vue-type-generator] - Type generation complete.");
    },
  };
}

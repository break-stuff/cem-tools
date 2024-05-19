import { generateVuejsTypes } from "./type-generator";
import type { Options, Params } from "./types";

export function customElementVuejsPlugin(options: Options = {}) {
  return {
    name: "custom-element-vue-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateVuejsTypes(customElementsManifest, options);
    },
  };
}

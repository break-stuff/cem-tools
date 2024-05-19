import { generateSolidJsTypes } from "./type-generator";
import type { Options, Params } from "./types";

export function customElementSolidJsPlugin(options: Options = {}) {
  return {
    name: "custom-element-solidjs-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateSolidJsTypes(customElementsManifest, options);
    },
  };
}

import { updateCemDeprecations } from "./deprecator.js";
import type { Options, Params } from "./types.js";

export function cemDeprecatorPlugin(options: Options = {}) {
  return {
    name: "cem-deprecator",
    packageLinkPhase({ customElementsManifest }: Params) {
      options.usedByPlugin = true;
      updateCemDeprecations(customElementsManifest, options);
    },
  };
}

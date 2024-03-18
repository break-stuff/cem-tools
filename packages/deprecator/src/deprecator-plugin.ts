import { updateCemDeprecations } from "./deprecator.js";
import type { Options, Params } from "./types.js";
import { logGreen } from "../../../tools/integrations/index.js";

export function cemDeprecatorPlugin(options: Options = {}) {
  return {
    name: "cem-deprecator",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[cem-deprecator] - Updating Custom Elements Manifest..."
      );
      updateCemDeprecations(customElementsManifest, options);
      logGreen("[cem-deprecator] - Custom Elements Manifest update complete.");
    },
  };
}

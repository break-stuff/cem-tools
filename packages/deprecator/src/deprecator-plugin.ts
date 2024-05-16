import { updateCemDeprecations } from "./deprecator.js";
import { log, logGreen } from "../../../tools/integrations/index.js";
import type { Options, Params } from "./types.js";

export function cemDeprecatorPlugin(options: Options = {}) {
  return {
    name: "cem-deprecator",
    packageLinkPhase({ customElementsManifest }: Params) {
      log(
        "[cem-deprecator] - Updating Custom Elements Manifest...",
        options.hideLogs
      );
      updateCemDeprecations(customElementsManifest, options);
      logGreen("[cem-deprecator] - Custom Elements Manifest update complete.", options.hideLogs);
    },
  };
}

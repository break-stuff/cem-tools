import { updateCemInheritance } from "./cem-inheritance.js";
import type { Options, Params } from "./types.js";
import { log, logGreen } from "../../../tools/integrations/index.js";

export function cemInheritancePlugin(options: Options = {}) {
  return {
    name: "cem-inheritance",
    packageLinkPhase({ customElementsManifest }: Params) {
      log(
        "[cem-inheritance-generator] - Updating Custom Elements Manifest...",
        options.hideLogs
      );
      updateCemInheritance(customElementsManifest, options);
      logGreen("[cem-inheritance-generator] - Custom Elements Manifest update complete.", options.hideLogs);
    },
  };
}

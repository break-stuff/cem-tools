import {  } from "./cem-inheritance.js";
import type { Options, Params } from "./types.js";
import { logGreen } from "../../../tools/integrations/index.js";

export function cemInheritancePlugin(options: Options = {}) {
  return {
    name: "cem-inheritance",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[cem-inheritance-generator] - Updating Custom Elements Manifest..."
      );
      generateCustomElementWebTypes(customElementsManifest, options);
      logGreen("[cem-inheritance-generator] - Custom Elements Manifest update complete.");
    },
  };
}

import { updateCemInheritance } from "./cem-inheritance.js";
import type { Options, Params } from "./types.js";

export function cemInheritancePlugin(options: Options = {}) {
  return {
    name: "cem-inheritance",
    packageLinkPhase({ customElementsManifest }: Params) {
      options.usedByPlugin = true;
      updateCemInheritance(customElementsManifest, options);
    },
  };
}

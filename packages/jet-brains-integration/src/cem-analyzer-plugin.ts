import { generateJetBrainsWebTypes as generateCustomElementWebTypes } from "./web-types-generator.js";
import type { Options, Params } from "./types";

export function customElementJetBrainsPlugin(options: Options = {}) {
  return {
    name: "custom-element-jet-brains-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateCustomElementWebTypes(customElementsManifest, options);
    },
  };
}

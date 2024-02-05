import { generateJetBrainsWebTypes as generateCustomElementWebTypes } from "./web-types-generator.js";
import type { Options, Params } from "./types.js";
import { logGreen } from "../../../tools/integrations/index.js";

export function customElementJetBrainsPlugin(options: Options = {}) {
  return {
    name: "custom-element-jet-brains-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[jet-brains-web-type-generator] - Generating config files..."
      );
      generateCustomElementWebTypes(customElementsManifest, options);
      logGreen("[jet-brains-web-type-generator] - File generation complete.");
    },
  };
}

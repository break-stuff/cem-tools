import { generateJetBrainsWebTypes as generateCustomElementWebTypes } from "./web-types-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementJetBrainsPlugin(options: Options = {}) {
  return {
    name: "cem-plugin-vs-code-custom-data-generator",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[jet-brains-web-type-generator] - Generating config files..."
      );
      generateCustomElementWebTypes(customElementsManifest, options);
      logGreen("[jet-brains-web-type-generator] - File generation complete.");
    },
  };
}

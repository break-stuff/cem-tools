import { generateJetBrainsWebTypes as generateCustomElementWebTypes } from "./web-types-generator.js";
import type { Options, Params } from "./types";
import { log, logGreen } from "../../../tools/integrations";

export function customElementJetBrainsPlugin(options: Options = {}) {
  return {
    name: "custom-element-jet-brains-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      log(
        "[jet-brains-web-type-generator] - Generating config files...",
        options.hideLogs
      );
      generateCustomElementWebTypes(customElementsManifest, options);
      logGreen("[jet-brains-web-type-generator] - File generation complete.", options.hideLogs);
    },
  };
}

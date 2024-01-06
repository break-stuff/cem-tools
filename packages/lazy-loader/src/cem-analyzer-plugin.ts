import { logGreen } from "../../../tools/integrations/index.js";
import { Options, generateCustomElementLazyLoader } from "./loader-generator.js";
import type { CEM } from "../../../tools/cem-utils/index.js";

export interface Params {
  customElementsManifest: CEM;
}

export function customElementLazyLoaderPlugin(options: Options) {
  return {
    name: "custom-element-lazy-loader",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[custom-element-lazy-loader] - Generating config files..."
      );
      generateCustomElementLazyLoader(customElementsManifest, options);
      logGreen("[custom-element-lazy-loader] - File generation complete.");
    },
  };
}

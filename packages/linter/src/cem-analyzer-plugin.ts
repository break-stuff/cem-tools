import { logGreen } from "../../../tools/integrations/index.js";
import { Options, generateCustomElementLazyLoader } from "./linter-generator.js";
import type { CEM } from "../../../tools/cem-utils/index.js";

export interface Params {
  customElementsManifest: CEM;
}

export function customElementLazyLoaderPlugin(options: Options) {
  return {
    name: "custom-element-eslint",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[custom-element-eslint] - Generating config files..."
      );
      generateCustomElementLazyLoader(customElementsManifest, options);
      logGreen("[custom-element-eslint] - File generation complete.");
    },
  };
}

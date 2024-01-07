import { generateSvelteTypes } from "./type-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementSveltePlugin(options: Options = {}) {
  return {
    name: "custom-element-svelte-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log(
        "[svelte-type-generator] - Generating custom types..."
      );
      generateSvelteTypes(customElementsManifest, options);
      logGreen("[svelte-type-generator] - Custom types generation complete.");
    },
  };
}

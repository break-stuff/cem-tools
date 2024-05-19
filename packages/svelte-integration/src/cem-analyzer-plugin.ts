import { generateSvelteTypes } from "./type-generator";
import type { Options, Params } from "./types";

export function customElementSveltePlugin(options: Options = {}) {
  return {
    name: "custom-element-svelte-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateSvelteTypes(customElementsManifest, options);
    },
  };
}

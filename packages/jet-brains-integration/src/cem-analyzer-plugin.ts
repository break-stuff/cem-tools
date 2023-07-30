import {
    generateJetBrainsWebTypes as generateCustomElementWebTypes,
  } from "./web-types-generator.js";
  import type { Options, Params } from "./types.js";
  
  export function customElementJetBrainsPlugin(options: Options = {}) {
    return {
      name: "cem-plugin-vs-code-custom-data-generator",
      packageLinkPhase({ customElementsManifest }: Params) {
        generateCustomElementWebTypes(customElementsManifest, options);
      },
    };
  }
  
import { generateJsxTypes } from "./type-generator";
import type { Options, Params } from "./types";

export function customElementJsxPlugin(options: Options = {}) {
  return {
    name: "custom-element-jsx-integration",
    packageLinkPhase({ customElementsManifest }: Params) {
      generateJsxTypes(customElementsManifest, options);
    },
  };
}

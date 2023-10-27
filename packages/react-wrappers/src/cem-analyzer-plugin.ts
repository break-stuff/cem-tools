import { generateReactWrappers } from "./wrapper-generator";
import type { Options, Params } from "./types";
import { logGreen } from "../../../tools/integrations";

export function customElementReactWrapperPlugin(options: Options = {}) {
  return {
    name: "custom-element-react-wrappers",
    packageLinkPhase({ customElementsManifest }: Params) {
      console.log("[react-wrappers] - Generating wrappers...");
      generateReactWrappers(customElementsManifest, options);
      logGreen("[react-wrappers] - Wrapper generation complete.");
    },
  };
}

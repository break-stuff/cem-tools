import {
  generateVsCodeCustomElementData,
  getVsCodeHtmlCustomData,
  getVsCodeCssCustomData,
} from "custom-element-vs-code-integration";
import {
  generateJetBrainsWebTypes,
  generateWebTypesFileContents,
} from "custom-element-jet-brains-integration";
import manifest from "./custom-elements.json" assert { type: "json" };

generateVsCodeCustomElementData(manifest);
generateJetBrainsWebTypes(manifest);

import { constrainedAttrs } from "./constrained-attrs.js";
import { noDeprecatedAttrs } from "./no-deprecated-attrs";
import { noDeprecatedTags } from "./no-deprecated-tags";
import { requiredAttrs } from "./required-attrs";

const plugin = {
  meta: {
    name: "eslint-plugin-custom-element",
    version: "1.0.0",
  },
  rules: {
    "constrained-attrs": constrainedAttrs,
    "no-deprecated-attrs": noDeprecatedAttrs,
    "no-deprecated-tags": noDeprecatedTags,
    "required-attrs": requiredAttrs,
  },
};

export default plugin;
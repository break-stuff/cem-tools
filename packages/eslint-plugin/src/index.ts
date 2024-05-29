import { noDeprecatedAttrs } from "./no-deprecated-attrs";
import { noDeprecatedTags } from "./no-deprecated-tags";
import { requiredAttrs } from "./required-attrs";


export default {
  rules: {
    "no-deprecated-attrs": noDeprecatedAttrs,
    "no-deprecated-tags": noDeprecatedTags,
    "required-attrs": requiredAttrs
  }
}
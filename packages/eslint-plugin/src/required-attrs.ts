import { RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { getRuleListener, getTagOptionsMap } from "./utilities";

type Node = { name?: any; attributes?: never[]; type: any };

export const requiredAttrs: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require specified attribute",
      category: RULE_CATEGORIES.BEST_PRACTICE,
      recommended: true,
    },
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
          attr: { type: "string" },
        },
        required: ["tag", "attr"],
        additionalProperties: false,
      },
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const tagOptionsMap = getTagOptionsMap(context);

    const check = (node: Node, tagName: string) => {
      const tagOptions = tagOptionsMap.get(tagName);
      const attributes = node.attributes || [];

      tagOptions?.forEach((option: { attr: any }) => {
        const attrName = option.attr;
        const attr = attributes.find(
          (attr: any) => attr.key && attr.key.value === attrName,
        );

        if (!attr) {
          context.report({
            message: `<${tagName}> is missing the "${attrName}" attribute.\n`,
            node,
          });
        }
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

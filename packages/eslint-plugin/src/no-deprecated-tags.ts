import { RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { getRuleListener, getTagOptionsMap } from "./utilities";

type Node = { name?: any; attributes?: never[]; type: any };

export const noDeprecatedTags: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Indicates deprecated custom elements",
      category: RULE_CATEGORIES.DEPRECATED,
      recommended: true,
    },
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
        },
        required: ["tag"],
        additionalProperties: false,
      },
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const tagOptionsMap = getTagOptionsMap(context);

    const check = (node: Node, tagName: string) => {
      const tagOptions = tagOptionsMap.get(tagName);
      tagOptions?.forEach(() => {
        context.report({
          message: `<${node.name}> is deprecated\n`,
          node,
        });
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

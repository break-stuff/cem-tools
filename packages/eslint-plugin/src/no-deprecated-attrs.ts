import { MESSAGE_IDS, RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { getRuleListener, getTagOptionsMap } from "./utilities";

type Node = { name?: any; attributes?: never[]; type: any };
type ContextOption = { tag: string };

export const noDeprecatedAttrs: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Indicates attributes that have been deprecated",
      category: RULE_CATEGORIES.DEPRECATED,
      recommended: false,
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
    messages: {
      [MESSAGE_IDS.UNEXPECTED]: "Attribute `{{attr}}` is deprecated",
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
          (attr: any) => attr.key && attr.key.value === attrName
        );

        if (attr) {
          context.report({
            messageId: MESSAGE_IDS.UNEXPECTED,
            node,
            data: {
              attr: attrName,
              tag: tagName,
            },
          });
        }
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

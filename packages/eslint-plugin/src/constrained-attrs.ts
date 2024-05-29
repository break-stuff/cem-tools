import { MESSAGE_IDS, RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { ContextOption, getRuleListener, getTagOptionsMap } from "./utilities";

type Node = { name?: any; attributes?: never[]; type: any };

export const constrainedAttrs: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce specific attribute values for custom elements",
      category: RULE_CATEGORIES.BEST_PRACTICE,
      recommended: false,
    },
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: {
            type: "string",
          },
          attr: {
            type: "string",
          },
          values: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const tagOptionsMap = getTagOptionsMap(context);

    const check = (node: Node, tagName: string) => {
      const tagOptions: ContextOption[] = tagOptionsMap.get(tagName);
      const attributes: any[] = node.attributes || [];

      tagOptions.forEach(({ tag, attr, values }) => {
        const attributeValue = attributes.find(
          (attribute) => attribute.key && attribute.key.value === attr
        )?.value?.value;

        if (!values.includes(attributeValue)) {
          context.report({
            node,
            message: `Invalid value "${attributeValue}" for "${attr}" attribute in "${tag}" element. Valid values are: ${values.join(
              ", "
            )}`,
          });
        }
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

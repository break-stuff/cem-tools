import { RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { BaseContextOption, getRuleListener, getTagOptionsMap } from "./utilities";

type Node = { name?: any; attributes?: never[]; type: any };
type Attribute = {attrs: string, values: string[]};
type ContextOptions = BaseContextOption & { attrs: Attribute[] };

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
          attrs: {
            type: "array",
            items: {
              type: "object",
              properties: {
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
      },
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const tagOptionsMap = getTagOptionsMap(context);

    const check = (node: Node, tagName: string) => {
      const tagOptions = tagOptionsMap.get(tagName);
      const attributes: any[] = node.attributes || [];

      tagOptions?.forEach(({ tag, attr, values }) => {
        const attribute = attributes.find(
          (attribute) => attribute.key && attribute.key.value === attr
        )
        const attributeValue = attribute?.value?.value;
        
        if (attribute && !values.includes(attributeValue)) {
          context.report({
            loc: attribute.loc,
            message: `"${attributeValue}" is an invalid value for "${attr}" attribute in "<${tag}>" element. Valid values are: ${values.join(
              ", "
            )}`,
          });
        }
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

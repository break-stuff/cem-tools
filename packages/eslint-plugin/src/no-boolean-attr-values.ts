import { RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { getRuleListener, getTagOptionsMap } from "./utilities";

type Node = { name?: any; attributes?: never[]; type: any };

export const noBooleanAttrValues: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Reports when values are assigned to boolean attributes",
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
        },
      },
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const tagOptionsMap = getTagOptionsMap(context);

    const check = (node: Node, tagName: string) => {
      const tagOptions = tagOptionsMap.get(tagName);
      const attributes: any[] = node.attributes || [];

      tagOptions?.forEach(({ tag, attr }) => {
        const attribute = attributes.find(
          (attribute) => attribute.key && attribute.key.value === attr
        )
        const attributeValue = attribute?.value?.value;
        
        
        if (attribute && attributeValue) {
          context.report({
            loc: attribute.loc,
            message: `Setting a value for "${attr}" will make the value true in "<${tag}>" element. Use the presence of the attribute without a value to indicate truthiness instead.`,
          });
        }
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

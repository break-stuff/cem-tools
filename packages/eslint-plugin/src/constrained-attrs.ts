import { RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";
import { getRuleListener, getTagOptionsMap } from "./utilities";

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
      const tagOptions = tagOptionsMap.get(tagName);
      const attributes: any[] = node.attributes || [];

      tagOptions?.forEach(({ tag, attr, values }) => {
        const attribute = attributes.find(
          (attribute) => attribute.key && attribute.key.value === attr
        );
        const attributeValue = attribute?.value?.value;

        if (attribute && !values.includes(attributeValue)) {
          const formatter = new Intl.ListFormat("en", {
            style: "long",
            type: "conjunction",
          });

          context.report({
            loc: attribute.loc,
            message: `"${attributeValue}" is an invalid value for the "${attr}" attribute on <${tag}>. \nValid values are: ${formatter.format(
              values.map((x) => `"${x}"`)
            )}\n`,
          });
        }
      });
    };

    return getRuleListener(tagOptionsMap, check);
  },
};

import { MESSAGE_IDS, RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";

type Node = { name?: any; attributes?: never[], type: any };
type ContextOption = { tag: string };

export const noDeprecatedAttrs: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require specified attribute",
      category: RULE_CATEGORIES.BEST_PRACTICE,
      recommended: false,
    },
    schema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
          attr: { type: "string" },
          value: { type: "string" },
        },
        required: ["tag", "attr"],
        additionalProperties: false,
      },
    },
    messages: {
      [MESSAGE_IDS.MISSING]: "'{{tag}}' tag is missing '{{attr}}' attribute",
      [MESSAGE_IDS.UNEXPECTED]:
        "Unexpected '{{attr}}' attribute value. '{{expected}}' is expected",
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options || [];
    const tagOptionsMap = new Map();

    options.forEach((option: ContextOption) => {
      const tagName = option.tag.toLowerCase();
      if (tagOptionsMap.has(tagName)) {
        tagOptionsMap.set(tagName, [...tagOptionsMap.get(tagName), option]);
      } else {
        tagOptionsMap.set(tagName, [option]);
      }
    });

    function check(
      node: Node,
      tagName: string
    ) {
      const tagOptions = tagOptionsMap.get(tagName);
      const attributes = node.attributes || [];

      tagOptions.forEach((option: { attr: any }) => {
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
    }

    return {
      [["StyleTag", "ScriptTag"].join(",")](node: Node) {
        const tagName = node.type === "StyleTag" ? "style" : "script";
        if (!tagOptionsMap.has(tagName)) {
          return;
        }
        check(node, tagName);
      },
      Tag(node: Node) {
        const tagName = node.name.toLowerCase();
        if (!tagOptionsMap.has(tagName)) {
          return;
        }
        check(node, tagName);
      },
    };
  },
};

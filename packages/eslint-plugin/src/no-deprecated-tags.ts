import { MESSAGE_IDS, RULE_CATEGORIES } from "./constants";
import { Rule } from "eslint";

type Node = { name?: any; attributes?: never[], type: any };
type ContextOption = { tag: string };

export const noDeprecatedTags: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
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
    messages: {
      [MESSAGE_IDS.UNEXPECTED]: "Unexpected use of deprecated tag <{{tag}}>",
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
      tagOptions.forEach(() => {
        context.report({
          node,
          data: {
            tag: node.name,
          },
          messageId: MESSAGE_IDS.UNEXPECTED,
        });
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

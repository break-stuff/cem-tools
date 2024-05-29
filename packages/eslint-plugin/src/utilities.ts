import { Rule } from "eslint";

type ContextOption = { tag: string };
type Node = { name?: any; attributes?: never[], type: any };

export function getTagOptionsMap(context: Rule.RuleContext) {
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

  return tagOptionsMap;
}

export function getRuleListener(tagOptionsMap: Map<any, any>, check: (
  node: Node,
  tagName: string
) => void) {
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
}
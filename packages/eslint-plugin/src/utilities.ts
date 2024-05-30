import { Rule } from "eslint";

export type ContextOption = { tag: string; attr: string; values: string[] };
type Node = { name?: any; attributes?: never[]; type: any };
type ContextOptionsMap = Map<string, ContextOption[]>;
type CheckValidation = (node: Node, tagName: string) => void;

export function getTagOptionsMap(context: Rule.RuleContext) {
  const options: ContextOption[] = context.options || [];
  const tagOptionsMap: ContextOptionsMap = new Map();

  options.forEach((option) => {
    const tagName = option.tag.toLowerCase();
    if (tagOptionsMap.has(tagName)) {
      tagOptionsMap.set(tagName, [
        ...(tagOptionsMap.get(tagName) || []),
        option,
      ]);
    } else {
      tagOptionsMap.set(tagName, [option]);
    }
  });

  return tagOptionsMap;
}

export function getRuleListener(
  tagOptionsMap: ContextOptionsMap,
  check: CheckValidation
) {
  const result = {
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

  console.log('RESULT', result);

  return result;
}

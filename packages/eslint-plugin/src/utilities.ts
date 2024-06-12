import { Rule } from "eslint";

export interface BaseContextOption {
  tag: string;
}

type Node = { name?: any; attributes?: never[]; type: any };
// type ContextOptionsMap = Map<string, BaseContextOption[]>;
type CheckValidation = (node: Node, tagName: string) => void;

export function getTagOptionsMap<T extends BaseContextOption>(
  context: Rule.RuleContext
): Map<string, T[]>{
  const options: T[] = context.options || [];
  const tagOptionsMap = new Map<string, T[]>();

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

  return result;
}

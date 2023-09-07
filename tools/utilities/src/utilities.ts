export const toKebabCase = (value: string): string =>
  value.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();

export function removeQuoteWrappers(value: string) {
  return value.trim().replace(/^["'](.+(?=["']$))["']$/, "$1");
}

export function has(arr?: unknown[]) {
  return Array.isArray(arr) && arr.length > 0;
}

export function toSentenceCase(value: string) {
  return (
    value
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase())
      // Remove any white space left around the word
      .trim()
  );
}

export function toPascalCase(value: string) {
  return value
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

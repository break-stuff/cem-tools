export const toKebabCase = (value: string): string =>
  value.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();

export function removeQuoteWrappers(value: string) {
  return value.trim().replace(/^["'](.+(?=["']$))["']$/, "$1");
}

export function has(arr?: unknown[]) {
  return Array.isArray(arr) && arr.length > 0;
}

import { MappedAttribute } from "./types";

export const MAPPED_PROPS: MappedAttribute[] = [
  {
    name: "className",
    propName: "className",
    originalName: "class",
    description:
      "A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method `Document.getElementsByClassName()`.",
  },

  {
    name: "exportparts",
    propName: "exportparts",
    description:
      "Contains a space-separated list of the part names of the element that should be exposed on the host element.",
  },
  {
    name: "for",
    propName: "htmlFor",
    description:
      "Used for labels to link them with their inputs (using input id).",
    type: {
      text: "string",
    },
  },
  {
    name: "key",
    propName: "key",
    description:
      "Used to help React identify which items have changed, are added, or are removed within a list.",
    type: {
      text: "number | string",
    },
  },
  {
    name: "part",
    propName: "part",
    description:
      "Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element.",
  },
  {
    name: "ref",
    propName: "ref",
    description:
      "A mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.",
    type: {
      text: "any",
    },
  },
  {
    name: "style",
    propName: "style",
    description:
      "Contains CSS styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the <style> element have mainly the purpose of allowing for quick styling, for example for testing purposes.",
    type: {
      text: "string | object",
    },
  },
  {
    name: "tabindex",
    propName: "tabIndex",
    description:
      "Allows developers to make HTML elements focusable, allow or prevent them from being sequentially focusable (usually with the `Tab` key, hence the name) and determine their relative ordering for sequential focus navigation.",
    type: {
      text: "string",
    },
  },
];

export const BASE_PROPS = [
  "children",
  "className",
  "dir",
  "exportparts",
  "htmlFor",
  "hidden",
  "id",
  "key",
  "lang",
  "part",
  "ref",
  "slot",
  "style",
  "tabIndex",
  "title",
  "translate",
  "onClick",
  "onFocus",
  "onBlur",
];

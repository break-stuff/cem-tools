import { GlobalEvent, MappedAttribute } from "./types";

export const baseProperties: MappedAttribute[] = [
  {
    name: "id",
    propName: "id",
    description:
      "Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).",
  },
  {
    name: "className",
    propName: "className",
    originalName: "class",
    description:
      "A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method `Document.getElementsByClassName()`.",
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
    name: "slot",
    propName: "slot",
    description:
      "Assigns a slot in a shadow DOM shadow tree to an element: An element with a slot attribute is assigned to the slot created by the `<slot>` element whose [name](https://developer.mozilla.org/docs/Web/HTML/Element/slot#attr-name) attribute's value matches that slot attribute's value.",
  },
  {
    name: "hidden",
    propName: "hidden",
    description: "Prevents content from being rendered by the browser.",
    type: {
      text: "boolean",
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
    name: "children",
    propName: "children",
    description: "Content between the opening and closing component tags.",
    type: {
      text: "any",
    },
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
    name: "tabindex",
    propName: "tabIndex",
    description:
      "Allows developers to make HTML elements focusable, allow or prevent them from being sequentially focusable (usually with the `Tab` key, hence the name) and determine their relative ordering for sequential focus navigation.",
    type: {
      text: "string",
    },
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
];

export const baseEvents: GlobalEvent[] = [
  {
    event: "onClick",
    description: "Triggered when a user clicks an element.",
    type: "React.MouseEventHandler",
  },
];

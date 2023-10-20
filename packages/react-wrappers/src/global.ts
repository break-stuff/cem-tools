import { MappedAttribute } from "./types";

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
];

export const baseEvents = [
  {
    name: "click",
    description:
      "A pointing device button has been pressed and released on an element.",
    reactName: "onClick",
    type: "MouseEvent",
    custom: true,
  },
];

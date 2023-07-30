import { CustomElementsManifest } from "../../types";

export const customElementsManifest: CustomElementsManifest = {
  schemaVersion: "1.0.0",
  readme: "",
  modules: [
    {
      kind: "javascript-module",
      path: "demo/radio-button.js",
      declarations: [
        {
          kind: "class",
          description: "",
          name: "Radio",
          cssProperties: [
            {
              type: {
                text: "--radius-sm|--radius-md|--radius-lg",
              },
              description: "Controls the border radius of the radio buttons",
              name: "--border-radius",
            },
            {
              description: "Controls the color of bar",
              name: "--background-color",
              default: "red",
            },
          ],
          slots: [
            {
              description: "add text here to label your radio button",
              name: "",
            },
          ],
          attributes: [
            {
              type: {
                text: "string",
              },
              description:
                "The value assigned to the radio button. This will reflect in the radio group when clicked.",
              name: "value",
            },
            {
              type: {
                text: "boolean",
              },
              description: "Disables the radio button",
              name: "disabled",
            },
          ],
          superclass: {
            name: "HTMLElement",
          },
          tagName: "radio-button",
          summary:
            'Radios buttons allow users to select a single option from a group. Here is its [documentation](https://my-site.com/documentation).\\n\\nUse it like this:\\n```html\\n<radio-button value="1" disabled>Your label</radio-button>\\n```',
          customElement: true,
        },
      ],
      exports: [
        {
          kind: "custom-element-definition",
          name: "radio-button",
          declaration: {
            name: "Radio",
            module: "demo/radio-button.js",
          },
        },
      ],
    },
    {
      kind: "javascript-module",
      path: "demo/radio-group.js",
      declarations: [
        {
          kind: "class",
          description:
            '\nRadio groups are used to group multiple radios or radio buttons so they function as a single form control. Here is its [documentation](https://github.com/microsoft/vscode-custom-data/blob/master/samples/webcomponents/src/components/my-component/docs.md).\n\nUse it like this:\n```html\n<radio-group value="2" size="3">\n  <span slot="label">My Label</span>\n  <radio-button value="1">Option 1</radio-button>\n  <radio-button value="2">Option 2</radio-button>\n  <radio-button value="3">Option 3</radio-button>\n</radio-group>\n```',
          name: "RadioGroup",
          cssProperties: [
            {
              type: {
                text: "set:radiuses",
              },
              description: "Controls the border radius of the radio buttons",
              name: "--border-radius",
            },
            {
              description: "Controls the color of bar",
              name: "--background-color",
              default: "red",
            },
          ],
          cssParts: [
            {
              description: "Styles the color of bar",
              name: "bar",
            },
          ],
          slots: [
            {
              description:
                "add radio buttons to the `default` slot to create options to your radio group",
              name: "",
            },
            {
              description: "placeholder for the radio group label",
              name: "label",
            },
          ],
          members: [
            {
              type: {
                text: "boolean",
              },
              description: "this toggles some unseen feature",
              name: "prop1",
              kind: "field",
            },
            {
              type: {
                text: "number",
              },
              description: "this will adjust thr width of the unit",
              name: "prop2",
              kind: "field",
            },
          ],
          events: [
            {
              description: "some description for custom-event",
              name: "custom-event",
            },
            {
              type: {
                text: "Event",
              },
              description: "some description for typed-event",
              name: "typed-event",
            },
            {
              type: {
                text: "CustomEvent",
              },
              description: "some description for typed-custom-event",
              name: "typed-custom-event",
            },
          ],
          attributes: [
            {
              type: {
                text: "boolean",
              },
              description: "Disables the element",
              name: "disabled",
            },
            {
              type: {
                text: "string",
              },
              description: "The value of the selected radio",
              name: "value",
            },
            {
              type: {
                text: "1,2,3,4",
              },
              description: "This will control the size of radio buttons",
              name: "size",
            },
          ],
          superclass: {
            name: "HTMLElement",
          },
          tagName: "radio-group",
          customElement: true,
        },
      ],
      exports: [
        {
          kind: "custom-element-definition",
          name: "radio-group",
          declaration: {
            name: "RadioGroup",
            module: "demo/radio-group.js",
          },
        },
      ],
    },
  ],
};

import type { CEM } from "../../../../tools/cem-utils";

export const standAloneManifest = {
  schemaVersion: "1.0.0",
  readme: "",
  modules: [
    {
      kind: "javascript-module",
      path: "src/components/input/input.ts",
      declarations: [
        {
          kind: "class",
          description: "Input allows the user to enter and edit text",
          name: "MyExtInput",
          cssParts: [],
          slots: [],
          members: [
            {
              kind: "field",
              name: "size",
              type: {
                text: "'small' | 'medium' | 'large' | undefined",
              },
              privacy: "public",
              default: "'medium'",
              description: "Controls the size of the input",
              attribute: "size",
              reflects: true,
            },
            {
              kind: "field",
              name: "appearance",
              type: {
                text: "'filled' | 'outline' | 'underline' | undefined",
              },
              privacy: "public",
              default: "'outline'",
              description: "Controls the appearance of the input",
              attribute: "appearance",
              reflects: true,
            },
          ],
          events: [],
          attributes: [
            {
              name: "size",
              type: {
                text: "'small' | 'medium' | 'large' | undefined",
              },
              default: "'medium'",
              description: "Controls the size of the input",
              fieldName: "size",
              propName: "size",
            },
            {
              name: "appearance",
              type: {
                text: "'filled' | 'outline' | 'underline' | undefined",
              },
              default: "'outline'",
              description: "Controls the appearance of the input",
              fieldName: "appearance",
              propName: "appearance",
            },
          ],
          superclass: {
            name: "CoreInput",
            package: "../core",
          },
          tagName: "my-ext-input",
          customElement: true,
        },
      ],
      exports: [
        {
          kind: "js",
          name: "MyExtInput",
          declaration: {
            name: "MyExtInput",
            module: "src/components/input/input.ts",
          },
        },
        {
          kind: "js",
          name: "default",
          declaration: {
            name: "MyExtInput",
            module: "src/components/input/input.ts",
          },
        },
      ],
    },

    {
      kind: "javascript-module",
      path: "src/base/my-element/my-element.ts",
      declarations: [
        {
          kind: "class",
          description: "",
          name: "MyElement",
          members: [
            {
              kind: "field",
              name: "baseName",
              type: {
                text: "string",
              },
              privacy: "public",
              static: true,
            },
            {
              kind: "field",
              name: "scope",
              type: {
                text: "any",
              },
              privacy: "protected",
            },
            {
              kind: "field",
              name: "_dir",
              type: {
                text: "'ltr' | 'rtl' | 'auto' | undefined",
              },
              privacy: "private",
            },
            {
              kind: "field",
              name: "dir",
              type: {
                text: "'ltr' | 'rtl' | 'auto'",
              },
              privacy: "public",
              description:
                "The dir global attribute is an enumerated attribute that indicates the directionality of the element's text.",
              attribute: "dir",
            },
          ],
          attributes: [
            {
              name: "dir",
              type: {
                text: "'ltr' | 'rtl' | 'auto'",
              },
              description:
                "The dir global attribute is an enumerated attribute that indicates the directionality of the element's text.",
              fieldName: "dir",
            },
          ],
          superclass: {
            name: "LitElement",
            package: "lit",
          },
          customElement: true,
        },
      ],
      exports: [
        {
          kind: "js",
          name: "default",
          declaration: {
            name: "MyElement",
            module: "src/base/my-element/my-element.ts",
          },
        },
      ],
    },
    {
      kind: "javascript-module",
      path: "src/base/form-control-element/my-form-control-element.ts",
      declarations: [
        {
          kind: "class",
          description: "Base class for input components.",
          name: "MyFormControlElement",
          members: [
            {
              kind: "field",
              name: "formAssociated",
              type: {
                text: "boolean",
              },
              privacy: "protected",
              static: true,
              default: "true",
            },
            {
              kind: "field",
              name: "disabled",
              type: {
                text: "boolean",
              },
              privacy: "public",
              default: "false",
              description: "Disables the input.",
              attribute: "disabled",
              reflects: true,
            },
            {
              kind: "field",
              name: "helpText",
              type: {
                text: "string | undefined",
              },
              privacy: "public",
              description:
                "The input's help text. Alternatively, you can use the help-text slot.",
              attribute: "help-text",
            },
            {
              kind: "field",
              name: "hideLabel",
              type: {
                text: "boolean",
              },
              privacy: "public",
              default: "false",
              description: "Hides the input label and help text.",
              attribute: "hide-label",
              reflects: true,
            },
            {
              kind: "field",
              name: "invalid",
              type: {
                text: "boolean",
              },
              privacy: "public",
              default: "false",
              description:
                "This will be true when the control is in an invalid state. Validity is determined by the `required` prop.",
              attribute: "invalid",
              reflects: true,
            },
            {
              kind: "field",
              name: "label",
              type: {
                text: "string | undefined",
              },
              privacy: "public",
              description:
                "The input's label. If you need to display HTML, you can use the `label` slot instead.",
              attribute: "label",
              reflects: true,
            },
            {
              kind: "field",
              name: "name",
              type: {
                text: "string | undefined",
              },
              privacy: "public",
              description: "The input's name attribute.",
              attribute: "name",
              reflects: true,
            },
            {
              kind: "field",
              name: "placeholder",
              type: {
                text: "string | undefined",
              },
              privacy: "public",
              description: "The input's placeholder text.",
              attribute: "placeholder",
              reflects: true,
            },
            {
              kind: "field",
              name: "readonly",
              type: {
                text: "boolean",
              },
              privacy: "public",
              default: "false",
              description: "Makes the input readonly.",
              attribute: "readonly",
              reflects: true,
            },
            {
              kind: "field",
              name: "required",
              type: {
                text: "boolean",
              },
              privacy: "public",
              default: "false",
              description: "Makes the input a required field.",
              attribute: "required",
              reflects: true,
            },
            {
              kind: "field",
              name: "value",
              type: {
                text: "string",
              },
              privacy: "public",
              default: "''",
              description: "The input's value attribute.",
              attribute: "value",
              reflects: true,
            },
            {
              kind: "field",
              name: "autofocusinvalid",
              type: {
                text: "boolean | undefined",
              },
              privacy: "protected",
            },
            {
              kind: "field",
              name: "customErrorMessage",
              type: {
                text: "string",
              },
              privacy: "protected",
              default: "''",
            },
            {
              kind: "field",
              name: "hasLabel",
              type: {
                text: "boolean",
              },
              privacy: "protected",
              default: "false",
            },
            {
              kind: "field",
              name: "hasHelpText",
              type: {
                text: "boolean",
              },
              privacy: "protected",
              default: "false",
            },
            {
              kind: "field",
              name: "input",
              type: {
                text: "HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined",
              },
              privacy: "protected",
            },
            {
              kind: "field",
              name: "_internals",
              type: {
                text: "ElementInternals",
              },
              privacy: "protected",
            },
            {
              kind: "field",
              name: "announceVisuallyHiddenRequired",
              type: {
                text: "boolean",
              },
              privacy: "protected",
              default: "false",
            },
            {
              kind: "field",
              name: "_errorMessage",
              type: {
                text: "string",
              },
              privacy: "protected",
              default: "''",
            },
            {
              kind: "field",
              name: "errorMessage",
              type: {
                text: "string",
              },
              privacy: "public",
              description: "The input's error message.",
              attribute: "error-message",
              reflects: true,
            },
            {
              kind: "field",
              name: "validity",
              type: {
                text: "ValidityState",
              },
              privacy: "public",
              description: "Gets the validity of the input.",
              readonly: true,
            },
            {
              kind: "field",
              name: "validationMessage",
              privacy: "public",
              description:
                "Gets the current validation message, if one exists.",
              readonly: true,
            },
            {
              kind: "method",
              name: "checkValidity",
              privacy: "public",
              return: {
                type: {
                  text: "boolean | undefined",
                },
              },
              description:
                "Checks for validity but doesn't report a validation message when invalid.",
            },
            {
              kind: "method",
              name: "reportValidity",
              privacy: "public",
              return: {
                type: {
                  text: "boolean | undefined",
                },
              },
              description:
                "Checks for validity and shows the browser's validation message if the control is invalid.",
            },
            {
              kind: "method",
              name: "setCustomValidity",
              privacy: "public",
              parameters: [
                {
                  name: "message",
                  default: "''",
                },
              ],
              description: "Sets a custom validation message.",
            },
            {
              kind: "method",
              name: "updateValidity",
              privacy: "protected",
            },
            {
              kind: "method",
              name: "emitInput",
              privacy: "protected",
              parameters: [
                {
                  name: "options",
                  optional: true,
                  type: {
                    text: "CustomEventInit",
                  },
                },
              ],
            },
            {
              kind: "method",
              name: "emitChange",
              privacy: "protected",
              parameters: [
                {
                  name: "options",
                  optional: true,
                  type: {
                    text: "CustomEventInit",
                  },
                },
              ],
            },
            {
              kind: "method",
              name: "requiredTemplate",
              privacy: "protected",
            },
            {
              kind: "method",
              name: "labelContentTemplate",
              privacy: "protected",
              parameters: [
                {
                  name: "labelSlot",
                  default: "true",
                },
              ],
            },
            {
              kind: "method",
              name: "helpTextTemplate",
              privacy: "protected",
            },
          ],
          attributes: [
            {
              name: "disabled",
              type: {
                text: "boolean",
              },
              default: "false",
              description: "Disables the input.",
              fieldName: "disabled",
            },
            {
              name: "help-text",
              type: {
                text: "string | undefined",
              },
              description:
                "The input's help text. Alternatively, you can use the help-text slot.",
              fieldName: "helpText",
            },
            {
              name: "hide-label",
              type: {
                text: "boolean",
              },
              default: "false",
              description: "Hides the input label and help text.",
              fieldName: "hideLabel",
            },
            {
              name: "invalid",
              type: {
                text: "boolean",
              },
              default: "false",
              description:
                "This will be true when the control is in an invalid state. Validity is determined by the `required` prop.",
              fieldName: "invalid",
            },
            {
              name: "label",
              type: {
                text: "string | undefined",
              },
              description:
                "The input's label. If you need to display HTML, you can use the `label` slot instead.",
              fieldName: "label",
            },
            {
              name: "name",
              type: {
                text: "string | undefined",
              },
              description: "The input's name attribute.",
              fieldName: "name",
            },
            {
              name: "placeholder",
              type: {
                text: "string | undefined",
              },
              description: "The input's placeholder text.",
              fieldName: "placeholder",
            },
            {
              name: "readonly",
              type: {
                text: "boolean",
              },
              default: "false",
              description: "Makes the input readonly.",
              fieldName: "readonly",
            },
            {
              name: "required",
              type: {
                text: "boolean",
              },
              default: "false",
              description: "Makes the input a required field.",
              fieldName: "required",
            },
            {
              name: "value",
              type: {
                text: "string",
              },
              default: "''",
              description: "The input's value attribute.",
              fieldName: "value",
            },
            {
              name: "error-message",
              type: {
                text: "string",
              },
              description: "The input's error message.",
              fieldName: "errorMessage",
            },
          ],
          superclass: {
            name: "MyElement",
            module: "/src/base/my-element/my-element.js",
          },
        },
      ],
      exports: [
        {
          kind: "js",
          name: "default",
          declaration: {
            name: "MyFormControlElement",
            module: "src/base/form-control-element/my-form-control-element.ts",
          },
        },
      ],
    },
    {
      kind: "javascript-module",
      path: "src/components/input/input.ts",
      declarations: [
        {
          kind: "class",
          description: "Input allows the user to enter and edit text",
          name: "CoreInput",
          cssProperties: [
            {
              description: "The font size for the input.",
              name: "--input-font-size",
            },
            {
              description: "The font wight for the input.",
              name: "--input-font-weight",
            },
          ],
          cssParts: [
            {
              description: "container for end slot",
              name: "end",
            },
            {
              description: "The native input element.",
              name: "input",
            },
            {
              description: "The component's base wrapper.",
              name: "input-base",
            },
            {
              description: "The wrapper for start, input, and end",
              name: "input-control",
            },
            {
              description: "The error container",
              name: "input-error",
            },
            {
              description: "The label",
              name: "input-label",
            },
            {
              description: "container for start slot",
              name: "start",
            },
          ],
          slots: [
            {
              description: "A presentational suffix icon or similar element.",
              name: "end",
            },
            {
              description:
                "The input's label. Alternatively, you can use the label prop.",
              name: "label",
            },
            {
              description: "A presentational prefix icon or similar element.",
              name: "start",
            },
          ],
          members: [
            {
              kind: "field",
              name: "pattern",
              type: {
                text: "string | undefined",
              },
              privacy: "public",
              description: "A pattern to validate input against.",
              attribute: "pattern",
            },
            {
              kind: "field",
              name: "autocapitalize",
              type: {
                text: "'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'",
              },
              privacy: "public",
              default: "'off'",
              description:
                "Controls whether and how text input is automatically capitalized as it is entered/edited by the user.",
              attribute: "autocapitalize",
              reflects: true,
            },
            {
              kind: "field",
              name: "autocomplete",
              type: {
                text: "string | undefined",
              },
              privacy: "public",
              description:
                "Permission the user agent has to provide automated assistance in filling out form field values and the type of\ninformation expected in the field.",
              attribute: "autocomplete",
            },
            {
              kind: "field",
              name: "autocorrect",
              type: {
                text: "'on' | 'off' | undefined",
              },
              privacy: "public",
              attribute: "autocorrect",
            },
            {
              kind: "field",
              name: "enterkeyhint",
              type: {
                text: "'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined",
              },
              privacy: "public",
              description:
                "Used to customize the label or icon of the Enter key on virtual keyboards.",
              attribute: "enterkeyhint",
              reflects: true,
            },
            {
              kind: "field",
              name: "inputmode",
              type: {
                text: "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | undefined",
              },
              privacy: "public",
              description:
                "Hints at the type of data that might be entered by the user while editing the element or its contents.",
              attribute: "inputmode",
            },
            {
              kind: "field",
              name: "max",
              type: {
                text: "number | undefined",
              },
              privacy: "public",
              description: "The input's max attribute.",
              attribute: "max",
              reflects: true,
            },
            {
              kind: "field",
              name: "maxlength",
              type: {
                text: "number | undefined",
              },
              privacy: "public",
              description: "The input's maxlength attribute.",
              attribute: "maxlength",
              reflects: true,
            },
            {
              kind: "field",
              name: "min",
              type: {
                text: "number | undefined",
              },
              privacy: "public",
              description: "The input's min attribute.",
              attribute: "min",
              reflects: true,
            },
            {
              kind: "field",
              name: "minlength",
              type: {
                text: "number | undefined",
              },
              privacy: "public",
              description: "The input's minlength attribute.",
              attribute: "minlength",
              reflects: true,
            },
            {
              kind: "field",
              name: "spellcheck",
              type: {
                text: "boolean",
              },
              privacy: "public",
              default: "false",
              description: "Enables spell checking on the input.",
              attribute: "spellcheck",
              reflects: true,
            },
            {
              kind: "field",
              name: "step",
              type: {
                text: "number | undefined",
              },
              privacy: "public",
              description: "The input's step attribute.",
              attribute: "step",
              reflects: true,
            },
            {
              kind: "field",
              name: "type",
              type: {
                text: "InputTypes",
              },
              privacy: "public",
              default: "'text'",
              attribute: "type",
              parsedType: {
                text: "'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'",
              },
            },
            {
              kind: "field",
              name: "valueAsDate",
              privacy: "public",
              description:
                "Gets or sets the current value as a `Date` object. Only valid when `type` is `date`.",
            },
            {
              kind: "field",
              name: "valueAsNumber",
              privacy: "public",
              description: "Gets or sets the current value as a number.",
            },
            {
              kind: "method",
              name: "handleChange",
              privacy: "protected",
            },
            {
              kind: "method",
              name: "handleInput",
              privacy: "protected",
              description:
                "handles input - renamed from handleInput due to collision with base class",
            },
            {
              kind: "method",
              name: "handleEnterKey",
              privacy: "protected",
              parameters: [
                {
                  name: "event",
                  type: {
                    text: "KeyboardEvent",
                  },
                },
              ],
              description: "Handles the Enter key press event.",
            },
            {
              kind: "method",
              name: "handleKeyDown",
              privacy: "protected",
              parameters: [
                {
                  name: "event",
                  type: {
                    text: "KeyboardEvent",
                  },
                },
              ],
              description:
                "Handles the keydown event, specifically checking for Enter key.",
            },
            {
              kind: "method",
              name: "inputElementTemplate",
              privacy: "protected",
              description:
                "Generates the template for the native input element.",
            },
            {
              kind: "method",
              name: "inputControlTemplate",
              privacy: "protected",
              description: "Generates the template for the input's control.",
            },
            {
              kind: "method",
              name: "inputTemplate",
              privacy: "protected",
              description: "Generates the template for the input component.",
            },
          ],
          events: [
            {
              description:
                "Emitted when an alteration to the control's value is committed by the user.",
              name: "change",
            },
            {
              description:
                "Emitted when the control receives input and its value changes.",
              name: "input",
            },
            {
              description: "Emitted when the control gains focus.",
              name: "focus",
            },
            {
              description: "Emitted when the control loses focus.",
              name: "blur",
            },
          ],
          attributes: [
            {
              name: "pattern",
              type: {
                text: "string | undefined",
              },
              description: "A pattern to validate input against.",
              fieldName: "pattern",
            },
            {
              name: "autocapitalize",
              type: {
                text: "'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'",
              },
              default: "'off'",
              description:
                "Controls whether and how text input is automatically capitalized as it is entered/edited by the user.",
              fieldName: "autocapitalize",
            },
            {
              name: "autocomplete",
              type: {
                text: "string | undefined",
              },
              description:
                "Permission the user agent has to provide automated assistance in filling out form field values and the type of\ninformation expected in the field.",
              fieldName: "autocomplete",
            },
            {
              name: "autocorrect",
              type: {
                text: "'on' | 'off' | undefined",
              },
              fieldName: "autocorrect",
            },
            {
              name: "enterkeyhint",
              type: {
                text: "'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined",
              },
              description:
                "Used to customize the label or icon of the Enter key on virtual keyboards.",
              fieldName: "enterkeyhint",
            },
            {
              name: "inputmode",
              type: {
                text: "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' | undefined",
              },
              description:
                "Hints at the type of data that might be entered by the user while editing the element or its contents.",
              fieldName: "inputmode",
            },
            {
              name: "max",
              type: {
                text: "number | undefined",
              },
              description: "The input's max attribute.",
              fieldName: "max",
            },
            {
              name: "maxlength",
              type: {
                text: "number | undefined",
              },
              description: "The input's maxlength attribute.",
              fieldName: "maxlength",
            },
            {
              name: "min",
              type: {
                text: "number | undefined",
              },
              description: "The input's min attribute.",
              fieldName: "min",
            },
            {
              name: "minlength",
              type: {
                text: "number | undefined",
              },
              description: "The input's minlength attribute.",
              fieldName: "minlength",
            },
            {
              name: "spellcheck",
              type: {
                text: "boolean",
              },
              default: "false",
              description: "Enables spell checking on the input.",
              fieldName: "spellcheck",
            },
            {
              name: "step",
              type: {
                text: "number | undefined",
              },
              description: "The input's step attribute.",
              fieldName: "step",
            },
            {
              name: "type",
              type: {
                text: "InputTypes",
              },
              default: "'text'",
              fieldName: "type",
              parsedType: {
                text: "'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'",
              },
            },
          ],
          superclass: {
            name: "MyFormControlElement",
            module: "/src/base/form-control-element/my-form-control-element.js",
          },
          tagName: "my-input",
          customElement: true,
        },
      ],
      exports: [
        {
          kind: "js",
          name: "CoreInput",
          declaration: {
            name: "CoreInput",
            module: "src/components/input/input.ts",
          },
        },
        {
          kind: "js",
          name: "default",
          declaration: {
            name: "CoreInput",
            module: "src/components/input/input.ts",
          },
        },
      ],
    },
  ],
};

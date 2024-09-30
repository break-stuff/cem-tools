import type { DefineComponent } from "vue";

import type {
  RadioGroup,
  InterfaceEventType,
} from "./dist/radio-group/RadioGroup.d.ts";
import type { RadioButton } from "./dist/radio-button/RadioButton.d.ts";
import type { DeprecatedElement } from "./dist/deprecated-element/DeprecatedElement.d.ts";
import type { MyButton } from "./dist/my-button/MyButton.d.ts";

type RadioGroupProps = {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  value?: RadioGroup["value"];
  /** Disables the radio group and all of its radio buttons */
  disabled?: RadioGroup["disabled"];
  /** This will control the size of the radio buttons */
  size?: RadioGroup["size"];
  /** This is a test for internal options */
  variants?: RadioGroup["variants"];
  /** @deprecated This is a test for external d.ts options */
  external?: RadioGroup["external"];
  /** @deprecated This is a deprecated attribute */
  "deprecated-attribute"?: RadioGroup["deprecatedAttribute"];
  /** This is a test for external .ts options */
  external2?: RadioGroup["external2"];
  /** This is a test for external .ts options */
  external3?: RadioGroup["external3"];
  /** This is a test for options from an object */
  complex?: RadioGroup["complex"];
  /** This is a camel-case attribute */
  "my-attribute"?: RadioGroup["myAttribute"];
  /** This is a test for options from an object */
  "complex-union"?: RadioGroup["complexUnion"];
  /**  */
  foobar?: RadioGroup["foobar"];
  /** This is data object */
  data?: RadioGroup["data"];
  /**  */
  customTag?: RadioGroup["customTag"];
  /** some description for custom-event */
  "oncustom-event"?: (e: CustomEvent<never>) => void;
  /** some description for camelCaseEvent */
  oncamelCaseEvent?: (e: CustomEvent<never>) => void;
  /** some description for typed-event */
  "ontyped-event"?: (e: CustomEvent<HTMLInputElement>) => void;
  /** (@deprecated) some description for typed-custom-event */
  "ontyped-custom-event"?: (e: CustomEvent<InterfaceEventType>) => void;
};

type RadioButtonProps = {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  value?: RadioButton["value"];
  /** Disables the radio button */
  disabled?: RadioButton["disabled"];
  /** A lookup type for example */
  target?: RadioButton["target"];
  /** A mapped attribute for react wrapper example */
  for?: RadioButton["for"];
  /** Enum example */
  position?: RadioButton["position"];
};

type DeprecatedElementProps = {};

type MyButtonProps = {
  /** Used to override the form owner's `action` attribute. */
  formaction?: MyButton["formAction"];
  /** Used to override the form owner's `method` attribute. */
  formmethod?: MyButton["formMethod"];
  /** Used to override the form owner's `novalidate` attribute. */
  formnovalidate?: MyButton["formNoValidate"];
};

export type CustomElements = {
  /**
   *
   * Radio groups are used to group multiple radios or radio buttons, so they function as a single form control. Here is its [documentation](https://github.com/microsoft/vscode-custom-data/blob/master/samples/webcomponents/src/components/my-component/docs.md).
   *
   * Use it like this:
   * ```html
   * <radio-group value="2" size="3">
   *   <span slot="label">My Label</span>
   *   <radio-button value="1">Option 1</radio-button>
   *   <radio-button value="2">Option 2</radio-button>
   *   <radio-button value="3">Option 3</radio-button>
   * </radio-group>
   * ```
   * ---
   *
   *
   * ### **Events:**
   *  - **custom-event** - some description for custom-event
   * - **camelCaseEvent** - some description for camelCaseEvent
   * - **typed-event** - some description for typed-event
   * - **typed-custom-event** - (@deprecated) some description for typed-custom-event
   *
   * ### **Methods:**
   *  - **validate()** - Validated the radio inputs
   * - **checkStatus(value: _string_, message: _string_): _string_** - This is a test method with parameters
   *
   *
   * ### **Slots:**
   *  - _default_ - add radio buttons to the `default` slot to create options to your radio group
   * - **label** - placeholder for the radio group label
   *
   * ### **CSS Properties:**
   *  - **--radio-border-radius** - Controls the border radius of the radio buttons _(default: undefined)_
   * - **--radio-background-color** - Controls the color of bar _(default: red)_
   *
   * ### **CSS Parts:**
   *  - **radio-label** - Applies custom styles the radio group label
   */
  "radio-group": DefineComponent<RadioGroupProps>;

  /**
   * Radio buttons allow users to select a single option from a group. Here is its [documentation](https://my-site.com/documentation).
   *
   * Use it like this:
   * ```html
   * <radio-button value="1" disabled>Your label</radio-button>
   * ```
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - add text here to label your radio button
   */
  "radio-button": DefineComponent<RadioButtonProps>;

  /**
   * @deprecated An example of a deprecated element
   *
   *
   * ---
   *
   */
  "deprecated-element": DefineComponent<DeprecatedElementProps>;

  /**
   *
   * A basic button element
   * ---
   *
   */
  "my-button": DefineComponent<MyButtonProps>;
};

declare module "vue" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GlobalComponents extends CustomElements {}
}

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends CustomElements {}
  }
}

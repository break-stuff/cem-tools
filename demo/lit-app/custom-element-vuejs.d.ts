import type { DefineComponent } from "vue";

import type { RadioGroup, InterfaceEventType } from "./dist/radio-group/RadioGroup.d.ts";
import type { RadioButton } from "./dist/radio-button/RadioButton.d.ts";

type RadioGroupProps = {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  value?: RadioGroup["value"];
  /** Disables the radio group and all of its radio buttons */
  disabled?: RadioGroup["disabled"];
  /** This will control the size of the radio buttons */
  size?: RadioGroup["size"];
  /** This is a test for internal options */
  variants?: RadioGroup["variants"];
  /** This is a test for external d.ts options */
  external?: RadioGroup["external"];
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
  /** This is data object */
  data?: RadioGroup["data"];
  /**  */
  customTag?: RadioGroup["customTag"];
  /** some description for custom-event */
  onCustomEvent?: (e: CustomEvent<never>) => void;
  /** some description for typed-event */
  onTypedEvent?: (e: CustomEvent<HTMLInputElement>) => void;
  /** some description for typed-custom-event */
  onTypedCustomEvent?: (e: CustomEvent<InterfaceEventType>) => void;
};

type RadioButtonProps = {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  value?: RadioButton["value"];
  /** Disables the radio button */
  disabled?: RadioButton["disabled"];
  /** A lookup type for example */
  target?: RadioButton["target"];
};

export type CustomElements = {
  "radio-group": DefineComponent<RadioGroupProps>;
  "radio-button": DefineComponent<RadioButtonProps>;
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

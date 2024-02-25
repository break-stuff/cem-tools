import type { RadioGroup, InterfaceEventType } from "./dist/radio-group/RadioGroup.d.ts";
import type { RadioButton } from "./dist/radio-button/RadioButton.d.ts";

/**
 * This type can be used to create scoped tags for your components.
 *
 * Usage:
 *
 * ```ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 *
 * declare module "my-library" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * ```
 *
 */
export type ScopedElements<Prefix extends string = "", Suffix extends string = ""> = {
  [Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`]: CustomElements[Key];
};

type BaseProps = {
  /** Content added between the opening and closing tags of the element */
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: unknown | ((e: unknown) => void);
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
};

type BaseEvents = {};

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
  /** A mapped attribute for react wrapper example */
  for?: RadioButton["for"];
  /** Enum example */
  position?: RadioButton["position"];
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
   * - **typed-event** - some description for typed-event
   * - **typed-custom-event** - some description for typed-custom-event
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
  "radio-group": Partial<RadioGroupProps | BaseProps | BaseEvents>;

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
  "radio-button": Partial<RadioButtonProps | BaseProps | BaseEvents>;
};

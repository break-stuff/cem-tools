import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { Test, Test3 } from './types.d.ts';
import { Test2 } from './alt-types.js';

export type Variants = 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';

export const ComplexObject = {
  /** Designates only a single <he-accordion-item> can be open a time. */
  single: 'single',

  /** Designates multiple <he-accordion-items> can be open simultaneously. */
  multi: 'multi',
} as const;

export type DataObject = {
  /** The name. */
  name?: string,
  /** The type. */
  type?: string,
  /** The value. */
  value?: number,
};

type Size = 'small' | 'medium' | 'large';
type ChildSize =  Size | 'extra-small';

export type ComplexObjectType = (typeof ComplexObject)[keyof typeof ComplexObject];

export interface InterfaceEventType {
  value: string;
  message?: string;
}

export type Example = Test2 | 'valueA' | 'valueB';

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
 *
 * @tag radio-group
 * @tagname radio-group
 *
 * @csspart radio-label - Applies custom styles the radio group label
 *
 * @slot - add radio buttons to the `default` slot to create options to your radio group
 * @slot label - placeholder for the radio group label
 *
 * @cssprop {set:radiuses} --radio-border-radius - Controls the border radius of the radio buttons
 * @cssproperty [--radio-background-color=red] - Controls the color of bar
 *
 * @fires custom-event - some description for custom-event
 * @fires {HTMLInputElement } typed-event - some description for typed-event
 * @event {InterfaceEventType} typed-custom-event - (@deprecated) some description for typed-custom-event
 *
 * @since 1.2.5
 * 
 * @dependency icon
 * @dependency button
 * 
 * @fancy {string} [custom-tag=default value] - This is a fancy attribute
 * 
 * @default - This has no name
 * 
 */
export class RadioGroup extends LitElement {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  @property({ type: String })
  value = "";

  /** Disables the radio group and all of its radio buttons */
  @property({ type: Boolean })
  disabled?: boolean;

  /** This will control the size of the radio buttons */
  @property()
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** This is a test for internal options */
  @property({ type: String })
  variants: Variants = 'primary';

  /** This is a test for external d.ts options */
  @property({ type: String })
  external: Test = 'value1';

  /** @deprecated This is a deprecated attribute */
  @property({ type: String, attribute: 'deprecated-attribute' })
  deprecatedAttribute: Test = 'value1';

  /** This is a test for external .ts options */
  @property({ type: String })
  external2: Example = 'value4';

  /** This is a test for external .ts options */
  @property({ type: String })
  external3: Test3 = 'value8';

  /** This is a test for options from an object */
  @property({ type: String })
  complex: ComplexObjectType = 'single';

  /** This is a camel-case attribute */
  @property({ attribute: 'my-attribute' })
  myAttribute?: string;

  /** This is data object */
  @property({ attribute: false })
  data?: {
    // The name.
    name?: string,
    /** The type. */
    type?: string,
    /** The value. */
    value?: number,
  };

  /** This is a test for options from an object */
  @property({ attribute: 'complex-union' })
  complexUnion?: ChildSize;

  /** This is a test for a private property */
  #privateProperty = 'Group';

  /** Validated the radio inputs */
  validate() {
    return '';
  }

  /** This is a test method with parameters */
  checkStatus(value: string, message: string): string {
    return value + message ?? '';
  }

  /** This is a test for a private method */
  #privateMethod() {
    return this.#privateProperty;
  }

  get customTag() {
    return 'custom-tag';
  }

  /** This is a test method that is protected */
  protected protectedMethod() {
    return '';
  }

  render() {
    return html`
      <h2>Radio ${this.#privateMethod()}</h2>
      <slot></slot>
    `;
  }
}

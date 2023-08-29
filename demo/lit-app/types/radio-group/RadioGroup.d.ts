import { LitElement } from 'lit';
import type { Test } from './types';
import { Test2 } from './alt-types';
export type Variants = 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
export declare const ComplexObject: {
    /** Designates only a single <he-accordion-item> can be open a time. */
    readonly single: "single";
    /** Designates multiple <he-accordion-items> can be open simultaneously. */
    readonly multi: "multi";
};
export type ComplexObjectType = (typeof ComplexObject)[keyof typeof ComplexObject];
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
 * @fires {MyEventType} typed-event - some description for typed-event
 * @event {MyCustomEventType} typed-custom-event - some description for typed-custom-event
 *
 */
export declare class RadioGroup extends LitElement {
    /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
    value: string;
    /** Disables the radio group and all of its radio buttons */
    disabled?: boolean;
    /** This will control the size of the radio buttons */
    size: 'sm' | 'md' | 'lg' | 'xl';
    /** This is a test for internal options */
    variants: Variants;
    /** This is a test for external d.ts options */
    external: Test;
    /** This is a test for external .ts options */
    external2: Test2;
    /** This is a test for options from an object */
    complex: ComplexObjectType;
    /** This is a camel-case attribute */
    myAttribute?: string;
    /** Validated the radio inputs */
    validate(): string;
    /** This is a test method with parameters */
    checkStatus(value: string, message: string): string;
    /** This is a test method that is protected */
    protected protectedMethod(): string;
    render(): import("lit-html").TemplateResult<1>;
}

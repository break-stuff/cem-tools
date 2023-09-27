import { LitElement } from "lit";
export type Target = '_blank' | '_self' | '_parent' | '_top';
/**
 *
 * @summary Radio buttons allow users to select a single option from a group. Here is its [documentation](https://my-site.com/documentation).\n\nUse it like this:\n```html\n<radio-button value="1" disabled>Your label</radio-button>\n```
 *
 * @tag radio-button
 * @tagname radio-button
 *
 * @slot - add text here to label your radio button
 *
 */
export declare class RadioButton extends LitElement {
    /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
    value: string;
    /** Disables the radio button */
    disabled?: boolean;
    /** A lookup type for example */
    target?: Target;
    render(): import("lit-html").TemplateResult<1>;
}

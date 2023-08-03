import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

type Target = '_blank' | '_self' | '_parent' | '_top';

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
export class RadioButton extends LitElement {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  @property({ type: String }) value = "";

  /** Disables the radio button */
  @property({ type: Boolean }) disabled?: boolean;

  /** A lookup type for example */
  @property() target?: Target;

  render() {
    return html`
      <h2>Hello world!</h2>
    `;
  }
}

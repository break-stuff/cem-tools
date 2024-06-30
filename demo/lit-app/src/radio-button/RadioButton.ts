import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export type Target = "_blank" | "_self" | "_parent" | "_top";

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
  val = 1,
}

// type DirectionString = (typeof Direction)[keyof typeof Direction];

// const test: Direction = "UP";

/**
 *
 * @summary Radio buttons allow users to select a single option from a group. Here is its [documentation](https://my-site.com/documentation).\n\nUse it like this:\n```html\n<radio-button value="1" disabled>Your label</radio-button>\n```
 *
 * @tag radio-button
 * @tagname radio-button
 *
 * @slot - add text here to label your radio button
 *
 * @dependency icon
 *
 * @since 1.2.5
 * @since 1.3.0 - There was a major refactor in this release
 *
 */
export class RadioButton extends LitElement {
  /** The value assigned to the radio button. This will reflect in the radio group when clicked. */
  @property({ type: String }) value = "";

  /** Disables the radio button */
  @property({ type: Boolean }) disabled?: boolean;

  /** A lookup type for example */
  @property() target?: Target;

  /** A mapped attribute for react wrapper example */
  @property() for?: string;

  /** Enum example */
  @property() position?: string = Direction.Up;

  render() {
    return html`
      <label>
        <input type="radio" />
        Radio button
      </label>
      <br />
    `;
  }
}

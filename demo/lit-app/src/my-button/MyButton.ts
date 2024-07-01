import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

/**
 *
 * A basic button element
 *
 * @tag my-button
 *
 * @since 1.2.5
 * @since 1.3.0 - There was a major refactor in this release
 *
 * @required type
 */
export class MyButton extends LitElement {
  /** Used to override the form owner's `action` attribute. */
  @property({ attribute: "formaction" }) formAction?: string;

  /** Used to override the form owner's `method` attribute. */
  @property({ attribute: "formmethod" }) formMethod?: "post" | "get";

  /** Used to override the form owner's `novalidate` attribute. */
  @property({ attribute: "formnovalidate", type: Boolean, reflect: true })
  formNoValidate?: boolean;

  render() {
    return html` <div>Deprecated Element</div> `;
  }
}

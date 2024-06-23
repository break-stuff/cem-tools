import { html, LitElement } from "lit";

/**
 *
 * @deprecated An example of a deprecated element
 *
 * @tag deprecated-element
 *
 * @since 1.2.5
 * @since 1.3.0 - There was a major refactor in this release
 *
 */
export class DeprecatedElement extends LitElement {
  render() {
    return html` <div>Deprecated Element</div> `;
  }
}

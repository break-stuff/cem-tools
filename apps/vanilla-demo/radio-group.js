/**
 *
 * Radio groups are used to group multiple radios or radio buttons so they function as a single form control. Here is its [documentation](https://github.com/microsoft/vscode-custom-data/blob/master/samples/webcomponents/src/components/my-component/docs.md).
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
 * @attr {boolean} disabled - Disables the element
 * @attribute {string} value - The value of the selected radio
 * @attribute {1|2|3|4} size - This will control the size of radio buttons
 * @attribute {'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text'} variants - This is a test for sting values
 *
 * @csspart radio-label - Applies custom styles the radio group label
 *
 * @slot - add radio buttons to the `default` slot to create options to your radio group
 * @slot label - placeholder for the radio group label
 *
 * @cssprop {--radius-sm|--radius-md|--radius-lg} --border-radius - Controls the border radius of the radio buttons
 * @cssproperty [--background-color=red] - Controls the color of bar
 *
 * @prop {boolean} prop1 - this toggles some unseen feature
 * @property {number} prop2 - this will adjust thr width of the unit
 *
 * @fires custom-event - some description for custom-event
 * @fires {Event} typed-event - some description for typed-event
 * @event {CustomEvent} typed-custom-event - some description for typed-custom-event
 *
 * @reference Documentation - https://my-site.com/docs
 * @reference MDN - https://developer.mozilla.org/en-US/
 *
 */
class RadioGroup extends HTMLElement {}

customElements.define("radio-group", RadioGroup);

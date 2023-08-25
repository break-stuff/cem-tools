
// import type { JSX } from "solid-js";
// import { AccordionExpandModeType } from "./components/accordion/accordion";
// import { ButtonAppearance } from "./components/button/button";
// import { CalloutPlacement } from "./components/callout/callout";
// import { ChartOption, EventParams } from "./components/chart/types";
// import { CopilotPrompt, CopilotInput, CopilotFeedback, ActionableInsight } from "./components/copilot/copilot";
// import { Column, Row, SortBy } from "./components/data-grid/data-grid";
// import { FormFieldData } from "./components/date-picker/date-picker";
// import Details from "./components/details/details";
// import Dropdown, { DropdownPositionValues } from "./components/dropdown/dropdown";
// import { TeachingBubbleData, ErrorMessageData } from "./components/guided-tour/guided-tour";
// import { IconNames } from "./components/icon/icon-names";
// import { InlineStatusIcon } from "./components/inline-status/inline-status";
// import MenuItem, { MenuItemRole } from "./components/menu-item/menu-item";
// import { MicrofeedbackValueType } from "./components/microfeedback/microfeedback";
// import { StatusIndicatorKey } from "./components/persona/persona";
// import { PopupPlacement } from "./components/popup/popup";
// import { SearchEventOutput } from "./components/quick-nav/quick-nav";
// import SubwayStop, { SubwayStopStatus } from "./components/subway-stop/subway-stop";
// import { SubwayStatus } from "./components/subway/subway";
// import { TabsOrientation } from "./components/tabs/tabs";
// import { TaskMenuItemType } from "./components/task-menu/task-menu";
// import { TooltipPlacement } from "./components/tooltip/tooltip";
// import TreeItem from "./components/tree-item/tree-item";
// import WizardItem, { WizardStepStatus } from "./components/wizard-item/wizard-item";
// import { WizardStatus } from "./components/wizard/wizard";
// import { Illustration } from "./components/workspace-card/workspace-card";
// import { LooseString, Target, PanelSize } from "./types";

// /**
//  * This interface should be augmented by users.
//  * 
//  * Usage:
//  * 
//  * ```ts
//  * // file: HarmonySolidIntegration.d.ts
//  * 
//  * import "@harmony/enablers/solid-integration";
//  * 
//  * declare module "@harmony/enablers/solid-integration" {
//  *      interface HarmonyUserOptions {
//  *          Suffix: "<your-suffix>";
//  *      }
//  * }
//  * ```
//  * 
//  */
// interface HarmonyUserOptions { }

// type $MergeBy<T, K> = Omit<T, keyof K> & K;
// type HarmonyOptionsResolved = $MergeBy<
//     {
//         Suffix: "";
//     },
//     HarmonyUserOptions
// >;

// type UserSuffix = HarmonyOptionsResolved["Suffix"];
// type UserSuffixResolved = `${UserSuffix extends "" ? "" : "_"}${UserSuffix}`;

// type BaseProps = {
//     /** Prop for setting inline styles */
//     style?: JSX.CSSProperties;
//     /** Adds a reference for a custom element slot */
//     slot?: string;
//     /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
//     class?: string;
//     /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
//     classList?: Record<string, boolean | undefined>;
//     /** Emitted when an element is clicked */
//     onClick?: (e: MouseEvent) => void;
// };

// type IconTag = Record<`he-icon${UserSuffixResolved}`, {
//     /** The name of the icon to draw. */
//     "name"?: IconNames | undefined;
//     /** A description to use for accessibility. If omitted, `aria-hidden="true"` will be applied instead. */
//     "label"?: string | undefined;
//     /** A string that points to an SVG. This is an escape hatch for loading icons not from the basePath. */
//     "url"?: string | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the icon has loaded. */
//     "on:he-load"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the icon failed to load. */
//     "on:he-error"?: (e: CustomEvent<{ status: number }>) => void;
// } & BaseProps>;
// type AccordionItemTag = Record<`he-accordion-item${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The aria-level value (1-6) for the item heading, representing its semantic hierarchy. */
//     "heading-level"?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
//     /** The expanded state of the item. */
//     "expanded"?: boolean;
//     /** The HTML ID attribute for the invoking element. */
//     "id"?: string;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when "expanded" changes. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type BadgeTag = Record<`he-badge${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The badge's visual treatment. */
//     "appearance"?: 'accent' | 'lightweight' | 'neutral' | string;
//     /** Renders a circular pill badge. */
//     "pill"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type AccordionTag = Record<`he-accordion${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Whether single or multiple accordion items can be opened at a time. */
//     "expand-mode"?: AccordionExpandModeType;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The id of the active accordion item. If `expand-mode` is set to `multiple`, this will be the id of the last
//     expanded item. */
//     "prop:activeid"?: string | null;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an accordion item is expanded. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type ButtonTag = Record<`he-button${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The button's appearance. */
//     "appearance"?: ButtonAppearance;
//     /** Draws the button with a caret for use with dropdowns, popovers, etc. */
//     "caret"?: boolean;
//     /** Disables the button. */
//     "disabled"?: boolean;
//     /** Whether link should show the 'OpenInNewWindow' icon. */
//     "external"?: boolean;
//     /** The type of button. When the type is `submit`, the button will submit the surrounding form. Note that the default
//     value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. */
//     "type"?: 'button' | 'submit' | 'reset';
//     /** An optional name for the button. Ignored when `href` is set. */
//     "name"?: string | undefined;
//     /** An optional value for the button. Ignored when `href` is set. */
//     "value"?: string | undefined;
//     /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
//     "href"?: string | undefined;
//     /** Tells the browser where to open the link. Only used when `href` is set. */
//     "target"?: LooseString<'_blank' | '_parent' | '_self' | '_top'> | undefined;
//     /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
//     "download"?: string | undefined;
//     /** The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
//     value of this attribute must be an id of a form in the same document or shadow root as the button. */
//     "form"?: string;
//     /** Used to override the form owner's `action` attribute. */
//     "formaction"?: string;
//     /** Used to override the form owner's `method` attribute. */
//     "formmethod"?: 'post' | 'get';
//     /** Used to override the form owner's `novalidate` attribute. */
//     "formnovalidate"?: boolean;
//     /** Used to override the form owner's `target` attribute. */
//     "formtarget"?: LooseString<'_self' | '_blank' | '_parent' | '_top'>;
//     /** Defining which referrer is sent when fetching the resource. Only applies to links. */
//     "referrerpolicy"?: LooseString<
//         | 'no-referrer'
//         | 'no-referrer-when-downgrade'
//         | 'origin'
//         | 'origin-when-cross-origin'
//         | 'same-origin'
//         | 'strict-origin'
//         | 'strict-origin-when-cross-origin'
//         | 'unsafe-url'
//     >;
//     /** Sets "aria-current" on the internal button or link. */
//     "current"?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | null;
//     /** Automatically focuses on element on page load. */
//     "autofocus"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the button loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the button gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type BreadcrumbItemTag = Record<`he-breadcrumb-item${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Determines whether the visual separator should be rendered. */
//     "separator"?: boolean;
//     /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
//     "href"?: string | undefined;
//     /** Sets "aria-current" on the internal button or link. */
//     "current"?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | null;
//     /** Automatically focuses on element on page load. */
//     "autofocus"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the button loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the button gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type BreadcrumbTag = Record<`he-breadcrumb${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type PopupTag = Record<`he-popup${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide its `id` or a
//     reference to it here. If the anchor lives inside the popup, use the `anchor` slot instead. */
//     "anchor"?: Element | string;
//     /** Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn
//     down and the popup will be hidden. */
//     "active"?: boolean;
//     /** The preferred placement of the popup. Note that the actual placement will vary as configured to keep the
//     panel inside of the viewport. */
//     "placement"?: PopupPlacement;
//     /** Determines how the popup is positioned. The `absolute` strategy works well in most cases, but if
//     overflow is clipped, using a `fixed` position strategy can often workaround it. */
//     "strategy"?: 'absolute' | 'fixed';
//     /** The distance in pixels from which to offset the panel away from its anchor. */
//     "distance"?: string | number;
//     /** The distance in pixels from which to offset the panel along its anchor. */
//     "skidding"?: string | number;
//     /** Attaches an arrow to the popup. The arrow's size and color can be customized using the `--arrow-size` and
//     `--arrow-color` custom properties. For additional customizations, you can also target the arrow using
//     `::part(arrow)` in your stylesheet. */
//     "arrow"?: boolean;
//     /** The placement of the arrow. The default is `anchor`, which will align the arrow as close to the center of the
//     anchor as possible, considering available space and `arrow-padding`. A value of `start`, `end`, or `center` will
//     align the arrow to the start, end, or center of the popover instead. */
//     "arrow-placement"?: 'start' | 'end' | 'center' | 'anchor';
//     /** The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example,
//     this will prevent it from overflowing the corners. */
//     "arrow-padding"?: number;
//     /** When set, placement of the popup will flip to the opposite site to keep it in view. You can use
//     `flipFallbackPlacements` to further configure how the fallback placement is determined. */
//     "flip"?: boolean;
//     /** If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a
//     string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip
//     fallback strategy will be used instead. */
//     "flip-fallback-placements"?: string;
//     /** When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
//     the popup should be positioned as it was initially preferred or using the best available fit based on available
//     space. */
//     "flip-fallback-strategy"?: 'best-fit' | 'initial';
//     /** The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By
//     default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
//     change the boundary by passing a reference to one or more elements to this property. */
//     "flipBoundary"?: Element | Element[] | undefined;
//     /** The amount of padding, in pixels, to exceed before the flip behavior will occur. */
//     "flip-padding"?: number;
//     /** Moves the popup along the axis to keep it in view when clipped. */
//     "shift"?: boolean;
//     /** The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By
//     default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
//     change the boundary by passing a reference to one or more elements to this property. */
//     "shiftBoundary"?: Element | Element[] | undefined;
//     /** The amount of padding, in pixels, to exceed before the shift behavior will occur. */
//     "shift-padding"?: number;
//     /** When set, this will cause the popup to automatically resize itself to prevent it from overflowing. */
//     "auto-size"?: 'horizontal' | 'vertical' | 'both' | undefined;
//     /** Syncs the popup's width or height to that of the anchor element. */
//     "sync"?: 'width' | 'height' | 'both';
//     /** The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By
//     default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
//     change the boundary by passing a reference to one or more elements to this property. */
//     "autoSizeBoundary"?: Element | Element[] | undefined;
//     /** The amount of padding, in pixels, to exceed before the auto-size behavior will occur. */
//     "auto-size-padding"?: number;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** A reference to the internal popup container. Useful for animating and styling the popup with JavaScript. */
//     "prop:popup"?: HTMLElement;
//     /** Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive operations in your listener or consider debouncing it. */
//     "on:he-reposition"?: (e: CustomEvent<{ placement: PopupPlacement }>) => void;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type DatePickerTag = Record<`he-date-picker${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Selected value in input. */
//     "value"?: string | undefined;
//     /** Label for main date input. */
//     "label"?: string | undefined;
//     /** Content to provide additional context to the input. */
//     "help-text"?: string | undefined;
//     /** Name used to identify the input. */
//     "name"?: string | undefined;
//     /** This will be true when the control is in an invalid state. Validity is determined by props such as `required`. */
//     "invalid"?: boolean;
//     /** Adds required validation to the input. */
//     "required"?: boolean;
//     /** Disables input and calendar dropdown. */
//     "disabled"?: boolean;
//     /** Makes input readonly and disables dropdown. */
//     "readonly"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** The minimum selectable date. */
//     "min-date"?: string | undefined;
//     /** The maximum selectable date. */
//     "max-date"?: string | undefined;
//     /** The initial focus date if no value is set. */
//     "focus-date"?: string | undefined;
//     /** Comma separated list of disabled dates. */
//     "disabled-dates"?: string | undefined;
//     /** Show week numbers at the beginning of each week. */
//     "show-week-numbers"?: boolean | undefined;
//     /** Comma separated list of week days to be disabled (1-7). */
//     "disabled-week-days"?: string | undefined;
//     /** The day of the week the calendar will start with (0-6). */
//     "first-day-of-week"?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
//     /** Whether the calendar dropdown is open or not. */
//     "open"?: boolean;
//     /** The preferred placement of the calendar dropdown. Note that the actual placement will vary as configured to keep the panel inside of the viewport. */
//     "placement"?: | 'top'
//     | 'top-start'
//     | 'top-end'
//     | 'bottom'
//     | 'bottom-start'
//     | 'bottom-end'
//     | 'right'
//     | 'right-start'
//     | 'right-end'
//     | 'left'
//     | 'left-start'
//     | 'left-end';
//     /** undefined */
//     "fixed-position"?: boolean;
//     /** Enable this option to prevent the calendar from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: string;
//     /** Sets selected value from Date object. */
//     "prop:valueAsDate"?: Date | null;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an alteration to the control's value is committed by the user. */
//     "on:he-change"?: (e: CustomEvent<FormFieldData>) => void;
//     /** Emitted when the clear button is activated. */
//     "on:he-clear"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control receives input and its value changes. */
//     "on:he-input"?: (e: CustomEvent<FormFieldData>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type CalendarTag = Record<`he-calendar${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Selected value. */
//     "value"?: string | undefined;
//     /** The minimum selectable date. */
//     "min-date"?: string | undefined;
//     /** The maximum selectable date. */
//     "max-date"?: string | undefined;
//     /** The initial focus date if no value is set. */
//     "focus-date"?: string | undefined;
//     /** Comma separated list of disabled dates. */
//     "disabled-dates"?: string | undefined;
//     /** Show week numbers at the beginning of each week. */
//     "show-week-numbers"?: boolean;
//     /** Comma separated list of week days to be disabled (1-7). */
//     "disabled-week-days"?: string | undefined;
//     /** The day of the week the calendar will start with (0-6). */
//     "first-day-of-week"?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** emits the focused value's when calendar date is selected */
//     "on:he-focus"?: (e: CustomEvent<FormFieldData>) => void;
//     /** emits the selected value's data when calendar date is selected */
//     "on:he-select"?: (e: CustomEvent<FormFieldData>) => void;
// } & BaseProps>;
// type ButtonGroupTag = Record<`he-button-group${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** A label to use for the button group's aria-label attribute. */
//     "label"?: string | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type CardTag = Record<`he-card${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The text to display in the heading slot. For headings with HTML, use the `heading` slot instead. */
//     "heading"?: string;
//     /** The text to display in the footer slot. For footers with HTML, use the `footer` slot instead. */
//     "footer"?: string;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type CalloutTag = Record<`he-callout${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Controls the placement of the popup relative to the anchor. */
//     "placement"?: CalloutPlacement;
//     /** The heading text. Alternatively, you can use the `heading` slot. */
//     "heading"?: string | undefined;
//     /** The aria-level value (1-6) for the heading, representing its semantic hierarchy. */
//     "heading-level"?: number;
//     /** The label surfaced to assistive technologies. Will be labeled by the heading if undefined. */
//     "aria-label"?: string;
//     /** Hides the close button. Make sure you provide a button inside the component to close if you use this. */
//     "no-close-button"?: boolean | undefined;
//     /** The element the popup will be anchored to. If the anchor lives outside of this element, you can provide its `id` or a
//     reference to it here. Alternatively, you can use the `anchor` slot. */
//     "anchor"?: Element | string | undefined;
//     /** Set the popup to use a fixed position strategy. The default strategy works well in most cases, but if overflow is
//     clipped, using a fixed position strategy can often workaround it. */
//     "fixed-placement"?: boolean;
//     /** Minimum space in the viewport for popup to attach to anchor element. If available viewport space is
//     smaller than this number, it will show centered in the window instead of anchored to an element. Set to 0 to disable. */
//     "breakpoint"?: number;
//     /** The distance in pixels from which to offset the card away from its anchor. */
//     "distance"?: number;
//     /** The distance in pixels from which to offset the card along its anchor. */
//     "skidding"?: number;
//     /** The amount of space between the arrow and the edges of the card. */
//     "arrow-offset"?: number;
//     /** The minimum amount of space allowed between the edge of the card and the edge of the viewport. */
//     "viewport-threshold"?: number;
//     /** Indicates whether or not the popup is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the callout is shown. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the callout is visible and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the callout closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the callout is closed and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted before the callout is closed. This may occur by clicking the document outside of the callout, clicking the trigger button, pressing the escape key, or clicking the close button. Calling `event.preventDefault()` will prevent the callout from closing. You can check `event.detail.source` to determine how the request was initiated. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'document' | 'trigger' | 'escape' | 'close-button' }>) => void;
// } & BaseProps>;
// type MenuItemTag = Record<`he-menu-item${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** undefined */
//     "nav-to"?: string | undefined;
//     /** undefined */
//     "nav-target"?: Target | undefined;
//     /** URL to navigate to when the menu item is clicked. If this attribute is set, the menu item will render as an anchor
//     tag. This attribute is ignored if the menu item is a "menuitemcheckbox", "menuitemradio", or has a submenu. */
//     "href"?: string | undefined;
//     /** The target window or frame to open the link in. This attribute is ignored if the menu item is a "menuitemcheckbox",
//     "menuitemradio", or has a submenu. */
//     "target"?: Target | undefined;
//     /** For menu items with an `href`, marks this menu item as the current page in a navigation list. */
//     "current"?: boolean;
//     /** Disables the menu item. */
//     "disabled"?: boolean;
//     /** Open status of child submenus. */
//     "expanded"?: boolean;
//     /** The ARIA role of the menu item. */
//     "role"?: MenuItemRole;
//     /** The checked state for elements with a role of 'menuitemradio' or 'menuitemcheckbox'. */
//     "checked"?: boolean;
//     /** Enable this option to prevent the submenu from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "submenu-fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the item has been clicked or invoked via keyboard, and will be prevented if the menu item is disabled. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the item has been expanded or collapsed. */
//     "on:he-expanded-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type MenuTag = Record<`he-menu${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type DropdownTag = Record<`he-dropdown${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Whether the menu is open or not. */
//     "open"?: boolean;
//     /** Controls the placement of the menu to the trigger. When the position is undefined, it is placed above or below the
//     trigger based on available space. */
//     "position"?: DropdownPositionValues;
//     /** Whether the anchored region is positioned using css "position: fixed". Otherwise the region uses "position: absolute".
//     Fixed placement allows the dropdown contents to break out of parent containers. */
//     "fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the dropdown menu is shown */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the dropdown menu is shown and all transitions are complete */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the dropdown menu closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the dropdown menu closes and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the dropdown menu by selecting a menu item, clicking the trigger, clicking outside of the menu, or pressing the escape key. Calling `event.preventDefault()` will prevent the menu from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the menu will result in destructive behavior and you have provided another method to close it. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'change' | 'trigger' | 'document' | 'keyboard' }>) => void;
// } & BaseProps>;
// type ProgressRingTag = Record<`he-progress-ring${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Value between 0 and 100 to represent the progress visually and to assistive technologies. */
//     "value"?: number;
//     /** A custom label rendered under the progress ring. */
//     "label"?: string;
//     /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
//     "indeterminate"?: boolean;
//     /** The preferred placement of the progress label. */
//     "label-placement"?: 'bottom' | 'start' | 'end' | 'top';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type ChartTag = Record<`he-chart${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Show loading indicator. */
//     "loading"?: boolean;
//     /** Hides the filter button in the toolbox at the top of the chart. */
//     "hide-filter"?: boolean;
//     /** Hides the download button in the toolbox at the top of the chart. */
//     "hide-download"?: boolean;
//     /** Hides the entire toolbox dropdown at the top of the chart. When using this, make sure to provide an alternative method to see the data view for accessibility. */
//     "hide-toolbox"?: boolean;
//     /** Visually hides the chart heading. `heading` should still be provided for accessibility devices. */
//     "hide-heading"?: boolean;
//     /** Sets the heading of the chart. */
//     "heading"?: string;
//     /** Show the data in a data table rather than as a chart. */
//     "dataView"?: boolean;
//     /** Sets the subheading of the chart. */
//     "subheading"?: string;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Sets chart configuration and data. */
//     "prop:options"?: ChartOption;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emits the dataset when a change is made in the data view. */
//     "on:he-dataview-changed"?: (e: CustomEvent<EventParams>) => void;
//     /** Emits when the filter button is clicked. */
//     "on:he-chart-filter"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type CheckboxTag = Record<`he-checkbox${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Draws the checkbox in a checked state. */
//     "checked"?: boolean;
//     /** Draws the checkbox in an indeterminate state. */
//     "indeterminate"?: boolean;
//     /** The input's value attribute. */
//     "value"?: string | number;
//     /** The input's name attribute. */
//     "name"?: string | undefined;
//     /** The input's label. If you need to display HTML, you can use the `label` slot instead. */
//     "label"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Makes the input a required field. */
//     "required"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
//     "invalid"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control's checked state changes. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type DetailsTag = Record<`he-details${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** The text to show in the details invoker. If you need to display HTML, use the `summary` slot instead. */
//     "summary"?: string;
//     /** Disables the details so it can't be toggled. */
//     "disabled"?: boolean;
//     /** The invoker button's visual treatment. */
//     "appearance"?: ButtonAppearance;
//     /** Sets the default position of the expanded area. */
//     "position"?: 'top' | 'bottom';
//     /** Draws the button with a caret */
//     "caret"?: boolean;
//     /** Automatically focuses on element on page load. */
//     "autofocus"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** When the details pane is animating in. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** After the details pane has finished animating. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** When the details pane is animating out. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** After the details pane has finished animating. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the invoker gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the invoker loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type CheckboxGroupTag = Record<`he-checkbox-group${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The checkbox group label. Required for proper accessibility. If you need to display HTML, you can use the `label`
//     slot instead. */
//     "label"?: string;
//     /** The values of all selected checkboxes as a string with a delimiter. Setting this will override any `checked`
//     attributes on the checkboxes in this group. */
//     "value"?: string | number;
//     /** Delimiter between values in `value` property. */
//     "delimiter"?: string;
//     /** The name assigned to the checkbox group form values. */
//     "name"?: string | undefined;
//     /** This will be true when the control is in an invalid state. Validity is determined by props such as `required`,
//      `min`, `max`. */
//     "invalid"?: boolean;
//     /** Validates at least one child checkbox is checked. */
//     "required"?: boolean;
//     /** The minimum number of checkboxes required to be checked to be valid. */
//     "min"?: number | undefined;
//     /** The maximum number of checkboxes allowed to be checked to be valid. */
//     "max"?: number | undefined;
//     /** The number of checkboxes displayed. The rest will collapse and be visible by pressing the "Show more" link. */
//     "display-limit"?: number | undefined;
//     /** Text to use for the "Show less" link. If unset, this will be localized to "Show less". */
//     "showLessString"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** A promise returning the `<he-details>` element in the shadow root once it exists (when `display-limit` is set and
//     the checkboxes are more than the number set). You can use this if you need to programmatically expand/collapse the
//     details. */
//     "prop:details"?: Promise<Details>;
//     /** The values of all selected checkboxes. Setting this will override any `checked` attributes on the checkboxes in
//     this group. */
//     "prop:valueAsArray"?: string[];
//     /** A function for text to show as the "Show more ({count})" link. If unset, this will be localized to "Show more (${count})". */
//     "prop:showMoreString"?: (count: number) => string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the checkbox group's value changes. */
//     "on:he-checkbox-group-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TeachingBubbleTag = Record<`he-teaching-bubble${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Wide teaching bubble. */
//     "wide"?: boolean;
//     /** The element that will trigger the opening of the popup. If the trigger lives outside of the popup, you
//     can provide its `id` or a reference to it here. Alternatively, you can use the `trigger` slot. */
//     "trigger"?: Element | string | undefined;
//     /** Show an overlay backdrop, and disable scrolling on selectors set in `scrolling-selectors`. */
//     "overlay"?: boolean;
//     /** Query selectors that have scrolling and will be disabled if `overlay` is on. */
//     "scrolling-selectors"?: string;
//     /** Controls the placement of the popup relative to the anchor. */
//     "placement"?: CalloutPlacement;
//     /** The heading text. Alternatively, you can use the `heading` slot. */
//     "heading"?: string | undefined;
//     /** The aria-level value (1-6) for the heading, representing its semantic hierarchy. */
//     "heading-level"?: number;
//     /** The label surfaced to assistive technologies. Will be labeled by the heading if undefined. */
//     "aria-label"?: string;
//     /** Hides the close button. Make sure you provide a button inside the component to close if you use this. */
//     "no-close-button"?: boolean | undefined;
//     /** The element the popup will be anchored to. If the anchor lives outside of this element, you can provide its `id` or a
//     reference to it here. Alternatively, you can use the `anchor` slot. */
//     "anchor"?: Element | string | undefined;
//     /** Set the popup to use a fixed position strategy. The default strategy works well in most cases, but if overflow is
//     clipped, using a fixed position strategy can often workaround it. */
//     "fixed-placement"?: boolean;
//     /** Minimum space in the viewport for popup to attach to anchor element. If available viewport space is
//     smaller than this number, it will show centered in the window instead of anchored to an element. Set to 0 to disable. */
//     "breakpoint"?: number;
//     /** The distance in pixels from which to offset the card away from its anchor. */
//     "distance"?: number;
//     /** The distance in pixels from which to offset the card along its anchor. */
//     "skidding"?: number;
//     /** The amount of space between the arrow and the edges of the card. */
//     "arrow-offset"?: number;
//     /** The minimum amount of space allowed between the edge of the card and the edge of the viewport. */
//     "viewport-threshold"?: number;
//     /** Indicates whether or not the popup is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the teaching bubble is shown. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the teaching bubble is visible and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the teaching bubble closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the teaching bubble is closed and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the teaching bubble. Calling `event.preventDefault()` will prevent it from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the teaching bubble will result in destructive behavior such as data loss. Consider using `no-close-button` attribute instead if you don't want the close icon button. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'trigger' | 'escape' | 'close-button' | 'document' | 'overlay' }>) => void;
// } & BaseProps>;
// type CoachmarkTag = Record<`he-coachmark${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Whether the coachmark is expanded to a Teaching Bubble. */
//     "expanded"?: boolean;
//     /** Wide teaching bubble. */
//     "wide"?: boolean;
//     /** The element that will trigger the opening of the popup. If the trigger lives outside of the popup, you
//     can provide its `id` or a reference to it here. Alternatively, you can use the `trigger` slot. */
//     "trigger"?: Element | string | undefined;
//     /** Show an overlay backdrop, and disable scrolling on selectors set in `scrolling-selectors`. */
//     "overlay"?: boolean;
//     /** Query selectors that have scrolling and will be disabled if `overlay` is on. */
//     "scrolling-selectors"?: string;
//     /** Controls the placement of the popup relative to the anchor. */
//     "placement"?: CalloutPlacement;
//     /** The heading text. Alternatively, you can use the `heading` slot. */
//     "heading"?: string | undefined;
//     /** The aria-level value (1-6) for the heading, representing its semantic hierarchy. */
//     "heading-level"?: number;
//     /** The label surfaced to assistive technologies. Will be labeled by the heading if undefined. */
//     "aria-label"?: string;
//     /** Hides the close button. Make sure you provide a button inside the component to close if you use this. */
//     "no-close-button"?: boolean | undefined;
//     /** The element the popup will be anchored to. If the anchor lives outside of this element, you can provide its `id` or a
//     reference to it here. Alternatively, you can use the `anchor` slot. */
//     "anchor"?: Element | string | undefined;
//     /** Set the popup to use a fixed position strategy. The default strategy works well in most cases, but if overflow is
//     clipped, using a fixed position strategy can often workaround it. */
//     "fixed-placement"?: boolean;
//     /** Minimum space in the viewport for popup to attach to anchor element. If available viewport space is
//     smaller than this number, it will show centered in the window instead of anchored to an element. Set to 0 to disable. */
//     "breakpoint"?: number;
//     /** The distance in pixels from which to offset the card away from its anchor. */
//     "distance"?: number;
//     /** The distance in pixels from which to offset the card along its anchor. */
//     "skidding"?: number;
//     /** The amount of space between the arrow and the edges of the card. */
//     "arrow-offset"?: number;
//     /** The minimum amount of space allowed between the edge of the card and the edge of the viewport. */
//     "viewport-threshold"?: number;
//     /** Indicates whether or not the popup is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Expander button element that opens the teaching bubble. (readonly) */
//     "prop:coachmarkButton"?: HTMLElement;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the teaching bubble is shown. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the teaching bubble is visible and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the teaching bubble closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the teaching bubble is closed and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the teaching bubble. Calling `event.preventDefault()` will prevent it from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the teaching bubble will result in destructive behavior such as data loss. Consider using `no-close-button` attribute instead if you don't want the close icon button. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'trigger' | 'escape' | 'close-button' | 'document' | 'overlay' }>) => void;
//     /** Emitted after coachmark is expanded into a teaching bubble. */
//     "on:he-expanded"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type CommandBarTag = Record<`he-command-bar${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Alignment of the command bar action buttons within the container. */
//     "actions-position"?: 'start' | 'end';
//     /** The label surfaced to assistive technologies. Defaults to localized version of "Commands". */
//     "label"?: string;
//     /** Enable this option to prevent the overflow menu from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the status of the overflow changes. Includes the current elements that are overflowed. */
//     "on:he-overflow"?: (e: CustomEvent<{ overflowedElements: HTMLElement[] }>) => void;
//     /** Emitted when the overflow dropdown is shown. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the overflow dropdown is shown and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the overflow dropdown closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the overflow dropdown closes and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type VisuallyHiddenTag = Record<`he-visually-hidden${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type MicrofeedbackTag = Record<`he-microfeedback${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Label for the "like" button for assistive devices. Defaults to localized text for "Like". */
//     "like-label"?: string;
//     /** Label for the "dislike" button for assistive devices. Defaults to localized text for "Dislike". */
//     "dislike-label"?: string;
//     /** Current microfeedback value. */
//     "value"?: MicrofeedbackValueType | undefined;
//     /** Which buttons to include. */
//     "buttons"?: MicrofeedbackValueType | 'both';
//     /** Enable this option to prevent the dropdowns from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Dropdown element for "like" button when a menu is used. Returns a `Promise` that resolves to the element after any
//     pending element render is completed. */
//     "prop:likeDropdown"?: Promise<Dropdown>;
//     /** Dropdown element for "dislike" button when a menu is used. Returns a `Promise` that resolves to the element after
//     any pending element render is completed. */
//     "prop:dislikeDropdown"?: Promise<Dropdown>;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Event emitted when `value` is changed. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type ProgressTag = Record<`he-progress${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The current progress, 0 to 100. */
//     "value"?: number;
//     /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
//     "indeterminate"?: boolean;
//     /** A custom label for the progress bar's aria label. */
//     "label"?: string;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// /** 
// The Copilot component is a chat window that allows users to ask questions and receive responses. It can be used with any backend service that can provide responses to user input. */
// type CopilotTag = Record<`he-copilot${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The label used by screen readers. */
//     "label"?: string;
//     /** The default progress text in loading. */
//     "loading-label"?: string;
//     /** The placeholder text for the input. */
//     "placeholder"?: string;
//     /** The maximum number of characters allowed for the input. */
//     "maxlength"?: number | undefined;
//     /** Enables the loading state of the component. */
//     "loading"?: boolean;
//     /** The display of total responses that works in tandem with `remainingResponses` in the `CopilotResponse`. */
//     "max-response-count"?: number | undefined;
//     /** Hide the refresh button in the suggestions section. */
//     "hide-refresh"?: boolean;
//     /** Disables the input and submission button so that users are not able to add input to the chat window. */
//     "disable-input"?: boolean;
//     /** Save the conversation in sessionStorage and restore it when the component is reloaded. */
//     "save-transcript"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The placeholder text for the input. */
//     "prop:suggestions"?: string[] | undefined;
//     /** A record of the conversation. */
//     "prop:transcript"?: CopilotPrompt[];
//     /** The number of responses that have occurred in this conversation. */
//     "prop:responseCount"?: number;
//     /** The number of user inputs that have occurred in this conversation. */
//     "prop:inputCount"?: number;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user submits a question or request. */
//     "on:he-copilot-input"?: (e: CustomEvent<CopilotInput>) => void;
//     /** Emitted when the user clicks on feedback options. */
//     "on:he-copilot-feedback"?: (e: CustomEvent<CopilotFeedback>) => void;
//     /** Emitted when the user clicks the refresh suggestions button. */
//     "on:he-refresh-suggestions"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user clicks on feedback options. */
//     "on:he-actionable-insight"?: (e: CustomEvent<ActionableInsight>) => void;
// } & BaseProps>;
// type SkeletonTag = Record<`he-skeleton${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Indicates that the component has an activated shimmer effect. */
//     "shimmer"?: boolean;
//     /** The shape of the Skeleton. */
//     "shape"?: 'rect' | 'circle';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type RadioTag = Record<`he-radio${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** This toggles the selected status for the radio and is for use when a radio button is used outside of a radio group. When used within a radio group, this value be overridden by the radio group's value. */
//     "checked"?: boolean;
//     /** The radio's value attribute. */
//     "value"?: string;
//     /** Disables the radio. */
//     "disabled"?: boolean;
//     /** Focus on the radio on page load. */
//     "autofocus"?: boolean;
//     /** The input's label. Alternatively, you can use the default slot. */
//     "label"?: string | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the radio is selected. */
//     "on:he-selected"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type DataGridTag = Record<`he-data-grid${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Fixes the table headings to the top of the screen when table is scrolled. */
//     "fixed-heading"?: boolean;
//     /** Fixes the first column to the left of the screen when table is scrolled. */
//     "fixed-column"?: boolean;
//     /** Puts table in a loading state. */
//     "loading"?: boolean;
//     /** Shows checkbox or radio control on each row and a "select all" checkbox in header if 'multiple' is selected. */
//     "select"?: 'single' | 'multiple' | undefined;
//     /** Toggles the "select all" checkbox when `select` is set to "multiple". */
//     "select-all"?: boolean;
//     /** Set the "select all" checkbox to indeterminate state. */
//     "select-all-indeterminate"?: boolean;
//     /** Enables toggling selection when clicking the row. */
//     "select-on-click"?: boolean;
//     /** Enables expanding/collapsing a row when clicking it. */
//     "expand-on-click"?: boolean;
//     /** Field that data is sorted by. */
//     "sort-by"?: string | undefined;
//     /** Indicates if field is sorted ascending. */
//     "sort-ascending"?: boolean;
//     /** Used to provide screen readers with a label for the data grid. */
//     "label"?: string | undefined;
//     /** Turns off internal scrollbars. Use this if you want to handle overflow scrolling outside of the table. Make sure to handle both vertical and horizontal scrolling. */
//     "no-scroll"?: boolean;
//     /** Hide the "select all" checkbox. */
//     "hide-select-all"?: boolean;
//     /** Enable this option to prevent the select options dropdown from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** Enables lazy loading behavior. */
//     "lazy"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The table columns and their configuration. */
//     "prop:columns"?: Column[];
//     /** The table rows and their configuration. */
//     "prop:rows"?: Row[];
//     /** When lazy loading is on, set this function to return a promise that resolves to an array of child rows for the
//     provided parent row. */
//     "prop:loadChildren"?: (parentRow: Row, currentChildren: Row[]) => Promise<Row[]>;
//     /** Gets all rows that are currently selected. */
//     "prop:selectedRows"?: Row[];
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when a sortable column header is clicked. */
//     "on:he-sort"?: (e: CustomEvent<SortBy>) => void;
//     /** Emitted when selectable row is toggled. */
//     "on:he-row-select-change"?: (e: CustomEvent<Row>) => void;
//     /** Emitted when "select all" checkbox is toggled. */
//     "on:he-select-all-change"?: (e: CustomEvent<boolean>) => void;
//     /** Emitted when a bulk-select option is clicked. */
//     "on:he-bulk-select"?: (e: CustomEvent<string>) => void;
//     /** Emitted when a row expands. */
//     "on:he-row-expand"?: (e: CustomEvent<Row>) => void;
//     /** Emitted after a row expands and all animations are complete. */
//     "on:he-after-row-expand"?: (e: CustomEvent<Row>) => void;
//     /** Emitted when a row collapses. */
//     "on:he-row-collapse"?: (e: CustomEvent<Row>) => void;
//     /** Emitted after a row collapses and all animations are complete. */
//     "on:he-after-row-collapse"?: (e: CustomEvent<Row>) => void;
//     /** Emitted when a expand all toggle is clicked. */
//     "on:he-expand-all-change"?: (e: CustomEvent<boolean>) => void;
//     /** Emitted when a row is clicked or enter key is pressed on it. */
//     "on:he-row-invoke"?: (e: CustomEvent<Row>) => void;
// } & BaseProps>;
// type DialogTag = Record<`he-dialog${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Indicates whether or not the dialog is open. Can be used in lieu of show/hide methods. */
//     "open"?: boolean;
//     /** The dialog's label as displayed in the header. You should always include a relevant label even when using
//     `no-header`, as it is required for proper accessibility. */
//     "heading"?: string;
//     /** Disables the header. This will also remove the default close button, so please ensure you provide an easy,
//     accessible way for users to dismiss the dialog. */
//     "no-header"?: boolean;
//     /** Indicates the transition speed for animations. */
//     "transition-speed"?: number;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the dialog opens. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the dialog opens and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the dialog closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the dialog closes and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the dialog opens and the panel gains focus. Calling `event.preventDefault()` will prevent focus and allow you to set it on a different element in the dialog, such as an input or button. */
//     "on:he-initial-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the dialog by clicking the close button, clicking the overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the dialog from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the dialog will result in destructive behavior such as data loss. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'close-button' | 'keyboard' | 'overlay' }>) => void;
// } & BaseProps>;
// type DividerTag = Record<`he-divider${UserSuffixResolved}`, {
//     /** Set to true to render the divider as a presentational element instead of a separator. */
//     "presentation"?: boolean;
//     /** The divider's orientation. */
//     "orientation"?: 'horizontal' | 'vertical';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type FilterPillTag = Record<`he-filter-pill${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The button's visual treatment. */
//     "appearance"?: 'accent' | 'neutral' | 'error';
//     /** Include a downward pointing chevron icon. */
//     "caret"?: boolean;
//     /** Include an X icon. */
//     "clear"?: boolean;
//     /** Delimiter between displayed values. */
//     "delimiter"?: string;
//     /** Number of filter values to show in button. */
//     "value-count"?: number;
//     /** Disables the filter pill button. */
//     "disabled"?: boolean;
//     /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
    
//     See [aria-expanded](https://www.w3.org/TR/wai-aria/#aria-expanded) for more information. */
//     "aria-expanded"?: 'true' | 'false' | null;
//     /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by
//     an element.
    
//     See [aria-haspopup](https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup) for more information. */
//     "aria-haspopup"?: 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | string | null;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Array of values to display in button (will only show the first `valueCount` number of values).
//     Alternatively you can use the `value` slot (use of the slot will override this). */
//     "prop:values"?: string[] | undefined;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type FlyInPanelTag = Record<`he-fly-in-panel${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Indicates whether or not the fly-in-panel is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** Indicates the transition speed for animations. */
//     "transition-speed"?: number;
//     /** undefined */
//     "size"?: PanelSize | undefined;
//     /** The fly-in-panel's label as displayed in the header. You should always include a relevant label even when using
//     `no-header`, as it is required for proper accessibility. */
//     "heading"?: string;
//     /** The direction the fly-in-panel will open from.
    
//     Note: "right" and "left" will be deprecated in a future version. Please use the logical properties "end" or
//     "start", which are based on language direction. */
//     "placement"?: 'end' | 'start' | 'right' | 'left';
//     /** By default, the fly-in-panel slides out of its containing block (usually the viewport). To make the fly-in-panel slide out of
//     its parent element, set this prop and add `position: relative` to the parent. */
//     "contained"?: boolean;
//     /** Removes the header. This will also remove the default close button. If using prevent default on he-request-close please provide a way for the user to close the fly-in-panel. */
//     "no-header"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the fly-in-panel opens. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the fly-in-panel opens and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the fly-in-panel closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the fly-in-panel closes and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the fly-in-panel opens and the panel gains focus. Calling `event.preventDefault()` will prevent focus and allow you to set it on a different element in the fly-in-panel, such as an input or button. You can also put `autofocus` attribute on the element instead to set initial focus. */
//     "on:he-initial-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the fly-in panel by clicking the close button, clicking the overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the panel from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the fly-in panel will result in destructive behavior such as data loss. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'close-button' | 'keyboard' | 'overlay' }>) => void;
// } & BaseProps>;
// type FormatDateTag = Record<`he-format-date${UserSuffixResolved}`, {
//     /** The date/time to format. If not set, the current date and time will be used. */
//     "date"?: Date | string;
//     /** The format for displaying the weekday. */
//     "weekday"?: 'narrow' | 'short' | 'long';
//     /** The format for displaying the era. */
//     "era"?: 'narrow' | 'short' | 'long';
//     /** The format for displaying the year. */
//     "year"?: 'numeric' | '2-digit';
//     /** The format for displaying the month. */
//     "month"?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
//     /** The format for displaying the day. */
//     "day"?: 'numeric' | '2-digit';
//     /** The format for displaying the hour. */
//     "hour"?: 'numeric' | '2-digit';
//     /** The format for displaying the minute. */
//     "minute"?: 'numeric' | '2-digit';
//     /** The format for displaying the second. */
//     "second"?: 'numeric' | '2-digit';
//     /** The format for displaying the time. */
//     "time-zone-name"?: 'short' | 'long';
//     /** The time zone to express the time in. */
//     "time-zone"?: string;
//     /** When set, 24 hour time will always be used. */
//     "hour-format"?: 'auto' | '12' | '24';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type FormatNumberTag = Record<`he-format-number${UserSuffixResolved}`, {
//     /** The number to format. */
//     "value"?: number;
//     /** The formatting style to use. */
//     "type"?: 'currency' | 'decimal' | 'percent';
//     /** Turns off grouping separators. */
//     "no-grouping"?: boolean;
//     /** The currency to use when formatting. Must be an ISO 4217 currency code such as `USD` or `EUR`. */
//     "currency"?: string;
//     /** How to display the currency. */
//     "currency-display"?: | 'symbol'
//     | 'narrowSymbol'
//     | 'code'
//     | 'name';
//     /** The minimum number of integer digits to use. Possible values are 1 - 21. */
//     "minimum-integer-digits"?: number;
//     /** The minimum number of fraction digits to use. Possible values are 0 - 20. */
//     "minimum-fraction-digits"?: number;
//     /** The maximum number of fraction digits to use. Possible values are 0 - 20. */
//     "maximum-fraction-digits"?: number;
//     /** The minimum number of significant digits to use. Possible values are 1 - 21. */
//     "minimum-significant-digits"?: number;
//     /** The maximum number of significant digits to use,. Possible values are 1 - 21. */
//     "maximum-significant-digits"?: number;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type GuidedTourTag = Record<`he-guided-tour${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Determines if the tour is currently visible. */
//     "visible"?: boolean;
//     /** Optional label for the back button. If unset, this will be localized to "Back". */
//     "back-label"?: string;
//     /** Optional label for the next button. If unset, this will be localized to "Next". */
//     "next-label"?: string;
//     /** Optional label for the finish button. If unset, this will be localized to "Finish". */
//     "finish-label"?: string;
//     /** If set, the tour will resume at the current index instead of restarting from the first step. */
//     "resume"?: boolean;
//     /** A selector that targets elements that should have scrolling disabled while the tour is active. This will only apply if `allowOutsideInteraction` is not enabled. */
//     "scrolling-selectors"?: string;
//     /** Allows interaction with elements outside of the teaching bubble. */
//     "allow-outside-interaction"?: boolean;
//     /** When set, the step target will not be scrolled into view automatically. This may result in the target appearing off the screen. */
//     "no-scroll-into-view"?: boolean;
//     /** The minimum distance in pixels from the edge of viewport for an element to be considered "in view" when determining if it should scroll into view. */
//     "view-threshold"?: number;
//     /** Shows errors in the console. */
//     "debug"?: boolean;
//     /** Enable this option to prevent the teaching bubble from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** The step data for the guided tour. */
//     "steps"?: TeachingBubbleData[];
//     /** Error message strings. */
//     "errorMessageList"?: ErrorMessageData;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The slotted trigger element (readonly). */
//     "prop:trigger"?: HTMLElement | undefined;
//     /** The current step's index. This is a readonly property. To change steps programmatically, use the `showStep()` method. */
//     "prop:currentIndex"?: number;
//     /** A function to run before a step will be shown. The step will not be changed until the promise has resolved. */
//     "prop:beforeStep"?: (props: { step: TeachingBubbleData; stepIndex: number }) => Promise<boolean | void>;
//     /** A function that returns text to show in the footer. If unset, this will be localized to "Step ${current} of ${total}". */
//     "prop:footerString"?: (current: number, total: number) => string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the tour is started. `stepIndex` is the step index tour will start at (will be 0 if `resume` is off). */
//     "on:he-tour-start"?: (e: CustomEvent<{ step: TeachingBubbleData, stepIndex: number }>) => void;
//     /** Emitted when the tour is closed. `completed` will be true if the "Finish" button was pressed, or if `complete()` was called. */
//     "on:he-tour-close"?: (e: CustomEvent<{ completed: boolean, step: TeachingBubbleData, stepIndex: number }>) => void;
//     /** Emitted when a teaching bubble is about to be shown. */
//     "on:he-step-show"?: (e: CustomEvent<{ step: TeachingBubbleData, stepIndex: number }>) => void;
//     /** Emitted after a teaching bubble is shown and all transitions are complete. */
//     "on:he-step-after-show"?: (e: CustomEvent<{ step: TeachingBubbleData, stepIndex: number }>) => void;
//     /** Emitted when a teaching bubble is about to close. */
//     "on:he-step-hide"?: (e: CustomEvent<{ step: TeachingBubbleData, stepIndex: number }>) => void;
//     /** Emitted after a teaching bubble closes and all transitions are complete. */
//     "on:he-step-after-hide"?: (e: CustomEvent<{ step: TeachingBubbleData, stepIndex: number }>) => void;
//     /** Emitted if there is an error. */
//     "on:he-tour-error"?: (e: CustomEvent<{ error: string, step: TeachingBubbleData, stepIndex: number }>) => void;
// } & BaseProps>;
// type HoverCardTag = Record<`he-hover-card${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The delay in milliseconds before the hover card is shown after a mouseover event. */
//     "show-delay"?: number;
//     /** The delay in milliseconds before a popover is hidden after a mouseout event. A minimum number is necessary for
//     pointer to hop between target and card. */
//     "hide-delay"?: number;
//     /** The text for the extra content area. Alternatively, you can use the `extra-content-heading` slot. */
//     "extra-content-heading"?: string | undefined;
//     /** The aria-level value (1-6) for the item heading, representing its semantic hierarchy. */
//     "extra-content-heading-level"?: number;
//     /** Minimum delay in milliseconds before extra content is revealed. Set to 0 to disable animation. */
//     "expand-delay"?: number;
//     /** Controls the placement of the popup relative to the anchor. */
//     "placement"?: CalloutPlacement;
//     /** The heading text. Alternatively, you can use the `heading` slot. */
//     "heading"?: string | undefined;
//     /** The aria-level value (1-6) for the heading, representing its semantic hierarchy. */
//     "heading-level"?: number;
//     /** The label surfaced to assistive technologies. Will be labeled by the heading if undefined. */
//     "aria-label"?: string;
//     /** The element the popup will be anchored to. If the anchor lives outside of this element, you can provide its `id` or a
//     reference to it here. Alternatively, you can use the `anchor` slot. */
//     "anchor"?: Element | string | undefined;
//     /** Set the popup to use a fixed position strategy. The default strategy works well in most cases, but if overflow is
//     clipped, using a fixed position strategy can often workaround it. */
//     "fixed-placement"?: boolean;
//     /** Minimum space in the viewport for popup to attach to anchor element. If available viewport space is
//     smaller than this number, it will show centered in the window instead of anchored to an element. Set to 0 to disable. */
//     "breakpoint"?: number;
//     /** The distance in pixels from which to offset the card away from its anchor. */
//     "distance"?: number;
//     /** The distance in pixels from which to offset the card along its anchor. */
//     "skidding"?: number;
//     /** The amount of space between the arrow and the edges of the card. */
//     "arrow-offset"?: number;
//     /** The minimum amount of space allowed between the edge of the card and the edge of the viewport. */
//     "viewport-threshold"?: number;
//     /** Indicates whether or not the popup is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the hover card is shown. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the hover card is visible and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the hover card closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the hover card is closed and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after extra content is visible. */
//     "on:he-expanded"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the hover card by mousing out, changing focus, or pressing the escape key. Calling `event.preventDefault()` will prevent the hover card from closing. You can check `event.detail.source` to determine how the request was initiated. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'mouseout' | 'focusout' | 'escape' }>) => void;
// } & BaseProps>;
// type InlineStatusTag = Record<`he-inline-status${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The type of inline status to display. */
//     "type"?: InlineStatusIcon;
//     /** The size of the inline status. */
//     "size"?: 'small' | 'medium' | 'large';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type LayoutTag = Record<`he-layout${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Don't include "Skip to main" link. */
//     "disable-skip-to-main"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type MessageBarTag = Record<`he-message-bar${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The direction the message bar will open and close from.
    
//     Note: "right" and "left" will be deprecated in a future version. Please use the logical properties "end" or
//     "start", which are based on language direction. */
//     "direction"?: 'end' | 'start' | 'right' | 'left';
//     /** Indicates the transition speed for animations in ms. */
//     "transition-speed"?: number;
//     /** Expands the message if it is a multi line message. */
//     "expanded"?: boolean;
//     /** Hides the close button (message will still auto close). */
//     "no-close-button"?: boolean;
//     /** The time in milliseconds before the message automatically closes. By default, the message bar will remain open
//     indefinitely. */
//     "duration"?: unknown;
//     /** Indicates the type and appearance of the message bar. */
//     "appearance"?: 'info' | 'notice' | 'success' | 'warning' | 'error';
//     /** Indicates if the message is open. */
//     "open"?: boolean;
//     /** Allows developers to manually control the multiline behavior */
//     "expandable"?: boolean | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the message bar is opened. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the message bar is closed. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the message bar is opened and the transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the message bar is closed and the transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type SearchBoxTag = Record<`he-search-box${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The input's type. */
//     "type"?: | 'date'
//     | 'datetime-local'
//     | 'email'
//     | 'number'
//     | 'password'
//     | 'search'
//     | 'tel'
//     | 'text'
//     | 'time'
//     | 'url';
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** The minimum length of input that will be considered valid. */
//     "minlength"?: number;
//     /** The maximum length of input that will be considered valid. */
//     "maxlength"?: number;
//     /** A pattern to validate input against. */
//     "pattern"?: string;
//     /** This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
//     `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API. */
//     "invalid"?: boolean;
//     /** Controls whether and how text input is automatically capitalized as it is entered/edited by the user. */
//     "autocapitalize"?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
//     /** (Non-standard - Safari only). A string which indicates whether to activate automatic correction while the user
//     is editing this field. */
//     "autocorrect"?: string;
//     /** Permission the user agent has to provide automated assistance in filling out form field values and the type of
//     information expected in the field. */
//     "autocomplete"?: string;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** Used to customize the label or icon of the Enter key on virtual keyboards. */
//     "enterkeyhint"?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
//     /** Enables spell checking on the input. */
//     "spellcheck"?: boolean;
//     /** Hints at the type of data that might be entered by the user while editing the element or its contents. */
//     "inputmode"?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
//     /** The input's value attribute. */
//     "value"?: string | number;
//     /** The input's name attribute. */
//     "name"?: string | undefined;
//     /** The input's label. If you need to display HTML, you can use the `label` slot instead. */
//     "label"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Makes the input a required field. */
//     "required"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an alteration to the control's value is committed. This event also fires when the control is cleared or the `Enter` key is pressed. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user presses the `Enter` key or when the the clear button is used. */
//     "on:he-search"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the clear button is activated. */
//     "on:he-clear"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control receives input and its value changes. */
//     "on:he-input"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TaskItemTag = Record<`he-task-item${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The URL the anchor points to. All other properties (except disabled and selected) depend on this being set. */
//     "href"?: string | undefined;
//     /** The browsing context for the href when clicked. */
//     "target"?: Target | undefined;
//     /** When true, the control will appear selected. */
//     "selected"?: boolean;
//     /** When true, the control will be immutable by user interaction. */
//     "disabled"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an item has been selected. */
//     "on:he-selected-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the button loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the button gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TaskMenuTag = Record<`he-task-menu${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The type of list items - this will be the value of aria-current on selected items. A value of 'none' should be used
//     if no other options describe it's use, and will result in `aria-current="true"`.
    
//     See [aria-current](https://www.w3.org/TR/wai-aria-1.1/#aria-current) for more information. */
//     "item-type"?: TaskMenuItemType;
//     /** Whether or not the task menu will collapse to mobile view automatically based on `breakpoint` screen width. */
//     "auto-collapse"?: boolean;
//     /** The max-width of the screen that will show the collapsed mobile view of task menu. Must include CSS unit that is
//     valid in media queries (ie. `768px`)
    
//     See [media query units](https://drafts.csswg.org/mediaqueries/#units) for more information. */
//     "breakpoint"?: string;
//     /** Default or mobile view. If `autoCollapse` is set, this will change based on viewport width changes. To use mobile
//     view outside of `he-page-template`, make sure the element that is wrapping the task menu and content has
//     `overflow: hidden`. */
//     "view"?: 'default' | 'mobile';
//     /** The expanded state of the task menu in mobile view. */
//     "expanded"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the mobile menu's expanded state changes. */
//     "on:he-expanded-change"?: (e: CustomEvent<{ expanded: boolean }>) => void;
//     /** Emitted when the menu's view mode changes. */
//     "on:he-view-change"?: (e: CustomEvent<{ view: boolean }>) => void;
//     /** Emitted when an item has been selected. (Bubbled from Task Item children) */
//     "on:he-selected-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type NavHeaderTag = Record<`he-nav-header${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Prevents the desktop / mobile search-boxes from being shown and prevents the search-box toggle from showing. */
//     "disable-search"?: boolean;
//     /** The title to use in the nav-header. Appears next to the navigation-button. */
//     "nav-title"?: string;
//     /** The current view based on the breakpoint. >=768px is desktop, <768 is mobile. */
//     "view"?: 'mobile' | 'desktop';
//     /** Breakpoint for delineating between mobile and desktop views. This should be a plain number like "768" for example. */
//     "breakpoint"?: number;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an alteration to the control's value is committed. This event also fires when the control is cleared or the `Enter` key is pressed. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user presses the `Enter` key or when the the clear button is used. */
//     "on:he-search"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the clear button is activated. */
//     "on:he-clear"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control receives input and its value changes. */
//     "on:he-input"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the fly-in-panel opens. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the fly-in-panel opens and all transitions are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the fly-in-panel closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the fly-in-panel closes and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the fly-in-panel opens and the panel gains focus. Calling `event.preventDefault()` will prevent focus and allow you to set it on a different element in the fly-in-panel, such as an input or button. You can also put `autofocus` attribute on the element instead to set initial focus. */
//     "on:he-initial-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user attempts to close the fly-in panel by clicking the close button, clicking the overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the panel from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the fly-in panel will result in destructive behavior such as data loss. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'close-button' | 'keyboard' | 'overlay' }>) => void;
//     /** Emitted when the status of the overflow changes. Includes the current elements that are overflowed. */
//     "on:he-overflow"?: (e: CustomEvent<{ overflowedElements: HTMLElement[] }>) => void;
//     /** Emitted when the mobile menu's expanded state changes. */
//     "on:he-expanded-change"?: (e: CustomEvent<{ expanded: boolean }>) => void;
//     /** Emitted when the menu's view mode changes. */
//     "on:he-view-change"?: (e: CustomEvent<{ view: boolean }>) => void;
//     /** Emitted when an item has been selected. (Bubbled from Task Item children) */
//     "on:he-selected-change"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// /** An item that appears within a component such as a select list. */
// type OptionTag = Record<`he-option${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The option's value. */
//     "value"?: string | number | undefined;
//     /** Sets the disabled state of the option. */
//     "disabled"?: boolean;
//     /** Hide subtext. */
//     "hide-subtext"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the option is selected. */
//     "on:he-selected"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type PaginationTag = Record<`he-pagination${UserSuffixResolved}`, {
//     /** The selected page number. */
//     "value"?: number;
//     /** The total number of pages. */
//     "page-count"?: number;
//     /** Indicates whether or not page numbers should be displayed. */
//     "non-numeric"?: boolean;
//     /** Indicates if the user is on the first page (non-numeric controls). */
//     "first-page"?: boolean;
//     /** Indicates if the user is on the last page (non-numeric controls). */
//     "last-page"?: boolean;
//     /** Enable this option to prevent the calendar from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** This determines the default direction of the overflow dropdown when space is not available above or below the component. */
//     "overflow-position"?: 'bottom' | 'top' | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the page number changes. */
//     "on:he-page-change"?: (e: CustomEvent<number>) => void;
//     /** Emitted when the "Previous" button is clicked. */
//     "on:he-previous-page"?: (e: CustomEvent<number>) => void;
//     /** Emitted when the "Next" button is clicked. */
//     "on:he-next-page"?: (e: CustomEvent<number>) => void;
//     /** Emitted when the "First" button is clicked - non-numeric. */
//     "on:he-first-page"?: (e: CustomEvent<number>) => void;
//     /** Emitted when the "Last" button is clicked - non-numeric. */
//     "on:he-last-page"?: (e: CustomEvent<number>) => void;
// } & BaseProps>;
// type PageTitleTag = Record<`he-page-title${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** undefined */
//     "active-title"?: Node[];
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TextTag = Record<`he-text${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The text's intended appearance. */
//     "appearance"?: | 'heading-1'
//     | 'heading-2'
//     | 'heading-3'
//     | 'heading-4'
//     | 'heading-5'
//     | 'heading-6'
//     | 'paragraph'
//     | 'small'
//     | 'hero-title'
//     | 'greeting-title'
//     | 'email-header'
//     | 'pane-header'
//     | 'header'
//     | 'subject-title'
//     | 'body-text'
//     | 'metadata'
//     | 'label'
//     | 'menu-item-heading';
//     /** The tag to render internally. Use this as needed to provide better semantics. When unset, no tag will be rendered. */
//     "tag"?: TextTag;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type PushPaneTag = Record<`he-push-pane${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Indicates whether or not the push pane is open. */
//     "open"?: boolean;
//     /** This attribute prevents the "slideout" animation from running on initial page loads. */
//     "has-expanded"?: boolean;
//     /** Convenience attribute for setting the size of the push-pane.
//     Push pane sizes can also be changed using the --size CSS property. */
//     "size"?: PanelSize | undefined;
//     /** The heading to display at the top of the pane opposite the close button. */
//     "heading"?: string;
//     /** The footer to display at the bottom of the pane underneath the content. */
//     "footer"?: string;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted just before the push pane opens. Use `event.preventDefault()` to prevent the push pane from opening. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the push pane opens and all animations are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted just before the push pane closes. Use `event.preventDefault()` to prevent the push pane from closing. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the push pane closes and all animations are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type PaneGroupTag = Record<`he-pane-group${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type PersonaTag = Record<`he-persona${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Provides title text for status badge. */
//     "status-label"?: string | undefined;
//     /** The status indicator to show. */
//     "status-indicator"?: StatusIndicatorKey | undefined;
//     /** The label to use for the persona. This is equivalent to alt text on an `<img>` element. */
//     "label"?: string | undefined;
//     /** Initials to show in the absence of an image. */
//     "initials"?: string | undefined;
//     /** The image URL for the user's persona. */
//     "image"?: string | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the image fails to load. */
//     "on:he-error"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the image loads. */
//     "on:he-load"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type QuickNavTag = Record<`he-quick-nav${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The autocomplete method. */
//     "autocomplete"?: 'inline' | 'list' | 'both' | undefined;
//     /** The search box placeholder text. Defaults to "Filter". */
//     "searchbox-placeholder"?: string;
//     /** Current value. */
//     "value"?: string;
//     /** Index of current selected item. */
//     "selectedIndex"?: number;
//     /** Whether the menu is open or not. */
//     "open"?: boolean;
//     /** Controls the placement of the menu to the trigger. When the position is undefined, it is placed above or below the
//     trigger based on available space. */
//     "position"?: DropdownPositionValues;
//     /** Whether the anchored region is positioned using css "position: fixed". Otherwise the region uses "position: absolute".
//     Fixed placement allows the dropdown contents to break out of parent containers. */
//     "fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The autocomplete search box element. */
//     "prop:searchbox"?: HTMLInputElement;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the quick nav value changes by user interaction. */
//     "on:he-change"?: (e: CustomEvent<{ menuItem: MenuItem, selectedIndex: number, value: string }>) => void;
//     /** Emitted when the clear button is activated. */
//     "on:he-clear"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the search box receives input. */
//     "on:he-input"?: (e: CustomEvent<SearchEventOutput>) => void;
//     /** Emitted when the user presses the `Enter` key or when the the clear button is used. */
//     "on:he-search"?: (e: CustomEvent<SearchEventOutput>) => void;
//     /** Emitted when the user attempts to close the dropdown menu by selecting a menu item, clicking the trigger, clicking outside of the menu, or pressing the escape key. Calling `event.preventDefault()` will prevent the menu from closing. You can check `event.detail.source` to determine how the request was initiated. Avoid using this unless closing the menu will result in destructive behavior and you have provided another method to close it. */
//     "on:he-request-close"?: (e: CustomEvent<{ source: 'change' | 'trigger' | 'document' | 'keyboard' | 'selected-click' }>) => void;
//     /** Emitted when the dropdown menu is shown */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the dropdown menu is shown and all transitions are complete */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the dropdown menu closes. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the dropdown menu closes and all transitions are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type QuickStartCardTag = Record<`he-quick-start-card${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The link to take the user to when the card is activated. */
//     "href"?: string;
//     /** The target attribute or the name of the window to be opened. If none supplied, will default to `_self`. */
//     "target"?: Target;
//     /** Whether link should show the 'OpenInNewWindow' icon. If set, target should be set to `_blank` also. */
//     "external"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type RelativeTimeTag = Record<`he-relative-time${UserSuffixResolved}`, {
//     /** The date from which to calculate time from. */
//     "date"?: Date | string;
//     /** The formatting style to use. */
//     "format"?: 'long' | 'short' | 'narrow';
//     /** When `auto`, values such as "yesterday" and "tomorrow" will be shown when possible. When `always`, values such as
//     "1 day ago" and "in 1 day" will be shown. */
//     "numeric"?: 'always' | 'auto';
//     /** Keep the displayed value up to date as time passes. */
//     "sync"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type RadioGroupTag = Record<`he-radio-group${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The radio group label. Required for proper accessibility. If you need to display HTML, you can use the `label` slot
//     instead. */
//     "label"?: string;
//     /** The radio group's help text. Alternatively, you can use the `help-text` slot. */
//     "help-text"?: string | undefined;
//     /** The selected value of the control. */
//     "value"?: string | number;
//     /** The name assigned to the radio controls. */
//     "name"?: string | undefined;
//     /** This will be true when the control is in an invalid state. Validity is determined by props such as `required`
//     using the browser's constraint validation API. */
//     "invalid"?: boolean;
//     /** Ensures a child radio is checked before allowing the containing form to submit. */
//     "required"?: boolean;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the radio group's selected value changes. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type SelectTag = Record<`he-select${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The input's name attribute. */
//     "name"?: string | undefined;
//     /** The input's value attribute. */
//     "value"?: string | number;
//     /** Delimiter between values in `value` property. */
//     "delimiter"?: string;
//     /** When select is loading. */
//     "loading"?: boolean;
//     /** Determines the autocomplete behavior of the input. */
//     "autocomplete"?: 'none' | 'inline' | 'list' | 'both' | undefined;
//     /** Allows for freeform input and does not restrict value to the list of options. */
//     "freeform"?: boolean;
//     /** Whether the select dropdown is open or not. */
//     "open"?: boolean;
//     /** Allow multiple selections. */
//     "multiple"?: boolean;
//     /** Sets the default position of the expanded options. */
//     "position"?: 'top' | 'bottom';
//     /** Hides empty state. */
//     "hide-empty-state"?: boolean;
//     /** undefined */
//     "fixed-position"?: boolean;
//     /** Enable this attribute to prevent the select options from being clipped when the component is placed inside a container with `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** The input's label. If you need to display HTML, you can use the `label` slot instead. */
//     "label"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Makes the input a required field. */
//     "required"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
//     "invalid"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The input's value as an array. */
//     "prop:valueAsArray"?: Array<string | number>;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the user loses the focus on the component. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the value is changed. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the `autocomplete` attribute is used and the user types in the text box. The value is emitted in the event detail. */
//     "on:he-input"?: (e: CustomEvent<string>) => void;
//     /** Emitted when the user focuses on the component. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type SliderLabelTag = Record<`he-slider-label${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Whether or not to show marks. */
//     "hide-mark"?: boolean;
//     /** Where to place the labels in relation to the parent slider min / max. */
//     "position"?: number;
//     /** If the parent slider is disabled. */
//     "disabled"?: boolean;
//     /** Parent slider orientation, this should get auto updated. */
//     "orientation"?: 'horizontal' | 'vertical';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type SliderTag = Record<`he-slider${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The input's value attribute. */
//     "value"?: string | number;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Marks the slider as readonly disabling changes, but allows keyboard focus. */
//     "readonly"?: boolean;
//     /** Orientation of the slider. */
//     "orientation"?: 'vertical' | 'horizontal';
//     /** This will be true when the control is in an invalid state. Validity in slider inputs is determined by the message
//     provided by the `setCustomValidity` method. */
//     "invalid"?: boolean;
//     /** The input's minimum value. */
//     "min"?: number;
//     /** The input's maximum value. */
//     "max"?: number;
//     /** Stepping interval to specify the level of granularity allowed for value. */
//     "step"?: number;
//     /** The preferred placement of the tooltip. */
//     "tooltip"?: 'top' | 'bottom' | 'none';
//     /** The input's name attribute. */
//     "name"?: string | undefined;
//     /** The input's label. If you need to display HTML, you can use the `label` slot instead. */
//     "label"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Makes the input a required field. */
//     "required"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** A function used to format the tooltip's value. */
//     "prop:tooltipFormatter"?: (value: number) => string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control's value changes. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type SubwayStopTag = Record<`he-subway-stop${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The current active stop. Only one subway stop should be marked `current`. */
//     "current"?: boolean;
//     /** The status to use for the indicator of this individual stop. This will override the status icon set by the parent's status. */
//     "status-icon"?: SubwayStopStatus | undefined;
//     /** Allow clicking this stop to make it the current stop. */
//     "clickable"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** The status of the current stop (readonly). This is controlled by the parent Subway component, but can be used to determine the current stop's present status. */
//     "prop:status"?: SubwayStatus | 'not_started';
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type SubwayTag = Record<`he-subway${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The orientation of the subway stops. */
//     "orientation"?: 'horizontal' | 'vertical';
//     /** Set the status of the current stop. Statuses of stops before the current one will be set to "complete" and stops after
//     will be set to "not_started". If no stops have the `current` attribute all stops will have a status of  "not_started". */
//     "status"?: SubwayStatus;
//     /** Label on progress bar for accessibility. This should be used if you do not have a visible text label above the subway. */
//     "label"?: string | undefined;
//     /** Icon to use for stops with 'complete' status. */
//     "icon-complete"?: string;
//     /** Icon to use for stops with 'error' status. */
//     "icon-error"?: string;
//     /** Icon to use for stops with 'not_started'. */
//     "icon-not-started"?: string;
//     /** Icon to use for stops with 'progress' status. */
//     "icon-progress"?: string;
//     /** Icon to use for stops with 'warning' status. */
//     "icon-warning"?: string;
//     /** Don't put `aria-disabled` on future subway stops. */
//     "enable-future-stops"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Current stop index (readonly). */
//     "prop:currentStopIndex"?: number;
//     /** A function that returns text to use as a label on the visually hidden progress bar that is used for accessibility.
//     If unset, this will be localized to "Step ${current} of ${total}". */
//     "prop:progressLabel"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the current stop is changed. */
//     "on:he-stop-change"?: (e: CustomEvent<{ previousStop: SubwayStop | null, currentStop: SubwayStop | null }>) => void;
//     /** Emitted when the status is changed. */
//     "on:he-status-change"?: (e: CustomEvent<{ status: 'complete' | 'error' | 'progress' | 'warning' }>) => void;
// } & BaseProps>;
// type TabPanelTag = Record<`he-tab-panel${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TabsTag = Record<`he-tabs${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Size of tabs. */
//     "size"?: 'small' | 'large';
//     /** The orientation of the tabs. */
//     "orientation"?: TabsOrientation;
//     /** The id of the active tab. */
//     "active-id"?: string;
//     /** Whether or not to show the active indicator. */
//     "hide-active-indicator"?: boolean;
//     /** Whether or not to enable manual activation of tabs when using keyboard navigation, as per https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ */
//     "manual-activation"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** A reference to the active tab (readonly). */
//     "prop:activeTab"?: HTMLElement;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the active tab changes. */
//     "on:he-change"?: (e: CustomEvent<{ activeTab: HTMLElement }>) => void;
// } & BaseProps>;
// type TabTag = Record<`he-tab${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** When true, the control will be immutable by user interaction. */
//     "disabled"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TextAreaTag = Record<`he-text-area${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The number of rows to display by default. */
//     "rows"?: number;
//     /** Controls how the textarea can be resized. */
//     "resize"?: 'none' | 'vertical' | 'auto';
//     /** The minimum length of input that will be considered valid. */
//     "minlength"?: number;
//     /** The maximum length of input that will be considered valid. */
//     "maxlength"?: number;
//     /** Makes the textarea a required field. */
//     "required"?: boolean;
//     /** This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
//     `required`, `minlength`, and `maxlength` using the browser's constraint validation API. */
//     "invalid"?: boolean;
//     /** Controls whether and how text input is automatically capitalized as it is entered/edited by the user. */
//     "autocapitalize"?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
//     /** (Non-standard - Safari only). A string which indicates whether to activate automatic correction while the user
//     is editing this field. */
//     "autocorrect"?: string;
//     /** Permission the user agent has to provide automated assistance in filling out form field values and the type of
//     information expected in the field. */
//     "autocomplete"?: string;
//     /** Focus on the textarea on page load. */
//     "autofocus"?: boolean;
//     /** Used to customize the label or icon of the Enter key on virtual keyboards. */
//     "enterkeyhint"?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
//     /** Enables spell checking on the textarea. */
//     "spellcheck"?: boolean;
//     /** Hints at the type of data that might be entered by the user while editing the element or its contents. */
//     "inputmode"?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
//     /** The input's value attribute. */
//     "value"?: string | number;
//     /** The input's name attribute. */
//     "name"?: string | undefined;
//     /** The input's label. If you need to display HTML, you can use the `label` slot instead. */
//     "label"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an alteration to the control's value is committed by the user. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control receives input and its value changes. */
//     "on:he-input"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type ToggleTag = Record<`he-toggle${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The toggle's label. Alternatively, you can use the label slot. */
//     "label"?: string;
//     /** The toggle's name attribute. */
//     "name"?: string;
//     /** The toggle's value attribute. */
//     "value"?: string;
//     /** Disables the toggle. */
//     "disabled"?: boolean;
//     /** Draws the toggle in a checked state. */
//     "checked"?: boolean;
//     /** Focus on the checkbox on page load. */
//     "autofocus"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control's checked state changes. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TextFieldTag = Record<`he-text-field${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The input's type. */
//     "type"?: | 'date'
//     | 'datetime-local'
//     | 'email'
//     | 'number'
//     | 'password'
//     | 'search'
//     | 'tel'
//     | 'text'
//     | 'time'
//     | 'url';
//     /** Adds a clear button when the input is populated. */
//     "clearable"?: boolean;
//     /** Adds a password toggle button to password inputs. */
//     "toggle-password"?: boolean;
//     /** Hides the browser's built-in increment/decrement spin buttons for number inputs. */
//     "no-spin-buttons"?: boolean;
//     /** The minimum length of input that will be considered valid. */
//     "minlength"?: number;
//     /** The maximum length of input that will be considered valid. */
//     "maxlength"?: number;
//     /** The input's minimum value. */
//     "min"?: number | string;
//     /** The input's maximum value. */
//     "max"?: number | string;
//     /** The input's step attribute. */
//     "step"?: number;
//     /** A pattern to validate input against. */
//     "pattern"?: string;
//     /** This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
//     `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API. */
//     "invalid"?: boolean;
//     /** Controls whether and how text input is automatically capitalized as it is entered/edited by the user. */
//     "autocapitalize"?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
//     /** (Non-standard - Safari only). A string which indicates whether to activate automatic correction while the user
//     is editing this field. */
//     "autocorrect"?: 'on' | 'off';
//     /** Permission the user agent has to provide automated assistance in filling out form field values and the type of
//     information expected in the field. */
//     "autocomplete"?: string;
//     /** Used to customize the label or icon of the Enter key on virtual keyboards. */
//     "enterkeyhint"?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
//     /** Enables spell checking on the input. */
//     "spellcheck"?: boolean;
//     /** Hints at the type of data that might be entered by the user while editing the element or its contents. */
//     "inputmode"?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
//     /** The input's value attribute. */
//     "value"?: string | number;
//     /** The input's name attribute. */
//     "name"?: string | undefined;
//     /** The input's label. If you need to display HTML, you can use the `label` slot instead. */
//     "label"?: string;
//     /** The input's help text. Alternatively, you can use the help-text slot. */
//     "help-text"?: string | undefined;
//     /** The input's placeholder text. */
//     "placeholder"?: string | undefined;
//     /** Disables the input. */
//     "disabled"?: boolean;
//     /** Makes the input readonly. */
//     "readonly"?: boolean;
//     /** Makes the input a required field. */
//     "required"?: boolean;
//     /** Focus on the input on page load. */
//     "autofocus"?: boolean;
//     /** Hides the input label. */
//     "hide-label"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Gets or sets the current value as a `Date` object. Only valid when `type` is `date`. */
//     "prop:valueAsDate"?: unknown;
//     /** Gets or sets the current value as a number. */
//     "prop:valueAsNumber"?: unknown;
//     /** Gets the current validation message, if one exists. */
//     "prop:validationMessage"?: unknown;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an alteration to the control's value is committed by the user. */
//     "on:he-change"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the clear button is activated. */
//     "on:he-clear"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control receives input and its value changes. */
//     "on:he-input"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control gains focus. */
//     "on:he-focus"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the control loses focus. */
//     "on:he-blur"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TooltipTag = Record<`he-tooltip${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** When the anchor element is separate from the popup, provide its ID or a reference to the anchor element. */
//     "anchor"?: string | Element;
//     /** The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
//     inside of the viewport.
    
//     Note: "left" and "right" placements will be deprecated in a future version. Please use the logical properties
//     "start" and "end", which are based on language direction. */
//     "placement"?: TooltipPlacement;
//     /** Disables the tooltip so it won't show when triggered. */
//     "disabled"?: boolean;
//     /** The distance in pixels from which to offset the tooltip away from its target. */
//     "distance"?: number;
//     /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
//     "open"?: boolean;
//     /** The distance in pixels from which to offset the tooltip along its target. */
//     "skidding"?: number;
//     /** Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
//     options can be passed by separating them with a space. When manual is used, the tooltip must be activated
//     programmatically. */
//     "trigger"?: string;
//     /** Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
//     `overflow: auto|hidden|scroll`. */
//     "fixed-placement"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the tooltip begins to show. */
//     "on:he-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the tooltip has shown and all animations are complete. */
//     "on:he-after-show"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the tooltip begins to hide. */
//     "on:he-hide"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the tooltip has hidden and all animations are complete. */
//     "on:he-after-hide"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TreeItemTag = Record<`he-tree-item${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Expands the tree item. */
//     "expanded"?: boolean;
//     /** Draws the tree item in a selected state. */
//     "selected"?: boolean;
//     /** Disables the tree item. */
//     "disabled"?: boolean;
//     /** Enables lazy loading behavior. */
//     "lazy"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the item expands. */
//     "on:he-expand"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the item expands and all animations are complete. */
//     "on:he-after-expand"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the item collapses. */
//     "on:he-collapse"?: (e: CustomEvent<never>) => void;
//     /** Emitted after the item collapses and all animations are complete. */
//     "on:he-after-collapse"?: (e: CustomEvent<never>) => void;
//     /** Emitted when a lazy item is selected. Use this event to asynchronously load data and append items to the tree before expanding. */
//     "on:he-lazy-load"?: (e: CustomEvent<never>) => void;
//     /** Emitted when items are loaded in the slot. */
//     "on:he-items-loaded"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type TreeTag = Record<`he-tree${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** Specifies the selection behavior of the Tree. */
//     "selection"?: 'single' | 'multiple' | 'leaf';
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when an item gets selected or deselected */
//     "on:he-selection-change"?: (e: CustomEvent<{ selection: TreeItem[] }>) => void;
// } & BaseProps>;
// type WizardItemTag = Record<`he-wizard-item${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** If true, the next button is disabled. */
//     "disable-next"?: boolean;
//     /** If true, the previous button is disabled. */
//     "disable-previous"?: boolean;
//     /** Subway stop label of this step. */
//     "nav-label"?: string;
//     /** Title of the step. */
//     "step-title"?: string;
//     /** The title of the message displayed in the review step when there are errors. */
//     "error-title"?: string;
//     /** The status to use for the indicator of this individual item. This will override the stepStatus set by the wizard. */
//     "status"?: WizardStepStatus | undefined;
//     /** If true, the item is the current active step. Only one wizard item should be marked `current`. */
//     "current"?: boolean;
//     /** If true, the review step will not show the failure icon. */
//     "hide-error-icon-review-step"?: boolean;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type WizardTag = Record<`he-wizard${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** The label of the button on the final step. */
//     "review-label"?: string;
//     /** The label of next button. */
//     "next-label"?: string;
//     /** The label of previous button. */
//     "previous-label"?: string;
//     /** The label of final button shown after success. */
//     "done-label"?: string;
//     /** Title of the wizard. */
//     "wizard-title"?: string;
//     /** Title of the success message. */
//     "success-title"?: string;
//     /** Title of the failure message. */
//     "failure-title"?: string;
//     /** If true, the next button is disabled. This should be set by the child wizard-item. */
//     "disable-next"?: boolean;
//     /** If true, the previous button is disabled. This should be set by the child wizard-item. */
//     "disable-previous"?: boolean;
//     /** If true, the final step of the wizard is not considered as a Review Step so that error message will not be shown in the last step. */
//     "no-review"?: boolean;
//     /** If true, the confirmation screen will not show the success icon. */
//     "hide-success-confirmation-icon"?: boolean;
//     /** If true, the confirmation screen will not show the failure icon. */
//     "hide-failure-confirmation-icon"?: boolean;
//     /** If true, the Complete Button is not disabled even if there are existing error in previous steps. */
//     "complete-on-error"?: boolean;
//     /** If nav-clickable is `all`, all navigation labels are clickable. If nav-clickable is `none`, none of the navigation labels are clickable. If nav-clickable is `visited`, navigation labels of visited steps and the next step are clickable. */
//     "nav-clickable"?: 'all' | 'visited' | 'none';
//     /** The status of the wizard. */
//     "status"?: WizardStatus;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** A function to run before a step will be shown. The step will not be changed until the promise has resolved. Step change will be prevented if the promise is rejected or it resolves to false. */
//     "prop:beforeStep"?: (props: {
//         currentItem: WizardItem;
//         currentIndex: number;
//         previousItem: WizardItem;
//         previousIndex: number;
//     }) => Promise<boolean | void>;
//     /** A function to run before wizard is completed. The wizard will not be complete until the promise has resolved. Completion will be prevented if the promise is rejected or it resolves to false. */
//     "prop:beforeComplete"?: () => Promise<boolean | void>;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the current step of the wizard is changed by clicking on Next or Previous buttons. */
//     "on:he-current-change"?: (e: CustomEvent<{ currentItem: WizardItem, currentIndex: number, previousItem: WizardItem, previousIndex: number }>) => void;
//     /** Emitted when the status is changed. */
//     "on:he-status-change"?: (e: CustomEvent<{ status: 'complete' | 'progress' | 'loading' }>) => void;
//     /** Emitted when a step error is detected. */
//     "on:he-step-error"?: (e: CustomEvent<{ item: WizardItem, index: number }>) => void;
//     /** Emitted when a step error is solved. */
//     "on:he-resolve-error"?: (e: CustomEvent<{ item: WizardItem, index: number }>) => void;
//     /** Emitted when the Done button is clicked or `wizard.close()` is called. */
//     "on:he-close"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the Complete button on the final step is clicked. */
//     "on:he-complete"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the wizard failed due to `throwFullWizardError()`. */
//     "on:he-full-wizard-error"?: (e: CustomEvent<never>) => void;
// } & BaseProps>;
// type WorkspaceCardTag = Record<`he-workspace-card${UserSuffixResolved}`, {
//     "children"?: JSX.Element;
//     /** undefined */
//     "illustration"?: Illustration | undefined;
//     /** Same href you would use if you were using an <a> tag. */
//     "href"?: string | undefined;
//     /** Same target you would use if you were using an <a> tag. */
//     "target"?: Target;
//     /** Heading string to use if no heading is slotted. */
//     "heading"?: string | undefined;
//     /** The dir global attribute is an enumerated attribute that indicates the directionality of the element's text. */
//     "dir"?: 'ltr' | 'rtl' | 'auto';
//     /** The lang global attribute helps define the language of an element. */
//     "lang"?: string;
//     /** Emitted when the component has completed its initial render. */
//     "on:he-ready"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the illustration has loaded. */
//     "on:he-load"?: (e: CustomEvent<never>) => void;
//     /** Emitted when the illustration has failed to load. -1 if an error encountered while running window.fetch. Otherwise, will be a 4xx or 5xx status code. */
//     "on:he-error"?: (e: CustomEvent<{ status: number }>) => void;
// } & BaseProps>;


// declare module "solid-js" {
//     namespace JSX {
//         interface IntrinsicElements extends IconTag, AccordionItemTag, BadgeTag, AccordionTag, ButtonTag, BreadcrumbItemTag, BreadcrumbTag, PopupTag, DatePickerTag, CalendarTag, ButtonGroupTag, CardTag, CalloutTag, MenuItemTag, MenuTag, DropdownTag, ProgressRingTag, ChartTag, CheckboxTag, DetailsTag, CheckboxGroupTag, TeachingBubbleTag, CoachmarkTag, CommandBarTag, VisuallyHiddenTag, MicrofeedbackTag, ProgressTag, CopilotTag, SkeletonTag, RadioTag, DataGridTag, DialogTag, DividerTag, FilterPillTag, FlyInPanelTag, FormatDateTag, FormatNumberTag, GuidedTourTag, HoverCardTag, InlineStatusTag, LayoutTag, MessageBarTag, SearchBoxTag, TaskItemTag, TaskMenuTag, NavHeaderTag, OptionTag, PaginationTag, PageTitleTag, TextTag, PushPaneTag, PaneGroupTag, PersonaTag, QuickNavTag, QuickStartCardTag, RelativeTimeTag, RadioGroupTag, SelectTag, SliderLabelTag, SliderTag, SubwayStopTag, SubwayTag, TabPanelTag, TabsTag, TabTag, TextAreaTag, ToggleTag, TextFieldTag, TooltipTag, TreeItemTag, TreeTag, WizardItemTag, WizardTag, WorkspaceCardTag { }
//     }
// }

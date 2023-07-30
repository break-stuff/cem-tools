# cem-plugin-jet-brains-ide-integration

A custom elements manifest analyzer plugin to generate configuration files for web component integration with JetBrains IDEs

This is a plugin automatically generates a `web-types.json` file for [JetBrains IDEs](https://www.jetbrains.com/) using the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

This config enables JetBrains IDEs to display autocomplete and contextual information about your custom elements.

<!-- ![demo of autocomplete features for custom elements in vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/demo.gif?raw=true) -->

## Usage

### Pre-installation

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

### Install

```bash
npm i -D cem-plugin-jet-brains-ide-integration
```

### Import

```js
// custom-elements-manifest.config.js

import { generateWebTypes } from "cem-plugin-jet-brains-ide-integration";

export default {
  plugins: [generateWebTypes()],
};
```

### Implementation

Once the file has been generated, the IDE should automatically pick it up and you should see your information displayed in the IDE!

If you are deploying your library for others to use, it will also be automatically discovered and integrated by the IDE. No user involvement necessary!

## Configuration

The configuration has the following optional parameters:

```ts
{
export interface Options {
  /** Path to output directory */
  outdir?: string;
  /** Name of the file for your custom data */
  webTypesFileName?: string | null;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** The property name from the component object constructed by the CEM Analyzer */
  descriptionSrc?: "description" | "summary";
  /** Displays the slot section of the element description */
  slotDocs?: boolean;
  /** Displays the event section of the element description */
  eventDocs?: boolean;
  /** Displays the CSS custom properties section of the element description */
  cssPropertiesDocs?: boolean;
  /** Displays the CSS parts section of the element description */
  cssPartsDocs?: boolean;
  /** Excludes any custom element documentation */
  excludeHtml?: boolean;
  /** Excludes any custom CSS documentation */
  excludeCss?: boolean;
  /** Overrides the default section labels in the component description */
  labels?: {
    slots?: string;
    events?: string;
    cssProperties?: string;
    cssParts?: string;
  };
}
```

```js
// custom-elements-manifest.config.js

import { generateWebTypes } from "cem-plugin-jet-brains-ide-integration";

export default {
  plugins: [
    generateWebTypes({
      /** Output directory to write the React wrappers to - default is the root of the project */
      outdir: 'dist',

      /** Name of the file for your custom data */
      webTypesFileName?: string | null;


      /** class names of any components you would like to exclude from the custom data */
      exclude: ['MyInternalElement'],

      /** The property name from the component object constructed by the CEM Analyzer */
      descriptionSrc: "description",

      /** Displays the slot section of the element description */
      slotDocs: true,

      /** Displays the event section of the element description */
      eventDocs: true,

      /** Displays the CSS custom properties section of the element description */
      cssPropertiesDocs: true,

      /** Displays the CSS parts section of the element description */
      cssPartsDocs: true,

      /** Excludes any custom element documentation */
      excludeHtml: false,

      /** Excludes any custom CSS documentation */
      excludeCss: true,

      /** Overrides the default section labels in the component description */
      labels: {
        slots: "Slot Section",
        events: "Custom Events",
        cssProperties: "CSS Variables",
        cssParts: "Style Hooks"
      },
    }),
  ],
};
```

## Example

Here is a basic example of a component configuration using jsDoc:

````ts
/**
 *
 * Radio groups are used to group multiple radio buttons so they function as a single form control.
 *
 * Here is the [documentation](https://my-site.com/docs.md).
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
 * @attribute {1,2,3,4} size - This will control the size of radio buttons
 *
 * @csspart bar - Styles the color of bar
 *
 * @slot - add radio buttons to the `default` slot to create options to your radio group
 * @slot label - placeholder for the radio group label
 *
 * @cssprop {--radius-sm|--radius-md|--radius-lg} --border-radius - Controls the color of foo
 * @cssproperty [--background-color=red] - Controls the color of bar
 *
 * @prop {boolean} prop1 - this toggles some unseen feature
 * @property {number} prop2 - this will adjust the width of the unit
 *
 * @fires custom-event - some description for custom-event
 * @fires {Event} typed-event - some description for typed-event
 * @event {CustomEvent} typed-custom-event - some description for typed-custom-event
 *
 * @reference Documentation - https://my-site.com/docs
 *
 */
class RadioGroup extends HTMLElement {}
````

## Tag Mapping

<!-- ![an example of the jsDoc tags used to create the custom data file](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/tags.png?raw=true) -->

| Tag                      | Description                                                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@summary` / description | This provides the description for the custom element when autocomplete is used or the element is hovered. If no summary is provided, it will fall back to the `description` if it is available.                                         |
| `@attr` / `@attribute`   | This will provide descriptions for each attribute. If you use union types in TypeScript or in the description, these will display as autocomplete options. Values can also be defined in the jsDoc using comma or pipe delimited values |
| `@reference`             | This is a custom tag for this plugin. It creates a reference link at the bottom of the information bubble. If multiple references are present, only the first one will be used.                                                                                            |

The `@summary` and `@attr` / `@attribute` descriptions have limited markdown support and enable you to style text, create links, and add code snippets.

### Descriptions

Using the `descriptionSrc` configuration, you can determine the source of the text that gets displayed in the editor autocomplete bubble. This is useful if you want to provide alternate descriptions for your React users.

If no value is provided, the plugin will use the `summary` property and then fall back to the `description` property if a summary is not available.

<!-- ![description section of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/description.png?raw=true) -->

**Note:** _Descriptions support multiple lines by breaking the comment up into multiple lines whereas summaries do not and will need to be manually added using `\n`._

````js
// description example

/**
 *
 * Radio groups are used to group multiple radios or radio buttons so they function as a single form control. Here is its [documentation](https://my-docsite.com).
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
 */
````

````js
// summary example

/**
 *
 * @summary Radios buttons allow users to select a single option from a group. Here is its [documentation](https://my-site.com/documentation).\n\nUse it like this:\n```html\n<radio-button value="1" disabled>Your label</radio-button>\n```
 *
 * /
````

## Slot Documentation

Slot information will display with the element description during autocompletion or when hovered over. This section can be hidden by setting `slotDocs` to `false` in the config.

<!-- ![slot section of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/slots.png?raw=true) -->

## Event Documentation

Event information will display with the element description during autocompletion or when hovered over. This section can be hidden by setting `eventDocs` to `false` in the config.

<!-- ![events section of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/events.png?raw=true) -->

## CSS Documentation

Component-specific [CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) and [CSS Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) are included in the component documentation. These can be hidden using the `cssPropertiesDocs` and `cssPartsDocs` configuration options respectively.

<!-- ![css properties and css parts sections of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/css.png?raw=true) -->

## Documentation Labels

There may be instances where you may want to translate or override the default section headers. Using the `labels` configuration you can change one or all of the headers for the component description sections.

```js
// custom-elements-manifest.config.js
export default {
  plugins: [
    generateWebTypes({
      ...

      /** Overrides the default section labels in the component description */
      labels: {
        slots: "Placeholders",
        events: "事件",
        cssProperties: "Propiedades CSS",
        cssParts: "Style Hooks"
      },
    }),
  ],
};
```

## CSS Custom Data

Adding the CSS Custom Data file to your config provides you with autocomplete for your component's CSS custom properties.

These values can be added in your component's jsDoc. The `var()` wrapper will be added automatically if they are prefixed with `--`.

```ts
/**
 *
 * @cssprop {--radius-sm|--radius-md|--radius-lg} --border-radius - Controls the border radius of the component
 *
 */
```

** NOTE: ** CSS custom property _values_ are not supported in web-types yet, but it is an upcoming feature. Values will not be autocompleted, but custom CSS properties will.

### CSS Parts

Developers will also receive autocomplete for defined CSS parts.

```ts
/**
 *
 * @csspart radio-label - Applies custom styles the radio group label
 *
 */
```

<!-- ![css custom property autocomplete from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/css_part.gif?raw=true) -->

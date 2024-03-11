# Custom Element (Web Component) JetBrains Integration

This package generates custom `web-types.json` config file for the [JetBrains IDEs](https://www.jetbrains.com/) using the Custom Element Manifest.

This config enables JetBrains IDEs to display autocomplete and contextual information about your custom elements.

![demo of autocomplete features for custom elements in a JetBrains IDE](https://github.com/break-stuff/cem-tools/blob/main/demo/images/jet-brains-integration/jet_brains_demo.gif?raw=true)

## Usage

This package includes two ways to generate the custom data config file:

1. calling a function in your build pipeline
2. as a plugin for the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

### Install

```bash
npm i -D custom-element-jet-brains-integration
```

### Build Pipeline

```js
import { generateJetBrainsWebTypes } from "custom-element-jet-brains-integration";
import manifest from "./path/to/custom-elements.json";

const options = {...};

generateJetBrainsWebTypes(manifest, options);
```

### CEM Analyzer

#### Set-up

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

### Import

```js
// custom-elements-manifest.config.js

import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";

const options = {...};

export default {
  plugins: [
    customElementJetBrainsPlugin(options)
  ],
};
```

### Implementation

Once the file has been generated, the IDE should automatically pick it up and you should see your information displayed in the IDE!

If you are deploying your library for others to use, you will need to update your `package.json` a reference to the generated `web-types.json` file. this will allow it to be discovered and integrated by the IDE. No user involvement necessary!

```json
{
  ...
  "web-types": "./web-types.json"
}
```

Optionally, you can enable the plugin to do this for you automatically using the `packageJson` option. Setting this to `true` will update your `package.json` fille with the appropriate reference.

## Configuration

The configuration has the following optional parameters:

```ts
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
  hideSlotDocs?: boolean;
  /** Displays the event section of the element description */
  hideEventDocs?: boolean;
  /** Displays the CSS custom properties section of the element description */
  hideCssPropertiesDocs?: boolean;
  /** Displays the CSS parts section of the element description */
  hideCssPartsDocs?: boolean;
  /** Displays the methods section of the element description */
  hideMethodDocs?: boolean;
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
    methods?: string;
  };
  /** Used to create links within the component info bubble */
  referencesTemplate?: (name: string, tag?: string) => Reference;
  /** Used to specify the path to the given component's source module, defaults to `module.path` from the CEM.
   *  When `undefined` is returned, no source reference is generated */
  sourceModuleTemplate?: (args: {name: string, tag?: string, modulePath: string}) => string | undefined;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Automatically adds reference to yor package.json */
  packageJson?: boolean;
}
```

Here is an sample configuration.

```js
// custom-elements-manifest.config.js

import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";

const options = {
  /** Path to output directory */
  outdir: 'dist',

  /** Name of the file for your custom data */
  webTypesFileName?: string | null;

  /** class names of any components you would like to exclude from the custom data */
  exclude: ['MyInternalElement'],

  /** The property name from the component object constructed by the CEM Analyzer */
  descriptionSrc: "description",

  /** Displays the slot section of the element description */
  hideSlotDocs: false,

  /** Displays the event section of the element description */
  hideEventDocs: false,

  /** Displays the CSS custom properties section of the element description */
  hideCssPropertiesDocs: false,

  /** Displays the CSS parts section of the element description */
  hideCssPartsDocs: false,

  /** Displays the methods section of the element description */
  hideMethodDocs: true,

  /** Excludes any custom element documentation */
  excludeHtml: false,

  /** Excludes any custom CSS documentation */
  excludeCss: true,

  /** Overrides the default section labels in the component description */
  labels: {
    slots: "Slot Section",
    events: "Custom Events",
    cssProperties: "CSS Variables",
    cssParts: "Style Hooks",
    methods: "Methods"
  },

  /** Used to create an array of links within the component info bubble */
  referencesTemplate?: (name: string, tag?: string) => {
    name: 'Documentation',
    url: `https://example.com/components/${tag}`
  },

  /** Used to specify the path to the given component's source module, defaults to `module.path` from the CEM.
   *  When `undefined` is returned, no source reference is generated */
  sourceModuleTemplate: ({name, tag, modulePath}) => `src/components/${tag}/${name}.ts`,

  /** The property form your CEM component object to display your types */
  typesSrc: 'expandedType'
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
 */
class RadioGroup extends HTMLElement {}
````

## Tag Mapping

<!-- ![an example of the jsDoc tags used to create the custom data file](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/tags.png?raw=true) -->

| Tag                      | Description                                                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@summary` / description | This provides the description for the custom element when autocomplete is used or the element is hovered. If no summary is provided, it will fall back to the `description` if it is available.                                         |
| `@attr` / `@attribute`   | This will provide descriptions for each attribute. If you use union types in TypeScript or in the description, these will display as autocomplete options. Values can also be defined in the jsDoc using comma or pipe delimited values |

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

Slot names for child elements of a component will be displayed as part of the autocomplete popup when using the `slot` attribute. Slot information will display with the element description during autocompletion or when hovered over. This section can be hidden by setting `hideSlotDocs` to `true` in the config.

<!-- ![slot section of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/slots.png?raw=true) -->

## Event Documentation

Event information will display with the element description during autocompletion or when hovered over. This section can be hidden by setting `hideEventDocs` to `true` in the config.

<!-- ![events section of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/events.png?raw=true) -->

## CSS Documentation

Component-specific [CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) and [CSS Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) are included in the component documentation. These can be hidden using the `hideCssPropertiesDocs` and `hideCssPartsDocs` configuration options respectively.

<!-- ![css properties and css parts sections of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/css.png?raw=true) -->

## Documentation Labels

There may be instances where you may want to translate or override the default section headers. Using the `labels` configuration you can change one or all of the headers for the component description sections.

```js
// custom-elements-manifest.config.js
export default {
  plugins: [
    customElementJetBrainsPlugin({
      ...

      /** Overrides the default section labels in the component description */
      labels: {
        slots: "Placeholders",
        events: "事件",
        cssProperties: "Propiedades CSS",
        cssParts: "Style Hooks",
        methods: "Methods"
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

## References

At the bottom of each component info popup there is a place where you can set reference link. The options provide a hook that will allow you to add your own link to the popup. A popular usage is linking to documentation. This is especially nice if you have versioned documentation, so you provide developers with contextual help by linking them directly to the version of the documentation they are using.

```ts
const options = {
  ...
  referencesTemplate: (name, tag) => {
    name: 'Documentation',
    url: `https://example.com/${version}/components/${tag}`
  }
}
```

## Custom Types

If you are generating a custom types property on your CEM component object and you would like to reference that instead of the default type, you can use the `typesSrc` option to specify the name of the property. If none is specified or if no value is found, it will fall back to the `type` property. If you are using the CEM Analyzer, you can leverage [this tool](https://www.npmjs.com/package/cem-plugin-expanded-types) to generate expanded types.

## Scoping Tags

If your project is scoping components using prefixes or suffixes in the tag name, you can generate a custom data config file using your scoping using the `prefix` or `suffix` option (`prefix: "test_"` => `test_my-element`).

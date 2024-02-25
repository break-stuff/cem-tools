# Custom Elements Svelte Integration

This package is designed to generate types for your custom elements in a [Svelte](https://svelte.dev/) project. These types will generate type validation for your custom elements.

> ***NOTE:*** These types only provide type-safety and not documentation or auto-complete. If you would like add these features to your Svelte projects, consider using the [VS Code](https://www.npmjs.com/package/custom-element-vs-code-integration) and and [JetBrains IDE](https://www.npmjs.com/package/custom-element-jet-brains-integration) integration packages.

## Usage

This package includes two ways to generate the custom data config file:

1. calling a function in your build pipeline
2. as a plugin for the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/)

### Install

```bash
npm i -D custom-element-svelte-integration
```

### Build Pipeline

```js
import { generateSvelteTypes } from "custom-element-svelte-integration";
import manifest from "./path/to/custom-elements.json";

const options = {...};

generateSvelteTypes(manifest, options);
```

### CEM Analyzer

#### Set-up

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

#### Import

```js
// custom-elements-manifest.config.js

import { customElementSveltePlugin } from "custom-element-svelte-integration";

const options = {...};

export default {
  plugins: [
    customElementSveltePlugin(options)
  ],
};
```

## Configuration

The configuration has the following optional parameters:

```ts
{
  /** Path to output directory */
  outdir?: string;
  /** File name for the types */
  fileName?: string | null;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** The property name from the component object that you would like to use for the description of your component */
  descriptionSrc?: "description" | "summary" | string;
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
  /** Overrides the default section labels in the component description */
  labels?: {
    slots?: string;
    events?: string;
    cssProperties?: string;
    cssParts?: string;
    methods?: string;
  };
  /** Used to get type reference for components from a single source */
  globalTypePath?: string;
  /** Used to get types from specific path for a given component */
  componentTypePath?: (name: string, tag?: string) => string;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Used to add global element props to all component types */
  globalEvents?: string;
}
```

## Implementation

Now you can add a reference to the types in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "types": ["my-library/custom-elements-svelte"],
  },
}
```

## Configuration

### Output

You can configure the destination and the file name of the generated type file using the `outdir` and `fileName` configuration.

```ts
{
  /** Path to output directory */
  outdir: 'dist',
  /** File name for the types */
  fileName: 'svelte-integration.d.ts'
}
```

### Descriptions

Using the `descriptionSrc` configuration, you can determine the source of the text that gets displayed in the editor autocomplete bubble. This is useful if you want to provide alternate descriptions for your React users.

If no value is provided, the plugin will use the `summary` property and then fall back to the `description` property if a summary is not available.

![description section of autocomplete popup from vs code](https://github.com/break-stuff/cem-plugin-vs-code-custom-data-generator/blob/main/demo/images/description.png?raw=true)

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

### Contextual Information

The contextual information provided when hovering over the custom element can be configured using the `hideSlotDocs`, `hideEventDocs`, `hideCssPropertiesDocs`, `hideCssPartsDocs`, as well as the `hideMethodDocs`. The headings for each of the sections can also be configured using the `labels` option.

### Types

If your components were built using TypeScript, you should define a path to your type declarations to pass that type-safety on to the Svelte project.

> _***NOTE:*** All type paths should be relative to the location specified in the `outdir` option._

If your types are rolled up into a single type declaration file, you can set the `globalTypePath` option to the location of that file.

```ts
{
  globalTypePath: ".dist/types.d.ts";
}
```

If each of the component type definitions are split out by each component, you can use the `componentTypePath` to reference individual component paths.

```ts
{
  componentTypePath: (name, tag) => `./types/${tag}/${name}.d.ts`;
}
```

> _***NOTE:*** It's important to note that if a type path is not provided, the generator will fall back to the type defined in the Custom Elements Manifest._

#### Typing Events

If you are using the `globalTypePath` or `componentTypePath`, it's important to appropriately type your events. There are a few things you can do to provide a good experience for the developers using your components:

- use types or interfaces when working with complex types. This allows you to maintain the type in a single place and reduce the risk of types getting out of sync.
- along the same lines, avoid using generics as they can be difficult to resolve. The integration will skip importing generic event types.

```ts
// DON"T DO THIS

/**
 * @event {{ message: string }} update - emitted when updated
 * @event {"value1" | "value2" | "value3"} input - emitted when input
 * @event {InputSave<MyData>} save - emitted when saved
 */
export class MyComponent extents HTMLElement
```

```ts
// DO THIS

export type MyComponentUpdateEvent = { 
  message: string 
};

export type MyComponentInputEvent = "value1" | "value2" | "value3";

export type MyComponentSaveEvent = InputSave<MyData>;

/**
 * @event {MyComponentUpdateEvent} update - emitted when updated
 * @event {MyComponentInputEvent} input - emitted when updated
 * @event {MyComponentSaveEvent} save - emitted when saved
 */
export class MyComponent extents HTMLElement
```

#### Custom Types

If you have custom types configured in your Custom Elements Manifest and do not have types or are unable to use them, you can specify the property name of that type using the `typeSrc` option.

### Adding Events

By default the types will be mapped with the attributes, properties, and custom events that have been documented for it. There are, however the native events that are available to them because they are HTML elements. If you would like to add the events to your types, you can assign them to the `globalEvents` option and they will be included in your component's type.

```ts
{
  globalEvents: `
  // Mouse Events

  /** Triggered when the element is clicked by the user by mouse or keyboard. */
  onClick?: (event: MouseEvent) => void;

  // Keyboard Events

  /** Fired when a key is pressed down. */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** Fired when a key is released.. */
  onKeyUp?: (event: KeyboardEvent) => void;
  /** Fired when a key is pressed down. */
  onKeyPressed?: (event: KeyboardEvent) => void;

  // Focus Events

  /** Fired when the element receives focus, often triggered by tab navigation. */
  onFocus?: (event: FocusEvent) => void;
  /** Fired when the element loses focus. */
  onBlur?: (event: FocusEvent) => void;
  `;
}
```

> _***NOTE:*** It is not required, but highly recommended that you include descriptions for these events as code editors will often provide that information._

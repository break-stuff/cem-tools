# Custom Elements Manifest Deprecator

This package is designed to provide a mechanism to deprecate items in your the Custom Elements Manifest.

The standard approach is to use the `@deprecated` tag in the JSDoc descriptions.

```ts
/**
 * @deprecated This deprecates the class
 *
 */
class MyElement extends HTMLElement {
  /** @deprecated This deprecates the property */
  deprecatedProperty = "some value";
}
```

The problem is that you can't add it to other elements with JSDoc tags.

```ts
/**
 * @attr {boolean} disabled - disables the element
 *
 * @csspart bar - Styles the color of bar
 *
 * @slot - This is a default/unnamed slot
 * @slot container - You can put some elements here
 *
 * @cssprop --text-color - Controls the color of foo
 *
 * @prop {boolean} prop1 - some description
 *
 * @fires custom-event - some description for custom-event
 * @event {MyEventDetail} typed-custom-event - some description for typed-custom-event
 */
class MyElement extends HTMLElement {}
```

This plugin allows you to deprecate these JSDoc elements using the `(@deprecated)` string (or one of your choosing). Without wrapping it in the parenthesis, it will deprecate the class instead of the JSDoc element.

```ts
/**
 * @attr {boolean} disabled - (@deprecated) disables the element
 *
 * @csspart bar - (@deprecated) Styles the color of bar
 *
 * @slot - (@deprecated) This is a default/unnamed slot
 * @slot container - (@deprecated) You can put some elements here
 *
 * @cssprop --text-color - (@deprecated) Controls the color of foo
 *
 * @prop {boolean} prop1 - (@deprecated) some description
 *
 * @fires custom-event - (@deprecated) some description for custom-event
 * @event {MyEventDetail} typed-custom-event - (@deprecated) some description for typed-custom-event
 */
class MyElement extends HTMLElement {}
```

Feel free to test it out in this demo environment.

<div style="text-align: center; margin-top: 32px;">
  <a href="https://stackblitz.com/github/break-stuff/cem-tools/tree/main/packages/deprecator/demo?title='CEM Deprecator'&file=src%2Fmy-element.ts">
    <img
      alt="Open in StackBlitz"
      src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
    />
  </a>
</div>

## Usage

This package includes two ways to generate an updated Custom Elements Manifest:

1. calling a function in your build pipeline
2. as a plugin for the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

### Install

```bash
npm i -D custom-elements-manifest-deprecator
```

### Build Pipeline

```js
import { updateCemDeprecations } from "custom-elements-manifest-deprecator";
import manifest from "./path/to/custom-elements.json";

const options = {...};

updateCemDeprecations(manifest, options);
```

### CEM Analyzer

#### Set-up

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

### Import

```js
// custom-elements-manifest.config.js

import { cemInheritancePlugin } from "custom-elements-manifest-deprecator";

const options = {
  /* add options here */
};

export default {
  plugins: [cemDeprecatorPlugin(options)],
};
```

## Configuration

There are a number of configurations you can apply to customize the output for your components.

```ts
interface Options {
  /** The value used to indicate an element is deprecated - default is "(@deprecated)" */
  indicator?: string;
  /** When `true` the indicator will be included in the final description - default is `false` */
  preserveIndicator?: boolean;
  /** Name of the updated CEM file - default is "custom-elements.json" */
  fileName?: string;
  /** Path to output directory */
  outdir?: string;
  /** Class names of any components you would like to exclude from inheritance */
  exclude?: string[];
}
```

### Indicator

This value is used to indicate whether the tag element is deprecated. The default value is "(@deprecated)", but you can set this to whatever value you would like - "retired", '@legacy', etc.

### Preserve Indicator

When the indicator is found in a description, it will remove the value from the string (similar to the default `@deprecated` tag behavior). If you would like to keep the indicator in the description, you can se the `preserveIndicator` property to `true`.

### `fileName` and `outdir`

If you would like to add your updated Custom Elements Manifest to a specific location in your project, you can use the `fileName` and `outdir` setting for that. Otherwise, the updated manifest will be default location - `./custom-elements.json`.

**_NOTE:_** If you are using the CEM Analyzer, you do not need to set these options. It will allow the analyzer to handle it based on your configuration.

### `exclude`

If there are any classes you would like to exclude from inheritance, you can specify the class names here in a string array.

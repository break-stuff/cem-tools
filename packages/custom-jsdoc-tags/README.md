# CEM Analyzer Custom JSDoc Plugin

This is a plugin maps custom JSDoc tags on your component classes to properties in Custom Elements Manifest using the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

```js
// my-component.ts

/**
 *
 * My custom element does some amazing things
 *
 * @tag my-element
 *
 * @dependency icon
 * @dependency button
 *
 * @since 1.2.5
 *
 */
export class MyElement extends HTMLElement {
```

```json
{
  "kind": "class",
  "description": "My custom element does some amazing things",
  "name": "MyElement",
  "tagName": "my-element",
  "since": {
    "name": "1.2.5",
    "description": ""
  },
  "dependencies": [
    {
      "name": "icon",
      "description": ""
    },
    {
      "name": "button",
      "description": ""
    }
  ]
}
```

## How It Works

When the analyzer encounters a specified tag, it will add it to a corresponding property in the Custom Elements Manifest for the class with the following data (depending on what you have specified in your tag).

```js
// my-component.ts

/**
 *
 * @custom tag1 - This tag does something incredible
 *
 */
export class MyElement extends HTMLElement {
```

```json
{
  "custom": {
    "name": "tag1",
    "description": "This tag does something incredible"
  }
}
```

For you TypeScript fans out there...

```ts
[key: string]: {
  name?: string;
  type?: {
    text: string;
  };
  default?: string;
  description?: string;
}
```

If it encounters another tag by the same name, it will convert the value to an array and add the new tag information to it.

```js
// my-component.ts

/**
 *
 * @custom tag1 - This tag does something incredible
 * @custom tag2 - This tag also does something incredible
 *
 */
export class MyElement extends HTMLElement {
```

```json
{
  "custom": [
    {
      "name": "tag1",
      "description": "This tag does something incredible"
    },
    {
      "name": "tag2",
      "description": "This tag also does something incredible"
    }
  ]
}
```

The tag accepts the standard JSDoc syntax so you can specify a name, type, default value, and description.

```js
/**
 * @custom {string | undefined} [tag1=Hello world!] - This tag does something incredible
 */
```

```json
{
  "custom": {
    "name": "tag1",
    "type": {
      "text": "string | undefined"
    },
    "default": "Hello world!",
    "description": "This tag does something incredible"
  }
}
```

## Usage

### Pre-installation

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

### Install

```bash
npm i -D cem-plugin-custom-jsdoc-tags
```

### Implementation

```js
// custom-elements-manifest.config.js

import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";

export default {
  ...
  /** Provide custom plugins */
  plugins: [
    customJSDocTagsPlugin({
      tags: {
        since: {},
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
      }
    }),
  ],
};
```

## Configuration

The plugin takes the following options:

```ts
interface Options {
  /** The custom JSDoc tags you want mapped */
  tags?: {
    /** The name of the JSDoc tag to include in the Custom Elements Manifest */
    [key: string]: {
      /** Alternative name to use in the Custom Elements Manifest */
      mappedName?: string;
      /** Set to true to always make the property value an array */
      isArray?: boolean;
    };
  };
  /** Hides logs produced by the plugin */
  hideLogs: boolean;
  /** Prevents plugin from executing */
  skip: boolean;
}
```

### Tags

The property used to identify the configuration for your JSDoc is the name of the tag you are using in your component. If you don't have any configurations for the tag, you can just add an empty object as the property value.

```ts
// my-component.ts

/**
 *
 * @since 1.2.5
 *
 */
export class MyElement extends HTMLElement {
```

```js
// custom-elements-manifest.config.js

export default {
  ...
  plugins: [
    customJSDocTagsPlugin({
      tags: {
        since: {},
      }
    }),
  ],
};
```

```json
{
  "name": "MyElement",
  "since": {
    "name": "1.2.5",
    "description": ""
  }
}
```

### Mapped Name

If you need the property name in the custom Elements Manifest to differ from the JSDoc name, you can use the `mappedName` setting. This is helpful for tags that are singular, but will be accumulated into an array in the manifest, so you want to make the property name plural.

```ts
// my-component.ts

/**
 *
 * @dependency icon
 * @dependency button
 *
 */
export class MyElement extends HTMLElement {
```

```js
// custom-elements-manifest.config.js

export default {
  ...
  plugins: [
    customJSDocTagsPlugin({
      tags: {
        dependency: {
          mappedName: 'dependencies',
        },
      }
    }),
  ],
};
```

```json
{
  "name": "MyElement",
  "dependencies": [
    {
      "name": "icon",
      "description": ""
    },
    {
      "name": "button",
      "description": ""
    }
  ]
}
```


### Is Array

If you would always like the property value in the manifest to always be an array - even if there is a single value, setting the `isArray` value to `true` will convert the value to an array.

```js
// custom-elements-manifest.config.js

export default {
  ...
  plugins: [
    customJSDocTagsPlugin({
      tags: {
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
      }
    }),
  ],
};
```

```ts
// my-component.ts

/**
 *
 * @dependency icon
 *
 */
export class MyElement extends HTMLElement {
```

```json
{
  "name": "MyElement",
  "dependencies": [
    {
      "name": "icon",
      "description": ""
    }
  ]
}
```

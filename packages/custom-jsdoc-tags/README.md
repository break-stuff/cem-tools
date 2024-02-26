# CEM Analyzer Custom JSDoc Plugin

This is a plugin maps custom JSDoc tags you create to properties in Custom Elements Manifest using the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

```ts
// my-component.ts

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
  ],
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

import { getTsProgram, expandTypesPlugin } from "cem-plugin-custom-jsdoc-tags";

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

You have the ability to change the property name that is assigned to the expanded type. By default it is `expandedType`, but if you wanted to save it as something like `parsedType`, you can set that as part of the plugin options.

```js
// custom-elements-manifest.config.js

export default {
  ...

  /** Provide custom plugins */
  plugins: [expandTypesPlugin({ propertyName: "parsedType" })],
};
```

Once that has been updated, the expanded type will appear under the new property name.

```json
{
  "kind": "field",
  "name": "target",
  "description": "A lookup type for example",
  "attribute": "target",
  "type": {
    "text": "Target | undefined"
  },
  "parsedType": {
    "text": "'_blank' | '_self' | '_parent' | '_top' | undefined"
  }
}
```

> **NOTE:** As you can see in the example above, the structure will follow the same pattern as the `type` object in that your custom name will have a property called `text`.
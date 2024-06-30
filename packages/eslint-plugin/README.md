# Custom Element ESLint Plugin

This plugin creates custom rules to lint custom elements in HTML.

![demo of eslint validation for custom elements](https://github.com/break-stuff/cem-tools/blob/main/demo/images/eslint/custom_element_eslint_demo.gif?raw=true)

<!-- <a href="https://stackblitz.com/github/break-stuff/cem-tools/tree/main/packages/eslint-plugin/demo">
  <img
    alt="Open in StackBlitz"
    src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"
  />
</a> -->

## Usage

This plugin leverages the `@html-eslint/eslint-plugin` and `@html-eslint/parser` packages to parse the DOM.

```bash
npm install -D eslint-plugin-custom-element eslint @html-eslint/eslint-plugin @html-eslint/parser
```

> **_NOTE:_** If you would like to have these rules automatically generated for you, check out the [Custom Element ESLint Rule Generator](https://www.npmjs.com/package/custom-element-eslint-rule-generator).

### Configuration

```js
// eslint.config.js

import customElement from "eslint-plugin-custom-element";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

export default [
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      html,
      "custom-element": customElement,
    },
    rules: {
      /* Add configuration for custom element rules */
    },
  },
];
```

> For more configuration options, check out the [HTML ESLint docs](https://html-eslint.org/docs/getting-started).

## Rules

The plugin provides predefined rules for validating custom element APIs.

### Constrained Attributes

The `custom-element/constrained-attrs` rule provides validation for attributes with predefined acceptable values.

```js
// eslint.config.js

export default [
  {
    /* ...plugin config... */
    rules: {
      "custom-element/constrained-attrs": [
        "error",
        {
          tag: "my-button",
          attr: "appearance",
          values: ["primary", "outline", "default", "transparent"],
        },
      ],
    },
  },
];
```

### Deprecated Attributes

The `custom-element/no-deprecated-attrs` rule notifies the developer when an attribute for a custom element is deprecated.

```js
// eslint.config.js

export default [
  {
    /* ...plugin config... */
    rules: {
      "custom-element/no-deprecated-attrs": [
        "warn",
        {
          tag: "my-button",
          attr: "size",
        },
      ],
    },
  },
];
```

### Deprecated Tag

The `custom-element/no-deprecated-tags` rule notifies the developer when a custom element is deprecated.

```js
// eslint.config.js

export default [
  {
    /* ...plugin config... */
    rules: {
      "custom-element/no-deprecated-tags": [
        "warn",
        {
          tag: "your-element",
        },
      ],
    },
  },
];
```

### Required Attributes

The `custom-element/required-attrs` rule notifies the developer if an expected attribute is not present on the custom element.

```js
// eslint.config.js

export default [
  {
    /* ...plugin config... */
    rules: {
      "custom-element/required-attrs": [
        "error",
        {
          tag: "my-button",
          attr: "type",
        },
      ],
    },
  },
];
```

### Boolean Attribute Values

The `custom-element/no-boolean-attr-values` rule notifies users that setting a value on `boolean` attributes will result in it always being `true` (ie - `<my-button disabled="false"></my-button>` will result in a disabled button).

```js
// eslint.config.js

export default [
  {
    /* ...plugin config... */
    rules: {
      "custom-element/no-boolean-attr-values": [
        "error",
        {
          tag: "my-button",
          attr: "disabled",
        },
      ],
    },
  },
];
```

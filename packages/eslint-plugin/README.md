# Custom Element ES Lint Plugin

This plugin creates custom rules to lint custom elements in HTML.

## Usage

This plugin leverages the `@html-eslint/eslint-plugin` and `@html-eslint/parser` packages to parse the DOM and leverage ESLint for validation

```bash
npm install -D eslint-plugin-custom-element eslint @html-eslint/eslint-plugin @html-eslint/parser
```

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

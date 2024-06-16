# Custom Element ESLint Rule Generator

This package takes information in your Custom Elements Manifest and generates rules that can be used in the [Custom Element ESLint Plugin](https://www.npmjs.com/package/eslint-plugin-custom-element). These rules validate the custom elements in your HTML.

## Usage

This package includes two ways to generate the custom data config file: 
1. calling a function in your build pipeline 
2. as a plugin for the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/)

### Install

```bash
npm install -D custom-element-eslint-rule-generator
```

### Build Pipeline

```js
import { generateEsLintLintRules } from "custom-element-eslint-rule-generator";
import manifest from "./path/to/custom-elements.json" assert {type: 'json'};

const options = {...};

generateEsLintLintRules(manifest, options);
```

### CEM Analyzer

#### Set-up

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

#### Import

```js
// custom-elements-manifest.config.js

import { customEsLintRuleGeneratorPlugin } from "custom-element-eslint-rule-generator";

const options = {...};

export default {
  plugins: [
    customEsLintRuleGeneratorPlugin(options)
  ],
};
```

## Implementation

To use this package, you will need to install the following packages:  

- `eslint` - to handle the linting and error reporting
- `@html-eslint/eslint-plugin` and `@html-eslint/parser` - to parse the DOM and leverage ESLint for validation
- `eslint-plugin-custom-element` - provides the required validation for the generated rules

```bash
npm install -D eslint-plugin-custom-element eslint @html-eslint/eslint-plugin @html-eslint/parser
```

The following is a basic setup to use the custom rules

```js
// eslint.config.js

import customElementRules from "path/to/custom-rules.js";

export default [
  /* Other ESLint rules */
  customElementRules.recommendedConfig
];
```

## Configuration

```js
type ErrorLevel = "off" | "warn" | "error" | 0 | 1 | 2;

/** Configuration options */
type Options = {
  /** Path to output directory */
  outdir?: string;
  /** The of the loader file */
  fileName?: string;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** Name of the property in the Custom Elements Manifest that contains the list of required attributes */
  requiredAttrsProp?: string;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Adds a prefix to tag names */
  prefix?: string;
  /** Adds a suffix to tag names */
  suffix?: string;
  /** Sets default rule error levels */
  defaultRuleErrorLevels: {
    // custom-element eslint rules

    /** validates attribute where predefined values have been defined - default 'error' */
    constrainedAttrs: ErrorLevel;
    /** reports issue when boolean attributes have been assigned a value - default 'error' */
    noBooleanAttrValues: ErrorLevel;
    /** identifies attributes that have been deprecated - default 'warn' */
    noDeprecatedAttrs: ErrorLevel;
    /** identifies elements that have been deprecated - default 'warn' */
    noDeprecatedTags: ErrorLevel;
    /** identifies elements that require specific attributes - default 'error' */
    requiredAttrs: ErrorLevel;

    // HTML eslint rules - https://html-eslint.org/docs/rules (these have all been disabled by default)
    noDuplicateAttrs: ErrorLevel;
    noDuplicateId: ErrorLevel;
    noInlineStyles: ErrorLevel;
    noObsoleteTags: ErrorLevel;
    noRestrictedAttrValues: ErrorLevel;
    noRestrictedAttrs: ErrorLevel;
    noScriptStyleType: ErrorLevel;
    noTargetBlank: ErrorLevel;
    requireAttrs: ErrorLevel;
    requireButtonType: ErrorLevel;
    requireClosingTags: ErrorLevel;
    requireDoctype: ErrorLevel;
    requireLiContainer: ErrorLevel;
    requireMetaCharset: ErrorLevel;
    noMultipleH1: ErrorLevel;
    requireLang: ErrorLevel;
    requireMetaDescription: ErrorLevel;
    requireOpenGraphProtocol: ErrorLevel;
    requireTitle: ErrorLevel;
    noAbstractRoles: ErrorLevel;
    noAccesskeyAttrs: ErrorLevel;
    noAriaHiddenBody: ErrorLevel;
    noNonScalableViewport: ErrorLevel;
    noPositiveTabindex: ErrorLevel;
    noSkipHeadingLevels: ErrorLevel;
    requireFrameTitle: ErrorLevel;
    requireImgAlt: ErrorLevel;
    requireMetaViewport: ErrorLevel;
    elementNewline: ErrorLevel;
    idNamingConvention: ErrorLevel;
    indent: ErrorLevel;
    lowercase: ErrorLevel;
    noExtraSpacingAttrs: ErrorLevel;
    noMultipleEmptyLines: ErrorLevel;
    noTrailingSpaces: ErrorLevel;
    quotes: ErrorLevel;
    sortAttrs: ErrorLevel;
  };
};
```

## Editor Support

Adding support for linting HTML (and other file formats with markup), will be specific to your editor.

- [Visual Studio](https://learn.microsoft.com/en-us/visualstudio/javascript/linting-javascript)
- [JetBrains](https://www.jetbrains.com/help/idea/eslint.html)

### VS Code

For VS Code, be sure to install the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Update your `.vscode/settings.json` file with the following configuration:

```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "html" // Add "html" to enable linting `.html` files.
  ],
}
```
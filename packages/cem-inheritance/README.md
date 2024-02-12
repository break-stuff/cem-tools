# Custom Elements Manifest Inheritance

This package is designed to update the Custom Elements Manifest data about your components with all of the information (attributes, properties, methods, CSS custom properties, CSS parts, and events) from the components or classes they are being inherited from.

## Usage

This package includes two ways to generate an updated Custom Elements Manifest:

1. calling a function in your build pipeline
2. as a plugin for the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

### Install

```bash
npm i -D custom-elements-manifest-inheritance
```

### Build Pipeline

```js
import { updateCemInheritance } from "custom-elements-manifest-inheritance";
import manifest from "./path/to/custom-elements.json";

const options = {...};

updateCemInheritance(manifest, options);
```

### CEM Analyzer

#### Set-up

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

### Import

```js
// custom-elements-manifest.config.js

import { cemInheritancePlugin } from "custom-elements-manifest-inheritance";

const options = {...};

export default {
  plugins: [
    cemInheritancePlugin(options)
  ],
};
```

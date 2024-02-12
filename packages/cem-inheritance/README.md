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

## Configuration

There are a number of configurations you can apply to customize the output for your components.

```ts
interface Options {
  /** Name of the updated CEM file - default is "custom-elements.json" */
  fileName?: string;
  /** Path to output directory */
  outdir?: string;
  /** Class names of any components you would like to exclude from inheritance */
  exclude?: string[];
  /** Aspects of your class that you would like to exclude from it and its children */
  omit?: Omit;
  /** Skip inheritance for an aspect of your components */
  ignore?: string[];
  /** External CEMs that your components extend */
  externalManifests?: any[];
}
```

### `fileName` and `outdir`

If you would like to add your updated Custom Elements Manifest to a specific location in your project, you can use the `fileName` and `outdir` setting for that. Otherwise, the updated manifest will be default location - `./custom-elements.json`.

**_NOTE:_** If you are using the CEM Analyzer, you do not need to set these options. It will allow the analyzer to handle it based on your configuration.

### `exclude`

If there are any classes you would like to exclude from inheritance, you can specify the class names here in a string array.

### `omit`

If there are any parts of your parent classes you do not want to have inherited, you can specify them in the `omit` setting.

```ts
interface Omit {
  [key: string]: {
    cssProperties?: string[];
    cssParts?: string[];
    members?: string[];
    attributes?: string[];
    events?: string[];
    slots?: string[];
  };
}
```

This setting is an object where the class name is the key and any aspect of the inherited members can include a string array of the name of the feature to be excluded.

```ts
const options = {
  omit: {
    MyElement: {
      cssProperties: ["--my-css-property"],
      events: ["my-event", "my-other-event"],
    },
  },
};
```

### `ignore`

Some CEM generators will already handle some aspects of the inheritance for you or you may want to exclude an aspect of the inheritance and manage it yourself. If that's the case, you can use the `ignore` setting to skip an area of inheritance.

```ts
const options = {
  ignore: ["attributes", "members"],
};
```

### `externalManifests`

If your components are being extended from an existing library, you can import that library's manifest and add it to the `externalManifests` array. You can add as many manifest to this as you need. The external manifest's components will not be added to your manifest, but only update the information for your components.

```ts
import externalCEM from "path/to/external/custom-elements.json" assert { type: "json" };

const options = {
  externalManifests: [externalCEM],
};
```

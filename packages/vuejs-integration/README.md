# Custom Elements Vue.js Integration

This package is designed to generate types for your custom elements in a project using [Vue.js](https://vuejs.org/). These types will generate inline documentation, autocomplete, and type-safe validation for your custom elements in a Vue.js application.

> _***NOTE:*** This will generate types for both vue templates and JSX._

<!-- ![demo of autocomplete features for custom elements in a solidjs project](https://github.com/break-stuff/cem-tools/blob/main/demo/images/solid-js-integration/solid-js-integration.gif?raw=true) -->

## Usage

This package includes two ways to generate the custom data config file:

1. calling a function in your build pipeline
2. as a plugin for the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/)

### Install

```bash
npm i -D custom-element-vuejs-integration
```

### Build Pipeline

```js
import { generateVuejsTypes } from "custom-element-vuejs-integration";
import manifest from "./path/to/custom-elements.json" assert { type: "json" };

const options = {
  outdir: "./",
  fileName: "my-library-vuejs.d.ts",
  globalTypePath: "./dist/components/index.js", // relative to `outdir`
};

generateVuejsTypes(manifest, options);
```

#### Update `tsconfig.json` with Local Reference

Now you can add a reference to the types in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "types": ["./my-library-vuejs"]
  }
}
```

### CEM Analyzer

#### Set-up

Ensure the following steps have been taken in your component library prior to using this plugin:

- Install and set up the [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)
- Create a [config file](https://custom-elements-manifest.open-wc.org/analyzer/config/#config-file)

#### Import

```js
// custom-elements-manifest.config.js

import { customElementVuejsPlugin } from "custom-element-vuejs-integration";

const options = {
  outdir: "./dist",
  fileName: "my-library-vuejs.d.ts",
  globalTypePath: "./components/index.js", // relative to `outdir`
};

export default {
  plugins: [customElementVuejsPlugin(options)],
};
```

#### Update `tsconfig.json` with Package Reference

Now you can add a reference to the types in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "types": ["my-library/my-library-vuejs"]
  }
}
```

## Configuring Your Vue.js Project

If you haven't configured your Vue.js project to work with custom element/web components, follow [the instructions here](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) based on your project type to ensure the components work correctly.

## Configuration

The configuration has the following optional parameters:

```ts
{
  /** Path to output directory */
  outdir?: string;
  /** File name for the types */
  fileName?: string | null;
  /** Class names of any components you would like to exclude from the types */
  exclude?: string[];
  /** Indicates if the component classes are a default export rather than a named export */
  defaultExport?: boolean;
  /** Used to get type reference for components from a single source */
  globalTypePath?: string;
  /** Used to get types from specific path for a given component */
  componentTypePath?: (name: string, tag?: string) => string;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Used to add global element props to all component types */
  globalEvents?: string;
  /** Hides logs produced by the plugin */
  hideLogs?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
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
  fileName: 'vuejs-integration.d.ts'
}
```

### Default Exports

If you component class does not provide a named export and is the default export, be sure to set `defaultExport` to `true`. This will endure the import for the class gets resolved correctly.

### Types

If your components were built using TypeScript, the types should automatically be used when you reference the corresponding module.

> _***NOTE:*** All type paths should be relative to the location specified in the `outdir` option._

If your types are rolled up into a single type declaration file, you can set the `globalTypePath` option to the location of that file.

```ts
{
  globalTypePath: ".dist/components/index.js";
}
```

If each of the component type definitions are split out by each component, you can use the `componentTypePath` to reference individual component paths.

```ts
{
  componentTypePath: (name, tag) => `./components/${tag}/${name}.js`;
}
```

#### Custom Types

If you have custom types configured in your Custom Elements Manifest and do not have types or are unable to use them, you can specify the property name of that type using the `typeSrc` option.

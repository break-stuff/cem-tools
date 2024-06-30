# CEM Analyzer Expanded Types

This is a plugin expands types for your component attributes and properties in Custom Elements Manifest using the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

This plugin will not overwrite the existing property, but will create a new property with the extended type value.

```ts
// my-component.ts

type Target = '_blank' | '_self' | '_parent' | '_top';

export default MyElement extends HTMLElement {
  public target?: Target;
}
```

```json
{
  "kind": "field",
  "name": "target",
  "description": "A lookup type for example",
  "attribute": "target",
  "type": {
    "text": "Target | undefined"
  },
  "expandedType": {
    "text": "'_blank' | '_self' | '_parent' | '_top' | undefined"
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
npm i -D cem-plugin-expanded-types
```

### Implementation

Before you can use the plugin, you need to set the TypeScript `typeChecker`. To help with this, the package provides a `getTsProgram` helper that you can call in the `overrideModuleCreation` function in the CEM Analyzer.

```js
// custom-elements-manifest.config.js

import { getTsProgram, expandTypesPlugin } from "cem-plugin-expanded-types";

export default {
  ...
  overrideModuleCreation: ({ts, globs}) => {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },

  /** Provide custom plugins */
  plugins: [expandTypesPlugin()],
};
```

## Configuration

You have the ability to change the property name that is assigned to the expanded type. By default it is `expandedType`, but if you wanted to save it as something like `parsedType`, you can set that as part of the plugin options.

```ts
interface Options {
  /** Determines the name of the property used in the manifest to store the expanded type */
  propertyName?: string;
  /** Hides logs produced by the plugin */
  hideLogs?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
}
```

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

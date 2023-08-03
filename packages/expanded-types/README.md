# CEM Analyzer Expanded Types

This is a plugin expands types for your component attributes and properties in Custom Elements Manifest using the [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/).

This plugin will not overwrite the existing property, but will create a new property with the extended type value.

```ts
// my-component.ts

type Target = '_blank; | '_self' | '_parent' | '_top';

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

### Import

```js
// custom-elements-manifest.config.js

let typeChecker;

export default {
  overrideModuleCreation: ({ts, globs}) => {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    typeChecker = program.getTypeChecker();
    return program.getSourceFiles().filter(sf => globs.find(glob => sf.fileName.includes(glob)));
  },

  /** Provide custom plugins */
  plugins: [expandTypesPlugin(typeChecker)],
};
```
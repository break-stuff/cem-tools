# CEM Tools

This is a collection of tools based off the [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest). Each tool is designed to provide a better development experience when working with custom elements.

## Tools

- [CEM Custom JSDoc tags](https://github.com/break-stuff/cem-tools/tree/main/packages/custom-jsdoc-tags#readme) - A tool for mapping custom JSDoc tags to properties in the Custom Elements Manifest.
- [CEM Inheritance](https://github.com/break-stuff/cem-tools/tree/main/packages/cem-inheritance#readme) - A tool for mapping inherited content (including class members, attributes, CSS parts, CSS variables, slots, and events) from parent classes in the Custom Elements Manifest.
- [Expanded Types](https://github.com/break-stuff/cem-tools/tree/main/packages/expanded-types#readme) - a plugin for the CEM Analyzer to parse TypeScript types and provide usable information for tools.
- [JetBrains Integration](https://github.com/break-stuff/cem-tools/tree/main/packages/jet-brains-integration#readme) - a mapper to take the information captured in the CEM and generate the appropriate `web-types.json` file for [JetBrains IDEs](https://www.jetbrains.com/)
- [JSX Integration](https://github.com/break-stuff/cem-tools/tree/main/packages/jsx-integration#readme) - a custom type generator to convert the CEM data into usable types to integrate custom elements into non-React projects that use JSX templates
- [Lazy-Loader](https://github.com/break-stuff/cem-tools/tree/main/packages/lazy-loader#readme) - creates an entry point that developers can import to lazy-load custom elements.
- [React Wrappers](https://github.com/break-stuff/cem-tools/tree/main/packages/react-wrappers#readme) - a tool for generating react-compatible wrappers for custom elements
- [SolidJS Integration](https://github.com/break-stuff/cem-tools/tree/main/packages/solidjs-integration#readme) - a custom type generator to convert the CEM data into usable types to integrate custom elements into [SolidJS projects](https://www.solidjs.com/)
- [Svelte Integration](https://github.com/break-stuff/cem-tools/tree/main/packages/svelte-integration#readme) - a custom type generator to convert the CEM data into usable types to integrate custom elements into [Svelte projects](https://svelte.dev/)
- [Vue.js Integration](https://github.com/break-stuff/cem-tools/tree/main/packages/vuejs-integration#readme) - a custom type generator to convert the CEM data into usable types to integrate custom elements into [Vue.js projects](https://vuejs.org/)
- [VS Code Integration](https://github.com/break-stuff/cem-tools/tree/main/packages/vs-code-integration#readme) - a mapper to take the information captured in the CEM and generate the appropriate HTML and CSS data files for for VS Code integration
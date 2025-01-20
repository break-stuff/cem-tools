# CHANGELOG

## 1.7.0

- Fixed exports for projects that have the `type` of "module"
- Added `cjs` exports

## 1.6.8

- Updated to import `React` in types

## 1.6.7

- Fixed binding for custom event listener
- Updated types to use intersection types to prevent compiler errors

## 1.6.6

- Fixed async file output

## 1.6.5

- Fixed casing for camel-case event names

## 1.6.4

- Fixed prop name mapping in types

## 1.6.3

- Remove conflicting types

## 1.6.2

- Fix redundant base types
- Add docs to `ScopeProvider` component

## 1.6.1

- Fixed null scope error

## 1.6.0

- Added the ability to hide logs
- Added the ability to skip the plugin

## 1.5.1

- Fixed issue when there are no unused props
- Fixed issue when there are no added types

## 1.5.0

- Added ability to extend react types
- Added attribute mapping
- Added component tag name scoping
- Added SSR Safe rendering to wrappers

## 1.4.2

- Fix boolean properties when setting them to `false`

## 1.4.1

- Allow any string for `descriptionSrc`

## 1.4.0

- Added additional default attributes - `classList`, `dir`, `exportparts`, `id`, `lang`, `part`, `title`, and `translate`
- Fixed attribute mapping in types

## 1.3.0

- Add `defaultExport` options to resolve imports without named exports.

## 1.2.1

- Included file extensions for exports in manifest

## 1.2.0

- Exclude private members using the `#` access modifier
- Add `htmlFor` global prop
- Patched issue with `className` prop
- Patched issue with `style` prop when using style object
- Removed redundant prop listing
- Removed attribute utility helpers

## 1.1.1

- Removed duplicate `ref` prop in wrapper

## 1.1.0

- Changed attribute binding to add attributes before rendering
- Fixed attribute mapping error

## 1.0.6

- Fixed missing details in component description

## 1.0.5

- Fix exclude functionality
- Update event timing to bind before render

## 1.0.4

- Add check for getter or setter _only_ properties to prevent error

## 1.0.3

- Fix `Boolean` attribute rendering
- Fix duplicate `globalEvents`
- Fix duplicate `props`

## 1.0.2

- Fix `key` prop type

## 1.0.1

- Update project URL

## 1.0.0

- Initial release

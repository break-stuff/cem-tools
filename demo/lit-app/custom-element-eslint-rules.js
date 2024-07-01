import customElement from "eslint-plugin-custom-element";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

export const rules = {
  "custom-element/required-attrs": ["error"],

  "custom-element/no-deprecated-attrs": [
    "warn",
    {
      tag: "radio-group",
      attr: "external",
    },
    {
      tag: "radio-group",
      attr: "deprecated-attribute",
    },
  ],

  "custom-element/constrained-attrs": [
    "error",
    {
      tag: "radio-group",
      attr: "variants",
      values: [
        "default",
        "primary",
        "success",
        "neutral",
        "warning",
        "danger",
        "text",
      ],
    },
    {
      tag: "radio-group",
      attr: "external",
      values: ["value1", "value2", "value3"],
    },
    {
      tag: "radio-group",
      attr: "deprecated-attribute",
      values: ["value1", "value2", "value3"],
    },
    {
      tag: "radio-group",
      attr: "external2",
      values: ["value4", "value5", "value6", "valueA", "valueB"],
    },
    {
      tag: "radio-group",
      attr: "external3",
      values: ["value7", "value8", "value9"],
    },
    {
      tag: "radio-group",
      attr: "complex",
      values: ["single", "multi"],
    },
    {
      tag: "radio-group",
      attr: "complex-union",
      values: ["small", "medium", "large", "extra-small", "undefined"],
    },
    {
      tag: "radio-button",
      attr: "target",
      values: ["_blank", "_self", "_parent", "_top", "undefined"],
    },
  ],

  "custom-element/no-deprecated-tags": [
    "warn",
    {
      tag: "deprecated-element",
    },
  ],

  "custom-element/no-boolean-attr-values": [
    "error",
    {
      tag: "radio-group",
      attr: "disabled",
    },
    {
      tag: "radio-button",
      attr: "disabled",
    },
    {
      tag: "my-button",
      attr: "formnovalidate",
    },
  ],

  "@html-eslint/no-duplicate-attrs": "off",
  "@html-eslint/no-duplicate-id": "off",
  "@html-eslint/no-inline-styles": "off",
  "@html-eslint/no-obsolete-tags": "off",
  "@html-eslint/no-restricted-attr-values": "off",
  "@html-eslint/no-restricted-attrs": "off",
  "@html-eslint/no-script-style-type": "off",
  "@html-eslint/no-target-blank": "off",
  "@html-eslint/require-attrs": "off",
  "@html-eslint/require-button-type": "off",
  "@html-eslint/require-closing-tags": "off",
  "@html-eslint/require-doctype": "off",
  "@html-eslint/require-li-container": "off",
  "@html-eslint/require-meta-charset": "off",
  "@html-eslint/no-multiple-h1": "off",
  "@html-eslint/require-lang": "off",
  "@html-eslint/require-meta-description": "off",
  "@html-eslint/require-open-graph-protocol": "off",
  "@html-eslint/require-title": "off",
  "@html-eslint/no-abstract-roles": "off",
  "@html-eslint/no-accesskey-attrs": "off",
  "@html-eslint/no-aria-hidden-body": "off",
  "@html-eslint/no-non-scalable-viewport": "off",
  "@html-eslint/no-positive-tabindex": "off",
  "@html-eslint/no-skip-heading-levels": "off",
  "@html-eslint/require-frame-title": "off",
  "@html-eslint/require-img-alt": "off",
  "@html-eslint/require-meta-viewport": "off",
  "@html-eslint/element-newline": "off",
  "@html-eslint/id-naming-convention": "off",
  "@html-eslint/indent": "off",
  "@html-eslint/lowercase": "off",
  "@html-eslint/no-extra-spacing-attrs": "off",
  "@html-eslint/no-multiple-empty-lines": "off",
  "@html-eslint/no-trailing-spaces": "off",
  "@html-eslint/quotes": "off",
  "@html-eslint/sort-attrs": "off",
};

export default {
  rules,
  recommendedConfig: {
    files: ["**/*.html"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: { html, "custom-element": customElement },
    rules,
  },
};

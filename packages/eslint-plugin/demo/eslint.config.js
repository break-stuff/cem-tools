import customElement from "eslint-plugin-custom-element";
import html from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

export default [
  // html.configs["flat/recommended"],
  {
    files: ["**/*.html", "**/*.php"],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: { html, "custom-element": customElement },
    rules: {
      "custom-element/required-attrs": [
        "error",
        {
          tag: "my-input",
          attr: "aria-label",
        },
      ],
      "custom-element/no-deprecated-attrs": [
        "warn",
        {
          tag: "my-button",
          attr: "size",
        },
      ],
      "custom-element/constrained-attrs": [
        "error",
        {
          tag: "my-button",
          attr: "variant",
          values: ["default", "primary", "outline", "transparent"],
        },
      ],
      "custom-element/no-deprecated-tags": [
        "warn",
        {
          tag: "my-element",
        },
      ],
      "custom-element/no-boolean-attr-values": [
        "error",
        {
          tag: "my-button",
          attr: "disabled",
        },
      ],
    },
  },
];

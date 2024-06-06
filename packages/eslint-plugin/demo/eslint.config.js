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
          tag: "your-element",
          attr: "aria-label",
        },
        {
          tag: "your-element",
          attr: "aria-labelledby",
        },
      ],
      "custom-element/no-deprecated-attrs": [
        "error",
        {
          tag: "my-element",
          attr: "size",
        },
      ],
      "custom-element/constrained-attrs": [
        "error",
        {
          tag: "my-element",
          attr: "species",
          values: ["human", "droid", "wookie", "ewok"],
        },
      ],
      "custom-element/no-deprecated-tags": [
        "error",
        {
          tag: "your-element",
        },
      ],
    },
  },
];

import {
  getComponents,
  type CEM,
  Component,
} from "../../../tools/cem-utils/index.js";
import {
  createOutDir,
  log,
  logGreen,
  saveFile,
} from "../../../tools/integrations";
import { Options } from "./types.js";
import path from "path";

let userOptions: Options;
const defaultRuleValues = {
  constrainedAttrs: "error",
  noBooleanAttrValues: "error",
  noDeprecatedAttrs: "warn",
  noDeprecatedTags: "warn",
  requiredAttrs: "error",
  noDuplicateAttrs: "off",
  noDuplicateId: "off",
  noInlineStyles: "off",
  noObsoleteTags: "off",
  noRestrictedAttrValues: "off",
  noRestrictedAttrs: "off",
  noScriptStyleType: "off",
  noTargetBlank: "off",
  requireAttrs: "off",
  requireButtonType: "off",
  requireClosingTags: "off",
  requireDoctype: "off",
  requireLiContainer: "off",
  requireMetaCharset: "off",
  noMultipleH1: "off",
  requireLang: "off",
  requireMetaDescription: "off",
  requireOpenGraphProtocol: "off",
  requireTitle: "off",
  noAbstractRoles: "off",
  noAccesskeyAttrs: "off",
  noAriaHiddenBody: "off",
  noNonScalableViewport: "off",
  noPositiveTabindex: "off",
  noSkipHeadingLevels: "off",
  requireFrameTitle: "off",
  requireImgAlt: "off",
  requireMetaViewport: "off",
  elementNewline: "off",
  idNamingConvention: "off",
  indent: "off",
  lowercase: "off",
  noExtraSpacingAttrs: "off",
  noMultipleEmptyLines: "off",
  noTrailingSpaces: "off",
  quotes: "off",
  sortAttrs: "off",
};

export function generateEsLintLintRules(cem: CEM, options: Options) {
  log("[custom-element-eslint-rule-generator] - Generating ESLint rules...");
  setUserOptions(options);
  createOutDir(userOptions.outdir!);

  const components = getComponents(cem, userOptions.exclude);
  const template = getRulesTemplate(components);

  saveFile(userOptions.outdir!, userOptions.fileName!, template, "typescript");

  logGreen(
    `[custom-element-eslint-rule-generator] - Generated "${path.join(
      userOptions.outdir!,
      userOptions.fileName!
    )}"`
  );
}

function setUserOptions(options: Options) {
  userOptions = {
    outdir: "./",
    fileName: "custom-element-eslint-rules.js",
    exclude: [],
    typesSrc: "types",
    prefix: "",
    suffix: "",
    ...options,
  };

  userOptions.defaultRuleErrorLevels = {
    ...defaultRuleValues,
    ...(options?.defaultRuleErrorLevels || {}),
  };
}

function getRulesTemplate(components: Component[]) {
  return `
const customElement = require("eslint-plugin-custom-element");
const html = require("@html-eslint/eslint-plugin");
const htmlParser = require("@html-eslint/parser");
  
const rules = {
  ${getRequiredAttrsTemplate(components)}
  ${getNoDeprecatedAttrsTemplate(components)}
  ${getConstrainedAttrsTemplate(components)}
  ${getNoDeprecatedTagsTemplate(components)}
  ${getNoBooleanAttrValuesTemplate(components)}
  ${getHtmlLintRules()}
};

module.exports = {
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
`;
}

function getRequiredAttrsTemplate(components: Component[]) {
  return `
  "custom-element/required-attrs": [
    "${userOptions.defaultRuleErrorLevels.requiredAttrs}",
      ${components
        .map((component) => {
          const requiredAttrs: string[] =
            (component as any)[userOptions.requiredAttrsProp!] || [];
          if (requiredAttrs.length) {
            return requiredAttrs
              .map((attr) => {
                return `{
                  tag: "${component.tagName}",
                  attr: "${attr}",
                }`;
              })
              .filter((x) => x)
              .join(",\n");
          }
        })
        .filter((x) => x)
        .join(",\n")}
  ],`;
}

function getConstrainedAttrsTemplate(components: Component[]) {
  return `
  "custom-element/constrained-attrs": [
    "${userOptions.defaultRuleErrorLevels.constrainedAttrs}",
      ${components
        .map((component) => component.attributes
            ?.map((attr) => {
              const types =
                (attr as any)[userOptions.typesSrc!]?.text?.split("|") || [];
              if (types.length > 1) {
                return `{
                  tag: "${component.tagName}",
                  attr: "${attr.name}",
                  values: ${JSON.stringify(types.map((x: string) => x.replace(/['"]+/g, '').trim()))},
                }`;
              }
            })
            .filter((x) => x)
            .join(",\n"))
        .filter((x) => x)
        .join(",\n")}
  ],`;
}

function getNoBooleanAttrValuesTemplate(components: Component[]) {
  return `
  "custom-element/no-boolean-attr-values": [
    "${userOptions.defaultRuleErrorLevels.noBooleanAttrValues}",
      ${components
        .map((component) => {
          return component.attributes
            ?.filter((attr) => attr.type?.text?.includes("boolean"))
            ?.map((attr) => {
              return `{
                  tag: "${component.tagName}",
                  attr: "${attr.name}",
                }`;
            })
            .join(",\n");
        })
        .filter((x) => x)
        .join(",\n")}
  ],`;
}

function getNoDeprecatedAttrsTemplate(components: Component[]) {
  return `
  "custom-element/no-deprecated-attrs": [
    "${userOptions.defaultRuleErrorLevels.noDeprecatedAttrs}",
      ${components
        .map((component) => {
          return component.attributes
            ?.filter((attr) => attr.deprecated)
            ?.map((attr) => {
              return `{
                tag: "${component.tagName}",
                attr: "${attr.name}",
              }`;
            })
            .join(",\n");
        })
        .filter((x) => x)
        .join(",\n")}
  ],`;
}

function getNoDeprecatedTagsTemplate(components: Component[]) {
  return `
  "custom-element/no-deprecated-tags": [
    "${userOptions.defaultRuleErrorLevels.noDeprecatedTags}",
      ${components
        .filter((x) => x.deprecated)
        .map((component) => {
          return `{
            tag: "${component.tagName}",
          }`;
        })
        .join(",\n")}
  ],`;
}

function getHtmlLintRules() {
  return `
  "@html-eslint/no-duplicate-attrs": "${userOptions.defaultRuleErrorLevels.noDuplicateAttrs}",
  "@html-eslint/no-duplicate-id": "${userOptions.defaultRuleErrorLevels.noDuplicateId}",
  "@html-eslint/no-inline-styles": "${userOptions.defaultRuleErrorLevels.noInlineStyles}",
  "@html-eslint/no-obsolete-tags": "${userOptions.defaultRuleErrorLevels.noObsoleteTags}",
  "@html-eslint/no-restricted-attr-values": "${userOptions.defaultRuleErrorLevels.noRestrictedAttrValues}",
  "@html-eslint/no-restricted-attrs": "${userOptions.defaultRuleErrorLevels.noRestrictedAttrs}",
  "@html-eslint/no-script-style-type": "${userOptions.defaultRuleErrorLevels.noScriptStyleType}",
  "@html-eslint/no-target-blank": "${userOptions.defaultRuleErrorLevels.noTargetBlank}",
  "@html-eslint/require-attrs": "${userOptions.defaultRuleErrorLevels.requireAttrs}",
  "@html-eslint/require-button-type": "${userOptions.defaultRuleErrorLevels.requireButtonType}",
  "@html-eslint/require-closing-tags": "${userOptions.defaultRuleErrorLevels.requireClosingTags}",
  "@html-eslint/require-doctype": "${userOptions.defaultRuleErrorLevels.requireDoctype}",
  "@html-eslint/require-li-container": "${userOptions.defaultRuleErrorLevels.requireLiContainer}",
  "@html-eslint/require-meta-charset": "${userOptions.defaultRuleErrorLevels.requireMetaCharset}",
  "@html-eslint/no-multiple-h1": "${userOptions.defaultRuleErrorLevels.noMultipleH1}",
  "@html-eslint/require-lang": "${userOptions.defaultRuleErrorLevels.requireLang}",
  "@html-eslint/require-meta-description": "${userOptions.defaultRuleErrorLevels.requireMetaDescription}",
  "@html-eslint/require-open-graph-protocol": "${userOptions.defaultRuleErrorLevels.requireOpenGraphProtocol}",
  "@html-eslint/require-title": "${userOptions.defaultRuleErrorLevels.requireTitle}",
  "@html-eslint/no-abstract-roles": "${userOptions.defaultRuleErrorLevels.noAbstractRoles}",
  "@html-eslint/no-accesskey-attrs": "${userOptions.defaultRuleErrorLevels.noAccesskeyAttrs}",
  "@html-eslint/no-aria-hidden-body": "${userOptions.defaultRuleErrorLevels.noAriaHiddenBody}",
  "@html-eslint/no-non-scalable-viewport": "${userOptions.defaultRuleErrorLevels.noNonScalableViewport}",
  "@html-eslint/no-positive-tabindex": "${userOptions.defaultRuleErrorLevels.noPositiveTabindex}",
  "@html-eslint/no-skip-heading-levels": "${userOptions.defaultRuleErrorLevels.noSkipHeadingLevels}",
  "@html-eslint/require-frame-title": "${userOptions.defaultRuleErrorLevels.requireFrameTitle}",
  "@html-eslint/require-img-alt": "${userOptions.defaultRuleErrorLevels.requireImgAlt}",
  "@html-eslint/require-meta-viewport": "${userOptions.defaultRuleErrorLevels.requireMetaViewport}",
  "@html-eslint/element-newline": "${userOptions.defaultRuleErrorLevels.elementNewline}",
  "@html-eslint/id-naming-convention": "${userOptions.defaultRuleErrorLevels.idNamingConvention}",
  "@html-eslint/indent": "${userOptions.defaultRuleErrorLevels.indent}",
  "@html-eslint/lowercase": "${userOptions.defaultRuleErrorLevels.lowercase}",
  "@html-eslint/no-extra-spacing-attrs": "${userOptions.defaultRuleErrorLevels.noExtraSpacingAttrs}",
  "@html-eslint/no-multiple-empty-lines": "${userOptions.defaultRuleErrorLevels.noMultipleEmptyLines}",
  "@html-eslint/no-trailing-spaces": "${userOptions.defaultRuleErrorLevels.noTrailingSpaces}",
  "@html-eslint/quotes": "${userOptions.defaultRuleErrorLevels.quotes}",
  "@html-eslint/sort-attrs": "${userOptions.defaultRuleErrorLevels.sortAttrs}",
  `;
}

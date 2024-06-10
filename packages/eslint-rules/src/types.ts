export type ErrorLevel = "off" | "warn" | "error" | 0 | 1 | 2;

/** Configuration options */
export type Options = {
  /** Path to output directory */
  outdir?: string;
  /** The of the loader file */
  fileName?: string;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** Name of the property in the Custom Elements Manifest that contains the list of required attributes */
  requiredAttrsProp?: string;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Adds a prefix to tag names */
  prefix?: string;
  /** Adds a suffix to tag names */
  suffix?: string;
  /** Sets default rule error levels */
  defaultRuleErrorLevels?: {
    // custom-element eslint rules
    /** validates attribute where predefined values have been defined - default 'error' */
    constrainedAttrs?: ErrorLevel;
    /** reports issue when boolean attributes have been assigned a value - default 'error' */
    noBooleanAttrValues?: ErrorLevel;
    /** identifies attributes that have been deprecated - default 'warn' */
    noDeprecatedAttrs?: ErrorLevel;
    /** identifies elements that have been deprecated - default 'warn' */
    noDeprecatedTags?: ErrorLevel;
    /** identifies elements that require specific attributes - default 'error' */
    requiredAttrs?: ErrorLevel;

    // HTML eslint rules - https://html-eslint.org/docs/rules (these have all been disabled by default)
    noDuplicateAttrs?: ErrorLevel;
    noDuplicateId?: ErrorLevel;
    noInlineStyles?: ErrorLevel;
    noObsoleteTags?: ErrorLevel;
    noRestrictedAttrValues?: ErrorLevel;
    noRestrictedAttrs?: ErrorLevel;
    noScriptStyleType?: ErrorLevel;
    noTargetBlank?: ErrorLevel;
    requireAttrs?: ErrorLevel;
    requireButtonType?: ErrorLevel;
    requireClosingTags?: ErrorLevel;
    requireDoctype?: ErrorLevel;
    requireLiContainer?: ErrorLevel;
    requireMetaCharset?: ErrorLevel;
    noMultipleH1?: ErrorLevel;
    requireLang?: ErrorLevel;
    requireMetaDescription?: ErrorLevel;
    requireOpenGraphProtocol?: ErrorLevel;
    requireTitle?: ErrorLevel;
    noAbstractRoles?: ErrorLevel;
    noAccesskeyAttrs?: ErrorLevel;
    noAriaHiddenBody?: ErrorLevel;
    noNonScalableViewport?: ErrorLevel;
    noPositiveTabindex?: ErrorLevel;
    noSkipHeadingLevels?: ErrorLevel;
    requireFrameTitle?: ErrorLevel;
    requireImgAlt?: ErrorLevel;
    requireMetaViewport?: ErrorLevel;
    elementNewline?: ErrorLevel;
    idNamingConvention?: ErrorLevel;
    indent?: ErrorLevel;
    lowercase?: ErrorLevel;
    noExtraSpacingAttrs?: ErrorLevel;
    noMultipleEmptyLines?: ErrorLevel;
    noTrailingSpaces?: ErrorLevel;
    quotes?: ErrorLevel;
    sortAttrs?: ErrorLevel;
  };
};

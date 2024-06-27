import type { CEM } from "../../../tools/cem-utils";

export interface Options {
  /** The value used to indicate an element is deprecated - default is "(@deprecated)" */
  indicator?: string;
  /** When `true` the indicator will be included in the final description - default is `false` */
  preserveIndicator?: boolean;
  /** Name of the updated CEM file - default is "custom-elements.json" */
  fileName?: string;
  /** Path to output directory */
  outdir?: string;
  /** Class names of any components you would like to exclude from inheritance */
  exclude?: string[];
  /** Hides logs produced by the plugin */
  hideLogs?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
  /** @internal Used to indicate if this is used as a CEM a plugin */
  usedByPlugin?: boolean;
}

export interface Params {
  customElementsManifest: CEM;
}

export interface Omit {
  [key: string]: {
    cssProperties?: string[];
    cssParts?: string[];
    members?: string[];
    attributes?: string[];
    events?: string[];
    slots?: string[];
  };
}

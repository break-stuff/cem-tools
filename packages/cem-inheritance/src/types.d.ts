import type { CEM } from "../../../tools/cem-utils";

export interface Options {
  /** Name of the updated CEM file - default is "custom-elements.json" */
  fileName?: string;
  /** Path to output directory */
  outdir?: string;
  /** Class names of any components you would like to exclude from inheritance */
  exclude?: string[];
  /** Aspects of your class that you would like to exclude from it and its children */
  omit?: Omit;
  /** Skip inheritance for an aspect of your components */
  ignore?: string[];
  /** External CEMs that your components extend */
  externalManifests?: any[];
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
  }
}
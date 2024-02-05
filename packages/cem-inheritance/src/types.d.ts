import type { CEM } from "../../../tools/cem-utils";

export interface Options {
  /** Name of the updated CEM file - default is "custom-elements.json" */
  fileName?: string;
  /** Path to output directory */
  outdir?: string;
  /** Class names of any components you would like to exclude from inheritance */
  exclude?: string[];
  /** External CEMs that your components extend */
  externalManifests?: object[];
}

export interface Params {
  customElementsManifest: CEM;
}

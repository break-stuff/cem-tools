import { CEM } from "../../../tools/cem-utils";
import { BaseOptions } from "../../../tools/configurations";

export interface Options extends BaseOptions {
  /** Name of the file generated */
  fileName?: string;
  /** Component names to exclude form process */
  exclude?: string[];
  /** Used to get global type reference for components */
  globalTypePath?: string;
  /** Used to get a specific path for a given component */
  componentTypePath?: (name: string, tag?: string) => string;
  /** Used to add global element props to all component types */
  globalEvents?: string;
  /** Used to create an array of links within the component info bubble */
  // referenceTemplate?: (name: string, tag?: string) => Reference;
}

export interface Params {
  customElementsManifest: CEM;
}
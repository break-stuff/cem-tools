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
  /** Indicates if the component classes are a default export rather than a named export */
  defaultExport?: boolean;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Used to add global element props to all component types */
  globalEvents?: string;
  /** Adds a prefix to tag references */
  prefix?: string;
  /** Adds a suffix to tag references */
  suffix?: string;
}

export interface Params {
  customElementsManifest: CEM;
}

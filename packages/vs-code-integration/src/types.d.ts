import type { BaseOptions } from "../../../tools/configurations";
import type { CEM } from "../../../tools/cem-utils";

export interface Options extends BaseOptions {
  /** Name of the file with you component's custom HTML data */
  htmlFileName?: string | null;
  /** Name of the file with you component's custom CSS data */
  cssFileName?: string | null;
  /** Creates reusable CSS values for consistency in components */
  cssSets?: CssSet[];
  /** Used to create an array of links within the component info bubble */
  referencesTemplate?: (name: string, tag?: string) => Reference[];
  /** Adds a prefix to tag references */
  prefix?: string;
  /** Adds a suffix to tag references */
  suffix?: string;
}

export interface CssSet {
  name: string;
  values: CssValue[] | string[];
}

export interface CssValue {
  name: string;
  description?: string;
}

export interface Tag {
  name: string;
  description?: string;
  attributes?: TagAttribute[];
  references?: Reference[];
}

export interface VsCssProperty {
  name: string;
  description?: string;
  values?: Value[];
  references?: Reference[];
}

interface TagAttribute {
  name: string;
  description?: string;
  values?: Value[];
  references?: Reference[];
}

interface Value {
  name: string;
}

interface Reference {
  name: string;
  url: string;
}

export interface CemAnalyzerParams {
  customElementsManifest: CEM;
}

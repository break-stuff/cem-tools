import { BaseConfiguration } from "../../../tools/configurations";
import { CEM } from "../../../tools/cem-utils";


export interface Options extends BaseConfiguration {
  /** Creates reusable CSS values for consistency in components */
  cssSets?: CssSet[];
  /** Used to create an array of links within the component info bubble */
  referencesTemplate?: (name: string, tag?: string) => Reference[];
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
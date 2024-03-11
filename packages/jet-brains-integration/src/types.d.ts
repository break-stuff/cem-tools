import { BaseOptions } from "../../../tools/configurations";
import type { CEM } from "../../../tools/cem-utils";

/**
 * WEB-TYPE
 */

export interface Options extends BaseOptions {
  /** Name of the file for your custom data */
  webTypesFileName?: string | null;
  /** Excludes any custom element documentation */
  excludeHtml?: boolean;
  /** Excludes any custom CSS documentation */
  excludeCss?: boolean;
  /** Adds a prefix to tag references */
  prefix?: string;
  /** Adds a suffix to tag references */
  suffix?: string;
  /** Automatically adds reference to yor package.json */
  packageJson?: boolean;
  /** Used to create a link within the component info bubble */
  referenceTemplate?: (name: string, tag?: string) => Reference;
  /** Used to specify the path to the given component's source module, defaults to `module.path` from the CEM.
   *  When `undefined` is returned, no source reference is generated */
  sourceModuleTemplate?: (args: {name: string, tag?: string, modulePath: string}) => string | undefined;
}

export interface Params {
  customElementsManifest: CEM;
}

export interface WebTypeElement {
  name: string;
  description: string;
  ["doc-url"]?: string;
  attributes: WebTypeAttribute[];
  js?: JsProperties;
}

export interface WebTypeAttribute {
  name: string;
  description?: string;
  default?: string;
  value: WebTypeValue;
}

export interface WebTypeValue {
  type?: string | string[];
}

export interface JsProperties {
  properties: WebTypeAttribute[];
  events: WebTypeEvent[];
}

export interface WebTypeEvent {
  name: string;
  description?: string;
}

export interface WebTypePseudoElement {
  name: string;
  description?: string;
  docUrl?: string;
  arguments?: boolean;
  deprecated?: boolean;
}

export interface WebTypeCssProperty {
  name: string;
  description?: string;
  values?: string[];
}

export interface Reference {
  name: string;
  url: string;
}

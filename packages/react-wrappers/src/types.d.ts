import { CEM } from "../../../tools/cem-utils";
import { BaseOptions } from "../../../tools/configurations";
import type { Attribute } from "custom-elements-manifest";

export interface Options extends BaseOptions {
  /** Used to get a specific path for a given component */
  modulePath?: (
    className: string,
    tagName: string,
    modulePath: string,
  ) => string;
  /** Indicates if the component classes are a default export rather than a named export */
  defaultExport?: boolean;
  /** Used to provide alternative property name to prevent name collisions with React */
  attributeMapping?: { [key: string]: string };
  /** Used to add custom global props to all component types */
  globalProps?: MappedAttribute[];
  /** Used to add custom global events to all component types */
  globalEvents?: GlobalEvent[];
  /** Includes React props defined for HTML elements */
  reactProps?: string[] | boolean;
  /** Generates context provider to scope component tags with a custom prefix or suffix */
  scopedTags?: boolean;
  /** Formats wrappers to make them safe to run in environments with Server Side Rendering (SSR) */
  ssrSafe?: boolean;
}

export interface GlobalEvent {
  event: string;
  description: string;
  type: string;
}

export interface Params {
  customElementsManifest: CEM;
}

export interface MappedAttribute extends Attribute {
  originalName?: string;
  propName?: string;
}

export interface ExtendedAttribute extends MappedAttribute {
  mappedName: string;
}

export interface ComponentAttributes {
  attributes: MappedAttribute[];
  booleanAttributes: MappedAttribute[];
}

export interface EventName {
  name: string;
  reactName: string;
  description?: string;
  type?: string;
  custom?: boolean;
}

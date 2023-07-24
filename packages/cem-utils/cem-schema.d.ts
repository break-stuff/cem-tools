/**
 *
 * CEM TYPES
 *
 */

export interface Params {
  customElementsManifest: CustomElementsManifest;
}

export interface CustomElementsManifest {
  schemaVersion: string;
  readme: string;
  modules: Module[];
}

interface Module {
  kind: string;
  path: string;
  declarations: Declaration[];
  exports: Export[];
}

export interface Declaration {
  kind: string;
  description: string;
  name: string;
  cssProperties?: CssProperty[];
  cssParts?: CssPart[];
  slots: Slot[];
  members?: Member[];
  events?: Event[];
  attributes: Attribute[];
  superclass: SuperClass;
  tagName?: string;
  summary?: string;
  customElement: boolean;
}
interface CssProperty {
  description: string;
  name: string;
  default?: string;
  type?: Type;
}

interface CssPart {
  description: string;
  name: string;
}

interface Slot {
  description: string;
  name: string;
}

interface Member {
  kind: string;
  name: string;
  type?: Type;
  default?: string;
  description?: string;
  attribute?: string;
  reflects?: boolean;
  privacy?: string;
  parameters?: Parameter[];
  return?: Return;
  static?: boolean;
}

interface Type {
  text: string;
}

interface Parameter {
  name: string;
  type: Type;
}

interface Return {
  type: Type;
}

interface Event {
  name: string;
  type?: Type;
  description: string;
}

interface Attribute {
  name: string;
  type: Type;
  default?: string;
  description: string;
  fieldName?: string;
}

interface SuperClass {
  name: string;
  package?: string;
}

interface Export {
  kind: string;
  name: string;
  declaration: {
    name: string;
    module: string;
  };
}

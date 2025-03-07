import * as schema from "custom-elements-manifest";

/**
 * CEM TYPES
 */

export interface CssProperty extends schema.CssCustomProperty {
  type?: {
    text?: string;
  };
}

export interface Component extends schema.CustomElementDeclaration {
  modulePath?: string;
  cssProperties?: CssProperty[];
  members?: Array<schema.ClassMember>;
  superclass?: {
    name?: string;
    package?: string;
    module?: string;
  };
}

export interface CustomModule extends schema.JavaScriptModule {
  /**
   * The declarations of a module.
   *
   * For documentation purposes, all declarations that are reachable from
   * exports should be described here. Ie, functions and objects that may be
   * properties of exported objects, or passed as arguments to functions.
   */
  declarations?: Array<Component>;
}

export interface CEM extends schema.Package {
  /**
   * An array of the modules this package contains.
   */
  modules: Array<CustomModule>;
}

import path from "path";
import fs from "fs";
import { saveFile } from "../../../tools/integrations/index.js";
import { toPascalCase } from "../../../tools/utilities/index.js";
import { Component } from "../../../tools/cem-utils/index.js";

export function getPackageJson(): any {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath).toString());
}

export function getModulePath(
  modulePath: ((className: string, tagName: string) => string) | undefined,
  component: Component,
  outdir: string,
  packageJson: any
) {
  if (modulePath instanceof Function) {
    return modulePath(component.name, component.tagName!);
  }

  if (!packageJson.module) {
    throw new Error(
      "You must define a module path in order to generate React wrappers."
    );
  }

  const directories = outdir?.split("/");
  return path.join(directories.map((_) => "../").join(""), packageJson.module);
}

export const createEventName = (event: any) => `on${toPascalCase(event.name)}`;

export const RESERVED_WORDS = [
  "children",
  "localName",
  "ref",
  "style",
  "className",
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];

export function saveReactUtils(outdir: string) {
  const reactUtils = `
import { useEffect, useLayoutEffect } from "react";

export function useProperties(targetElement, propName, value) {
  useEffect(() => {
    if (value !== undefined && targetElement.current[propName] !== value) {
      // add try catch to avoid errors when setting read-only properties
      try {
        targetElement.current[propName] = value;
      } catch (e) {
        console.warn(e);
      }
    }
  }, [value]);
}

export function useEventListener(targetElement, eventName, eventHandler) {
  useLayoutEffect(() => {
    if (eventHandler !== undefined) {
      targetElement?.current?.addEventListener(eventName, eventHandler);
    }

    return () => {
      if (eventHandler?.cancel) {
        eventHandler.cancel();
      }

      targetElement?.current?.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler, targetElement]);
}

`;

  saveFile(outdir, "react-utils.js", reactUtils, "typescript");
}

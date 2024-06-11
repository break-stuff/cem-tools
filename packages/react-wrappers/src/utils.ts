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
  outdir: (className: string, tagName: string) => string | string,
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

  const outdirPath = typeof outdir === 'function' ? outdir(component.name, component.tagName!) : outdir;
  const directories = outdirPath?.split("/");
  return path.join(directories.map((_) => "../").join(""), packageJson.module);
}

export function normalizeOutdir(outdir: any) {
  console.log("Normalizing outdir:", outdir, "Type:", typeof outdir);
  if (typeof outdir === 'function') {
    return outdir;
  }
  if (typeof outdir === 'string') {
    return () => outdir;
  }
  throw new TypeError('The outdir property must be either a string or a function.');
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

export function saveReactUtils(outdir: string, ssrSafe?: boolean) {
  const reactUtils = `
import { useEffect, useLayoutEffect } from "react";

${ssrSafe ? `const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect` : ''}

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
  ${ssrSafe ? 'useIsomorphicLayoutEffect' : 'useLayoutEffect'}(() => {
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

export function saveScopeProvider(outdir: string, ssrSafe?: boolean) {
  const scopeProvider = `
${ssrSafe ? '"use client"' : ''}
import { createContext } from 'react';
import { jsx } from "react/jsx-runtime";

export const ScopeContext = createContext(null);

export function ScopeProvider({ prefix, suffix, children }) {
  return jsx(ScopeContext.Provider, {
    value: { prefix, suffix },
    children,
  });
}
`;

  const scopeProviderTypes = `
export type ScopeProps = { prefix?: string, suffix?: string, children?: ReactNode }

export function ScopeProvider(props: ScopeProps): JSX.Element;
`;

  saveFile(outdir, "ScopeProvider.js", scopeProvider, "typescript");
  saveFile(outdir, "ScopeProvider.d.ts", scopeProviderTypes, "typescript");
}

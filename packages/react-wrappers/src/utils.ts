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
  packageJson: any,
) {
  if (modulePath instanceof Function) {
    return modulePath(component.name, component.tagName!);
  }

  if (!packageJson.module) {
    throw new Error(
      "You must define a module path in order to generate React wrappers.",
    );
  }

  const directories = outdir?.split("/");
  return path.join(directories.map(() => "../").join(""), packageJson.module);
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
import { useEffect, useLayoutEffect, useRef } from "react";

${ssrSafe ? `const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect` : ""}

export function useProperties(targetElement, propName, value) {
  useEffect(() => {
    if (
      value !== undefined &&
      targetElement.current &&
      targetElement.current[propName] !== value
    ) {
      // add try catch to avoid errors when setting read-only properties
      try {
        targetElement.current[propName] = value;
      } catch (e) {
        console.warn(e);
      }
    }
  }, [value, targetElement.current]);
}

export function useEventListener(targetElement, eventName, eventHandler) {
  // keep a ref to the latest handler so we don't need to re-register the event listener
  // whenever the handler changes (avoids duplicate listeners on re-renders)
  const handlerRef = useRef(eventHandler);
  handlerRef.current = eventHandler;

  ${ssrSafe ? "useIsomorphicLayoutEffect" : "useLayoutEffect"}(() => {
    const element = targetElement?.current;
    if (!element || eventName === undefined) {
      return;
    }

    // capture the handler at the time the listener is attached so we can call cancel on it
    const attachedHandler = handlerRef.current;

    const eventListener = (event) => {
      if (handlerRef.current) {
        handlerRef.current(event);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      if (attachedHandler?.cancel) {
        attachedHandler.cancel();
      }

      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, targetElement?.current]);
}

`;

  saveFile(outdir, "react-utils.js", reactUtils, "typescript");
}

export function saveScopeProvider(outdir: string, ssrSafe?: boolean) {
  const scopeProvider = `
${ssrSafe ? '"use client"' : ""}
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
export type ScopeProps = {
  /** Adds a prefix to the custom element tag name */
  prefix?: string,
  /** Adds a prefix to the custom element tag name */
  suffix?: string,
  children?: React.ReactNode
};

/**
 * Provides a mechanism to add a custom prefix or suffix to to child components.
 * This prevents tag name collisions with components from different versions of the same library.
 */
export function ScopeProvider(props: ScopeProps): JSX.Element;
`;

  saveFile(outdir, "ScopeProvider.js", scopeProvider, "typescript");
  saveFile(outdir, "ScopeProvider.d.ts", scopeProviderTypes, "typescript");
}

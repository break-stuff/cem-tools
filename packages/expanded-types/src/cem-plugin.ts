import path from "path";
import fs from "fs";
import type { Component } from "../../../tools/cem-utils";
import { logBlue, logYellow } from "../../../tools/integrations";

export interface Options {
  /** Determines the name of the property used in the manifest to store the expanded type */
  propertyName?: string;
  /** Hides logs produced by the plugin */
  hideLogs?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
}

interface AliasTypes {
  [key: string]: {
    [key: string]: string;
  };
}

const aliasTypes: AliasTypes = {};
const groupedTypes: AliasTypes = {};
const primitives = [
  "string",
  "number",
  "boolean",
  "any",
  "null",
  "undefined",
  "unknown",
  "never",
  "void",
  "object",
  "symbol",
  "bigint",
  "true",
  "false",
];
let currentFilename = "";
let typeChecker: any;
let options: Options;
let typeScript: typeof import("typescript");
let tsConfigFile: any;

/**
 * CEM Analyzer plugin to expand types in component metadata
 * @param tc TypeScript type checker
 * @param op Configuration options
 * @returns
 */
export function expandTypesPlugin(
  op: Options = {
    propertyName: "expandedType",
  }
) {
  options = op;
  if (options.skip) {
    logYellow("[cem-expanded-types] - Skipped", options.hideLogs);
    return;
  }
  logBlue(
    "[cem-expanded-types] - Updating Custom Elements Manifest...",
    options.hideLogs
  );

  return {
    name: "expand-types-plugin",
    collectPhase,
    analyzePhase,
  };
}

/**
 *
 * @param ts Global TypeScript object
 * @param globs File globs to analyze
 * @param configName TypeScript config file name to use during analysis
 * @returns
 */
export function getTsProgram(
  ts: typeof import("typescript"),
  globs: string[],
  configName = "tsconfig.json"
) {
  tsConfigFile = ts.findConfigFile(
    process.cwd(),
    ts.sys.fileExists,
    configName
  );
  const { config } = ts.readConfigFile(tsConfigFile, ts.sys.readFile);
  const compilerOptions = ts.convertCompilerOptionsFromJson(
    config.compilerOptions ?? {},
    "."
  );
  const program = ts.createProgram(globs, compilerOptions.options);
  typeChecker = program.getTypeChecker();
  return program;
}

function getExpandedType(fileName: string, typeName: string): string {
  if (typeName?.includes("|")) {
    return getUnionTypes(fileName, typeName);
  }

  if (typeName?.startsWith("{") && typeName?.endsWith("}")) {
    return getObjectTypes(fileName, typeName);
  }

  if (
    primitives.includes(typeName) ||
    typeof groupedTypes[typeName] === "undefined"
  ) {
    return typeName;
  }

  if (typeof groupedTypes[typeName][fileName] !== "undefined") {
    return groupedTypes[typeName][fileName];
  }

  if (Object.entries(groupedTypes[typeName]).length === 1) {
    return Object.values(groupedTypes[typeName])[0];
  }

  return typeName;
}

function getUnionTypes(fileName: string, typeName: string) {
  return (
    typeName
      ?.split("|")
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      ?.map((part) => getExpandedType(fileName, part))
      .join(" | ") || ""
  );
}

function getObjectTypes(fileName: string, typeName: string) {
  const parts = [
    ...new Set(
      typeName
        ?.split(/[:{}]/)
        .map((part) => part.trim())
        .filter((part) => part.length > 0)
    ),
  ];
  parts.forEach((part) => {
    // remove comments from object
    const cleanPart = part.replace(
      /\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,
      ""
    );
    typeName = typeName.replace(
      new RegExp(cleanPart, "g"),
      getExpandedType(fileName, cleanPart)
    );
  });
  return typeName;
}

function collectPhase({ ts, node }: any) {
  typeScript = ts;
  parseFileTypes(node);
}

function parseFileTypes(node: any) {
  if (node?.fileName?.includes("node_modules")) {
    return;
  }

  if (node.kind === typeScript.SyntaxKind.SourceFile) {
    currentFilename = path.resolve(node.fileName);
    aliasTypes[currentFilename] = {};
  } else if (node.kind === typeScript.SyntaxKind.EnumDeclaration) {
    setEnumTypes(node);
  } else if (node.kind === typeScript.SyntaxKind.TypeAliasDeclaration) {
    if (node.type.kind === typeScript.SyntaxKind.UnionType) {
      setBasicUnionTypes(node);
    } else if (
      node.type.kind === typeScript.SyntaxKind.TypeOperator ||
      node.type.kind === typeScript.SyntaxKind.IndexedAccessType
    ) {
      setComplexUnionTypes(node);
    }
  }

  groupTypesByName();
}

function groupTypesByName() {
  for (const alias in aliasTypes) {
    for (const type in aliasTypes[alias]) {
      if (!groupedTypes[type]) {
        groupedTypes[type] = {};
      }
      groupedTypes[type][alias] = aliasTypes[alias][type];
    }
  }
}

function setEnumTypes(node: any) {
  const name = node.name?.escapedText;
  const shortText =
    node.members?.map((mem: any) => `'${mem.initializer?.text}'`).join(" | ") ||
    "";

  aliasTypes[currentFilename][name] = shortText;
}

function setBasicUnionTypes(node: any) {
  const name = node.name?.escapedText;
  const unionTypes =
    node?.type?.types
      ?.map((type: any) => {
        let value = type?.literal?.text;
        if (!value && type?.typeName?.escapedText) {
          value = getExpandedType(currentFilename, type.typeName?.escapedText);
          return value;
        }
        return typeof value === "string" ? `'${value}'` : value;
      })
      .join(" | ") || "";
  aliasTypes[currentFilename][name] = unionTypes;
}

function setComplexUnionTypes(node: any) {
  const name = node?.name?.escapedText;
  const resolvedTypes = typeChecker.getDeclaredTypeOfSymbol(
    typeChecker.getSymbolAtLocation(node.name)
  );
  const unionTypes =
    resolvedTypes.types
      ?.map((type: any) =>
        typeof type.value === "string" ? `'${type.value}'` : type.value
      )
      .join(" | ") || "";

  aliasTypes[currentFilename][name] = unionTypes;
}

function analyzePhase({ ts, node, moduleDoc, context }: any) {
  moduleDoc.path = moduleDoc.path.replace(`${process.cwd()}/`, "");
  if (node.kind === ts.SyntaxKind.SourceFile) {
    currentFilename = path.resolve(node.fileName);
  }

  if (node.kind !== ts.SyntaxKind.ClassDeclaration) {
    return;
  }

  const component = getComponent(node, moduleDoc);
  if (!component) {
    return;
  }

  updateExpandedTypes(component, context);
  logBlue(
    "[cem-expanded-types] - Custom Elements Manifest updated.",
    options.hideLogs
  );
}

function getComponent(node: any, moduleDoc: any) {
  const className = node.name.getText();
  return moduleDoc.declarations.find(
    (dec: Component) => dec.name === className
  ) as Component | undefined;
}

function getTypedMembers(component: Component) {
  return (
    [
      ...(component.attributes || []),
      ...(component.members || []),
      ...(component.events || []),
    ] as any[]
  ).filter((item) => item?.type);
}

function getTypeValue(item: any, context: any) {
  const importedType = context?.imports?.find(
    (i: any) => i.name === item.type?.text
  );

  if (!importedType) {
    return getExpandedType(currentFilename, item.type.text);
  }

  const resolvedPath = getResolvedImportPath(currentFilename, importedType);

  return getExpandedType(resolvedPath, importedType.name);
}

function getResolvedImportPath(importPath: string, importedType: any) {
  let resolvedPath = path.resolve(
    path.dirname(currentFilename),
    importedType.importPath
  );

  if (aliasTypes[resolvedPath]) {
    return resolvedPath;
  }

  if (aliasTypes[resolvedPath + ".ts"]) {
    resolvedPath += ".ts";
  } else if (resolvedPath.endsWith(".js")) {
    resolvedPath = `${resolvedPath}`.replace(".js", ".ts");
  } else if (resolvedPath.endsWith(".d.ts")) {
    parseTypeDefinitionTypes(resolvedPath);
    resolvedPath = currentFilename;
  } else if (fs.existsSync(resolvedPath + ".d.ts")) {
    parseTypeDefinitionTypes(resolvedPath + ".d.ts");
    resolvedPath = currentFilename;
  }

  return resolvedPath;
}

function parseTypeDefinitionTypes(source: string) {
  if (!source) {
    return;
  }

  const program = typeScript.createProgram([source], tsConfigFile);
  const sourceFile = program.getSourceFile(source);

  typeScript.forEachChild(sourceFile!, parseFileTypes);
}

function updateExpandedTypes(component: Component, context: any) {
  const typedMembers = getTypedMembers(component);
  const propName = options.propertyName || "expandedTypes";

  typedMembers.forEach((member) => {
    const typeValue = getTypeValue(member, context);
    if (typeValue !== member.type.text) {
      member[propName] = {
        text: typeValue,
      };
    }
  });
}

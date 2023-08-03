import path from "path";
import fs from "fs";
import type { Component } from "../../../tools/cem-utils";

export interface Options {
  propertyName?: string;
}

const aliasTypes: any = {};
let currentFilename = "";
let typeChecker: any;
let options: any;

/**
 * CEM Analyzer plugin to expand types in component metadata
 * @param tc TypeScript type checker
 * @param op Configuration options
 * @returns 
 */
export function expandTypesPlugin(tc: any, op: Options = { propertyName: "expandedType" }) {
  typeChecker = tc;
  options = op;

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
export function getTsProgram(ts: any, globs: string[], configName: string) {
  const configFile = ts.findConfigFile(
    process.cwd(),
    ts.sys.fileExists,
    configName
  );
  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  return ts.createProgram(globs, config);
}

function getExpandedType(fileName: string, typeName: string): string {
  if (typeof aliasTypes[fileName] === "undefined") {
    return typeName;
  }

  if (typeof aliasTypes[fileName][typeName] !== "undefined") {
    return aliasTypes[fileName][typeName];
  }

  if (typeName.includes("|")) {
    return getUnionTypes(fileName, typeName);
  }

  return typeName.startsWith("{") && typeName.endsWith("}")
    ? getObjectTypes(fileName, typeName)
    : typeName;
}

function getUnionTypes(fileName: string, typeName: string) {
  const parts = typeName
    .split("|")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  return parts.map((part) => getExpandedType(fileName, part)).join(" | ");
}

function getObjectTypes(fileName: string, typeName: string) {
  const parts = [
    ...new Set(
      typeName
        .split(/[:{}]/)
        .map((part) => part.trim())
        .filter((part) => part.length > 0)
    ),
  ];
  parts.forEach((part) => {
    typeName = typeName.replace(
      new RegExp(part, "g"),
      getExpandedType(fileName, part)
    );
  });
  return typeName;
}

function collectPhase({ ts, node }: any) {
  if (node.kind === ts.SyntaxKind.SourceFile) {
    currentFilename = path.resolve(node.fileName);
    aliasTypes[currentFilename] = {};
  } else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
    setEnumTypes(node, currentFilename);
  } else if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
    if (node.type.kind === ts.SyntaxKind.UnionType) {
      setBasicUnionTypes(node, currentFilename);
    } else if (
      node.type.kind === ts.SyntaxKind.TypeOperator ||
      node.type.kind === ts.SyntaxKind.IndexedAccessType
    ) {
      setComplexUnionTypes(node, currentFilename);
    }
  }
}

function setEnumTypes(node: any, currentFilename: string) {
  const name = node.name.getText();
  const shortText = node.members
    ?.map((mem: any) => mem.initializer?.getText())
    .join(" | ");

  aliasTypes[currentFilename][name] = shortText;
}

function setBasicUnionTypes(node: any, currentFilename: string) {
  const name = node.name.getText();
  const unionTypes = node.type.types
    .map((type: any) => type.getText())
    .join(" | ");
  aliasTypes[currentFilename][name] = unionTypes;
}

function setComplexUnionTypes(
  node: any,
  currentFilename: string,
) {
  const name = node.name.getText();
  const resolvedTypes = typeChecker.getDeclaredTypeOfSymbol(
    typeChecker.getSymbolAtLocation(node.name)
  );
  const unionTypes = resolvedTypes.types
    .map((type: any) => {
      if (typeof type.value === "string") {
        return `'${type.value}'`;
      }
      return type.value;
    })
    .join(" | ");
  aliasTypes[currentFilename][name] = unionTypes;
}

function analyzePhase({ ts, node, moduleDoc, context }: any) {
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
      ...(component.members || []),
      ...(component.attributes || []),
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
  
  let resolvedPath = path.resolve(
    path.dirname(currentFilename),
    importedType.importPath
  );

  if (!aliasTypes[resolvedPath] && aliasTypes[resolvedPath + ".ts"]) {
    resolvedPath += ".ts";
  }

  return getExpandedType(resolvedPath, importedType.name);
}

function updateExpandedTypes(component: Component, context: any) {
  const typedMembers = getTypedMembers(component);

  typedMembers.forEach((member) => {
    const typeValue = getTypeValue(member, context);
    if (typeValue !== member.type.text) {
      member[options.propertyName] = {
        text: typeValue,
      };
    }
  });
}

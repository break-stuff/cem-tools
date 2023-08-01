import path from "path";
import type { CEM, Component } from "../../../tools/cem-utils";

const aliasTypes: any = {};
let currentFilename = "";
let typeChecker: any;

export function getTypeChecker(ts: any, globs: string[]) {
  const configFile = ts.findConfigFile(
    process.cwd(),
    ts.sys.fileExists,
    "tsconfig.json"
  );
  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  const program = ts.createProgram(globs, config);
  return program.getTypeChecker();
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

export function expandTypesPlugin(tc: any, options: any) {
  typeChecker = tc;

  return {
    name: "expand-types-plugin",
    collectPhase,
    analyzePhase,
  };
}

function collectPhase({ ts, node }: any) {
  if (node.kind === ts.SyntaxKind.SourceFile) {
    initFileMetadata(currentFilename, node.fileName);
  } else if (node.kind === ts.SyntaxKind.EnumDeclaration) {
    setEnumTypes(node, currentFilename);
  } else if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
    if (node.type.kind === ts.SyntaxKind.UnionType) {
      setBasicUnionTypes(node, currentFilename);
    } else if (
      node.type.kind === ts.SyntaxKind.TypeOperator ||
      node.type.kind === ts.SyntaxKind.IndexedAccessType
    ) {
      setComplexUnionTypes(node, currentFilename, typeChecker);
    }
  }
}

function initFileMetadata(currentFilename: string, fileName: string) {
  currentFilename = path.resolve(fileName);
  aliasTypes[currentFilename] = {};
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
  typeChecker: any
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
    return;
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
  // Is the type imported?
  const importedType = context?.imports?.find(
    (i: any) => i.name === item.type?.text
  );
  if (!importedType) {
    return getExpandedType(currentFilename, item.type.text);
  }

  // Resolve the import's path based on the current file's location
  let resolvedPath = path.resolve(
    path.dirname(currentFilename),
    importedType.importPath
  );

  // Imports without an extension won't have a match, so let's look for a TypeScript file
  if (!aliasTypes[resolvedPath] && aliasTypes[resolvedPath + ".ts"]) {
    resolvedPath += ".ts";
  }

  getExpandedType(resolvedPath, importedType.name);
}

function updateExpandedTypes(component: Component, context: any) {
  const typedMembers = getTypedMembers(component);

  typedMembers.forEach((member) => {
    const typeValue = getTypeValue(member, context);
    if (typeValue !== member.type.text) {
      member.rawType = {
        text: typeValue,
      };
    }
  });
}

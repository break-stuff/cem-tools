/* eslint-disable @typescript-eslint/no-explicit-any */
import { Declaration, Reference } from "./cem-schema";
const componentReferences: { [key: string]: Reference[] } = {};

export function setComponentReferences(ts: any, node: any, moduleDoc: any) {
  if (node.kind !== ts.SyntaxKind.ClassDeclaration) {
    return;
  }

  const references = getReferences(node);
  updateReferences(references, node, moduleDoc);
}

export function getReferencesByComponent(componentName: string) {
  return componentReferences[componentName] ?? [];
}

function getReferences(node: unknown) {
  const docs = getDocsByTagName(node, "reference");
  return docs
    ?.map((tags: any) =>
      tags?.map((doc: any) => {
        const values = doc?.comment.split(/ - (.*)/s);

        if (values && values.length > 1) {
          return {
            name: values[0].trim(),
            url: values[1].trim(),
          };
        }
      })
    )
    .flat();
}

function updateReferences(references: Reference[], node: any, moduleDoc: any) {
  if (!references?.length) {
    return;
  }

  const className: string = node.name.getText();
  const component: Declaration = moduleDoc?.declarations?.find(
    (dec: Declaration) => dec.name === className
  );

  componentReferences[component.name] = references as Reference[];
}

function getDocsByTagName(node: any, tagName: string) {
  return node?.jsDoc?.map((doc: any) =>
    doc?.tags?.filter((tag: any) => tag?.tagName?.getText() === tagName)
  );
}

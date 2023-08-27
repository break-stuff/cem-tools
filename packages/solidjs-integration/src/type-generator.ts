import {
  Component,
  getComponentDetailsTemplate,
  getComponentProperties,
  getComponents,
  getMemberDescription,
} from "../../../tools/cem-utils";
import { saveFile } from "../../../tools/integrations";
import { Options } from "./types";

export function generateSolidJsTypes(manifest: any, options: Options) {
  options = getOptions(options);

  if (!options.globalTypePath && !options.componentTypePath) {
    throw new Error(
      "You must provide either a `globalTypePath` or `componentTypePath` in the options."
    );
  }

  const components = getComponents(manifest, options.exclude);
  const template = getTypeTemplate(components, options);
  saveFile(options.outdir!, options.fileName!, template, "typescript");
}

function getOptions(options: Options) {
  options.fileName =
    options.fileName === undefined ? "solid-js.d.ts" : options.fileName;
  options.exclude = options.exclude === undefined ? [] : options.exclude;
  options.outdir = options.outdir === undefined ? "./" : options.outdir;
  return options;
}

function getTypeTemplate(components: Component[], options: Options) {
  const componentImportStatements =
    typeof options.componentTypePath === "function"
      ? components.map(
          (c) =>
            `import type { ${c.name} } from "${options.componentTypePath!(
              c.name,
              c.tagName
            )}";`
        )
      : [];

  return `
import type { JSX } from "solid-js";
${
  options.globalTypePath
    ? `import type { ${components.map((c) => c.name).join(", ")} } from "${
        options.globalTypePath
      }";`
    : ""
}
${componentImportStatements.join("\n")}

/**
 * This interface can be customized by users.
 * 
 * Usage:
 * 
 * \`\`\`ts
 * import type { ScopedElements } from "lit-app/solid";
 * 
 * declare module "solid-js" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * \`\`\`
 * 
 */
export type ScopedElements<
  Prefix extends string = "",
  Suffix extends string = ""
> = {
  [Key in keyof CustomElements as \`\${Prefix}\${Key}\${Suffix}\`]: CustomElements[Key];
};

type BaseProps = {
  /** Prop for setting inline styles */
  style?: JSX.CSSProperties;
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
};

type BaseEvents = {${
    Object.hasOwn(options, "globalEvents")
      ? options.globalEvents
      : `
  /** Emitted when an element is clicked */
  onClick?: (e: MouseEvent) => void;
`}};

${components
  ?.map((component: Component) => {
    return `

type ${component.name}Props = {
${
  component.attributes
    ?.map((attr) => {
      return `/** ${getMemberDescription(attr.description, attr.deprecated)} */
  "${attr.name}"?: ${component.name}['${attr.fieldName}'];`;
    })
    .join("\n") || ""
}
${
  getComponentProperties(component)
    ?.map((prop) => {
      return `/** ${getMemberDescription(prop.description, prop.deprecated)} */
  "prop:${prop.name}"?: ${component.name}['${prop.name}'];`;
    })
    .join("\n") || ""
}
${
  component.events
    ?.map((event) => {
      return `/** ${getMemberDescription(
        event.description,
        event.deprecated
      )} */
  // @ts-ignore
  "on:${event.name}"?: (e: CustomEvent<${
        event.type?.text || "never"
      }>) => void;`;
    })
    .join("\n") || ""
}
}`;
  })
  .join("\n")}

  type CustomElements = {
${components
  .map((component) => {
    return `

  /**
    ${getComponentDetailsTemplate(component, options, true)}
    */
    "${component.tagName}": Partial<${
      component.name
    }Props | BaseProps | BaseEvents>;`;
  })
  .join("\n")}
  }

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
`;
}

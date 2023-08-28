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
  /** Content added between the opening and closing tags of the element */
  children?: JSX.Element;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: JSX.CSSProperties;
};

type BaseEvents = {${
    Object.hasOwn(options, "globalEvents") ? options.globalEvents : ""
  }};

${components
  ?.map((component: Component) => {
    return `

type ${component.name}Props = {
${
  component.attributes
    ?.map((attr) => {
      if (attr.description === undefined) {
        return "";
      }

      const type =
        options.globalTypePath || options.componentTypePath
          ? `${component.name}['${attr.fieldName}']`
          : options.typesSrc
          ? (attr as any)[`${options.typesSrc}`]?.text
          : attr.type?.text || "string";

      return `/** ${getMemberDescription(attr.description, attr.deprecated)} */
  "${attr.name}"?: ${type};`;
    })
    .join("\n") || ""
}
${
  getComponentProperties(component)
    ?.map((prop) => {
      if (prop.description === undefined) {
        return "";
      }

      const type =
        options.globalTypePath || options.componentTypePath
          ? `${component.name}['${prop.name}']`
          : options.typesSrc
          ? (prop as any)[`${options.typesSrc}`]?.text
          : (prop as any).type?.text || "string";

      return `/** ${getMemberDescription(prop.description, prop.deprecated)} */
  "prop:${prop.name}"?: ${type};`;
    })
    .join("\n") || ""
}
${
  component.events
    ?.map((event) => {
      if (event.description === undefined) {
        return "";
      }

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

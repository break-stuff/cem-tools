import {
  Component,
  getComponentDetailsTemplate,
  getComponentProperties,
  getComponents,
  getCustomEventTypes,
  getMemberDescription,
} from "../../../tools/cem-utils";
import { createOutDir, logBlue, saveFile } from "../../../tools/integrations";
import { toPascalCase } from "../../../tools/utilities";
import { Options } from "./types";

export function generateJsxTypes(manifest: any, options: Options) {
  options = getOptions(options);

  const components = getComponents(manifest, options.exclude).filter(
    (x) => x.tagName
  );
  const template = getTypeTemplate(components, options);
  createOutDir(options.outdir!);
  const outputPath = saveFile(
    options.outdir!,
    options.fileName!,
    template,
    "typescript",
    120
  );
  logBlue(`[jsx-type-generator] - Generated "${outputPath}".`);
}

function getOptions(options: Options) {
  options.fileName =
    options.fileName === undefined
      ? "custom-element-jsx.d.ts"
      : options.fileName;
  options.exclude = options.exclude === undefined ? [] : options.exclude;
  options.outdir = options.outdir === undefined ? "./" : options.outdir;
  options.prefix = options.prefix === undefined ? "" : options.prefix;
  options.suffix = options.suffix === undefined ? "" : options.suffix;
  return options;
}

function getTypeTemplate(components: Component[], options: Options) {
  const componentNames = components
    .filter((x) => x.customElement)
    .map((c) => c.name);
  const componentImportStatements =
    typeof options.componentTypePath === "function"
      ? components.map((c) => {
          const types = getCustomEventTypes(c, componentNames);
          return `import type { ${
            options.defaultExport ? `default as ${c.name}` : c.name
          } ${types ? `, ${types}` : ""} } from "${options.componentTypePath?.(
            c.name,
            c.tagName
          )}";`;
        })
      : [];

  return `
${
  options.globalTypePath
    ? `import type { ${components
        .map((c) => {
          const componentType = options.defaultExport ? `default as ${c.name}` : c.name;
          const types = getCustomEventTypes(c, componentNames);
          return componentType + (types ? `, ${types}` : "");
        })
        .join(", ")} } from "${options.globalTypePath}";`
    : ""
}
${componentImportStatements.join("\n")}

/**
 * This type can be used to create scoped tags for your components.
 * 
 * Usage:
 * 
 * \`\`\`ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 * 
 * declare module "my-library" {
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
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: unknown | ((e: unknown) => void);
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
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
      const type =
        options.globalTypePath || options.componentTypePath
          ? `${component.name}['${prop.name}']`
          : options.typesSrc
          ? (prop as any)[`${options.typesSrc}`]?.text
          : (prop as any).type?.text || "string";

      return `/** ${getMemberDescription(prop.description, prop.deprecated)} */
  "${prop.name}"?: ${type};`;
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
  "on${toPascalCase(event.name)}"?: (e: CustomEvent<${
        event.type?.text || "never"
      }>) => void;`;
    })
    .join("\n") || ""
}
}`;
  })
  .join("\n")}

  export type CustomElements = {
${components
  .map((component) => {
    return `

  /**
    ${getComponentDetailsTemplate(component, options, true)}
    */
    "${options.prefix}${component.tagName}${options.suffix}": Partial<${
      component.name
    }Props | BaseProps | BaseEvents>;`;
  })
  .join("\n")}
  }
`;
}

import {
  Component,
  getComponentDetailsTemplate,
  getComponentProperties,
  getComponents,
  getCustomEventTypes,
  getMemberDescription,
} from "../../../tools/cem-utils";
import { logBlue, saveFile } from "../../../tools/integrations";
import { toPascalCase } from "../../../tools/utilities";
import { Options } from "./types";

export function generateVueTypes(manifest: any, options: Options) {
  options = getOptions(options);

  const components = getComponents(manifest, options.exclude).filter(
    (x) => x.tagName
  );
  const template = getTypeTemplate(components, options);
  const outputPath = saveFile(
    options.outdir!,
    options.fileName!,
    template,
    "typescript",
    120
  );
  logBlue(`[vue-type-generator] - Generated "${outputPath}".`);
}

function getOptions(options: Options) {
  options.fileName =
    options.fileName === undefined ? "custom-element-vue.d.ts" : options.fileName;
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
          return `import type { ${c.name} ${
            types ? `, ${types}` : ""
          } } from "${options.componentTypePath?.(c.name, c.tagName)}";`;
        })
      : [];

  return `
${
  options.globalTypePath
    ? `import type { ${components
        .map((c) => {
          const types = getCustomEventTypes(c, componentNames);
          return c.name + (types ? `, ${types}` : "");
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
 * import type { ScopedElements } from "path/to/library/vue-integration";
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
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
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
  "prop:${prop.name}"?: ${type};`;
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

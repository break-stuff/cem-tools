import {
  Component,
  getComponentDetailsTemplate,
  getComponentProperties,
  getComponents,
  getCustomEventTypes,
  getMemberDescription,
} from "../../../tools/cem-utils";
import {
  createOutDir,
  log,
  logGreen,
  logYellow,
  saveFile,
} from "../../../tools/integrations";
import { toPascalCase } from "../../../tools/utilities";
import { Options } from "./types";

export function generateVuejsTypes(manifest: any, options: Options) {
  if (options.skip) {
    logYellow("[vuejs-type-generator] - Skipped", options.hideLogs);
    return;
  }
  log(
    "[vuejs-type-generator] - Updating Custom Elements Manifest...",
    options.hideLogs,
  );

  options = getOptions(options);

  const components = getComponents(manifest, options.exclude).filter(
    (x) => x.tagName,
  );
  const template = getTypeTemplate(components, options);
  createOutDir(options.outdir!);
  const outputPath = saveFile(
    options.outdir!,
    options.fileName!,
    template,
    "typescript",
    120,
  );

  logGreen(`[vuejs-type-generator] - Generated "${outputPath}".`);
}

function getOptions(options: Options) {
  return {
    fileName: "custom-element-vuejs.d.ts",
    exclude: [],
    outdir: "./",
    prefix: "",
    suffix: "",
    ...options,
  };
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
            c.tagName,
          )}";`;
        })
      : [];

  return `
  import type { DefineComponent } from "vue";
${
  options.globalTypePath
    ? `import type { ${components
        .map((c) => {
          const componentType = options.defaultExport
            ? `default as ${c.name}`
            : c.name;
          const types = getCustomEventTypes(c, componentNames);
          return componentType + (types ? `, ${types}` : "");
        })
        .join(", ")} } from "${options.globalTypePath}";`
    : ""
}
${componentImportStatements.join("\n")}

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
        event.deprecated,
      )} */
  "on${event.name}"?: (e: CustomEvent<${
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
    "${options.prefix}${component.tagName}${options.suffix}": DefineComponent<${
      component.name
    }Props>;`;
  })
  .join("\n")}
  }

  declare module "vue" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface GlobalComponents extends CustomElements {}
  }
  
  declare global {
    namespace JSX {
      // eslint-disable-next-line @typescript-eslint/no-empty-interface
      interface IntrinsicElements extends CustomElements {}
    }
  }
`;
}

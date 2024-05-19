import { config } from "process";
import {
  getComponents,
  type CEM,
  Component,
} from "../../../tools/cem-utils/index.js";
import {
  createOutDir,
  logBlue,
  logYellow,
  saveFile,
} from "../../../tools/integrations/index.js";
import path from "path";

/** An object where the key is the component tag-name. */
export type ComponentConfig = {
  /** The key is the component's tag-name (in lower-case) */
  [key: string]: {
    /** The path to the module where the component is defined */
    importPath: string;
    /** Any components used within this component that will be registered at the same time */
    dependencies?: string[];
  };
};

/** Configuration options for the `updateConfig` function */
export type RuntimeConfiguration = {
  /** Additional components that may not be included in your Custom Elements Manifest */
  components?: ComponentConfig;
  /** The root element to observe for your custom elements */
  rootElement?: Element;
  /** Component tag names that you would like to eager-load */
  eagerLoad: string[];
};

export type Options = {
  /** The template for creating the component's import path */
  importPathTemplate: (name: string, tagName: string) => string;
  /** Path to output directory */
  outdir?: string;
  /** The of the loader file */
  fileName?: string;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** Enables logging during the component loading process */
  debug?: boolean;
  /** Adds a prefix to tag name */
  prefix?: string;
  /** Adds a suffix to tag name */
  suffix?: string;
  /** Additional components that may not be included in your Custom Elements Manifest */
  additionalComponents: ComponentConfig;
  /** Component tag names that you would like to eager-load */
  eagerLoad: string[];
  /** Hides logs produced by the plugin */
  hideLogs?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
};

let userOptions: Options;
const loaderTemplate = (components: ComponentConfig) => `
let observer;
let components = ${JSON.stringify(components, null, 2)};
const eagerLoad = ${JSON.stringify(userOptions.eagerLoad || [])};

/** Update the lazy-loader configuration at runtime */
export async function updateConfig(config) {
  if (config.components) {
    components = { ...components, ...config.components };
  }

  if(config.prefix || config.suffix) {
    components = getScopedComponents(config.prefix, config.suffix);
  }

  if (config.rootElement) {
    observer.disconnect();
    start(config.rootElement);
  }

  if (config.eagerLoad) {
    await Promise.allSettled(eagerLoad?.map((tagName) => register(tagName)));
  }
}

function getScopedComponents(prefix = "", suffix = "") {
  const scopedComponents = {};
  for (const [key, value] of Object.entries(components)) {
    const newKey = prefix + key + suffix;
    scopedComponents[newKey] = value;
  }

  return scopedComponents;
}

/** Load any undefined custom elements and load the components in the list */
async function load(root) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : "";
  const tags = [...root.querySelectorAll(":not(:defined)")]?.map((el) =>
    el.tagName.toLowerCase()
  ) || [];
  if (rootTagName.includes("-") && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }
  const tagsToRegister = [...new Set(tags)];
  await Promise.allSettled(tagsToRegister?.map((tagName) => register(tagName)));
}

/** Register the component and any dependencies */
function register(tagName) {
  if (customElements.get(tagName)) {
    ${
      userOptions.debug
        ? `console.warn(\`<\${tagName}> is already registered\`);\n`
        : ""
    }

    cleanUp(component, tagName);
    return Promise.resolve();
  }

  const component = components[tagName];
  if (!component) {
    ${
      userOptions.debug
        ? `console.warn(\`No component found for <\${tagName}>\`);\n`
        : ""
    }

    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    import(component.importPath)
      .then(() => {
        ${
          userOptions.debug
            ? `console.log(\`Loaded <\${tagName}> from \${component.importPath}\`);\n`
            : ""
        }

        cleanUp(component, tagName);
        resolve();
      })
      .catch(() => {
        console.error(\`Unable to load <\${tagName}> from \${component.importPath}\`);
        reject();
      });
  });
}

/** Remove the component from the list of components to load */
function cleanUp(component, tagName) {
  delete components[tagName];
  component.dependencies?.forEach((dependency) => {
    delete components[dependency];
  });

  if (!Object.keys(component).length) {
    observer.disconnect();
  }
}

/** Initialize the loader */
async function start(root = document.body) {
  // Eager load any components that are not defined in the Custom Elements Manifest
  await Promise.allSettled(eagerLoad?.map((tagName) => register(tagName)));

  // Watch for any new elements that are added to the DOM
  observer = new MutationObserver((mutations) => {
    for (const { addedNodes } of mutations) {
      for (const node of addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          load(node);
        }
      }
    }
  });
  
  load(root);
  observer.observe(root, { subtree: true, childList: true });
}

start();
`;

export function generateCustomElementLazyLoader(cem: CEM, options: Options) {
  if (options.skip) {
    logYellow("[custom-element-lazy-loader] - Skipped", options.hideLogs);
    return;
  }
  logBlue(
    "[custom-element-lazy-loader] - Updating Custom Elements Manifest...",
    options.hideLogs
  );

  userOptions = {
    outdir: "./",
    fileName: "loader.js",
    exclude: [],
    debug: false,
    prefix: "",
    suffix: "",
    ...options,
  };

  if (!userOptions.importPathTemplate) {
    throw new Error(
      "The `importPathTemplate` configuration option is required"
    );
  }

  createOutDir(userOptions.outdir!);

  const components: ComponentConfig = {};

  getComponents(cem, userOptions.exclude)
    .filter((x) => x.tagName)
    .forEach((component: Component) => {
      components[
        `${userOptions.prefix}${component.tagName}${userOptions.suffix}`
      ] = {
        importPath: userOptions.importPathTemplate(
          component.name,
          component.tagName!
        ),
        dependencies: (component as any)["dependencies"] || [],
      };
    });

  saveFile(
    userOptions.outdir!,
    userOptions.fileName!,
    loaderTemplate(components),
    "typescript"
  );
  logBlue(
    `[custom-element-lazy-loader] - Generated "${path.join(
      userOptions.outdir!,
      userOptions.fileName!
    )}".`,
    options.hideLogs
  );
}

let observer;
let components = {
  "radio-group": {
    importPath: "./dist/radio-group/RadioGroup.js",
    dependencies: [
      {
        name: "icon",
        description: "",
      },
      {
        name: "button",
        description: "",
      },
    ],
  },
  "radio-button": {
    importPath: "./dist/radio-button/RadioButton.js",
    dependencies: [
      {
        name: "icon",
        description: "",
      },
    ],
  },
  "deprecated-element": {
    importPath: "./dist/deprecated-element/DeprecatedElement.js",
    dependencies: [],
  },
  "my-button": {
    importPath: "./dist/my-button/MyButton.js",
    dependencies: [],
  },
};
const eagerLoad = [];

/** Update the lazy-loader configuration at runtime */
export async function updateConfig(config) {
  if (config.components) {
    components = { ...components, ...config.components };
  }

  if (config.prefix || config.suffix) {
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
  const tags =
    [...root.querySelectorAll(":not(:defined)")]?.map((el) =>
      el.tagName.toLowerCase(),
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
    cleanUp(component, tagName);
    return Promise.resolve();
  }

  const component = components[tagName];
  if (!component) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    import(component.importPath)
      .then(() => {
        cleanUp(component, tagName);
        resolve();
      })
      .catch(() => {
        console.error(
          `Unable to load <${tagName}> from ${component.importPath}`,
        );
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

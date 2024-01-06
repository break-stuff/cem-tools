let observer;
let components = {
  "radio-group": {
    importPath: "./dist/radio-group/RadioGroup.js",
    dependencies: [],
  },
  "radio-button": {
    importPath: "./dist/radio-button/RadioButton.js",
    dependencies: [],
  },
};

export function updateConfig(config) {
  if (config.components) {
    components = { ...components, ...config.components };
  }

  if (config.rootElement) {
    observer.disconnect();
    start(config.rootElement);
  }
}

async function load(root) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : "";
  const tags = [...root.querySelectorAll(":not(:defined)")].map((el) =>
    el.tagName.toLowerCase()
  );
  if (rootTagName.includes("-") && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }
  const tagsToRegister = [...new Set(tags)];
  await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));
}

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
          `Unable to load <${tagName}> from ${component.importPath}`
        );
        reject();
      });
  });
}

function cleanUp(component, tagName) {
  delete components[tagName];
  component.dependencies?.forEach((dependency) => {
    delete components[dependency];
  });

  if (!Object.keys(component).length) {
    observer.disconnect();
  }
}

function start(root = document.body) {
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

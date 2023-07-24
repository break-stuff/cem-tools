import { Options } from "../../../types";
import {
  config,
  getCssPropertyValues,
  getCssValues,
  getMethods,
  getTagList,
  getValueSet,
  updateConfig,
} from "../cem-utilities.js";
import { component, customElementsManifest } from "./test-data.js";

describe("updateConfig", () => {
  beforeEach(() => {
    const options: Options = {
      outdir: "./",
      htmlFileName: "vscode.html-custom-data.json",
      cssFileName: "vscode.css-custom-data.json",
      exclude: [],
      descriptionSrc: undefined,
      slotDocs: true,
      eventDocs: true,
      cssPropertiesDocs: true,
      cssPartsDocs: true,
      labels: {},
      cssSets: [],
    };

    updateConfig(options);
  });

  test("given a custom `outdir` config value, the config value should be updated, but others should use default", () => {
    // Arrange
    const options = {
      outdir: "./demo",
    };

    // Act
    updateConfig(options);

    // Assert
    expect(config.outdir).toBe("./demo");
    expect(config.htmlFileName).toBe("vscode.html-custom-data.json");
  });

  test("given a custom `slot` label, the config value should be updated, but other labels should use default", () => {
    // Arrange
    const slotLabel = "Slug";
    const options: Options = {
      labels: {
        slots: slotLabel,
      },
    };

    // Act
    updateConfig(options);
    const tagList = getTagList(customElementsManifest);

    // Assert
    expect(config.labels?.slots).toBe("Slug");
    expect(config.htmlFileName).toBe("vscode.html-custom-data.json");
    expect(JSON.stringify(tagList).includes(slotLabel)).toBe(true);
  });

  test("given a config to hide slots, the Slots section should not be in the docs", () => {
    // Arrange
    const options: Options = {
      slotDocs: false,
    };

    // Act
    updateConfig(options);
    const tagList = getTagList(customElementsManifest);

    // Assert
    expect(JSON.stringify(tagList).includes("**Slots:**")).toBe(false);
  });

  test("given a config to hide events, the Events section should not be in the docs", () => {
    // Arrange
    const options: Options = {
      eventDocs: false,
    };

    // Act
    updateConfig(options);
    const tagList = getTagList(customElementsManifest);

    // Assert
    expect(JSON.stringify(tagList).includes("**Events:**")).toBe(false);
  });

  test("given a config to hide CSS properties, the CSS Properties section should not be in the docs", () => {
    // Arrange
    const options: Options = {
      cssPropertiesDocs: false,
    };

    // Act
    updateConfig(options);
    const tagList = getTagList(customElementsManifest);

    // Assert
    expect(JSON.stringify(tagList).includes("**CSS Properties:**")).toBe(false);
  });

  test("given a config to hide CSS parts, the CSS Parts section should not be in the docs", () => {
    // Arrange
    const options: Options = {
      cssPartsDocs: false,
    };

    // Act
    updateConfig(options);
    const tagList = getTagList(customElementsManifest);

    // Assert
    expect(JSON.stringify(tagList).includes("**CSS Parts:**")).toBe(false);
  });
});

describe("getCssValues", () => {
  test("given a string with comma separated values, it should return an array of CSS Value objects", () => {
    // Arrange
    const input = "--color-primary|4px|#ccc";

    // Act
    const values = getCssValues(input);

    // Assert
    expect(values[0].name).toBe("var(--color-primary)");
    expect(values[1].name).toBe("4px");
  });
});

describe("getValueSet", () => {
  test("given a string array of values, it should be converted to an array of CSS Value objects", () => {
    // Arrange
    const options = {
      cssSets: [
        {
          name: "radiuses",
          values: ["--radius-sm", "--radius-md", "--radius-lg"],
        },
      ],
    };

    // Act
    updateConfig(options);
    const valueSet = getValueSet("set:radiuses");

    // Assert
    expect(valueSet[0].name).toBe("var(--radius-sm)");
    expect(valueSet[0].description).toBe(undefined);
  });

  test("given an object array of values, it should be converted to an array of CSS Value objects with a description", () => {
    // Arrange
    const options = {
      cssSets: [
        {
          name: "radiuses",
          values: [
            { name: "--radius-sm", description: "2px" },
            { name: "--radius-md", description: "4px" },
            { name: "--radius-lg", description: "8px" },
          ],
        },
      ],
    };

    // Act
    updateConfig(options);
    const valueSet = getValueSet("set:radiuses");

    // Assert
    expect(valueSet[1].name).toBe("var(--radius-md)");
    expect(valueSet[1].description).toBe("4px");
  });

  test("given a set name that doesn't exist, it should return and empty array", () => {
    // Arrange
    const options = {
      cssSets: [
        {
          name: "radiuses",
          values: ["--radius-sm", "--radius-md", "--radius-lg"],
        },
      ],
    };

    // Act
    updateConfig(options);
    const valueSet = getValueSet("set:random");

    // Assert
    expect(valueSet.length).toBe(0);
  });
});

describe("getCssPropertyValues", () => {
  test("given an empty parameter, it should return an empty array", () => {
    // Arrange

    // Act
    const values = getCssPropertyValues();

    // Assert
    expect(values.length).toBe(0);
  });

  test("given a set name, it should return a CSS Value Set", () => {
    // Arrange
    const options = {
      cssSets: [
        {
          name: "radiuses",
          values: [
            { name: "--radius-sm", description: "2px" },
            { name: "--radius-md", description: "4px" },
            { name: "--radius-lg", description: "8px" },
          ],
        },
      ],
    };

    // Act
    updateConfig(options)
    const values = getCssPropertyValues("set:radiuses");

    // Assert
    expect(values.length).toBe(3);
  });
});

describe("getTagList", () => {
  test("given a string with comma separated values, it should return an array of CSS Value objects", () => {
    // Arrange
    const input = "--color-primary,4px,#ccc";

    // Act
    const values = getCssValues(input);

    // Assert
    expect(values[0].name).toBe("var(--color-primary)");
    expect(values[1].name).toBe("4px");
  });
});

describe("getMethods", () => {
  test("given a component with 4 methods where 1 is private and 1 does not have a description, it should return 2 methods", () => {
    // Arrange

    // Act
    const methods = getMethods(component);

    // Assert
    expect(methods?.length).toBe(2);
  });
});

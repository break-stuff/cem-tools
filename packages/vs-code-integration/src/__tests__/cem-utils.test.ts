import {
  getCssPropertyValues,
  getCssValues,
  getValueSet,
} from "../cem-utils.js";
import { component } from "./test-data.js";
import { updateConfig } from "configurations";
import { getMethods } from "cem-utils";

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
    const valueSet = getValueSet("set:radiuses", options.cssSets);

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
    const valueSet = getValueSet("set:radiuses", options.cssSets);

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
    const valueSet = getValueSet("set:random", options.cssSets);

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
    const values = getCssPropertyValues("set:radiuses", options.cssSets);

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
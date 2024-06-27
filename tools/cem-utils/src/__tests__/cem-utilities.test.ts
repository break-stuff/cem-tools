import { getComponentMethods } from "../cem-utilities";
import { component, customElementsManifest } from "./test-data.js";

describe("getMethods", () => {
  test("given a component with 4 methods where 1 is private and 1 does not have a description, it should return 2 methods", () => {
    // Arrange

    // Act
    const methods = getComponentMethods(component);

    // Assert
    expect(methods?.length).toBe(2);
  });
});

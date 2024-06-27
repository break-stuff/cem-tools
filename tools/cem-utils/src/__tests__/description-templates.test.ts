import { getComponentMethods } from "../cem-utilities.js";
import {
  getCssPropsTemplate,
  getEventsTemplate,
  getMethodsTemplate,
  getPartsTemplate,
  getSlotsTemplate,
} from "../description-templates.js";
import { component } from "./test-data.js";

describe("getSlotsTemplate", () => {
  test("given a component with slots, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate(component.slots)?.trim();

    // Assert
    expect(result.startsWith("### **Slots:**")).toBe(true);
    expect(result.endsWith("label")).toBe(true);
  });

  test("given a configuration where `hideSlotDocs` is `true`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate(component.slots, true);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where no slots are documented, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate(undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where slots are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate([]);

    // Assert
    expect(result).toBe("");
  });
});

describe("getEventsTemplate", () => {
  test("given a component with events, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate(component.events)?.trim();

    // Assert
    expect(result.startsWith("### **Events:**")).toBe(true);
    expect(result.endsWith("typed-custom-event")).toBe(true);
  });

  test("given a configuration where `hideEventDocs` is `true`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate(component.events, true);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where events are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate(undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where events is an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate([]);

    // Assert
    expect(result).toBe("");
  });
});

describe("getCssPropsTemplate", () => {
  test("given a component with CSS attributes, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate(component.cssProperties)?.trim();

    // Assert
    expect(result.startsWith("### **CSS Properties:**")).toBe(true);
    expect(result.endsWith("_(default: red)_")).toBe(true);
  });

  test("given a configuration where `hideEventDocs` is `true`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate(component.cssProperties, true);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where properties are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate(undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where properties are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate([]);

    // Assert
    expect(result).toBe("");
  });
});

describe("getPartsTemplate", () => {
  test("given a component with CSS parts, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate(component.cssParts)?.trim();

    // Assert
    expect(result.startsWith("### **CSS Parts:**")).toBe(true);
    expect(result.endsWith("bar")).toBe(true);
  });

  test("given a configuration where `hideCssPartsDocs` is `true`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate(component.cssParts, true);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where parts are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate(undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where parts are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate([]);

    // Assert
    expect(result).toBe("");
  });
});

describe("getMethodsTemplate", () => {
  test("given a component with methods, it should return a formatted string", () => {
    // Arrange

    // Act
    const methods = getComponentMethods(component);
    const result = getMethodsTemplate(methods)?.trim();

    // Assert
    expect(result.startsWith("### **Methods:**")).toBe(true);
    expect(result.endsWith("dialog")).toBe(true);
  });

  test("given a configuration where `hideMethodDocs` is `true`, it should return an empty string", () => {
    // Arrange

    // Act
    const methods = getComponentMethods(component);
    const result = getMethodsTemplate(methods, true)?.trim();

    // Assert
    expect(result).toBe("");
  });

  test("given a component where methods are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getMethodsTemplate(undefined)?.trim();

    // Assert
    expect(result).toBe("");
  });

  test("given a component where methods are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getMethodsTemplate([])?.trim();

    // Assert
    expect(result).toBe("");
  });
});

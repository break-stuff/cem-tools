import { getMethods } from "../cem-utilities.js";
import {
  getCssPropsTemplate,
  getEventsTemplate,
  getMethodsTemplate,
  getPartsTemplate,
  getSlotsTemplate,
} from "../description-templates.js";
import { config, component } from "./test-data.js";

describe("getSlotsTemplate", () => {
  test("given a component with slots, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate(config, component.slots)?.trim();

    // Assert
    expect(result.startsWith("### **Slots:**")).toBe(true);
    expect(result.endsWith("label")).toBe(true);
  });

  test("given a configuration where `slotDocs` is `false`, it should return an empty string", () => {
    // Arrange

    // Act
    const slotConfig = { ...config, slotDocs: false };
    const result = getSlotsTemplate(slotConfig, component.slots);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where no slots are documented, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate(config, undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where slots are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getSlotsTemplate(config, []);

    // Assert
    expect(result).toBe("");
  });
});

describe("getEventsTemplate", () => {
  test("given a component with events, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate(config, component.events)?.trim();

    // Assert
    expect(result.startsWith("### **Events:**")).toBe(true);
    expect(result.endsWith("typed-custom-event")).toBe(true);
  });

  test("given a configuration where `eventDocs` is `false`, it should return an empty string", () => {
    // Arrange

    // Act
    const eventConfig = { ...config, eventDocs: false };
    const result = getEventsTemplate(eventConfig, component.events);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where events are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate(config, undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where events is an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getEventsTemplate(config, []);

    // Assert
    expect(result).toBe("");
  });
});

describe("getCssPropsTemplate", () => {
  test("given a component with CSS attributes, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate(config, component.cssProperties)?.trim();

    // Assert
    expect(result.startsWith("### **CSS Properties:**")).toBe(true);
    expect(result.endsWith("_(default: red)_")).toBe(true);
  });

  test("given a configuration where `eventDocs` is `false`, it should return an empty string", () => {
    // Arrange

    // Act
    const propConfig = { ...config, cssPropertiesDocs: false };
    const result = getCssPropsTemplate(propConfig, component.cssProperties);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where properties are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate(config, undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where properties are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getCssPropsTemplate(config, []);

    // Assert
    expect(result).toBe("");
  });
});

describe("getPartsTemplate", () => {
  test("given a component with CSS parts, it should return a formatted string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate(config, component.cssParts)?.trim();

    // Assert
    expect(result.startsWith("### **CSS Parts:**")).toBe(true);
    expect(result.endsWith("bar")).toBe(true);
  });

  test("given a configuration where `cssPartsDocs` is `false`, it should return an empty string", () => {
    // Arrange

    // Act
    const partConfig = { ...config, cssPartsDocs: false };
    const result = getPartsTemplate(partConfig, component.cssParts);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where parts are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate(config, undefined);

    // Assert
    expect(result).toBe("");
  });

  test("given a component where parts are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getPartsTemplate(config, []);

    // Assert
    expect(result).toBe("");
  });
});

describe("getMethodsTemplate", () => {
  test("given a component with methods, it should return a formatted string", () => {
    // Arrange

    // Act
    const methods = getMethods(component);
    const result = getMethodsTemplate(config, methods)?.trim();    
console.log(result);

    // Assert
    expect(result.startsWith("### **Methods:**")).toBe(true);
    expect(result.endsWith("dialog")).toBe(true);
  });

  test("given a configuration where `methodDocs` is `false`, it should return an empty string", () => {
    // Arrange

    // Act
    const methodConfig = { ...config, methodDocs: false };
    const methods = getMethods(component);
    const result = getMethodsTemplate(methodConfig, methods)?.trim();    

    // Assert
    expect(result).toBe("");
  });

  test("given a component where methods are `undefined`, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getMethodsTemplate(config, undefined)?.trim();    

    // Assert
    expect(result).toBe("");
  });

  test("given a component where methods are an empty array, it should return an empty string", () => {
    // Arrange

    // Act
    const result = getMethodsTemplate(config, [])?.trim();    

    // Assert
    expect(result).toBe("");
  });
});

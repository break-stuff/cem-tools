import { has, removeQuoteWrappers, toKebabCase } from "../utilities";

describe("toKebabCase", () => {
  test("given a string in Pascal case, it should convert it kebab case", () => {
    // Arrange
    const input = 'TestExample';

    // Act
    const result = toKebabCase(input);

    // Assert
    expect(result).toBe("test-example");
  });

  test("given a string in camel case, it should convert it kebab case", () => {
    // Arrange
    const input = 'testExample';

    // Act
    const result = toKebabCase(input);

    // Assert
    expect(result).toBe("test-example");
  });
});

describe("removeQuoteWrappers", () => {
  test("given a string with an apostrophe wrapper, it should remove the apostrophes", () => {
    // Arrange
    const input = `'Test'`;

    // Act
    const result = removeQuoteWrappers(input);

    // Assert
    expect(result).toBe("Test");
  });

  test("given a string with an quote wrapper, it should remove the quotes", () => {
    // Arrange
    const input = `"Test"`;

    // Act
    const result = removeQuoteWrappers(input);

    // Assert
    expect(result).toBe("Test");
  });

  test("given a string with a quote wrapper and an apostrophe within it, it should remove the wrapper but leave the apostrophe", () => {
    // Arrange
    const input = `"Can't"`;

    // Act
    const result = removeQuoteWrappers(input);

    // Assert
    expect(result).toBe("Can't");
  });
});

describe("has", () => {
  test("given an empty array, it should return false", () => {
    // Arrange
    const input: any[] = [];

    // Act
    const result = has(input);

    // Assert
    expect(result).toBe(false);
  });

  test("given `undefined`, it should return false", () => {
    // Arrange
    const input = undefined;

    // Act
    const result = has(input);

    // Assert
    expect(result).toBe(false);
  });

  test("given a string array, it should return true", () => {
    // Arrange
    const input = ['test 1', 'test 2', 'test 3'];

    // Act
    const result = has(input);

    // Assert
    expect(result).toBe(true);
  });

  test("given an object array, it should return true", () => {
    // Arrange
    const input = [{test: 'test 1'},{test: 'test 2'},{test: 'test 3'},];

    // Act
    const result = has(input);

    // Assert
    expect(result).toBe(true);
  });
});

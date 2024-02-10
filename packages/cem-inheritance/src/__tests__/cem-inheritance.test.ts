// import { getComponents } from "../../../../tools/cem-utils/index.ts";
import { getComponents } from "../../../../tools/cem-utils/index";
import { generateUpdatedCem } from "../cem-inheritance";
import { standAloneManifest } from "./test-data";
// import cem from "./_base-cem.js";
import fs from "fs";

describe("cem-inheritance", () => {
  describe("inherit within same file", () => {
    const components = getComponents(generateUpdatedCem(standAloneManifest));

    describe("CSS Parts", () => {
      const extendedInput = components.find((c) => c.name === "MyExtInput");
      const cssParts = extendedInput?.cssParts;

      test("should be inherited", () => {
        // Arrange

        // Act
        const endPart = cssParts?.find((p) => p.name === "end");

        // Assert
        expect(cssParts?.length).toBe(7);
        // @ts-expect-error
        expect(endPart?.inheritedFrom?.name).toBe("CoreInput");
      });
    });

    describe("Slots", () => {
      const extendedInput = components.find((c) => c.name === "MyExtInput");
      const slots = extendedInput?.slots;

      test("should be inherited", () => {
        // Arrange

        // Act
        const endPart = slots?.find((p) => p.name === "end");

        // Assert
        expect(slots?.length).toBe(3);
        // @ts-expect-error
        expect(endPart?.inheritedFrom?.name).toBe("CoreInput");
      });
    });

    describe("Members", () => {
      const extendedInput = components.find((c) => c.name === "MyExtInput");
      const members = extendedInput?.members;

      test("should be inherited", () => {
        // Arrange

        // Act
        const disabled = members?.find((p) => p.name === "disabled");
        const type = members?.find((p) => p.name === "type");
        const baseName = members?.find((p) => p.name === "baseName");

        // Assert
        expect(members?.length).toBe(58);
        expect(disabled?.inheritedFrom?.name).toBe("MyFormControlElement");
        expect(type?.inheritedFrom?.name).toBe("CoreInput");
        expect(baseName?.inheritedFrom?.name).toBe("MyElement");
      });

      test("protected Members should be inherited", () => {
        // Arrange

        // Act
        const handleChange = members?.find((p) => p.name === "handleChange");

        // Assert
        expect(handleChange?.inheritedFrom?.name).toBe("CoreInput");
      });

      test("private Members should not be inherited", () => {
        // Arrange

        // Act
        const dir = members?.find((p) => p.name === "_dir");

        // Assert
        expect(dir).toBeUndefined();
      });
    });

    describe("Attributes", () => {
      const extendedInput = components.find((c) => c.name === "MyExtInput");
      const attributes = extendedInput?.attributes;

      test("should be inherited", () => {
        // Arrange

        // Act
        const sizeAttribute = attributes?.find((a) => a.name === "size");
        const patternAttribute = attributes?.find((a) => a.name === "pattern");
        const dirAttribute = attributes?.find((a) => a.name === "dir");

        // Assert
        expect(attributes?.length).toBe(27);
        expect(sizeAttribute?.inheritedFrom).toBeUndefined();
        expect(patternAttribute?.inheritedFrom?.name).toBe("CoreInput");
        expect(dirAttribute?.inheritedFrom?.name).toBe("MyElement");
      });
    });

    describe("Events", () => {
      const extendedInput = components.find((c) => c.name === "MyExtInput");
      const events = extendedInput?.events;

      test("should be inherited", () => {
        // Arrange

        // Act
        const inputEvent = events?.find((e) => e.name === "input");

        // Assert
        expect(events?.length).toBe(4);
        expect(inputEvent?.inheritedFrom?.name).toBe("CoreInput");
      });
    });

    // test("given a custom `slot` label, the config value should be updated, but other labels should use default", () => {
    //   // Arrange
    //   const slotLabel = "Slug";
    //   const options = getOptions({
    //     labels: {
    //       slots: slotLabel,
    //     },
    //   });

    //   // Act
    //   const tagList = getTagList(components, options);

    //   // Assert
    //   expect(options.labels?.slots).toBe("Slug");
    //   expect(options.webTypesFileName).toBe("vscode.html-custom-data.json");
    //   expect(JSON.stringify(tagList).includes(slotLabel)).toBe(true);
    // });

    // test("given a config to hide slots, the Slots section should not be in the docs", () => {
    //   // Arrange
    //   const options = getOptions({
    //     hideSlotDocs: false,
    //   });

    //   // Act
    //   const tagList = getTagList(components, options);

    //   // Assert
    //   expect(JSON.stringify(tagList).includes("**Slots:**")).toBe(false);
    // });

    // test("given a config to hide events, the Events section should not be in the docs", () => {
    //   // Arrange
    //   const options = getOptions({
    //     hideEventDocs: false,
    //   });

    //   // Act
    //   const tagList = getTagList(components, options);

    //   // Assert
    //   expect(JSON.stringify(tagList).includes("**Events:**")).toBe(false);
    // });

    // test("given a config to hide CSS properties, the CSS Properties section should not be in the docs", () => {
    //   // Arrange
    //   const options = getOptions({
    //     hideCssPropertiesDocs: false,
    //   });

    //   // Act
    //   const tagList = getTagList(components, options);

    //   // Assert
    //   expect(JSON.stringify(tagList).includes("**CSS Properties:**")).toBe(
    //     false
    //   );
    // });

    // test("given a config to hide CSS parts, the CSS Parts section should not be in the docs", () => {
    //   // Arrange
    //   const options = getOptions({
    //     hideCssPartsDocs: false,
    //   });

    //   // Act
    //   const tagList = getTagList(components, options);

    //   // Assert
    //   expect(JSON.stringify(tagList).includes("**CSS Parts:**")).toBe(false);
    // });
  });

  // describe("getCssValues", () => {
  //   test("given a string with comma separated values, it should return an array of CSS Value objects", () => {
  //     // Arrange
  //     const input = "--color-primary|4px|#ccc";

  //     // Act
  //     const values = getCssValues(input);

  //     // Assert
  //     expect(values[0].name).toBe("var(--color-primary)");
  //     expect(values[1].name).toBe("4px");
  //   });
  // });

  // describe("getValueSet", () => {
  //   test("given a string array of values, it should be converted to an array of CSS Value objects", () => {
  //     // Arrange
  //     const options = {
  //       cssSets: [
  //         {
  //           name: "radiuses",
  //           values: ["--radius-sm", "--radius-md", "--radius-lg"],
  //         },
  //       ],
  //     };

  //     // Act
  //     updateConfig(options);
  //     const valueSet = getValueSet("set:radiuses");

  //     // Assert
  //     expect(valueSet[0].name).toBe("var(--radius-sm)");
  //     expect(valueSet[0].description).toBe(undefined);
  //   });

  // test("given an object array of values, it should be converted to an array of CSS Value objects with a description", () => {
  //   // Arrange
  //   const options = {
  //     cssSets: [
  //       {
  //         name: "radiuses",
  //         values: [
  //           { name: "--radius-sm", description: "2px" },
  //           { name: "--radius-md", description: "4px" },
  //           { name: "--radius-lg", description: "8px" },
  //         ],
  //       },
  //     ],
  //   };

  //   // Act
  //   updateConfig(options);
  //   const valueSet = getValueSet("set:radiuses");

  //   // Assert
  //   expect(valueSet[1].name).toBe("var(--radius-md)");
  //   expect(valueSet[1].description).toBe("4px");
  // });

  //   test("given a set name that doesn't exist, it should return and empty array", () => {
  //     // Arrange
  //     const options = {
  //       cssSets: [
  //         {
  //           name: "radiuses",
  //           values: ["--radius-sm", "--radius-md", "--radius-lg"],
  //         },
  //       ],
  //     };

  //     // Act
  //     updateConfig(options);
  //     const valueSet = getValueSet("set:random");

  //     // Assert
  //     expect(valueSet.length).toBe(0);
  //   });
  // });

  // describe("getCssPropertyValues", () => {
  //   test("given an empty parameter, it should return an empty array", () => {
  //     // Arrange

  //     // Act
  //     const values = getCssPropertyValues();

  //     // Assert
  //     expect(values.length).toBe(0);
  //   });

  //   test("given a set name, it should return a CSS Value Set", () => {
  //     // Arrange
  //     const options = {
  //       cssSets: [
  //         {
  //           name: "radiuses",
  //           values: [
  //             { name: "--radius-sm", description: "2px" },
  //             { name: "--radius-md", description: "4px" },
  //             { name: "--radius-lg", description: "8px" },
  //           ],
  //         },
  //       ],
  //     };

  //     // Act
  //     const values = getCssPropertyValues("set:radiuses");

  //     // Assert
  //     expect(values.length).toBe(3);
  //   });
  // });

  // describe("getTagList", () => {
  //   test("given a string with comma separated values, it should return an array of CSS Value objects", () => {
  //     // Arrange
  //     const input = "--color-primary,4px,#ccc";

  //     // Act
  //     const values = getCssValues(input);

  //     // Assert
  //     expect(values[0].name).toBe("var(--color-primary)");
  //     expect(values[1].name).toBe("4px");
  //   });
  // });
});

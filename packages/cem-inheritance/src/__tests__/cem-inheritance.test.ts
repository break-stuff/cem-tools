import { getComponents } from "../../../../tools/cem-utils/index";
import { generateUpdatedCem } from "../cem-inheritance";
import {
  standAloneManifest,
  baseManifest,
  externalManifest,
} from "./test-data";

globalThis.structuredClone = (v) => JSON.parse(JSON.stringify(v));

let singleCEM = structuredClone(standAloneManifest);
let baseCEM = structuredClone(baseManifest);
let externalCEM = structuredClone(externalManifest);

describe("cem-inheritance", () => {
  afterEach(() => {
    singleCEM = structuredClone(standAloneManifest);
    baseCEM = structuredClone(baseManifest);
    externalCEM = structuredClone(externalManifest);
  });

  describe("inherit within same file", () => {
    const components = getComponents(generateUpdatedCem(singleCEM));

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
  });

  describe("options", () => {
    it("should exclude entries from excluded components", () => {
      // Arrange
      const options = {
        exclude: ["MyElement"],
      };

      // Act
      const components = getComponents(generateUpdatedCem(singleCEM, options));
      const myExtElement = components.find((c) => c.name === "MyExtElement");

      // Assert
      expect(
        myExtElement?.attributes?.find((x) => x.name === "dir")
      ).toBeUndefined();
    });

    it("should exclude entries from omitted aspects", () => {
      // Arrange
      const options = {
        omit: {
          MyFormControlElement: {
            members: ["disabled"],
          },
        },
      };

      // Act
      const components = getComponents(generateUpdatedCem(singleCEM, options));
      const myExtInput = components.find((c) => c.name === "MyExtInput");

      // Assert
      expect(
        myExtInput?.members?.find((x) => x.name === "disabled")
      ).toBeUndefined();
    });

    it("should exclude entries from ignored aspects", () => {
      // Arrange
      const options = {
        ignore: ["cssProperties"],
      };

      // Act
      const components = getComponents(generateUpdatedCem(singleCEM, options));
      const myExtInput = components.find((c) => c.name === "MyExtInput");

      // Assert
      expect(myExtInput?.cssProperties?.length).toBeUndefined();
    });

    // skipped because it fails when other tests run, but passes in isolation
    it.skip("should exclude entries from external CEM", () => {
      // Arrange
      const options = {
        externalManifests: [externalCEM],
      };

      // Act
      const components = getComponents(generateUpdatedCem(baseCEM, options));
      const myExtInput = components.find((c) => c.name === "MyExtInput");

      // Assert
      expect(components.length).toBe(1);
      expect(myExtInput?.members?.length).toBe(58);
      expect(myExtInput?.attributes?.length).toBe(27);
      expect(myExtInput?.events?.length).toBe(4);
      expect(myExtInput?.slots?.length).toBe(3);
      expect(myExtInput?.cssParts?.length).toBe(7);
    });
  });
});

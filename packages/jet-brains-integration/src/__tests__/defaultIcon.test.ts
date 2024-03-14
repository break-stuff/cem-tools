import { Options } from "../..";
import { customElementsManifest } from "./test-data";
import { getOptions, getTagList, saveWebTypeFile } from "../web-types-generator";
import { getComponents } from "../../../../tools/cem-utils";
import {readFileSync} from "fs";

describe("web-types-generator", () => {
  const components = getComponents(customElementsManifest);


  test("given a config to set the defaultIcon, the default-icon: should have the icon", () => {
    // Arrange
    const options = getOptions({
      defaultIcon: "icon.svg",
      outdir:"test_output"
    });

    // Act
    saveWebTypeFile([], [], [], options);

    const data = readFileSync("test_output/web-types.json", 'utf-8')
    const wtJson = (JSON.parse(data));

    // Assert
    expect(wtJson["default-icon"]).toBe("icon.svg");
  });
})

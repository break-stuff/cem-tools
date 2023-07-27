import {
  BaseConfiguration,
  updateConfig,
} from "../config";
import { config } from "./test-data.js";

describe("updateConfig", () => {
  beforeEach(() => {
    const options: BaseConfiguration = {
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
    const options: BaseConfiguration = {
      labels: {
        slots: slotLabel,
      },
    };

    // Act
    updateConfig(options);

    // Assert
    expect(config.labels?.slots).toBe("Slug");
    expect(config.htmlFileName).toBe("vscode.html-custom-data.json");
  });
});

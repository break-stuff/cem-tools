import {
  getComponents,
  type CEM,
  Component,
} from "../../../tools/cem-utils/index.js";
import {
  createOutDir,
  logBlue,
  saveFile,
} from "../../../tools/integrations/index.js";
import path from "path";


/** Configuration options for the `updateConfig` function */
export type Options = {
  /** Path to output directory */
  outdir?: string;
  /** The of the loader file */
  fileName?: string;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** Adds a prefix to tag name */
  prefix?: string;
  /** Adds a suffix to tag name */
  suffix?: string;
};

let userOptions: Options;


export function generateEsLintLintRules(cem: CEM, options: Options) {
  userOptions = {
    outdir: "./",
    fileName: "loader.js",
    exclude: [],
    prefix: "",
    suffix: "",
    ...options,
  };

  createOutDir(userOptions.outdir!);


  getComponents(cem, userOptions.exclude)
    .filter((x) => x.tagName)
    .forEach((component: Component) => {
    });

  // saveFile(
  //   userOptions.outdir!,
  //   userOptions.fileName!,
  //   loaderTemplate(components),
  //   "typescript"
  // );
  logBlue(
    `[custom-element-lazy-loader] - Generated "${path.join(
      userOptions.outdir!,
      userOptions.fileName!
    )}".`
  );
}

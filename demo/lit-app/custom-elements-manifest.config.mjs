import { customElementVsCodePlugin } from "custom-element-vs-code-integration";
import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";
import { customElementSolidJsPlugin } from "custom-element-solidjs-integration";
import { customElementJsxPlugin } from "custom-element-jsx-integration";
import { getTsProgram, expandTypesPlugin } from "cem-plugin-expanded-types";
import { customElementReactWrapperPlugin } from "custom-element-react-wrappers";
import { customElementVuejsPlugin } from "custom-element-vuejs-integration";

export default {
  /** Globs to analyze */
  globs: ["src/**/*.ts"],
  /** Directory to output CEM to */
  outdir: "./",
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: false,
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: true,
  /** Enable special handling for litelement */
  litelement: true,

  overrideModuleCreation: ({ ts, globs }) => {
    const program = getTsProgram(ts, globs, "tsconfig.json");
    return program
      .getSourceFiles()
      .filter((sf) => globs.find((glob) => sf.fileName.includes(glob)));
  },

  /** Provide custom plugins */
  plugins: [
    expandTypesPlugin(),
    customElementVsCodePlugin({ typesSrc: "expandedType" }),
    customElementJetBrainsPlugin({ typesSrc: "expandedType" }),
    customElementSolidJsPlugin({
      // globalTypePath: "./types"
      componentTypePath: (name, tag) => `./dist/${tag}/${name}.d.ts`,
    }),
    customElementJsxPlugin({
      componentTypePath: (name, tag) => `./dist/${tag}/${name}.d.ts`,
    }),
    customElementReactWrapperPlugin({
      outdir: "./dist/react",
      modulePath: () => `../index.js`,
      globalEvents: [
        {
          event: "onChange",
          description: "Fired when the value of an input element changes.",
          type: "React.ChangeEventHandler",
        },
        {
          event: "onSubmit",
          description: "Fired when a form is submitted.",
          type: "React.FormEventHandler",
        },
        {
          event: "onFocus",
          description: "Triggered when an element receives focus.",
          type: "React.FocusEventHandler",
        },
      ],
    }),
    customElementVuejsPlugin({
      componentTypePath: (name, tag) => `./dist/${tag}/${name}.d.ts`,
    }),
  ],
};

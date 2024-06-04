import { customElementVsCodePlugin } from "custom-element-vs-code-integration";
import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";
import { customElementSolidJsPlugin } from "custom-element-solidjs-integration";
import { customElementJsxPlugin } from "custom-element-jsx-integration";
import { getTsProgram, expandTypesPlugin } from "cem-plugin-expanded-types";
import { customElementReactWrapperPlugin } from "custom-element-react-wrappers";
import { customElementVuejsPlugin } from "custom-element-vuejs-integration";
import { customElementLazyLoaderPlugin } from "custom-element-lazy-loader";
import { customElementSveltePlugin } from "custom-element-svelte-integration";
import { customJSDocTagsPlugin } from "cem-plugin-custom-jsdoc-tags";
import { cemDeprecatorPlugin } from "custom-elements-manifest-deprecator";
import { customEsLintRuleGeneratorPlugin } from "custom-element-eslint-rule-generator";

export default {
  /** Globs to analyze */
  globs: ["src/**/*.ts"],
  /** Directory to output CEM to */
  outdir: "./",
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: false,
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
      modulePath: (className, tagName) => `../${tagName}/${tagName}.js`,
      reactProps: true,
      scopedTags: true,
      ssrSafe: true
    }),
    customElementVuejsPlugin({
      componentTypePath: (name, tag) => `./dist/${tag}/${name}.d.ts`,
    }),
    customElementSveltePlugin({
      componentTypePath: (name, tag) => `./dist/${tag}/${name}.d.ts`,
    }),
    customElementLazyLoaderPlugin({
      importPathTemplate: (name, tag) => `./dist/${tag}/${name}.js`,
    }),
    customJSDocTagsPlugin({
      tags: {
        since: {},
        dependency: {
          mappedName: 'dependencies',
          isArray: true,
        },
        fancy: {},
        default: {}
      }
    }),
    cemDeprecatorPlugin(),
    customEsLintRuleGeneratorPlugin()
  ],
};

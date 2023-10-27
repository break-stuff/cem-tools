import { customElementVsCodePlugin } from "custom-element-vs-code-integration";
import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";
import { customElementReactWrapperPlugin } from "custom-element-react-wrappers";

export default {
  /** Globs to analyze */
  globs: ["src/**/*.js"],
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
  /** Provide custom plugins */
  plugins: [
    customElementVsCodePlugin(),
    customElementJetBrainsPlugin(),
    customElementReactWrapperPlugin({
      outdir: "./dist/react",
      modulePath: (name, tag) => `../../src/${tag}.js`,
    }),
  ],
};

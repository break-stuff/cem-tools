import { cemDeprecatorPlugin } from 'custom-elements-manifest-deprecator';

export default {
  /** Globs to analyze */
  globs: ['src/**/*.ts'],
  /** Enable special handling for litelement */
  litelement: true,
  /** Provide custom plugins */
  plugins: [
    cemDeprecatorPlugin()
  ],
}
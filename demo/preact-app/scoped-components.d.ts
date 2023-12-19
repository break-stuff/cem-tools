import type { CustomElements, ScopedElements } from "lit-app/custom-element-jsx";

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements
      extends CustomElements {}
  }
}
import type { CustomElements, ScopedElements } from "lit-app/solid-js";

declare global {
  namespace JSX {
    interface IntrinsicElements
      extends CustomElements {}
  }
}
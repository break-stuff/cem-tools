import type { CustomElements, ScopedElements } from "lit-app/solid-js";

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements
      extends CustomElements,
        ScopedElements<"test-">,
        ScopedElements<"", "_test"> {}
  }
}

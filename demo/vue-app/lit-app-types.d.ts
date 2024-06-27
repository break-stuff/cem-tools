import { CustomElements } from "lit-app/custom-element-vuejs";

declare module "vue" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface GlobalComponents extends CustomElements {}
}

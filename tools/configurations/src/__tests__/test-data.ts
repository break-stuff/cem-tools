import { BaseOptions } from "../config";

export const config: BaseOptions = {
  outdir: "./",
  exclude: [],
  descriptionSrc: undefined,
  hideSlotDocs: false,
  hideEventDocs: false,
  hideCssPropertiesDocs: false,
  hideCssPartsDocs: false,
  hideMethodDocs: false,
  labels: {
    slots: "Slots",
    events: "Events",
    cssProperties: "CSS Properties",
    cssParts: "CSS Parts",
    methods: "Methods",
  },
};

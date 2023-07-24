import { BaseConfiguration } from "../config";

export const config: BaseConfiguration = {
  outdir: "./",
  htmlFileName: "vscode.html-custom-data.json",
  cssFileName: "vscode.css-custom-data.json",
  exclude: [],
  descriptionSrc: undefined,
  slotDocs: true,
  eventDocs: true,
  cssPropertiesDocs: true,
  cssPartsDocs: true,
  methodDocs: true,
  labels: {
    slots: "Slots",
    events: "Events",
    cssProperties: "CSS Properties",
    cssParts: "CSS Parts",
    methods: "Methods",
  },
};

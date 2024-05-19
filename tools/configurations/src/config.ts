import { LooseString } from "../../utilities";

export interface BaseOptions {
  /** Path to output directory */
  outdir?: string;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** The property name from the component object that you would like to use for the description of your component */
  descriptionSrc?: LooseString<"description" | "summary">;
  /** Displays the slot section of the element description */
  hideSlotDocs?: boolean;
  /** Displays the event section of the element description */
  hideEventDocs?: boolean;
  /** Displays the CSS custom properties section of the element description */
  hideCssPropertiesDocs?: boolean;
  /** Displays the CSS parts section of the element description */
  hideCssPartsDocs?: boolean;
  /** Displays the methods section of the element description */
  hideMethodDocs?: boolean;
  /** Overrides the default section labels in the component description */
  labels?: DescriptionLabels;
  /** The property form your CEM component object to display your types */
  typesSrc?: string;
  /** Hides logs produced by the plugin */
  hideLogs?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
}

export interface DescriptionLabels {
  slots?: string;
  events?: string;
  cssProperties?: string;
  cssParts?: string;
  methods?: string;
}

export const baseConfig: BaseOptions = {
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

type ExtendedConfiguration = BaseOptions & { [key: string]: any };

export function updateConfig(params: ExtendedConfiguration) {
  const config = { ...baseConfig, ...params };
  config.labels = { ...baseConfig.labels, ...params?.labels };
  return config;
}

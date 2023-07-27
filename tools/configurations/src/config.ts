export interface BaseConfiguration {
  /** Path to output directory */
  outdir?: string;
  /** Name of the file with you component's custom HTML data */
  htmlFileName?: string | null;
  /** Name of the file with you component's custom CSS data */
  cssFileName?: string | null;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** The property name from the component object constructed by the CEM Analyzer */
  descriptionSrc?: "description" | "summary";
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
}

export interface DescriptionLabels {
  slots?: string;
  events?: string;
  cssProperties?: string;
  cssParts?: string;
  methods?: string;
}


export const baseConfig: BaseConfiguration = {
  outdir: "./",
  htmlFileName: "vscode.html-custom-data.json",
  cssFileName: "vscode.css-custom-data.json",
  exclude: [],
  descriptionSrc: undefined,
  hideSlotDocs: false,
  hideEventDocs: false,
  hideCssPropertiesDocs: false,
  hideCssPartsDocs: false,
  hideMethodDocs: false,
  labels: {
    slots: 'Slots',
    events: 'Events',
    cssProperties: 'CSS Properties',
    cssParts: 'CSS Parts',
    methods: 'Methods',
  },
}

type ExtendedConfiguration = BaseConfiguration & {[key: string]: any};

export function updateConfig(params: ExtendedConfiguration) {
  const config = { ...baseConfig, ...params };
  config.labels = { ...baseConfig.labels, ...params?.labels };
  return config;
}
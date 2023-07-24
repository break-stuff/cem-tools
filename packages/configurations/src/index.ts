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
  slotDocs?: boolean;
  /** Displays the event section of the element description */
  eventDocs?: boolean;
  /** Displays the CSS custom properties section of the element description */
  cssPropertiesDocs?: boolean;
  /** Displays the CSS parts section of the element description */
  cssPartsDocs?: boolean;
  /** Displays the methods section of the element description */
  methodDocs?: boolean;
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
  slotDocs: true,
  eventDocs: true,
  cssPropertiesDocs: true,
  cssPartsDocs: true,
  methodDocs: true,
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
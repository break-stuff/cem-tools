/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { has } from "../../utilities";
import type * as schema from "custom-elements-manifest";

export function getSlotsTemplate(
  slots?: schema.Slot[],
  hide?: boolean,
  label = "Slots"
): string {
  return has(slots) && !hide ? `\n\n### **${label}:**\n ${getSlotDocs(slots!)}` : "";
}

export function getEventsTemplate(
  events?: schema.Event[],
  hide?: boolean,
  label = "Events"
): string {
  return has(events) && !hide ? `\n\n### **${label}:**\n ${getEventDocs(events!)}` : "";
}

export function getCssPropsTemplate(
  cssProperties?: schema.CssCustomProperty[],
  hide?: boolean,
  label = "CSS Properties"
): string {
  return has(cssProperties) && !hide
    ? `\n\n### **${label}:**\n ${getCssPropertyDocs(cssProperties!)}`
    : "";
}

export function getPartsTemplate(
  cssParts?: schema.CssPart[],
  hide?: boolean,
  label = "CSS Parts"
): string {
  return has(cssParts) && !hide
    ? `\n\n### **${label}:**\n ${getCssPartsDocs(cssParts!)}`
    : "";
}

export function getMethodsTemplate(
  methods?: schema.ClassMethod[],
  hide?: boolean,
  label = "Methods"
): string {
  return has(methods) && !hide
    ? `\n\n### **${label}:**\n ${getMethodDocs(methods!)}`
    : "";
}

function getEventDocs(events: schema.Event[]) {
  return events
    ?.map((event) => `- **${event.name}** - ${event.description}`)
    .join("\n");
}

function getCssPropertyDocs(properties: schema.CssCustomProperty[]) {
  return properties
    ?.map(
      (prop) =>
        `- **${prop.name}** - ${prop.description} _(default: ${prop.default})_`
    )
    .join("\n");
}

function getCssPartsDocs(parts: schema.CssPart[]) {
  return parts
    ?.map((part) => `- **${part.name}** - ${part.description}`)
    .join("\n");
}

function getSlotDocs(slots: schema.Slot[]) {
  return slots
    ?.map(
      (slot) =>
        `- ${slot.name ? `**${slot.name}**` : "_default_"} - ${
          slot.description
        }`
    )
    .join("\n");
}

function getMethodDocs(methods: schema.ClassMethod[]) {
  return methods
    ?.map(
      (method) =>
        `- **${method.name}${getParameters(method.parameters)}${
          method.return ? `: _${method.return.type?.text}_` : ""
        }** - ${method.description}`
    )
    .join("\n");
}

function getParameters(parameters?: schema.Parameter[]): string {
  return parameters
    ? "(" +
        parameters
          .map(
            (x) => `${x.name + (x?.type?.text ? `: _${x?.type?.text}_` : "")}`
          )
          .join(", ") +
        ")"
    : "()";
}

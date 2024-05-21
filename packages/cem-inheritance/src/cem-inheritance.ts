import { CEM, Component } from "../../../tools/cem-utils/index.js";
import {
  createOutDir,
  logBlue,
  logYellow,
  saveFile,
} from "../../../tools/integrations";
import { Options } from "./types.js";

const completedClasses: string[] = [];
let classQueue: Component[] = [];
let cemEntities: Component[] = [];
let userConfig: Options = {};
let externalComponents: Component[] = [];
let updatedCEM: any = {};

export function updateCemInheritance(cem: CEM, options: Options = {}) {
  if (options.skip) {
    logYellow("[cem-inheritance-generator] - Skipped", options.hideLogs);
  }

  logBlue(
    "[cem-inheritance-generator] - Updating Custom Elements Manifest...",
    options.hideLogs
  );
  const newCem = generateUpdatedCem(cem, options);
  if (!options.usedByPlugin) {
    createOutDir(userConfig.outdir!);
    saveFile(
      userConfig.outdir!,
      userConfig.fileName!,
      JSON.stringify(newCem, null, 2)
    );
  }
  logBlue(
    "[cem-inheritance-generator] - Custom Elements Manifest updated.",
    options.hideLogs
  );
}

function updateOptions(options: Options = {}) {
  setExternalManifests(options.externalManifests);
  return {
    fileName: "custom-elements.json",
    outdir: "./",
    exclude: [],
    externalManifests: [],
    omit: {},
    ...options,
  };
}

function setExternalManifests(manifests?: any[]) {
  if (!manifests?.length) {
    return;
  }

  externalComponents = manifests.flatMap((manifest) =>
    getDeclarations(manifest)
  );
}

export function generateUpdatedCem(cem: any, options: Options = {}) {
  if (!cem) {
    throw new Error(
      "Custom Elements Manifest is required to update inheritance."
    );
  }

  updatedCEM = cem;
  userConfig = updateOptions(options);
  cemEntities = getDeclarations(cem, userConfig.exclude);
  cemEntities.forEach((component) => {
    getAncestors(component);
    processInheritanceQueue();
  });

  return updatedCEM;
}

function getAncestors(component?: Component) {
  if (!component || completedClasses.includes(component.name)) {
    return;
  }

  classQueue.push(component);
  if (
    component.superclass?.name &&
    !completedClasses.includes(component.superclass.name)
  ) {
    const parent =
      cemEntities.find((c) => c.name === component.superclass?.name) ||
      externalComponents.find((c) => c.name === component.superclass?.name);
    getAncestors(parent);
  }
}

function processInheritanceQueue() {
  if (classQueue.length === 0) {
    return;
  }

  classQueue.reverse();

  classQueue.forEach((component) => {
    const parent =
      cemEntities.find((c) => c.name === component.superclass?.name) ||
      externalComponents.find((c) => c.name === component.superclass?.name);
    if (parent) {
      updateCssProperties(component, parent);
      updateCssParts(component, parent);
      updateAttributes(component, parent);
      updateEvents(component, parent);
      updateMembers(component, parent);
      updateSlots(component, parent);
    }

    completedClasses.push(component.name);
  });

  classQueue = [];
}

function updateCssProperties(component: Component, parent: Component) {
  if (!parent.cssProperties || userConfig.ignore?.includes("cssProperties")) {
    return;
  }

  const omittedProps = userConfig.omit?.[component.name]?.cssProperties || [];
  component.cssProperties = component.cssProperties || [];
  parent.cssProperties?.forEach((parentCssProp) => {
    if (omittedProps.includes(parentCssProp.name)) {
      return;
    }

    const existingProp = component.cssProperties?.find(
      (prop) => prop.name === parentCssProp.name
    );
    if (!existingProp) {
      const prop = addInheritedFromInfo(parentCssProp, component);
      component.cssProperties?.push(prop);
    }
  });
}

function updateCssParts(component: Component, parent: Component) {
  if (!parent.cssParts || userConfig.ignore?.includes("cssParts")) {
    return;
  }

  const omittedParts = userConfig.omit?.[component.name]?.cssParts || [];
  component.cssParts = component.cssParts || [];
  parent.cssParts?.forEach((parentCssPart) => {
    if (omittedParts.includes(parentCssPart.name)) {
      return;
    }

    const existingPart = component.cssParts?.find(
      (part) => part.name === parentCssPart.name
    );
    if (!existingPart) {
      const part = addInheritedFromInfo(parentCssPart, component);
      component.cssParts?.push(part);
    }
  });
}

function updateAttributes(component: Component, parent: Component) {
  if (!parent.attributes || userConfig.ignore?.includes("attributes")) {
    return;
  }

  const omittedAttrs = userConfig.omit?.[component.name]?.attributes || [];
  component.attributes = component.attributes || [];
  parent.attributes?.forEach((parentAttr) => {
    if (omittedAttrs.includes(parentAttr.name)) {
      return;
    }

    const existingAttr = component.attributes?.find(
      (attr) => attr.name === parentAttr.name
    );
    if (!existingAttr) {
      const attr = addInheritedFromInfo(parentAttr, component);
      component.attributes?.push(attr);
    }
  });
}

function updateEvents(component: Component, parent: Component) {
  if (!parent.events || userConfig.ignore?.includes("events")) {
    return;
  }

  const omittedEvents = userConfig.omit?.[component.name]?.events || [];
  component.events = component.events || [];
  parent.events?.forEach((parentEvent) => {
    if (omittedEvents.includes(parentEvent.name)) {
      return;
    }

    const existingEvent = component.events?.find(
      (event) => event.name === parentEvent.name
    );
    if (!existingEvent) {
      const event = addInheritedFromInfo(parentEvent, component);
      component.events?.push(event);
    }
  });
}

function updateMembers(component: Component, parent: Component) {
  if (!parent.members || userConfig.ignore?.includes("members")) {
    return;
  }

  const omittedMembers = userConfig.omit?.[component.name]?.members || [];
  component.members = component.members || [];
  parent.members
    ?.filter((member) => member.privacy !== "private")
    .forEach((parentMember) => {
      if (omittedMembers.includes(parentMember.name)) {
        return;
      }

      const existingMember = component.members?.find(
        (member) => member.name === parentMember.name
      );
      if (!existingMember) {
        const member = addInheritedFromInfo(parentMember, component);
        component.members?.push(member);
      }
    });
}

function updateSlots(component: Component, parent: Component) {
  if (!parent.slots || userConfig.ignore?.includes("slots")) {
    return;
  }

  const omittedSlots = userConfig.omit?.[component.name]?.slots || [];
  component.slots = component.slots || [];
  parent.slots?.forEach((parentSlot) => {
    if (omittedSlots.includes(parentSlot.name)) {
      return;
    }

    const existingSlot = component.slots?.find(
      (slot) => slot.name === parentSlot.name
    );
    if (!existingSlot) {
      const slot = addInheritedFromInfo(parentSlot, component);
      component.slots?.push(slot);
    }
  });
}

function addInheritedFromInfo(member: any, component: Component) {
  const newMember = { ...member };
  if (!member.inheritedFrom) {
    newMember.inheritedFrom = {
      name: component.superclass?.name,
    };
  }
  return newMember;
}

/**
 * Gets a list of components from a CEM object
 * @param customElementsManifest CEM object
 * @param exclude and array of component names to exclude
 * @returns Component[]
 */
export function getDeclarations(
  customElementsManifest: CEM,
  exclude?: string[]
): Component[] {
  return (
    customElementsManifest.modules?.map(
      (mod) =>
        mod?.declarations?.filter((dec) => !exclude?.includes(dec.name)) || []
    ) || []
  ).flat() as Component[];
}

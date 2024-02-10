import {
  CEM,
  Component,
} from "../../../tools/cem-utils/index.js";
import * as schema from "custom-elements-manifest/schema";
import {
  createOutDir,
  logBlue,
  logRed,
  saveFile,
} from "../../../tools/integrations";
import fs from "fs";
import { Options } from "./types.js";

const completedClasses: string[] = [];
let classQueue: Component[] = [];
let cemEntities: Component[] = [];
let userConfig: Options = {};

export function updateCemInheritance(cem: CEM, options: Options = {}) {
  if (!cem) {
    throw new Error(
      "Custom Elements Manifest is required to update inheritance."
    );
  }

  logBlue("[cem-inheritance-generator] - Updating Custom Elements Manifest...");
  const newCem = generateUpdatedCem(cem, options);
  createOutDir(userConfig.outdir!);
  saveFile(userConfig.outdir!, options.fileName!, JSON.stringify(newCem, null, 2));
  logBlue("[cem-inheritance-generator] - Custom Elements Manifest updated.");
}

function updateOptions(options: Options = {}) {
  return {
    fileName: "custom-elements.json",
    outdir: "./",
    exclude: [],
    externalManifests: [],
    omit: {},
    ...options
  };
}

export function generateUpdatedCem(cem: any, options: Options = {}) {
  userConfig = updateOptions(options);
  cemEntities = getDeclarations(cem);
  cemEntities.forEach((component) => {
    getAncestors(component);
    processInheritanceQueue();
  });

  return cem;
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
    const parent = cemEntities.find(
      (c) => c.name === component.superclass?.name
    );
    console.log("PARENT", component.superclass?.name, parent);
    getAncestors(parent);
  }
}

function processInheritanceQueue() {
  if (classQueue.length === 0) {
    return;
  }

  classQueue.reverse();

  console.log(classQueue.map((component) => component.name));

  classQueue.forEach((component) => {
    const parent = cemEntities.find(
      (c) => c.name === component.superclass?.name
    );
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
  if (!parent.cssProperties) {
    return;
  }

  component.cssProperties = component.cssProperties || [];
  parent.cssProperties?.forEach((parentCssProp) => {
    const existingProp = component.cssProperties?.find(
      (prop) => prop.name === parentCssProp.name
    );
    if (!existingProp) {
      // @ts-expect-error
      if (!parentCssProp.inheritedFrom) {
        // @ts-expect-error
        parentCssProp.inheritedFrom = {
          name: component.superclass?.name,
          module: component.superclass?.module || component.superclass?.package,
        };
      }

      component.cssProperties?.push(parentCssProp);
    }
  });
}

function updateCssParts(component: Component, parent: Component) {
  if (!parent.cssParts) {
    return;
  }

  component.cssParts = component.cssParts || [];
  parent.cssParts?.forEach((parentCssPart) => {
    const existingPart = component.cssParts?.find(
      (part) => part.name === parentCssPart.name
    );
    if (!existingPart) {
      // @ts-expect-error
      if (!parentCssPart.inheritedFrom) {
        // @ts-expect-error
        parentCssPart.inheritedFrom = {
          name: component.superclass?.name,
          module: component.superclass?.module || component.superclass?.package,
        };
      }
      component.cssParts?.push(parentCssPart);
    }
  });
}

function updateAttributes(component: Component, parent: Component) {
  if (!parent.attributes) {
    return;
  }

  component.attributes = component.attributes || [];
  parent.attributes?.forEach((parentAttr) => {
    const existingAttr = component.attributes?.find(
      (attr) => attr.name === parentAttr.name
    );
    if (!existingAttr) {
      if (!parentAttr.inheritedFrom) {
        parentAttr.inheritedFrom = {
          name: component.superclass!.name!,
          module: component.superclass?.module || component.superclass?.package,
        };
      }

      component.attributes?.push(parentAttr);
    }
  });
}

function updateEvents(component: Component, parent: Component) {
  if (!parent.events) {
    return;
  }

  component.events = component.events || [];
  parent.events?.forEach((parentEvent) => {
    const existingEvent = component.events?.find(
      (event) => event.name === parentEvent.name
    );
    if (!existingEvent) {
      if (!parentEvent.inheritedFrom) {
        parentEvent.inheritedFrom = {
          name: component.superclass?.name!,
          module: component.superclass?.module || component.superclass?.package,
        };
      }
      component.events?.push(parentEvent);
    }
  });
}

function updateMembers(component: Component, parent: Component) {
  if (!parent.members) {
    return;
  }

  component.members = component.members || [];
  parent.members
    ?.filter((member) => member.privacy !== "private")
    .forEach((parentMember) => {
      const existingMember = component.members?.find(
        (member) => member.name === parentMember.name
      );
      if (!existingMember) {
        if (!parentMember.inheritedFrom) {
          parentMember.inheritedFrom = {
            name: component.superclass?.name!,
            module:
              component.superclass?.module || component.superclass?.package,
          };
        }

        component.members?.push(parentMember);
      }
    });
}

function updateSlots(component: Component, parent: Component) {
  if (!parent.slots) {
    return;
  }

  component.slots = component.slots || [];
  parent.slots?.forEach((parentSlot) => {
    const existingSlot = component.slots?.find(
      (slot) => slot.name === parentSlot.name
    );
    if (!existingSlot) {
      // @ts-expect-error
      if (!parentSlot.inheritedFrom) {
        // @ts-expect-error
        parentSlot.inheritedFrom = {
          name: component.superclass?.name!,
          module: component.superclass?.module || component.superclass?.package,
        };
      }
      component.slots?.push(parentSlot);
    }
  });
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

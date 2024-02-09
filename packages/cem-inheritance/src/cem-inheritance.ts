import {
  CEM,
  Component,
  getComponents,
} from "../../../tools/cem-utils/index.js";
import * as schema from "custom-elements-manifest/schema";
import {
  createOutDir,
  logBlue,
  logRed,
  saveFile,
} from "../../../tools/integrations";
import fs from "fs";

const completedClasses: string[] = [];
let classQueue: Component[] = [];
let cemComponents: Component[] = [];

export function updateCemInheritance(cem: CEM) {
  if (!cem) {
    throw new Error(
      "Custom Elements Manifest is required to update inheritance."
    );
  }

  logBlue("[cem-inheritance-generator] - Updating Custom Elements Manifest...");
}

export function generateUpdatedCem(cem: any) {
  cemComponents = getComponents(cem);

  cemComponents.forEach((component) => {
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
    component.superclass &&
    !completedClasses.includes(component.superclass.name)
  ) {
    const parent = cemComponents.find(
      (c) => c.name === component.superclass?.name
    );
    getAncestors(parent);
  }
}

function processInheritanceQueue() {
  if (classQueue.length === 0) {
    return;
  }

  classQueue.reverse();

  classQueue.forEach((component) => {
    const parent = cemComponents.find(
      (c) => c.name === component.superclass?.name
    );
    if (parent) {
      updateCssProperties(component, parent);
      updateCssParts(component, parent);
      updateAttributes(component, parent);
      updateEvents(component, parent);
      updateMembers(component, parent);
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
          name: parent.name,
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
          name: parent.name,
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
          name: parent.name,
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
          name: parent.name,
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
  parent.members?.forEach((parentMember) => {
    const existingMember = component.members?.find(
      (member) =>
        member.name === parentMember.name && member.privacy !== "private"
    );
    if (!existingMember) {
      if (!parentMember.inheritedFrom) {
        parentMember.inheritedFrom = {
          name: parent.name,
        };
      }

      component.members?.push(parentMember);
    }
  });
}

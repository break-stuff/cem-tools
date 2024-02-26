import { parse } from 'comment-parser';
import type { CEM, Component } from "../../../tools/cem-utils";

export interface Options {
  tags?: CustomTag;
}

export interface CustomTag {
  [key: string]: {
    mappedName?: string;
    isArray?: boolean;
  };
}

interface CEMTag {
  name?: string;
  type?: {
    text: string;
  };
  default?: string;
  description?: string;
}

let userOptions: Options = {
  tags: {}
};

/**
 * CEM Analyzer plugin to expand types in component metadata
 * @param options Configuration options
 * @returns
 */
export function customJSDocTagsPlugin(
  options: Options = {
    tags: {},
  }
) {
  userOptions = options;

  return {
    name: "custom-jsdoc-tags-plugin",
    analyzePhase({ ts, node, moduleDoc }: any) {
      if(node.kind !== ts.SyntaxKind.ClassDeclaration) {
        return;
      }

      const className = node.name.getText();
      const component = moduleDoc?.declarations?.find((declaration: Component) => declaration.name === className);
      const customTags = Object.keys(userOptions.tags || {});
      let customComments = '/**';

      node.jsDoc?.forEach((jsDoc: any) => {
        jsDoc?.tags?.forEach((tag: any) => {
          const tagName = tag.tagName.getText();

          if (customTags.includes(tagName)) {
            customComments += `\n * @${tagName} ${tag.comment}`;
          }
        });
      });

      const parsed = parse(`${customComments}\n */`);
      parsed[0].tags?.forEach(tagMeta => {
        const tagOptions  = userOptions.tags![tagMeta.tag]
        if(!tagOptions) {
          return;
        }

        const propName = tagOptions.mappedName || tagMeta.tag;
        const existingProp = component[propName];
        const cemTag: CEMTag = {
          name: tagMeta.name === '-' ? '' : tagMeta.name,
          default: tagMeta.default,
          description: tagMeta.description.replace(/^\s?-/, '').trim(), // removes leading dash
          type: tagMeta.type ? { text: tagMeta.type } : undefined
        };

        if(!existingProp && tagOptions.isArray) {
          component[propName] = [cemTag];
        } else if (Array.isArray(component[propName])) {
          component[propName].push(cemTag);
        } else if (existingProp && !Array.isArray(component[propName])) {
          component[propName] = [component[propName], cemTag];
        } else {
          component[propName] = cemTag;
        }
      });
    }
  }
}

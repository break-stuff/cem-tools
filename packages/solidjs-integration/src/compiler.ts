// import { readFileSync } from 'fs';
// import { Project } from 'ts-morph';
// import { pascalCase } from 'pascal-case';

// const cem = JSON.parse(readFileSync('./dist/custom-elements.json'));

// const components = [];

// for (const module of cem.modules) {
//   if (Array.isArray(module.declarations) && module.declarations.length > 0) {
//     for (const declaration of module.declarations) {
//       if (declaration.kind === 'class' && declaration.customElement && declaration.tagName?.startsWith('he-')) {
//         const events = [];
//         const props = [];
//         if (declaration.slots?.length > 0) {
//           props.push({
//             name: 'children',
//             doc: '',
//             type: 'JSX.Element',
//           });
//         }

//         for (const event of declaration.events) {
//           events.push({
//             name: on:${event.name},
//             doc: event.description,
//             type: CustomEvent<${event.rawType?.text ?? event.type?.text ?? 'never'}>,
//           });
//         }

//         const attributeFieldNames = declaration.attributes.map(attr => attr.fieldName);

//         for (const attribute of declaration.attribute) {
//           props.push({
//             name: attribute.name,
//             doc: attribute.description,
//             type: attribute.rawType?.text ?? attribute.type?.text ?? 'unknown',
//           });
//         }

//         for (const member of declaration.members) {
//           if (
//             member.kind !== 'field' ||
//             attributeFieldNames.includes(member.name) ||
//             member.description === undefined ||
//             member.static ||
//             member.privacy === 'private'
//           ) {
//             continue;
//           }
//           props.push({
//             name: prop:${member.name},
//             doc: member.description,
//             type: member.rawType?.text ?? member.type?.text ?? 'unknown',
//           });
//         }
//         components.push({
//           name: pascalCase(declaration.tagName.replace('he-', '')),
//           tagName: declaration.tagName,
//           doc: declaration.description,
//           events: events,
//           props: props,
//         });
//       }
//     }
//   }
// }

// const declarationFile = `
// import type { JSX } from "solid-js";

// /**
//  * This interface should be augmented by users.
//  * 
//  * Usage:
//  * 
//  * \`\`\`ts
//  * // file: HarmonySolidIntegration.d.ts
//  * 
//  * import "@harmony/enablers/solid-integration";
//  * 
//  * declare module "@harmony/enablers/solid-integration" {
//  *      interface HarmonyUserOptions {
//  *          Suffix: "<your-suffix>";
//  *      }
//  * }
//  * \`\`\`
//  * 
//  */
// interface HarmonyUserOptions {}

// type $MergeBy<T, K> = Omit<T, keyof K> & K;
// type HarmonyOptionsResolved = $MergeBy<
//     {
//         Suffix: "";
//     },
//     HarmonyUserOptions
// ;


// type UserSuffix = HarmonyOptionsResolved["Suffix"];
// type UserSuffixResolved = \`\${UserSuffix extends "" ? "" : "_"}\${UserSuffix}\`;

// type BaseProps = {
//     /** Inline styles */
//     style?: JSX.CSSProperties;
//     /** For slotting this element inside another */
//     slot?: string;
//     /** CSS class names - Shouldn't be used in conjunction with \`classList\` */
//     class?: string;
//     /** Conditionally applied CSS class names - Shouldn't be used in conjunction with \`class\` */
//     classList?: Record<string, boolean | undefined>;
//     /** Native click event */
//     onClick?: (e: MouseEvent) => void;
// };

// ${(() => {
//   let str = '';
//   for (const component of components) {
//     if (component.doc !== '') {
//       str += /** ${component.doc} */\n;
//     }
//     str += type ${component.name}Tag = Record<\`${component.tagName}\${UserSuffixResolved}\, {\n`;
//     if (component.props.length > 0) {
//       for (const prop of component.props) {
//         if (prop.doc !== '') {
//           str += /** ${prop.doc} */\n;
//         }
//         str += "${prop.name}"?: ${prop.type};\n;
//       }
//     }
//     if (component.events.length > 0) {
//       for (const event of component.events) {
//         if (event.doc !== '') {
//           str += /** ${event.doc} */\n;
//         }
//         str += "${event.name}"?: (e: ${event.type}) => void;\n;
//       }
//     }
//     str += '} & BaseProps>;\n';
//   }
//   return str;
// })()}

// declare module "solid-js" {
//   namespace JSX {
//     interface IntrinsicElements extends ${components.map(comp => ${comp.name}Tag).join(', ')} {}
//   }
// }
// `;

// const project = new Project();

// project.addSourceFilesAtPaths('./dist/{components,internal,themes,utilities}/**/*.d.ts');

// // The temp file type must be .ts for the fix missing imports step to work.
// const solidTypeFile = project.createSourceFile('./dist/temp.ts', declarationFile);
// solidTypeFile.fixMissingImports();
// solidTypeFile.formatText();
// solidTypeFile.moveImmediatelySync('solid-integration.d.ts', { overwrite: true });
// const tsErrors = solidTypeFile.getPreEmitDiagnostics();
// if (tsErrors.length > 0) {
//   let hasLegitErrors = false;
//   for (const diag of tsErrors) {
//     const message =
//       typeof diag.getMessageText() === 'string' ? diag.getMessageText() : diag.getMessageText().getMessageText();
//     if (message.includes('solid-js')) {
//       // Errors about solid-js being missing are expected so we should ignore.
//       continue;
//     }
//     console.log(project.formatDiagnosticsWithColorAndContext([diag]));
//     hasLegitErrors = true;
//   }
//   if (hasLegitErrors) {
//     process.exit(1);
//   }
// }
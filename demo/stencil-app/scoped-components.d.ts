import type { CustomElements } from 'lit-app/custom-element-jsx';

declare module '@stencil/core' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}

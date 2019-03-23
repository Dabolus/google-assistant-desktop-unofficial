import sharedStyles from '@components/shared.styles';
import '@material/mwc-ripple';
import { customElement, html, LitElement } from 'lit-element';
import styles from './button.styles';

@customElement('gad-button')
export class Button extends LitElement {
  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
      <button>
        <mwc-ripple primary></mwc-ripple>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-button': Button;
  }
}

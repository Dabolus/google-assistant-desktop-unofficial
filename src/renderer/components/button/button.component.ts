import sharedStyles from '@components/shared.styles';
import '@material/mwc-ripple';
import { html, LitElement } from '@polymer/lit-element';
import styles from './button.styles';

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

window.customElements.define('gad-button', Button);

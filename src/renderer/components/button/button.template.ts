import { html } from 'lit-element';
import { Button } from './button.component';

import '@material/mwc-ripple';

export default function template(this: Button) {
  return html`
    <button ?disabled="${this.disabled}">
      <mwc-ripple primary></mwc-ripple>
      <slot></slot>
    </button>
  `;
}

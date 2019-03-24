import { html } from 'lit-element';
import { Button } from './button.component';

export default function template(this: Button) {
  return html`
    <button>
      <mwc-ripple primary></mwc-ripple>
      <slot></slot>
    </button>
  `;
}

import { html } from 'lit';
import type { Shell } from './index';

import '../chat';

export const chatRouteTemplate = () => html`<gad-chat></gad-chat>`;
export const wizardRouteTemplate = () => html`Wizard`;
export const settingsRouteTemplate = () => html`Settings`;

export default function template(this: Shell) {
  return html`
    <gad-top-bar role="heading"></gad-top-bar>
    ${this._router.outlet()}
  `;
}

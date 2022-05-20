import { html } from 'lit';
import type { Shell } from './index';

export const homeRouteTemplate = () => html`Home`;
export const setupRouteTemplate = () => html`Setup`;
export const settingsRouteTemplate = () => html`Settings`;

export default function template(this: Shell) {
  return html`
    <gad-top-bar role="heading"></gad-top-bar>
    ${this._router.outlet()}
  `;
}

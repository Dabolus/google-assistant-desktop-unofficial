import { html } from 'lit-element';
import { Shell } from './shell.component';

export default function template(this: Shell) {
  return html`
    <gad-top-bar role="heading"></gad-top-bar>
    <gad-chat></gad-chat>
    <gad-bottom-bar></gad-bottom-bar>
  `;
}

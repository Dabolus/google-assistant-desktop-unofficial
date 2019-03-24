import { html } from 'lit-element';
import { BottomBar } from './bottom-bar.component';

export default function template(this: BottomBar) {
  return html`
    <input type="text" placeholder="Type a message" autofocus>
    <div>
      <img src="assets/google-mic.svg">
    </div>
  `;
}

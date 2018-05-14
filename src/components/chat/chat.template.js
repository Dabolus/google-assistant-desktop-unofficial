import { html } from 'lit-html/lib/lit-extended';

import style from './chat.style';

export default (chat, props) => html`
  ${html([`<style>${style}</style>`])}`;

import {html} from 'lit-html/lib/lit-extended';

import style from './chat.style';

export default (chat, props) => html`
  ${html([`<style>${style}</style>`])}
  <div class="card">
    <div class="circle">1</div>
    <h1>View One</h1>
    <p>Ut labores minimum atomorum pro. Laudem tibique ut has.</p>
    <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
  </div>`;

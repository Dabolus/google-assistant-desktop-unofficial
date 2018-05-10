import {LitElement} from '@polymer/lit-element';

import template from './wizard.template';

/**
 * Google Assistant Desktop wizard
 */
class GADWizard extends LitElement {
  static get is() {
    return 'gad-wizard';
  }

  static get properties() {
    return {};
  }

  _render(props) {
    return template(this, props);
  }
}

window.customElements.define(GADWizard.is, GADWizard);

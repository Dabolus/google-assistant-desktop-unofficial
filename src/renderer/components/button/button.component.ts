import '@material/mwc-ripple';
import { customElement, LitElement } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './button.styles';
import template from './button.template';

@customElement('gad-button')
export class Button extends LitElement {
  public static styles = [sharedStyles, styles];

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-button': Button;
  }
}

import { customElement, LitElement, property } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import styles from './button.styles';
import template from './button.template';

@customElement('gad-button')
export class Button extends LitElement {
  public static styles = [sharedStyles, styles];

  @property({ type: Boolean })
  protected disabled: boolean;

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-button': Button;
  }
}

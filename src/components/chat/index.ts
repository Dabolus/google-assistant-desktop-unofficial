import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized } from '../../i18n';
import styles from './styles.scss';
import template from './template';

@localized()
@customElement('gad-chat')
export class Chat extends LitElement {
  public static styles = styles;
  protected render = template;
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-chat': Chat;
  }
}

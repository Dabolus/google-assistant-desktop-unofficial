import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import styles from './styles.scss';
import template, {
  homeRouteTemplate,
  setupRouteTemplate,
  settingsRouteTemplate,
} from './template';

@customElement('gad-shell')
export class Shell extends LitElement {
  public static styles = styles;
  protected _router = new Router(this, [
    {
      path: '/',
      render: homeRouteTemplate,
    },
    {
      path: '/setup',
      render: setupRouteTemplate,
    },
    {
      path: '/settings',
      render: settingsRouteTemplate,
    },
  ]);
  protected render = template;
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-shell': Shell;
  }
}

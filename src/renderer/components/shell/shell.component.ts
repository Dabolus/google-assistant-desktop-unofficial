import { navigate } from '@actions/app';
import '@components/bottom-bar/bottom-bar.component';
import '@components/chat/chat.component';
import '@components/top-bar/top-bar.component';
import { html, LitElement, property, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect, installRouter, updateMetadata } from 'pwa-helpers';
import styles from './shell.styles';

class Shell extends connect(store)(LitElement) {
  @property({type: String})
  public appTitle = '';

  @property({type: String})
  private _page = '';

  public stateChanged(state: RootState) {
    this._page = state.app.page;
  }

  protected render() {
    return html`
      ${styles}
      <gad-top-bar role="heading"></gad-top-bar>
      <gad-chat></gad-chat>
      <gad-bottom-bar></gad-bottom-bar>
    `;
  }

  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        description: pageTitle,
        title: pageTitle,
      });
    }
  }
}

window.customElements.define('gad-shell', Shell);

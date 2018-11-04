import { navigate } from '@actions/app';
import sharedStyles from '@components/shared.styles';
import { html, LitElement, property, PropertyValues } from '@polymer/lit-element';
import { RootState, store } from '@store';
import { connect, installRouter, updateMetadata } from 'pwa-helpers';
import styles from './top-bar.styles';

class TopBar extends connect(store)(LitElement) {
  @property({type: String})
  public appTitle = '';

  @property({type: String})
  private _page = '';

  public stateChanged(state: RootState) {
    this._page = state.app.page;
  }

  protected render() {
    return html`
      ${sharedStyles}
      ${styles}
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Google_Assistant_logo.svg">
      <div class="heading">
        google_logo Assistant Desktop
        <span>Unofficial</span>
      </div>
      <div class="spacer"></div>
      <div class="material-icons-extended">more_vert</div>
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

window.customElements.define('gad-top-bar', TopBar);

import { LocaleData } from '@locales/model';
import { requestMessageSend, updateInput } from '@store/chat/chat.actions';
import { store } from '@store/index';
import { customElement, LitElement, property } from 'lit-element';
import { connect } from 'pwa-helpers';

import sharedStyles from '@components/shared.styles';
import { RootState } from '@store/root/root.model';
import styles from './bottom-bar.styles';
import template from './bottom-bar.template';

@customElement('gad-bottom-bar')
export class BottomBar extends connect(store)(LitElement) {
  public static styles = [sharedStyles, styles];

  @property({ type: String })
  protected _text = '';

  @property({ type: String })
  protected _localeData: LocaleData = null;

  public stateChanged({ app, chat }: RootState) {
    this._text = chat.text;
    this._localeData = app.localeData;
  }

  protected render() {
    return template.call(this);
  }

  protected _inputModified(e: KeyboardEvent) {
    const { value } = e.target as HTMLInputElement;
    store.dispatch(updateInput(value));
  }

  protected _inputKeyDown(e: KeyboardEvent) {
    if (e.code !== 'Enter' || e.shiftKey) {
      return;
    }
    e.preventDefault();
    this._textSubmitted();
  }

  protected _textSubmitted() {
    store.dispatch(requestMessageSend(this._text));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-bottom-bar': BottomBar;
  }
}

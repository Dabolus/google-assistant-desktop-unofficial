import { html } from 'lit';
import { t } from '../../i18n';
import type { Chat } from './index';

export default function template(this: Chat) {
  return html`<h1>${t('Hi!')}</h1>`;
}

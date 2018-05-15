import { LocalizedLitElement } from '@dabolus/localized-lit-element';

import { connect } from 'pwa-helpers/connect-mixin';

import { store } from '~/store';

/**
 * The message composer of the message section of the
 * Google Assistant Desktop. It allows to easily write or record
 * voice messages to send to the Assistant.
 */
class GADMessageComposer extends connect(store)(LocalizedLitElement) {
}

window.customElements.define(GADMessageComposer.is, GADMessageComposer);

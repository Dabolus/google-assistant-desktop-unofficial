import { connect, localize } from '@components/helpers';
import {
  requestMessageSend,
  updateInput,
  requestAudioSend,
} from '@store/chat/chat.actions';
import { store } from '@store/index';
import { customElement, LitElement, property, query } from 'lit-element';

import sharedStyles from '@components/shared.styles';
import { RootState } from '@store/root/root.model';
import styles from './bottom-bar.styles';
import template from './bottom-bar.template';
import { I18nService } from '@services/i18n.service';
import { container } from '@helpers/di.helper';
import { Locale } from '@store/app/app.model';

declare interface MediaRecorderErrorEvent extends Event {
  name: string;
}

declare interface MediaRecorderDataAvailableEvent extends Event {
  data: Blob;
}

interface MediaRecorderEventMap {
  dataavailable: MediaRecorderDataAvailableEvent;
  error: MediaRecorderErrorEvent;
  pause: Event;
  resume: Event;
  start: Event;
  stop: Event;
  warning: MediaRecorderErrorEvent;
}

interface MediaRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  bitsPerSecond?: number;
}

declare class MediaRecorder extends EventTarget {
  public readonly mimeType: string;
  public readonly state: 'inactive' | 'recording' | 'paused';
  public readonly stream: MediaStream;
  public ignoreMutedMedia: boolean;
  public videoBitsPerSecond: number;
  public audioBitsPerSecond: number;
  public constructor(stream: MediaStream, options?: MediaRecorderOptions);
  public ondataavailable(event: MediaRecorderDataAvailableEvent): void;
  public onerror(event: MediaRecorderErrorEvent): void;
  public onpause(): void;
  public onresume(): void;
  public onstart(): void;
  public onstop(): void;
  public start(timeslice?: number): void;
  public stop(): void;
  public resume(): void;
  public pause(): void;
  public isTypeSupported(type: string): boolean;
  public requestData(): void;
  public addEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  public removeEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaStream, ev: MediaRecorderEventMap[K]) => void,
    options?: boolean | EventListenerOptions,
  ): void;
  public removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

@customElement('gad-bottom-bar')
export class BottomBar extends localize(container.get(I18nService))(
  connect(store)(LitElement),
) {
  public static styles = [sharedStyles, styles];

  protected render = template;

  @property({ type: String })
  protected _text = '';

  // Used only to trigger re-renders
  @property({ type: String })
  private _locale: Locale = Locale.EN_US;

  @query('input')
  private _inputRef: HTMLInputElement;

  private _conversationState: Uint8Array = null;

  private _audioStream: MediaStream = null;

  public stateChanged({ app, chat }: RootState) {
    if (this._text !== chat.text) {
      this._text = chat.text;
      if (this._inputRef) {
        this._inputRef.value = this._text;
      }
    }
    if (app.locale !== this._locale) {
      this._locale = app.locale;
    }
    this._conversationState = chat.conversationState;
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
    if (!this._text) {
      return;
    }
    store.dispatch(requestMessageSend(this._text, this._conversationState));
  }

  protected async _startRecordingClicked() {
    if (!this._audioStream) {
      this._audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    }
    const recorder = new MediaRecorder(this._audioStream, {
      mimeType: 'audio/webm;codecs=opus',
      bitsPerSecond: 128000,
    });
    recorder.addEventListener('dataavailable', ({ data }) => {
      store.dispatch(requestAudioSend(data));
    });
    recorder.start(500);
    // TODO: stop recording when Assistant tells the user has stopped speaking
    setTimeout(() => recorder.stop(), 3000);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gad-bottom-bar': BottomBar;
  }
}

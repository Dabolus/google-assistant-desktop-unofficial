import { injectable } from '@helpers/di.helper';
import { Locale } from '@store/app/app.model';
import { setupI18n, I18n as LinguiI18n, Catalog } from '@lingui/core';
import { ipcRenderer } from 'electron';

export interface I18n {
  i18n: LinguiI18n;

  loadLocale(locale: Locale): Promise<void>;
  updateLocale(locale: Locale): Promise<void>;
  getCurrentLocale(): Promise<Locale>;
}

@injectable()
export class I18nService implements I18n {
  public static supportedLocales = [Locale.EN_US];

  public i18n: LinguiI18n = setupI18n();

  public async loadLocale(locale: Locale): Promise<void> {
    if (!I18nService.supportedLocales.includes(locale)) {
      throw new Error('Locale not supported');
    }

    const { default: catalog }: { default: Catalog } = await import(
      `@locales/${locale}/messages`
    );

    this.i18n.load({ [locale]: catalog });
  }

  public async updateLocale(locale: Locale) {
    if (!this.i18n.availableLanguages.includes(locale)) {
      await this.loadLocale(locale);
    }
    this.i18n.activate(locale);
    ipcRenderer.send('i18n.requestLocaleUpdate', locale);
  }

  public getCurrentLocale() {
    return new Promise<Locale>((resolve, reject) => {
      ipcRenderer
        .once('i18n.resolveCurrentLocale', (_: Event, locale: Locale) =>
          resolve(locale),
        )
        .once('i18n.rejectCurrentLocale', (_: Event, error: Error) =>
          reject(error),
        )
        .send('i18n.requestCurrentLocale');
    });
  }
}

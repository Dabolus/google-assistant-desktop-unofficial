import { injectable } from '@helpers/di.helper';
import { Locale } from '@store/app/app.model';
import { setupI18n, I18n as LinguiI18n, Catalog } from '@lingui/core';

export interface I18n {
  loadLocale(locale: Locale): Promise<void>;
}

@injectable()
export class I18nService implements I18n {
  public static supportedLocales = [Locale.EN];

  public i18n: LinguiI18n = setupI18n();

  public async loadLocale(locale: Locale): Promise<void> {
    if (!I18nService.supportedLocales.includes(locale)) {
      throw new Error('Locale not supported');
    }

    const catalog: Catalog = await import(
      `@locales/${locale.toLowerCase()}.locale`
    );

    this.i18n.load({ [locale]: catalog });
  }
}

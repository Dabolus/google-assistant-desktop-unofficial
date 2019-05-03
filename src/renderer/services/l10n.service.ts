import { injectable } from '@helpers/di.helper';
import { LocaleData } from '@locales/model';
import { Locale } from '@store/app/app.model';

export interface L10n {
  loadLocale(locale: Locale): Promise<LocaleData>;
}

@injectable()
export class L10nService implements L10n {
  public static supportedLocales = [Locale.EN];

  public async loadLocale(locale: Locale): Promise<LocaleData> {
    if (!L10nService.supportedLocales.includes(locale)) {
      throw new Error('Locale not supported');
    }

    const { default: data } = await import(`@locales/${locale.toLowerCase()}.locale`);
    return data;
  }
}

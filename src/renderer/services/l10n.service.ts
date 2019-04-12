import { injectable } from '@helpers/di.helper';
import { LocaleData } from '@locales/model';
import { Locale } from '@store/app/app.model';

export interface L10n {
  loadLocale(locale: Locale): Promise<LocaleData>;
}

@injectable()
export class L10nService implements L10n {
  public async loadLocale(locale: Locale): Promise<LocaleData> {
    const { default: data } = await import(`@locales/${locale.toLowerCase()}.locale`);
    console.log(data);
    return data;
  }
}

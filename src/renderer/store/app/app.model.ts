import { LocaleData } from '@locales/model';

export enum Locale {
  EN = 'EN',
  IT = 'IT',
}

export interface AppState {
  page: string;
  locale: Locale;
  localeData: LocaleData;
  theme: string;
}

import { LocaleData } from '@locales/model';

export enum Locale {
  EN = 'EN',
  IT = 'IT',
}

export interface AppState {
  page: string;
  menuOpened: boolean;
  locale: Locale;
  localeData: LocaleData;
}

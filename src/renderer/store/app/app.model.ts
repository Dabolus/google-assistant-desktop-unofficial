export enum Locale {
  EN = 'EN',
  IT = 'IT',
}

export interface AppState {
  page: string;
  locale: Locale;
  theme: string;
}

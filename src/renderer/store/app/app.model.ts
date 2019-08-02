export enum Locale {
  EN_US = 'en-US',
  IT_IT = 'it-IT',
}

export interface AppState {
  page: string;
  locale: Locale;
  theme: string;
}

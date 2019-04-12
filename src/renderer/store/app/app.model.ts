export enum Locale {
  EN = 'EN',
  IT = 'IT',
}

export interface AppState {
  page: string;
  menuOpened: boolean;
  locale: Locale;
}

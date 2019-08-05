export enum Locale {
  EN_US = 'en-US',
  EN_AU = 'en-AU',
  EN_CA = 'en-CA',
  EN_GB = 'en-GB',
  EN_IN = 'en-IN',
  DE_DE = 'de-DE',
  FR_CA = 'fr-CA',
  FR_FR = 'fr-FR',
  IT_IT = 'it-IT',
  JA_JP = 'ja-JP',
  ES_ES = 'es-ES',
  ES_MX = 'es-MX',
  KO_KR = 'ko-KR',
  PT_BR = 'pt-BR',
}

export interface AppState {
  page: string;
  locale: Locale;
  theme: string;
}

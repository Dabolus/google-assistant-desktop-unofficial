import { AssistantLanguage } from 'nodejs-assistant';

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

export const supportedLocales = [Locale.EN_US];

const mapLocaleToAssistantLanguageMap: {
  [key in Locale]: AssistantLanguage;
} = {
  [Locale.EN_US]: AssistantLanguage.ENGLISH_US,
  [Locale.EN_AU]: AssistantLanguage.ENGLISH_AU,
  [Locale.EN_CA]: AssistantLanguage.ENGLISH_CA,
  [Locale.EN_GB]: AssistantLanguage.ENGLISH_UK,
  [Locale.EN_IN]: AssistantLanguage.ENGLISH_IN,
  [Locale.DE_DE]: AssistantLanguage.GERMAN,
  [Locale.FR_CA]: AssistantLanguage.FRENCH_CA,
  [Locale.FR_FR]: AssistantLanguage.FRENCH_FR,
  [Locale.IT_IT]: AssistantLanguage.ITALIAN,
  [Locale.JA_JP]: AssistantLanguage.JAPANESE,
  [Locale.ES_ES]: AssistantLanguage.SPANISH_ES,
  [Locale.ES_MX]: AssistantLanguage.SPANISH_MX,
  [Locale.KO_KR]: AssistantLanguage.KOREAN,
  [Locale.PT_BR]: AssistantLanguage.PORTUGUESE,
};

export const mapLocaleToAssistantLanguage = (
  locale: Locale,
): AssistantLanguage => mapLocaleToAssistantLanguageMap[locale];

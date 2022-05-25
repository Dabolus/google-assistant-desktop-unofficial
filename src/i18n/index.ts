import { msg, configureLocalization } from '@lit/localize';
import * as locales from './locales';

export { localized } from '@lit/localize';

export const t = msg;

export type Locale = Extract<
  typeof locales.allLocales[keyof typeof locales.allLocales],
  string
>;

export const sourceLocale = locales.sourceLocale as Locale;

export const allLocales = locales.allLocales as readonly Locale[];

export const targetLocales = locales.targetLocales as readonly Locale[];

const { getLocale: getCurrentLocale, setLocale: setCurrentLocale } =
  configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: locale => import(`./locales/${locale}`),
  });

export const getLocale = async () => {
  return getCurrentLocale();
};

export const setLocale = async (locale: Locale) => {
  const newLocale = allLocales.includes(locale) ? locale : sourceLocale;
  await setCurrentLocale(newLocale);
  localStorage.setItem('lang', newLocale);
};

const initialLanguage = (localStorage.getItem('lang') ||
  navigator.language ||
  'en-US') as Locale;
setLocale(initialLanguage);

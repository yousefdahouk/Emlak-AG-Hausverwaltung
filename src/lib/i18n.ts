export const locales = ["ar", "de", "en", "es", "it", "el", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

/**
 * Locales whose content dictionary is written. Locales that are not ready are
 * still valid URLs, but they are served the fallback dictionary and are shown
 * in the language switcher as pending.
 */
export const readyLocales: Locale[] = ["ar"];

export const localeMeta: Record<Locale, { label: string; flag: string; dir: "ltr" | "rtl"; htmlLang: string }> = {
  ar: { label: "العربية", flag: "🇸🇦", dir: "rtl", htmlLang: "ar" },
  de: { label: "Deutsch", flag: "🇩🇪", dir: "ltr", htmlLang: "de" },
  en: { label: "English", flag: "🇬🇧", dir: "ltr", htmlLang: "en" },
  es: { label: "Español", flag: "🇪🇸", dir: "ltr", htmlLang: "es" },
  it: { label: "Italiano", flag: "🇮🇹", dir: "ltr", htmlLang: "it" },
  el: { label: "Ελληνικά", flag: "🇬🇷", dir: "ltr", htmlLang: "el" },
  tr: { label: "Türkçe", flag: "🇹🇷", dir: "ltr", htmlLang: "tr" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isReady(locale: Locale): boolean {
  return readyLocales.includes(locale);
}

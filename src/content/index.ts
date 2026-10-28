import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import ar from "./ar";

const dictionaries: Partial<Record<Locale, Dictionary>> = { ar };

/**
 * Returns the dictionary for a locale. Locales whose translation is not written
 * yet fall back to the Arabic source copy (see ROADMAP.md, M2).
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? ar;
}

export type { Dictionary };

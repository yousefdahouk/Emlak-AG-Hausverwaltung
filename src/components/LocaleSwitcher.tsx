"use client";

import { useRouter } from "next/navigation";
import { isReady, localeMeta, locales, type Locale } from "@/lib/i18n";

export default function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  return (
    <label className="relative">
      <span className="sr-only">{localeMeta[current].label}</span>
      <select
        value={current}
        onChange={(event) => router.push(`/${event.target.value}`)}
        className="cursor-pointer rounded-lg border border-brand-200 bg-white py-2 pe-8 ps-3 text-sm font-medium text-brand-800 outline-none transition hover:border-brand-300 focus:border-brand-400"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeMeta[locale].flag} {localeMeta[locale].label}
            {isReady(locale) ? "" : " …"}
          </option>
        ))}
      </select>
    </label>
  );
}

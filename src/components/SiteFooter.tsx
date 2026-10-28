import type { Dictionary } from "@/content";
import { localeMeta, locales, type Locale } from "@/lib/i18n";

export default function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-auto border-t border-brand-100 bg-brand-900 text-brand-100">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-white">
            <span aria-hidden>🏢</span>
            {dict.company}
          </p>
          <p className="mt-1 text-sm text-brand-200">{dict.hero.subtitle}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-brand-200">{dict.footer.languages}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={`/${l}`}
                  aria-current={l === locale ? "true" : undefined}
                  className={`transition hover:text-white ${l === locale ? "font-semibold text-white" : "text-brand-200"}`}
                >
                  {localeMeta[l].flag} {localeMeta[l].label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-brand-300 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {dict.company}
          </p>
          <p>{dict.footer.imprintPending}</p>
        </div>
      </div>
    </footer>
  );
}

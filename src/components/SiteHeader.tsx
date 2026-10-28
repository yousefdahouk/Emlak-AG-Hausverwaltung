import Link from "next/link";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import LocaleSwitcher from "./LocaleSwitcher";

export default function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links: { href: string; label: string }[] = [
    { href: "#types", label: dict.nav.services },
    { href: "#choosing", label: dict.nav.choosing },
    { href: "#costs", label: dict.nav.costs },
    { href: "#guide", label: dict.nav.guide },
    { href: "#glossary", label: dict.nav.glossary },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-brand-800">
          <span aria-hidden>🏢</span>
          <span>{dict.company}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-700 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-accent-600">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher current={locale} />
          <a href="#quote" className="btn-primary hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
            {dict.nav.quote}
          </a>
        </div>
      </div>
    </header>
  );
}

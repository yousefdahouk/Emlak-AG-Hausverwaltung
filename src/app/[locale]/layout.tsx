import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isLocale, localeMeta, locales } from "@/lib/i18n";
import { getDictionary } from "@/content";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const viewport: Viewport = {
  themeColor: "#1a3f6e",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: `${t.company} – ${t.hero.title}`,
    description: t.hero.subtitle,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const meta = localeMeta[locale];
  const t = getDictionary(locale);

  return (
    <html lang={meta.htmlLang} dir={meta.dir}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader locale={locale} dict={t} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dict={t} />
      </body>
    </html>
  );
}

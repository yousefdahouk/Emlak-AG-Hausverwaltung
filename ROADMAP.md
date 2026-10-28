# Roadmap

Milestones for the Emlak AG Hausverwaltung website. Each milestone ends in a
state that can be shown and reviewed.

---

## M1 — Foundation and Arabic site ✅ (2026-10-28)

The full site, live locally, in the source language.

- [x] Repository, toolchain, build pipeline (Next.js, TypeScript strict, Tailwind)
- [x] Locale routing for all seven languages with RTL support
- [x] Arabic copy transcribed verbatim into a typed content dictionary
- [x] Every section built: hero, what is Hausverwaltung, the four management
      types, choosing a company, costs, switching, the ten questions, the
      process, the guide, the glossary, international owners, closing CTA
- [x] Five-step inquiry form with validation and progress indicator
- [x] `POST /api/inquiry` — validation, German-language summary, email delivery
      to `flowmeterinquiries@gmail.com`, `Reply-To` set to the sender
- [x] Local delivery mode (writes to `.dev-inquiries/`) so the form works
      without SMTP credentials
- [x] Honeypot anti-spam that discards silently
- [x] Verified: production build, type check, RTL rendering, and a full
      browser pass through all five form steps to a delivered message

**Verified locally. Not deployed** — domain and hosting are deliberately left
to M6.

---

## M2 — German master version

German is the company's primary market, so it becomes the default locale.

- [ ] Translate the Arabic copy into German, keeping the structure and meaning
- [ ] Switch `defaultLocale` to `de`; root redirect follows
- [ ] Locale detection from the `Accept-Language` header, with manual override
- [ ] Proofread by a native speaker before it is shown to anyone outside

## M3 — Legal and trust (required before going live in Germany)

Operating a commercial site in Germany without these is a legal risk, so this
milestone blocks launch.

- [ ] Impressum (§5 DDG) — company name, legal form, address, contact,
      Handelsregister number, VAT ID, responsible person
- [ ] Datenschutzerklärung (GDPR) covering the inquiry form specifically:
      what is collected, why, where it is stored, how long, data subject rights
- [ ] Consent checkbox on the form linking the privacy policy
- [ ] Cookie banner — only if analytics or any non-essential cookie is added
- [ ] §34c GewO trade licence details, if applicable to the services offered

## M4 — Remaining translations

- [ ] English, Spanish, Italian, Greek, Turkish
- [ ] `hreflang` tags and a locale-aware sitemap
- [ ] Each locale added to `readyLocales` only once proofread

## M5 — Content depth and discoverability

- [ ] Turn the guide outline into real articles (the Arabic copy says
      "سنقدم على المنصة" — "we will provide on the platform", so these are
      promised, not yet written)
- [ ] Per-article pages with their own metadata
- [ ] Structured data (`Organization`, `LocalBusiness`, `FAQPage`)
- [ ] Open Graph images, `sitemap.xml`, `robots.txt`
- [ ] Logo and brand assets, favicon

## M6 — Production delivery

- [ ] Real SMTP credentials in the host's environment (a transactional sender
      such as Postmark or Resend is more reliable than Gmail SMTP for form mail)
- [ ] Autoresponder confirming receipt to the person who submitted
- [ ] Rate limiting on `/api/inquiry`
- [ ] Hosting and domain, TLS
- [ ] Analytics, if wanted — GDPR-compliant and declared in the privacy policy
- [ ] Deployment pipeline from `main`

---

## Open questions for the client

1. **Company details for the Impressum** — legal form (AG? GmbH?), registered
   address, Handelsregister number, VAT ID, managing director. M3 cannot be
   completed without these.
2. **Brand assets** — is there a logo, defined colours, a typeface? The current
   palette (deep blue + gold) is a placeholder chosen to suit the sector.
3. **Service area** — nationwide, or specific cities and regions? This shapes
   the copy and local SEO.
4. **Inquiry inbox** — `flowmeterinquiries@gmail.com` is in use now. Is a
   company domain address planned before launch?
5. **Which language launches first** — the copy arrived in Arabic, but the
   company operates in Germany. M2 assumes German becomes the default.

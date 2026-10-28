# Emlak AG – Hausverwaltung

Website for Emlak AG, a property management company (Hausverwaltung) in Germany.

The site explains the company's management services, guides owners through
choosing a Hausverwaltung, and collects property details through a five-step
inquiry form. Inquiries are delivered by email.

The site is multilingual by design (Arabic, German, English, Spanish, Italian,
Greek, Turkish) with full right-to-left support for Arabic. Arabic is the
source copy; the other translations are pending — see `ROADMAP.md`.

## Stack

| Concern    | Choice                              |
| ---------- | ----------------------------------- |
| Framework  | Next.js (App Router) + React        |
| Language   | TypeScript (strict)                 |
| Styling    | Tailwind CSS                        |
| Validation | Zod (shared by client and server)   |
| Email      | Nodemailer over SMTP                |

## Running locally

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000 — it redirects to `/ar`.

### Other commands

```bash
npm run build && npm run start
```

```bash
npm run typecheck
```

## How inquiries are delivered

The form posts to `POST /api/inquiry`. The payload is validated against
`inquirySchema` (`src/lib/inquiry.ts`), formatted into a German-language
summary, and emailed to the address in `INQUIRY_TO_EMAIL`
(default: `flowmeterinquiries@gmail.com`). The sender's address is set as
`Reply-To`, so replying in the inbox goes straight to the owner.

**With no `SMTP_HOST` set**, nothing is sent: the message is written to
`.dev-inquiries/` and logged to the console. This makes the form fully
testable locally without credentials. Set the SMTP variables in `.env.local`
to switch to real delivery.

A hidden honeypot field guards against bots. Submissions that fill it are
answered with a normal success response and discarded, so a bot gets no signal
about which field caught it.

## Layout

```
src/
  app/
    [locale]/          Locale-scoped layout and home page
    api/inquiry/       Inquiry endpoint
  components/          Header, footer, sections, quote form
  content/
    ar.ts              Arabic source copy (verbatim, do not reword)
    types.ts           Dictionary shape every locale must satisfy
  lib/
    i18n.ts            Locale list, direction, readiness
    inquiry.ts         Zod schema + email formatting
    mailer.ts          SMTP / local-file delivery
```

### Adding a language

1. Copy `src/content/ar.ts` to `src/content/<locale>.ts` and translate the values.
2. Register it in `src/content/index.ts`.
3. Add the locale to `readyLocales` in `src/lib/i18n.ts`.

The dictionary is typed, so a missing or renamed key fails `npm run typecheck`.

> **Copy is fixed.** The Arabic wording in `src/content/ar.ts` was supplied by
> the client and is to be kept as is. Translations should follow it closely
> rather than rewriting it.

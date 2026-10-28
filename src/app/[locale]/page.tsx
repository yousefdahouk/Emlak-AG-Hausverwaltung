import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localeMeta, locales } from "@/lib/i18n";
import Section from "@/components/Section";
import TickList from "@/components/TickList";
import QuoteForm from "@/components/QuoteForm";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-800 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_70%_-10%,rgba(217,164,65,0.28),transparent)]"
        />
        <div className="shell relative py-16 sm:py-24">
          <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-inset ring-white/20">
            {t.hero.badge}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100 sm:text-xl">{t.hero.subtitle}</p>

          <p className="mt-10 max-w-2xl text-xl font-semibold text-accent-400 sm:text-2xl">
            {t.hero.question}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-brand-100">{t.hero.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#quote" className="btn-primary">
              {t.hero.cta}
            </a>
            <a href="#types" className="btn-ghost">
              {t.nav.services}
            </a>
          </div>
          <p className="mt-5 text-sm text-brand-200">{t.hero.reassurance}</p>
        </div>
      </section>

      {/* What is property management */}
      <Section id="what" title={t.what.title}>
        <p className="lead max-w-3xl">{t.what.intro}</p>
        <p className="mt-6 font-medium text-brand-800">{t.what.lead}</p>
        <div className="mt-5">
          <TickList items={t.what.items} columns={3} />
        </div>
      </Section>

      {/* Types */}
      <Section id="types" title={t.types.title} tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          {t.types.cards.map((card) => (
            <article key={card.value} className="card flex flex-col">
              <p className="text-3xl" aria-hidden>
                {card.icon}
              </p>
              <h3 className="mt-3 text-xl font-bold text-brand-800">{card.title}</h3>
              <p className="mt-1 text-sm font-medium tracking-wide text-accent-600">{card.subtitle}</p>

              {card.intro.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-brand-700">
                  {paragraph}
                </p>
              ))}

              {card.items ? (
                <div className="mt-4">
                  <TickList items={card.items} columns={1} />
                </div>
              ) : null}

              {card.note ? <p className="mt-4 leading-8 text-brand-700">{card.note}</p> : null}

              <div className="mt-auto pt-6">
                <a href="#quote" className="btn-secondary !px-5 !py-3 !text-sm">
                  {card.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Choosing a company */}
      <Section id="choosing" title={t.choosing.title}>
        <div className="max-w-3xl space-y-2">
          {t.choosing.intro.map((line) => (
            <p key={line} className="lead">
              {line}
            </p>
          ))}
        </div>

        <ol className="mt-10 grid gap-6 lg:grid-cols-2">
          {t.choosing.blocks.map((block, index) => (
            <li key={block.title} className="card">
              <div className="flex items-baseline gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold text-brand-800">{block.title}</h3>
              </div>

              {block.intro
                ? block.intro.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="mt-3 leading-8 text-brand-700">
                      {paragraph}
                    </p>
                  ))
                : null}

              <div className="mt-4">
                <TickList items={block.items} columns={1} />
              </div>

              {block.outro ? (
                <p className="mt-5 rounded-xl bg-accent-400/10 px-4 py-3 font-medium text-brand-800">
                  {block.outro}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      {/* Costs */}
      <Section id="costs" title={t.costs.title} tone="muted">
        <p className="lead max-w-3xl">{t.costs.intro}</p>
        <p className="mt-6 font-medium text-brand-800">{t.costs.lead}</p>
        <div className="mt-5">
          <TickList items={t.costs.items} columns={3} />
        </div>
        <p className="mt-8 max-w-3xl leading-8 text-brand-700">{t.costs.outro}</p>
        <a href="#quote" className="btn-primary mt-6">
          {t.costs.cta}
        </a>
      </Section>

      {/* Switching */}
      <Section id="switching" title={t.switching.title}>
        <p className="lead max-w-3xl">{t.switching.intro}</p>
        <div className="mt-6">
          <TickList items={t.switching.items} columns={3} />
        </div>
        <p className="mt-8 max-w-3xl rounded-xl bg-brand-50 px-5 py-4 leading-8 text-brand-800">
          {t.switching.outro}
        </p>
        <a href="#quote" className="btn-primary mt-6">
          {t.switching.cta}
        </a>
      </Section>

      {/* 10 questions */}
      <Section id="questions" title={t.questions.title} tone="muted">
        <p className="lead max-w-3xl">{t.questions.intro}</p>
        <ol className="mt-7 grid gap-4 sm:grid-cols-2">
          {t.questions.items.map((question, index) => (
            <li key={question} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-400/15 text-sm font-bold text-accent-600">
                {index + 1}
              </span>
              <span className="leading-7 text-brand-800">{question}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Process */}
      <Section id="process" title={t.process.title}>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.process.steps.map((step) => (
            <li key={step.title} className="card">
              <p className="text-2xl" aria-hidden>
                {step.badge}
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand-800">{step.title}</h3>
              <p className="mt-2 leading-8 text-brand-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Guide */}
      <Section id="guide" title={t.guide.title} tone="muted">
        <p className="text-lg font-semibold text-accent-600">{t.guide.subtitle}</p>
        <p className="lead mt-3 max-w-3xl">{t.guide.intro}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {t.guide.groups.map((group) => (
            <div key={group.title} className="card">
              <h3 className="text-lg font-bold text-brand-800">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-7 text-brand-700">
                    <span aria-hidden className="mt-1 text-accent-500">
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Glossary */}
      <Section id="glossary" title={t.glossary.title}>
        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {t.glossary.items.map((entry) => (
            <div
              key={entry.term}
              className="flex flex-wrap items-baseline gap-x-3 border-b border-brand-100 pb-3"
            >
              <dt className="font-semibold text-brand-800" dir="ltr">
                {entry.term}
              </dt>
              <span aria-hidden className="text-brand-300">
                –
              </span>
              <dd className="text-brand-700">{entry.translation}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* International owners */}
      <Section id="international" title={t.international.title} tone="muted">
        <p className="text-xl font-semibold text-brand-800">{t.international.question}</p>
        <p className="lead mt-4 max-w-3xl">{t.international.intro}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {locales.map((l) => (
            <li key={l}>
              <a
                href={`/${l}`}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800 transition hover:border-accent-400 hover:text-accent-600"
              >
                <span aria-hidden>{localeMeta[l].flag}</span>
                {localeMeta[l].label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-7 max-w-3xl leading-8 text-brand-700">{t.international.outro}</p>
      </Section>

      {/* Quote form */}
      <Section id="quote" title={t.form.title}>
        <div className="mt-2 max-w-4xl">
          <QuoteForm locale={locale} dict={t} />
        </div>
      </Section>

      {/* After submitting */}
      <Section id="after" title={t.after.title} tone="muted">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.after.steps.map((step, index) => (
            <li key={step.title} className="card">
              <p className="text-2xl" aria-hidden>
                {step.badge}
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand-800">
                {index + 1}. {step.title}
              </h3>
              <p className="mt-2 leading-8 text-brand-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-brand-800 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_26rem_at_30%_110%,rgba(217,164,65,0.26),transparent)]"
        />
        <div className="shell relative py-16 text-center sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.closing.title}</h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-lg text-brand-100">
            {t.closing.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-9 text-xl font-semibold text-accent-400">{t.closing.start}</p>
          <a href="#quote" className="btn-primary mt-5">
            {t.closing.cta}
          </a>
          <p className="mt-5 text-sm text-brand-200">{t.closing.reassurance}</p>
        </div>
      </section>
    </>
  );
}

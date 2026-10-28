export type Dictionary = {
  company: string;
  nav: { services: string; choosing: string; costs: string; guide: string; glossary: string; quote: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    question: string;
    body: string;
    cta: string;
    reassurance: string;
  };
  what: { title: string; intro: string; lead: string; items: string[] };
  types: {
    title: string;
    cards: {
      icon: string;
      title: string;
      subtitle: string;
      intro: string;
      items?: string[];
      note?: string;
      cta: string;
      value: string;
    }[];
  };
  choosing: {
    title: string;
    intro: string[];
    blocks: { title: string; intro?: string; items: string[]; outro?: string }[];
  };
  costs: { title: string; intro: string; lead: string; items: string[]; outro: string; cta: string };
  switching: { title: string; intro: string; items: string[]; outro: string; cta: string };
  questions: { title: string; intro: string; items: string[] };
  process: { title: string; steps: { badge: string; title: string; body: string }[] };
  guide: { title: string; subtitle: string; intro: string; groups: { title: string; items: string[] }[] };
  glossary: { title: string; items: { term: string; translation: string }[] };
  international: { title: string; question: string; intro: string; outro: string };
  form: {
    title: string;
    steps: {
      step1: { title: string; options: string[] };
      step2: { title: string; fields: string[] };
      step3: { title: string; fields: string[]; managerQuestion: string; yes: string; no: string; startQuestion: string };
      step4: { title: string; options: string[] };
      step5: { title: string; fields: string[]; languageLabel: string; languages: string[]; message: string };
    };
    next: string;
    back: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    required: string;
  };
  after: { title: string; steps: { badge: string; title: string; body: string }[] };
  closing: { title: string; lines: string[]; start: string; cta: string; reassurance: string };
  footer: { languages: string; imprintPending: string };
};

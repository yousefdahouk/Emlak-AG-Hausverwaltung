"use client";

import { useState } from "react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { CONTACT_LANGUAGES, MANAGEMENT_TYPES, SERVICE_KEYS } from "@/lib/inquiry";

type Step = 1 | 2 | 3 | 4 | 5;
const STEPS: Step[] = [1, 2, 3, 4, 5];

type State = {
  managementType: string;
  postalCode: string;
  city: string;
  street: string;
  houseNumber: string;
  residentialUnits: string;
  commercialUnits: string;
  buildings: string;
  constructionYear: string;
  livingArea: string;
  parkingSpaces: string;
  hasManager: "" | "yes" | "no";
  desiredStart: string;
  services: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactLanguage: string;
  message: string;
  honeypot: string;
};

const EMPTY: State = {
  managementType: "",
  postalCode: "",
  city: "",
  street: "",
  houseNumber: "",
  residentialUnits: "",
  commercialUnits: "",
  buildings: "",
  constructionYear: "",
  livingArea: "",
  parkingSpaces: "",
  hasManager: "",
  desiredStart: "",
  services: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactLanguage: "",
  message: "",
  honeypot: "",
};

/** Dictionary field arrays are ordered; these map each index to a payload key. */
const STEP2_KEYS = ["postalCode", "city", "street", "houseNumber"] as const;
const STEP3_KEYS = [
  "residentialUnits",
  "commercialUnits",
  "buildings",
  "constructionYear",
  "livingArea",
  "parkingSpaces",
] as const;
const STEP5_KEYS = ["firstName", "lastName", "email", "phone"] as const;

export default function QuoteForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.form;
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<State>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const stepValid = (s: Step): boolean => {
    if (s === 1) return state.managementType !== "";
    if (s === 2) return state.postalCode.trim() !== "" && state.city.trim() !== "";
    if (s === 5) {
      return (
        state.firstName.trim() !== "" &&
        state.lastName.trim() !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()) &&
        state.contactLanguage !== ""
      );
    }
    return true;
  };

  const goNext = () => {
    if (!stepValid(step)) {
      setTouched(true);
      return;
    }
    setTouched(false);
    setStep((s) => (Math.min(5, s + 1) as Step));
  };

  const goBack = () => {
    setTouched(false);
    setStep((s) => (Math.max(1, s - 1) as Step));
  };

  const submit = async () => {
    if (!stepValid(5)) {
      setTouched(true);
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, sourceLocale: locale }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const invalid = (ok: boolean) => touched && !ok;

  if (status === "sent") {
    return (
      <div className="card border-accent-400/50 bg-accent-400/5 text-center">
        <p className="text-4xl" aria-hidden>
          ✅
        </p>
        <p className="lead mt-4 text-brand-800">{t.success}</p>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label={t.title}>
        {STEPS.map((s) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              aria-current={s === step ? "step" : undefined}
              className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                s === step
                  ? "bg-accent-500 text-white"
                  : s < step
                    ? "bg-brand-600 text-white"
                    : "bg-brand-100 text-brand-500"
              }`}
            >
              {s < step ? "✓" : s}
            </span>
            {s !== 5 ? <span className={`h-px flex-1 ${s < step ? "bg-brand-600" : "bg-brand-100"}`} /> : null}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <fieldset>
          <legend className="section-title !text-xl mb-5">{t.steps.step1.title}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.steps.step1.options.map((label, index) => (
              <label key={label} className="choice">
                <input
                  type="radio"
                  name="managementType"
                  className="mt-1 size-4 accent-[#c08a26]"
                  checked={state.managementType === MANAGEMENT_TYPES[index]}
                  onChange={() => set("managementType", MANAGEMENT_TYPES[index])}
                />
                <span className="font-medium">{label}</span>
              </label>
            ))}
          </div>
          {invalid(stepValid(1)) ? <p className="mt-3 text-sm text-red-600">{t.required}</p> : null}
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset>
          <legend className="section-title !text-xl mb-5">{t.steps.step2.title}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.steps.step2.fields.map((label, index) => {
              const key = STEP2_KEYS[index];
              const required = key === "postalCode" || key === "city";
              return (
                <div key={label}>
                  <label className="field-label" htmlFor={key}>
                    {label}
                    {required ? <span className="text-red-600"> *</span> : null}
                  </label>
                  <input
                    id={key}
                    className="field"
                    value={state[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                  {required && invalid(state[key].trim() !== "") ? (
                    <p className="mt-1 text-sm text-red-600">{t.required}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset>
          <legend className="section-title !text-xl mb-5">{t.steps.step3.title}</legend>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.steps.step3.fields.map((label, index) => {
              const key = STEP3_KEYS[index];
              return (
                <div key={label}>
                  <label className="field-label" htmlFor={key}>
                    {label}
                  </label>
                  <input
                    id={key}
                    className="field"
                    inputMode="numeric"
                    value={state[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="field-label">{t.steps.step3.managerQuestion}</p>
              <div className="flex gap-3">
                {([["yes", t.steps.step3.yes], ["no", t.steps.step3.no]] as const).map(([value, label]) => (
                  <label key={value} className="choice flex-1">
                    <input
                      type="radio"
                      name="hasManager"
                      className="mt-1 size-4 accent-[#c08a26]"
                      checked={state.hasManager === value}
                      onChange={() => set("hasManager", value)}
                    />
                    <span className="font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor="desiredStart">
                {t.steps.step3.startQuestion}
              </label>
              <input
                id="desiredStart"
                className="field"
                value={state.desiredStart}
                onChange={(e) => set("desiredStart", e.target.value)}
              />
            </div>
          </div>
        </fieldset>
      ) : null}

      {step === 4 ? (
        <fieldset>
          <legend className="section-title !text-xl mb-5">{t.steps.step4.title}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.steps.step4.options.map((label, index) => {
              const key = SERVICE_KEYS[index];
              return (
                <label key={label} className="choice">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 rounded accent-[#c08a26]"
                    checked={state.services.includes(key)}
                    onChange={(e) =>
                      set(
                        "services",
                        e.target.checked
                          ? [...state.services, key]
                          : state.services.filter((s) => s !== key),
                      )
                    }
                  />
                  <span className="font-medium">{label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {step === 5 ? (
        <fieldset>
          <legend className="section-title !text-xl mb-5">{t.steps.step5.title}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.steps.step5.fields.map((label, index) => {
              const key = STEP5_KEYS[index];
              const required = key !== "phone";
              const ok =
                key === "email"
                  ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())
                  : state[key].trim() !== "";
              return (
                <div key={label}>
                  <label className="field-label" htmlFor={key}>
                    {label}
                    {required ? <span className="text-red-600"> *</span> : null}
                  </label>
                  <input
                    id={key}
                    className="field"
                    type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                    autoComplete={
                      key === "firstName"
                        ? "given-name"
                        : key === "lastName"
                          ? "family-name"
                          : key === "email"
                            ? "email"
                            : "tel"
                    }
                    value={state[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                  {required && invalid(ok) ? <p className="mt-1 text-sm text-red-600">{t.required}</p> : null}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <p className="field-label">
              {t.steps.step5.languageLabel}
              <span className="text-red-600"> *</span>
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {t.steps.step5.languages.map((label, index) => (
                <label key={label} className="choice">
                  <input
                    type="radio"
                    name="contactLanguage"
                    className="mt-1 size-4 accent-[#c08a26]"
                    checked={state.contactLanguage === CONTACT_LANGUAGES[index]}
                    onChange={() => set("contactLanguage", CONTACT_LANGUAGES[index])}
                  />
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
            {invalid(state.contactLanguage !== "") ? (
              <p className="mt-2 text-sm text-red-600">{t.required}</p>
            ) : null}
          </div>

          <div className="mt-6">
            <label className="field-label" htmlFor="message">
              {t.steps.step5.message}
            </label>
            <textarea
              id="message"
              rows={5}
              className="field resize-y"
              value={state.message}
              onChange={(e) => set("message", e.target.value)}
            />
          </div>

          {/* Anti-spam honeypot — hidden from people, tempting to bots. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company_website">Website</label>
            <input
              id="company_website"
              tabIndex={-1}
              autoComplete="off"
              value={state.honeypot}
              onChange={(e) => set("honeypot", e.target.value)}
            />
          </div>
        </fieldset>
      ) : null}

      {status === "error" ? (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{t.error}</p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="btn-secondary !px-5 !py-3 !text-sm"
        >
          {t.back}
        </button>

        {step < 5 ? (
          <button type="button" onClick={goNext} className="btn-primary">
            {t.next}
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={status === "sending"} className="btn-primary">
            {status === "sending" ? t.submitting : t.submit}
          </button>
        )}
      </div>
    </div>
  );
}

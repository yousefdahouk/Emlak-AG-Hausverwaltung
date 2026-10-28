import { z } from "zod";

export const MANAGEMENT_TYPES = ["weg", "miet", "sonder", "gewerbe", "other"] as const;

export const SERVICE_KEYS = [
  "financial",
  "technical",
  "rent",
  "operatingCosts",
  "ownerMeetings",
  "maintenance",
  "tenantContact",
  "tradesmen",
  "reletting",
  "other",
] as const;

export const CONTACT_LANGUAGES = ["ar", "de", "en", "es", "it", "el", "tr"] as const;

const optionalText = z.string().trim().max(200).optional().or(z.literal(""));

export const inquirySchema = z.object({
  managementType: z.enum(MANAGEMENT_TYPES),

  postalCode: z.string().trim().min(1).max(20),
  city: z.string().trim().min(1).max(120),
  street: optionalText,
  houseNumber: optionalText,

  residentialUnits: optionalText,
  commercialUnits: optionalText,
  buildings: optionalText,
  constructionYear: optionalText,
  livingArea: optionalText,
  parkingSpaces: optionalText,
  hasManager: z.enum(["yes", "no", ""]).optional(),
  desiredStart: optionalText,

  services: z.array(z.enum(SERVICE_KEYS)).default([]),

  firstName: z.string().trim().min(1).max(120),
  lastName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: optionalText,
  contactLanguage: z.enum(CONTACT_LANGUAGES),
  message: z.string().trim().max(5000).optional().or(z.literal("")),

  // Anti-spam: people leave this empty, bots fill it. Accepted by the schema
  // so the route can discard the submission silently instead of answering 422,
  // which would tell a bot which field gave it away.
  honeypot: z.string().max(500).optional(),

  sourceLocale: z.string().trim().max(10).optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

const TYPE_LABELS: Record<(typeof MANAGEMENT_TYPES)[number], string> = {
  weg: "WEG-Verwaltung",
  miet: "Mietverwaltung",
  sonder: "Sondereigentumsverwaltung",
  gewerbe: "Gewerbeverwaltung",
  other: "Andere / Other",
};

const SERVICE_LABELS: Record<(typeof SERVICE_KEYS)[number], string> = {
  financial: "Kaufmännische Verwaltung / Buchhaltung",
  technical: "Technische Verwaltung",
  rent: "Mietverwaltung",
  operatingCosts: "Betriebskostenabrechnung",
  ownerMeetings: "Eigentümerversammlungen",
  maintenance: "Instandhaltungsmanagement",
  tenantContact: "Mieterkommunikation",
  tradesmen: "Handwerkerkoordination",
  reletting: "Neuvermietung",
  other: "Weitere Leistungen",
};

/** Human-readable summary used for the notification email. */
export function formatInquiry(data: Inquiry): { subject: string; text: string } {
  const row = (label: string, value?: string | null) =>
    value && value.trim() !== "" ? `${label}: ${value}` : null;

  const lines = [
    "Neue Verwaltungsanfrage – Emlak AG Hausverwaltung",
    "",
    "— Art der Verwaltung —",
    TYPE_LABELS[data.managementType],
    "",
    "— Objektadresse —",
    row("PLZ", data.postalCode),
    row("Stadt", data.city),
    row("Straße", data.street),
    row("Hausnummer", data.houseNumber),
    "",
    "— Objektdaten —",
    row("Wohneinheiten", data.residentialUnits),
    row("Gewerbeeinheiten", data.commercialUnits),
    row("Gebäude", data.buildings),
    row("Baujahr", data.constructionYear),
    row("Wohnfläche", data.livingArea),
    row("Stellplätze", data.parkingSpaces),
    row("Aktuell Verwaltung vorhanden", data.hasManager === "yes" ? "Ja" : data.hasManager === "no" ? "Nein" : ""),
    row("Gewünschter Beginn", data.desiredStart),
    "",
    "— Gewünschte Leistungen —",
    data.services.length > 0 ? data.services.map((s) => `• ${SERVICE_LABELS[s]}`).join("\n") : "—",
    "",
    "— Kontakt —",
    row("Name", `${data.firstName} ${data.lastName}`),
    row("E-Mail", data.email),
    row("Telefon", data.phone),
    row("Bevorzugte Sprache", data.contactLanguage),
    "",
    "— Nachricht —",
    data.message && data.message.trim() !== "" ? data.message : "—",
    "",
    "—",
    `Formularsprache: ${data.sourceLocale ?? "—"}`,
    `Eingang: ${new Date().toISOString()}`,
  ].filter((line): line is string => line !== null);

  return {
    subject: `Anfrage ${TYPE_LABELS[data.managementType]} – ${data.postalCode} ${data.city} (${data.lastName})`,
    text: lines.join("\n"),
  };
}

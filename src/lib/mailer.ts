import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

const TO = process.env.INQUIRY_TO_EMAIL ?? "flowmeterinquiries@gmail.com";
const FROM = process.env.INQUIRY_FROM_EMAIL ?? `Emlak AG Hausverwaltung <${TO}>`;

type Delivery = { transport: "smtp" | "file"; reference: string };

/**
 * Sends an inquiry notification. With no SMTP_HOST configured (local
 * development) the message is written to .dev-inquiries/ and logged instead of
 * being sent, so the form is fully testable without credentials.
 */
export async function sendInquiryMail(subject: string, text: string, replyTo?: string): Promise<Delivery> {
  const host = process.env.SMTP_HOST?.trim();

  if (!host) {
    const dir = path.join(process.cwd(), ".dev-inquiries");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${new Date().toISOString().replace(/[:.]/g, "-")}.txt`);
    await writeFile(file, `To: ${TO}\nFrom: ${FROM}\nReply-To: ${replyTo ?? "—"}\nSubject: ${subject}\n\n${text}\n`, "utf8");
    console.info(`\n[inquiry] No SMTP_HOST set — saved to ${file}\n${subject}\n`);
    return { transport: "file", reference: file };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? "" }
      : undefined,
  });

  const info = await transporter.sendMail({ to: TO, from: FROM, replyTo, subject, text });
  return { transport: "smtp", reference: info.messageId };
}

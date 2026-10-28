import { NextResponse } from "next/server";
import { formatInquiry, inquirySchema } from "@/lib/inquiry";
import { sendInquiryMail } from "@/lib/mailer";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Silently accept honeypot hits so bots get no signal.
  if (data.honeypot) return NextResponse.json({ ok: true });

  const { subject, text } = formatInquiry(data);

  try {
    const delivery = await sendInquiryMail(subject, text, data.email);
    return NextResponse.json({ ok: true, transport: delivery.transport });
  } catch (error) {
    console.error("[inquiry] delivery failed", error);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}

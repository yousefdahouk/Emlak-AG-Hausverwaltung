import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  tone = "light",
  children,
}: {
  id?: string;
  title?: string;
  tone?: "light" | "muted";
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section ${tone === "muted" ? "bg-brand-50/60" : "bg-white"}`}>
      <div className="shell">
        {title ? <h2 className="section-title mb-6">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}

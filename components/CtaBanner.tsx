"use client";

import { CONTENT } from "@/lib/content";

export default function CtaBanner() {
  const scrollToQuote = () =>
    document.getElementById("quote-bot")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="section-padding"
      style={{ background: "var(--bg-dark)" }}
    >
      <div className="section-container px-6 text-center">
        <h2
          className="font-display text-white mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "-0.01em" }}
        >
          {CONTENT.ctaBanner.title}
        </h2>
        <p
          className="section-subtitle mx-auto mb-8"
          style={{ color: "var(--on-dark-muted)" }}
        >
          {CONTENT.ctaBanner.subtitle}
        </p>
        <button
          onClick={scrollToQuote}
          className="btn-primary text-lg px-10 py-5 mx-auto"
          id="cta-banner-button"
        >
          {CONTENT.ctaBanner.button}
        </button>
      </div>
    </section>
  );
}

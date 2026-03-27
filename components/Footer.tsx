"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { CONTENT } from "@/lib/content";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="pt-16 pb-8"
      style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--on-dark-border)" }}
    >
      <div className="section-container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl tracking-wider" style={{ color: "var(--on-dark-primary)" }}>
              {CONTENT.footer.brand.part1}<span style={{ color: "var(--color-earth)" }}>{CONTENT.footer.brand.part2}</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--on-dark-muted)", maxWidth: "22rem" }}>
              {CONTENT.footer.brand.description}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--on-dark-faint)" }}>
              {CONTENT.footer.navLabel}
            </p>
            <ul className="space-y-2">
              {CONTENT.navbar.links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm cursor-pointer transition-colors duration-200"
                    style={{ color: "var(--on-dark-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--on-dark-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-dark-muted)")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--on-dark-faint)" }}>
              {CONTENT.footer.contactLabel}
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: "var(--on-dark-muted)" }}>
                <Phone size={14} style={{ color: "var(--color-earth)", flexShrink: 0 }} />
                {CONTENT.footer.contact.phone}
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "var(--on-dark-muted)" }}>
                <Mail size={14} style={{ color: "var(--color-earth)", flexShrink: 0 }} />
                {CONTENT.footer.contact.email}
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: "var(--on-dark-muted)" }}>
                <MapPin size={14} style={{ color: "var(--color-earth)", flexShrink: 0, marginTop: "2px" }} />
                {CONTENT.footer.contact.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--on-dark-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--on-dark-dim)" }}>
            {CONTENT.footer.copyright}
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end mt-4 md:mt-0">
            <a
              href="#"
              className="text-xs cursor-pointer transition-colors"
              style={{ color: "var(--on-dark-dim)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--on-dark-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-dark-dim)")}
            >
              {CONTENT.footer.privacy}
            </a>
            <a
              href="#"
              className="text-xs cursor-pointer transition-colors"
              style={{ color: "var(--on-dark-dim)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--on-dark-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-dark-dim)")}
            >
              {CONTENT.footer.terms}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs" style={{ color: "var(--on-dark-dim)" }}>
          {CONTENT.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}

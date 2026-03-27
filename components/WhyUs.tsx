import { ShieldCheck, DollarSign, Award, Clock } from "lucide-react";
import { unsplashUrl } from "@/lib/unsplash";
import { CONTENT } from "@/lib/content";

const points = [
  { ...CONTENT.whyUs.points[0], icon: ShieldCheck },
  { ...CONTENT.whyUs.points[1], icon: DollarSign },
  { ...CONTENT.whyUs.points[2], icon: Award },
  { ...CONTENT.whyUs.points[3], icon: Clock },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="section-padding" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
      <div className="section-container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Points */}
          <div>
            <p className="section-label">{CONTENT.whyUs.label}</p>
            <h2 className="section-title mb-10">{CONTENT.whyUs.title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {points.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "var(--accent-tint)", border: "1px solid var(--accent-tint-border)" }}
                    >
                      <Icon size={20} style={{ color: "var(--accent)" }} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image + badge */}
          <div className="relative rounded-xl overflow-hidden img-container h-[300px] md:h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplashUrl("craftsman carpenter wood finishing interior", 900, 700, "whyus-bg")}
              alt="Our craftsmen at work"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Credential badge */}
            <div
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 rounded-lg px-4 py-3 md:px-5 md:py-4"
              style={{
                background: "var(--accent-overlay)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--earth-border)",
              }}
            >
              <p className="font-display text-2xl" style={{ color: "var(--color-earth)" }}>
                {CONTENT.whyUs.badgeTitle}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--on-dark-muted)" }}>
                {CONTENT.whyUs.badgeSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

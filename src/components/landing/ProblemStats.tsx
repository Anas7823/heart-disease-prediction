// Je cree la section statistiques du probleme avec count-up anime
"use client";

import { MetricCard } from "@/components/ui/MetricCard";

const STATS = [
  {
    label: "Deces cardiovasculaires / an",
    value: 17.9,
    suffix: "M",
    decimals: 1,
    description: "Premiere cause de mortalite dans le monde (OMS)",
  },
  {
    label: "Des crises sont evitables",
    value: 80,
    suffix: "%",
    decimals: 0,
    description: "Avec une detection precoce et un suivi adapte",
  },
  {
    label: "Detection a temps",
    value: 50,
    prefix: "< ",
    suffix: "%",
    decimals: 0,
    description: "Des patients a risque ne sont pas detectes assez tot",
  },
  {
    label: "Patients dans notre dataset",
    value: 630,
    suffix: "K",
    decimals: 0,
    description: "Kaggle Playground Series S6E2, 13 features cliniques",
  },
];

export function ProblemStats() {
  return (
    <section className="section-spacing">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Le defi cardiovasculaire
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Les chiffres parlent d&apos;eux-memes. La detection precoce est
            l&apos;arme la plus efficace contre les maladies cardiaques.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <MetricCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              decimals={stat.decimals}
              description={stat.description}
              highlight
            />
          ))}
        </div>
      </div>
    </section>
  );
}

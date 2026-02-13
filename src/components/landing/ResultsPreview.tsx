// Je cree la section apercu des resultats avec la metrique AUC
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Users, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COMPARISON = [
  { label: "Aleatoire", value: 0.5, color: "text-text-muted" },
  { label: "Medecin moyen", value: 0.85, color: "text-accent-warning" },
  { label: "Notre modele", value: 0.956, color: "text-accent-red" },
];

export function ResultsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aucValue, setAucValue] = useState(0);

  useGSAP(
    () => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 0.956,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        onUpdate: () => setAucValue(counter.val),
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="section-spacing" ref={containerRef}>
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Le resultat
          </h2>

          {/* Grande metrique AUC */}
          <div className="mb-16">
            <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">
              Area Under the Curve (ROC-AUC)
            </p>
            <p className="text-5xl sm:text-7xl md:text-9xl font-mono font-bold gradient-text animate-glow">
              {aucValue.toFixed(3)}
            </p>
          </div>

          {/* Barres de comparaison */}
          <div className="max-w-xl mx-auto mb-16 space-y-4">
            {COMPARISON.map((item) => (
              <div key={item.label} className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-text-secondary w-24 sm:w-36 text-right shrink-0">
                  {item.label}
                </span>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-bg transition-all duration-1000"
                    style={{ width: `${item.value * 100}%` }}
                  />
                </div>
                <span className={`font-mono text-sm font-bold w-14 ${item.color}`}>
                  {item.value.toFixed(3)}
                </span>
              </div>
            ))}
          </div>

          {/* Concept consensus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <Users size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">3 modeles independants</h3>
                  <p className="text-sm text-text-secondary">
                    Comme 3 medecins qui donnent leur avis separement
                  </p>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">1 consensus IA</h3>
                  <p className="text-sm text-text-secondary">
                    Décision collective ponderée par la performance de chaque modele
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          <Link href="/demo">
            <Button size="lg">
              Tester le diagnostic IA
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

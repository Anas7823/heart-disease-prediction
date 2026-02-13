// Je cree la section hero de la landing page avec video de fond et animations GSAP
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", { y: 60, opacity: 0, duration: 1 })
        .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(
          ".hero-stats > div",
          { y: 30, opacity: 0, stagger: 0.15, duration: 0.6 },
          "-=0.3"
        )
        .from(
          ".hero-cta",
          { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      <VideoBackground src="/videos/hero_section_background.mp4" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="gradient-text">17.9 millions</span>
            <br />
            <span className="text-text-primary">
              de vies perdues chaque annee
            </span>
          </h1>

          <p className="hero-subtitle text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-2">
            Les maladies cardiovasculaires sont la premiere cause de mortalite
            mondiale. Et si 3 modeles d&apos;IA pouvaient aider a changer ca ?
          </p>

          <div className="hero-stats flex flex-wrap justify-center gap-6 md:gap-10 mb-8 md:mb-12">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-mono font-bold gradient-text">
                630K
              </p>
              <p className="text-xs text-text-muted mt-1">Patients analyses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-mono font-bold gradient-text">
                0.956
              </p>
              <p className="text-xs text-text-muted mt-1">AUC du modele</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-mono font-bold gradient-text">
                3
              </p>
              <p className="text-xs text-text-muted mt-1">Modeles en consensus</p>
            </div>
          </div>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link href="/demo">
              <Button size="lg" className="w-full sm:w-auto">
                Tester le diagnostic
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/data">
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                Explorer les donnees
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Je cree la jauge de risque SVG semi-circulaire animee avec glow, count-up et labels de zones
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface RiskGaugeProps {
  probability: number;
  threshold?: number;
}

// Je definis les zones de la jauge avec leurs labels et couleurs
const ZONES = [
  { start: 0, end: 36, color: "#10B981", label: "Faible" },
  { start: 36, end: 75.6, color: "#F59E0B", label: "Modere" },
  { start: 75.6, end: 126, color: "#F97316", label: "Eleve" },
  { start: 126, end: 180, color: "#EF4444", label: "Critique" },
];

export function RiskGauge({ probability, threshold = 0.42 }: RiskGaugeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [animatedAngle, setAnimatedAngle] = useState(0);
  const [displayedPercent, setDisplayedPercent] = useState(0);

  // Je calcule les dimensions de l'arc
  const cx = 150;
  const cy = 140;
  const r = 110;

  useGSAP(
    () => {
      const targetAngle = probability * 180;
      const targetPercent = probability * 100;

      // Je lance l'animation de l'aiguille
      gsap.to(
        { angle: 0 },
        {
          angle: targetAngle,
          duration: 2,
          ease: "power3.out",
          delay: 0.4,
          onUpdate: function () {
            setAnimatedAngle(this.targets()[0].angle);
          },
        }
      );

      // Je lance le count-up du pourcentage
      gsap.to(
        { val: 0 },
        {
          val: targetPercent,
          duration: 2,
          ease: "power3.out",
          delay: 0.4,
          onUpdate: function () {
            setDisplayedPercent(this.targets()[0].val);
          },
        }
      );

      // Je fais pulser le glow autour de la jauge
      gsap.to(".gauge-glow", {
        opacity: 0.6,
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      });
    },
    { scope: ref, dependencies: [probability] }
  );

  // Je dessine les segments de couleur de la jauge
  function arcPath(startDeg: number, endDeg: number): string {
    const s = ((180 - startDeg) * Math.PI) / 180;
    const e = ((180 - endDeg) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(s);
    const y1 = cy - r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy - r * Math.sin(e);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  // Je calcule la position de l'aiguille
  const needleAngle = ((180 - animatedAngle) * Math.PI) / 180;
  const needleLen = r - 15;
  const nx = cx + needleLen * Math.cos(needleAngle);
  const ny = cy - needleLen * Math.sin(needleAngle);

  // Je calcule la position du seuil
  const thresholdDeg = threshold * 180;
  const thresholdAngle = ((180 - thresholdDeg) * Math.PI) / 180;
  const tx1 = cx + (r - 25) * Math.cos(thresholdAngle);
  const ty1 = cy - (r - 25) * Math.sin(thresholdAngle);
  const tx2 = cx + (r + 12) * Math.cos(thresholdAngle);
  const ty2 = cy - (r + 12) * Math.sin(thresholdAngle);

  // Je calcule les positions des labels de zones
  function zoneLabelPos(zone: (typeof ZONES)[number]) {
    const midDeg = (zone.start + zone.end) / 2;
    const labelR = r + 28;
    const angle = ((180 - midDeg) * Math.PI) / 180;
    return {
      x: cx + labelR * Math.cos(angle),
      y: cy - labelR * Math.sin(angle),
    };
  }

  // Je determine la couleur du glow selon le risque
  const glowColor =
    probability < 0.2
      ? "#10B981"
      : probability < 0.42
      ? "#F59E0B"
      : probability < 0.7
      ? "#F97316"
      : "#EF4444";

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={ref}
        viewBox="-10 -10 320 195"
        className="w-full max-w-[340px]"
        aria-label={`Jauge de risque: ${(probability * 100).toFixed(0)}%`}
      >
        {/* Glow anime derriere la jauge */}
        <ellipse
          className="gauge-glow"
          cx={cx}
          cy={cy - 20}
          rx={r + 30}
          ry={60}
          fill={glowColor}
          opacity="0.08"
          style={{ transformOrigin: `${cx}px ${cy - 20}px` }}
        />

        {/* Fond gris */}
        <path
          d={arcPath(0, 180)}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="22"
          strokeLinecap="round"
        />

        {/* Zones colorees */}
        {ZONES.map((zone, i) => (
          <path
            key={i}
            d={arcPath(zone.start, zone.end)}
            fill="none"
            stroke={zone.color}
            strokeWidth="22"
            strokeLinecap="butt"
            opacity="0.25"
          />
        ))}

        {/* Arc de progression actif */}
        {animatedAngle > 0.5 && (
          <path
            d={arcPath(0, Math.min(animatedAngle, 180))}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.6"
          />
        )}

        {/* Labels de zones */}
        {ZONES.map((zone) => {
          const pos = zoneLabelPos(zone);
          return (
            <text
              key={zone.label}
              x={pos.x}
              y={pos.y}
              fill="rgba(255,255,255,0.3)"
              fontSize="8"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {zone.label}
            </text>
          );
        })}

        {/* Ligne du seuil */}
        <line
          x1={tx1}
          y1={ty1}
          x2={tx2}
          y2={ty2}
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <text
          x={tx2 + (thresholdDeg > 90 ? -12 : 12)}
          y={ty2 - 5}
          fill="rgba(255,255,255,0.4)"
          fontSize="7"
          fontFamily="monospace"
          textAnchor="middle"
        >
          seuil
        </text>

        {/* Aiguille avec ombre */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#F8FAFC"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Point central avec glow */}
        <circle cx={cx} cy={cy} r="10" fill={glowColor} opacity="0.2" />
        <circle cx={cx} cy={cy} r="6" fill="url(#gaugeGradient)" />

        {/* Labels 0% et 100% */}
        <text x="25" y="158" fill="#64748B" fontSize="10" fontFamily="monospace">
          0%
        </text>
        <text x="260" y="158" fill="#64748B" fontSize="10" fontFamily="monospace">
          100%
        </text>

        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pourcentage avec count-up */}
      <p className="text-5xl sm:text-6xl font-mono font-bold gradient-text mt-2">
        {displayedPercent.toFixed(1)}%
      </p>
    </div>
  );
}

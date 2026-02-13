// Je cree la jauge de risque SVG semi-circulaire animee
"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface RiskGaugeProps {
  probability: number;
  threshold?: number;
}

export function RiskGauge({ probability, threshold = 0.42 }: RiskGaugeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [animatedAngle, setAnimatedAngle] = useState(0);

  // Je calcule les dimensions de l'arc
  const cx = 150;
  const cy = 140;
  const r = 110;
  useGSAP(
    () => {
      const targetAngle = probability * 180;
      gsap.to(
        { angle: 0 },
        {
          angle: targetAngle,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3,
          onUpdate: function () {
            setAnimatedAngle(this.targets()[0].angle);
          },
        }
      );
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
  const tx2 = cx + (r + 10) * Math.cos(thresholdAngle);
  const ty2 = cy - (r + 10) * Math.sin(thresholdAngle);

  // Zones : 0-0.2 vert, 0.2-0.42 jaune, 0.42-0.7 orange, 0.7-1.0 rouge
  const ZONES = [
    { start: 0, end: 36, color: "#10B981" },
    { start: 36, end: 75.6, color: "#F59E0B" },
    { start: 75.6, end: 126, color: "#F97316" },
    { start: 126, end: 180, color: "#EF4444" },
  ];

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={ref}
        viewBox="0 0 300 160"
        className="w-full max-w-[300px]"
        aria-label={`Jauge de risque: ${(probability * 100).toFixed(0)}%`}
      >
        {/* Fond gris */}
        <path
          d={arcPath(0, 180)}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Zones colorees */}
        {ZONES.map((zone, i) => (
          <path
            key={i}
            d={arcPath(zone.start, zone.end)}
            fill="none"
            stroke={zone.color}
            strokeWidth="20"
            strokeLinecap="butt"
            opacity="0.3"
          />
        ))}

        {/* Ligne du seuil */}
        <line
          x1={tx1}
          y1={ty1}
          x2={tx2}
          y2={ty2}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Aiguille */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#F8FAFC"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Point central */}
        <circle cx={cx} cy={cy} r="6" fill="url(#gaugeGradient)" />
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>

        {/* Labels */}
        <text x="30" y="155" fill="#64748B" fontSize="10" fontFamily="monospace">
          0%
        </text>
        <text x="255" y="155" fill="#64748B" fontSize="10" fontFamily="monospace">
          100%
        </text>
      </svg>

      <p className="text-5xl font-mono font-bold gradient-text mt-2">
        {(probability * 100).toFixed(1)}%
      </p>
    </div>
  );
}

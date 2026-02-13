// Je cree la galerie de figures d'evaluation du modele
"use client";

import { FigureViewer } from "@/components/ui/FigureViewer";
import { FIGURE_PATHS } from "@/lib/constants";

const FIGURES = [
  {
    src: FIGURE_PATHS.training.evaluation,
    alt: "Metriques d'evaluation",
    caption: "Dashboard d'evaluation global",
  },
  {
    src: FIGURE_PATHS.training.threshold,
    alt: "Analyse du seuil de decision",
    caption: "Optimisation du seuil de decision",
  },
  {
    src: FIGURE_PATHS.training.calibration,
    alt: "Courbe de calibration",
    caption: "Calibration des probabilites",
  },
  {
    src: FIGURE_PATHS.training.learning,
    alt: "Courbes d'apprentissage",
    caption: "Courbes d'apprentissage (train vs validation)",
  },
  {
    src: FIGURE_PATHS.training.lift,
    alt: "Courbe de lift",
    caption: "Courbe de Lift - gain cumulatif",
  },
  {
    src: FIGURE_PATHS.training.ks,
    alt: "Statistique KS",
    caption: "Test de Kolmogorov-Smirnov (KS = 0.778)",
  },
];

export function FigureGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {FIGURES.map((fig) => (
        <FigureViewer
          key={fig.src}
          src={fig.src}
          alt={fig.alt}
          caption={fig.caption}
        />
      ))}
    </div>
  );
}

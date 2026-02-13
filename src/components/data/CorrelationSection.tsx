// Je cree la section des correlations avec les figures
"use client";

import { FigureViewer } from "@/components/ui/FigureViewer";
import { FIGURE_PATHS } from "@/lib/constants";

export function CorrelationSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FigureViewer
          src={FIGURE_PATHS.eda.correlation}
          alt="Matrice de correlation"
          caption="Matrice de correlation entre les variables numeriques"
        />
        <FigureViewer
          src={FIGURE_PATHS.eda.pairplot}
          alt="Pairplot des variables principales"
          caption="Pairplot - relations bivariées colores par classe"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FigureViewer
          src={FIGURE_PATHS.eda.ridgeline}
          alt="Ridgeline plot"
          caption="Ridgeline - distributions par classe superposées"
        />
        <FigureViewer
          src={FIGURE_PATHS.eda.heatmap}
          alt="Heatmap sexe x type de douleur"
          caption="Heatmap - interaction sexe et type de douleur thoracique"
        />
      </div>
    </div>
  );
}

// Je cree le footer minimal avec credits et disclaimer
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5">
      <div className="section-container py-12">
        <div className="mb-8">
          <MedicalDisclaimer compact />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            Projet academique Master Big Data & IA - IPSSI 2026
          </p>
          <p className="font-mono">
            CardioAI v1.0 - XGBoost + FastAPI + Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}

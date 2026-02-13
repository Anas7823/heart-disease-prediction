// Je cree le disclaimer medical toujours visible
import { AlertTriangle } from "lucide-react";
import { MEDICAL_DISCLAIMER } from "@/lib/constants";

interface MedicalDisclaimerProps {
  compact?: boolean;
}

export function MedicalDisclaimer({ compact = false }: MedicalDisclaimerProps) {
  if (compact) {
    return (
      <p className="text-xs text-text-muted text-center leading-relaxed max-w-2xl mx-auto">
        {MEDICAL_DISCLAIMER}
      </p>
    );
  }

  return (
    <div className="glass border-accent-rose/20 p-4 rounded-xl" style={{ background: "rgba(239, 68, 68, 0.05)" }}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-accent-rose shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-sm font-semibold text-accent-rose mb-1">
            Avertissement medical
          </p>
          <p className="text-xs text-text-secondary leading-relaxed">
            {MEDICAL_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function ProbabilityGauge({ value, survived }) {

  const survivalProb = value >= 0 ? value : 1 + value;
  const deathProb = 1 - survivalProb;

  const survivalPct = Math.round(survivalProb * 100);
  const deathPct = Math.round(deathProb * 100);

  // Texto de explicación
  const explanation =
    survived
      ? `Este pasajero tiene una probabilidad estimada de supervivencia del ${survivalPct}%.`
      : `Este pasajero tenía una probabilidad estimada de fallecimiento del ${deathPct}% y una probabilidad de supervivencia del ${survivalPct}%.`;

  // Segmentos de barra según sobrevivió o no
  const barSegments = survived
    ? [
        { pct: survivalPct, variant: "success", label: `${survivalPct}%` },
        { pct: deathPct, variant: "danger", label: `${deathPct}%` },
      ]
    : [
        { pct: deathPct, variant: "danger", label: `${deathPct}%` },
        { pct: survivalPct, variant: "success", label: `${survivalPct}%` },
      ];

  return (
    <div>
      <h5 className="mb-3">Probabilidad estimada</h5>

      <ProgressBar style={{ height: "25px" }}>
        {barSegments.map((seg, i) => (
          <ProgressBar
            key={i}
            now={seg.pct}
            variant={seg.variant}
            label={`${seg.label}`}
          />
        ))}
      </ProgressBar>

      <p className="mt-3 text-muted">{explanation}</p>
    </div>
  );
}

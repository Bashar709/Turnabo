"use client";

import { Aktivitet, Vanskegrad } from "@/lib/types";

interface TrailFilterProps {
  aktiviteter: Aktivitet[];
  vanskegrader: Vanskegrad[];
  valgtAktivitet: Set<Aktivitet>;
  valgtVanske: Set<Vanskegrad>;
  onToggleAktivitet: (a: Aktivitet) => void;
  onToggleVanske: (v: Vanskegrad) => void;
  onNullstill: () => void;
  antallVist: number;
  antallTotalt: number;
}

const AKT_IKON: Record<Aktivitet, string> = {
  Fottur: "🥾",
  Fjelltur: "⛰️",
  Løpetur: "🏃",
  Sykkeltur: "🚴",
  Skitur: "⛷️",
};

function Chip({
  aktiv,
  onClick,
  children,
}: {
  aktiv: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={aktiv}
      onClick={onClick}
      className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full border px-3.5 text-[0.82rem] transition-colors ${
        aktiv
          ? "border-pine-deep bg-pine-deep text-card"
          : "border-line bg-card text-ink hover:border-line-strong hover:bg-pine/5"
      }`}
    >
      {children}
    </button>
  );
}

export default function TrailFilter({
  aktiviteter,
  vanskegrader,
  valgtAktivitet,
  valgtVanske,
  onToggleAktivitet,
  onToggleVanske,
  onNullstill,
  antallVist,
  antallTotalt,
}: TrailFilterProps) {
  const harFilter = valgtAktivitet.size > 0 || valgtVanske.size > 0;

  return (
    <div className="mb-5 rounded-card border border-line bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3 sm:px-5">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-fog">
          Filtrer turer
        </span>
        <span className="font-mono text-xs text-muted">
          <span className="font-semibold text-ink">{antallVist}</span> av{" "}
          {antallTotalt}
          {harFilter && (
            <button
              type="button"
              onClick={onNullstill}
              className="ml-2 underline underline-offset-2 hover:text-pine-deep"
            >
              nullstill
            </button>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 sm:px-5">
        <div>
          <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-fog">
            Aktivitet
          </p>
          <div className="flex flex-wrap gap-2">
            {aktiviteter.map((a) => (
              <Chip
                key={a}
                aktiv={valgtAktivitet.has(a)}
                onClick={() => onToggleAktivitet(a)}
              >
                <span aria-hidden>{AKT_IKON[a]}</span>
                {a}
              </Chip>
            ))}
          </div>
        </div>

        {vanskegrader.length > 1 && (
          <div>
            <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider text-fog">
              Vanskegrad
            </p>
            <div className="flex flex-wrap gap-2">
              {vanskegrader.map((v) => (
                <Chip
                  key={v}
                  aktiv={valgtVanske.has(v)}
                  onClick={() => onToggleVanske(v)}
                >
                  {v}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

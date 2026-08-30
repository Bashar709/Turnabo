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

const chipBase =
  "rounded-full border px-3 py-1.5 font-mono text-[0.75rem] transition-colors";

function chipClass(aktiv: boolean) {
  return aktiv
    ? `${chipBase} border-pine-deep bg-pine-deep text-[#f5f2e8]`
    : `${chipBase} border-line text-pine-deep hover:border-pine-deep hover:bg-pine/5`;
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
    <div className="mb-5 rounded-card border border-line bg-card px-5 py-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-fog">
          Filtrer turer
        </span>
        <span className="font-mono text-xs text-fog">
          Viser {antallVist} av {antallTotalt}
          {harFilter && (
            <>
              {" · "}
              <button
                onClick={onNullstill}
                className="underline underline-offset-2 hover:text-pine-deep"
              >
                nullstill
              </button>
            </>
          )}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {aktiviteter.map((a) => (
          <button
            key={a}
            onClick={() => onToggleAktivitet(a)}
            className={chipClass(valgtAktivitet.has(a))}
          >
            {a}
          </button>
        ))}
      </div>

      {vanskegrader.length > 1 && (
        <div className="mt-2.5 flex flex-wrap gap-2 border-t border-line pt-2.5">
          {vanskegrader.map((v) => (
            <button
              key={v}
              onClick={() => onToggleVanske(v)}
              className={chipClass(valgtVanske.has(v))}
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export interface SmartResultat {
  kommune: string | null;
  aktiviteter: string[];
  vanskegrader: string[];
  maksLengdeKm: number | null;
  familievennlig: boolean;
  svar: string;
}

interface SmartSearchProps {
  onResult: (r: SmartResultat) => void;
}

const EKSEMPLER = [
  "kort tur med barnevogn nær Bergen",
  "krevende topptur i Stryn",
  "flat løpetur i Oslo under 6 km",
];

export default function SmartSearch({ onResult }: SmartSearchProps) {
  const [tekst, setTekst] = useState("");
  const [laster, setLaster] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  async function kjor(q: string) {
    const spor = q.trim();
    if (!spor || laster) return;
    setLaster(true);
    setFeil(null);
    try {
      const res = await fetch("/api/sok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst: spor }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeil(data?.error ?? "Noe gikk galt. Prøv igjen.");
        return;
      }
      onResult(data as SmartResultat);
    } catch {
      setFeil("Fikk ikke kontakt med serveren. Prøv igjen.");
    } finally {
      setLaster(false);
    }
  }

  return (
    <div className="mt-5 max-w-[520px]">
      <label
        htmlFor="smartsok"
        className="mb-2 block font-mono text-[0.7rem] uppercase tracking-wider text-fog"
      >
        Eller beskriv turen med egne ord
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-line bg-card py-2 pl-4 pr-2 shadow-card">
        <span aria-hidden className="shrink-0 text-base">
          ✨
        </span>
        <input
          id="smartsok"
          type="text"
          autoComplete="off"
          placeholder="F.eks. «kort tur med barn nær Ålesund»"
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && kjor(tekst)}
          className="min-w-0 flex-1 bg-transparent py-2 font-body text-[0.95rem] text-ink placeholder:text-fog outline-none"
        />
        <button
          onClick={() => kjor(tekst)}
          disabled={laster || !tekst.trim()}
          className="shrink-0 rounded-full bg-fjord px-4 py-2.5 font-body text-sm font-bold text-card transition-colors hover:bg-pine-deep disabled:opacity-50"
        >
          {laster ? "Tolker …" : "Smart søk"}
        </button>
      </div>

      {feil ? (
        <p className="mt-2 text-xs text-amber-deep">{feil}</p>
      ) : (
        <p className="mt-2 text-xs text-fog">
          Prøv:{" "}
          {EKSEMPLER.map((e, i) => (
            <span key={e}>
              {i > 0 && " · "}
              <button
                onClick={() => {
                  setTekst(e);
                  kjor(e);
                }}
                className="underline underline-offset-2 hover:text-pine-deep"
              >
                {e}
              </button>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

import { Aktivitet, Trail, Vanskegrad } from "@/lib/types";

interface TrailListProps {
  trails: Trail[];
  /** Tekst som vises når lista er tom (avhenger av om det er filter aktivt). */
  emptyText?: string;
}

// Faste profil-kurver per vanskegrad, så vi slipper Math.random() i JSX
// (unngår hydrerings-mismatch mellom server og klient).
const PROFILE_PATHS: Record<Vanskegrad, string> = {
  Lett: "M0,30 L20,26 L40,20 L60,22 L80,14 L100,16",
  Middels: "M0,32 L18,26 L34,14 L48,20 L64,6 L80,18 L100,10",
  Krevende: "M0,34 L14,28 L24,8 L36,20 L48,4 L62,24 L76,8 L88,18 L100,10",
};

const DIFF_STYLES: Record<Vanskegrad, string> = {
  Lett: "bg-pine/10 text-pine-deep",
  Middels: "bg-amber/[0.18] text-amber-deep",
  Krevende: "bg-fjord/10 text-fjord",
};

const AKT_STYLES: Record<Aktivitet, string> = {
  Fottur: "bg-pine/10 text-pine-deep",
  Fjelltur: "bg-fjord/10 text-fjord",
  Løpetur: "bg-amber/[0.18] text-amber-deep",
  Sykkeltur: "bg-pine/[0.06] text-pine-deep",
  Skitur: "bg-fjord/[0.06] text-fjord",
};

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} t` : `${h} t ${m} min`;
}

export default function TrailList({ trails, emptyText }: TrailListProps) {
  if (!trails.length) {
    return (
      <p className="mb-9 text-sm text-fog">
        {emptyText ?? "Fant ingen turer for denne kommunen ennå."}
      </p>
    );
  }

  return (
    <div className="mb-9 flex flex-col gap-3">
      {trails.map((t) => (
        <div
          key={t.navn}
          className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4.5 rounded-card border border-line bg-card px-5 py-4 max-[640px]:grid-cols-[auto_1fr]"
        >
          <svg viewBox="0 0 100 40" className="h-8 w-[70px] text-pine">
            <path
              d={PROFILE_PATHS[t.vanskegrad] ?? PROFILE_PATHS.Middels}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide ${
                  AKT_STYLES[t.aktivitet] ?? AKT_STYLES.Fottur
                }`}
              >
                {t.aktivitet}
              </span>
              <span className="font-bold text-[0.98rem]">{t.navn}</span>
            </div>
            <div className="mt-0.5 font-mono text-xs text-fog">
              {t.distanse} km &middot; {t.stigning} m stigning
            </div>
          </div>
          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-xs uppercase tracking-wide ${
              DIFF_STYLES[t.vanskegrad] ?? DIFF_STYLES.Middels
            }`}
          >
            {t.vanskegrad}
          </span>
          <span className="whitespace-nowrap font-mono text-sm text-fog">
            ~{formatTime(t.tid)}
          </span>
        </div>
      ))}
    </div>
  );
}

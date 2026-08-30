import { Trail } from "@/lib/types";

interface TrailListProps {
  trails: Trail[];
}

// Faste profil-kurver per vanskegrad, sa vi slipper Math.random() i JSX
// (unngar hydrerings-mismatch mellom server og klient).
const PROFILE_PATHS: Record<string, string> = {
  Lett: "M0,30 L20,26 L40,20 L60,22 L80,14 L100,16",
  Middels: "M0,32 L18,26 L34,14 L48,20 L64,6 L80,18 L100,10",
  Krevende: "M0,34 L14,28 L24,8 L36,20 L48,4 L62,24 L76,8 L88,18 L100,10",
};

const DIFF_STYLES: Record<string, string> = {
  Lett: "bg-pine/10 text-pine-deep",
  Middels: "bg-amber/[0.18] text-amber-deep",
  Krevende: "bg-fjord/10 text-fjord",
};

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} t` : `${h} t ${m} min`;
}

export default function TrailList({ trails }: TrailListProps) {
  if (!trails.length) {
    return <p className="text-sm text-fog">Fant ingen turer for denne kommunen enna.</p>;
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
            <div className="font-bold text-[0.98rem]">{t.navn}</div>
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

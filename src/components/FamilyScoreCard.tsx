interface FamilyScoreCardProps {
  score: number;
}

export default function FamilyScoreCard({ score }: FamilyScoreCardProps) {
  const pct = Math.round((score / 10) * 100);
  const ord = score >= 7.5 ? "Godt egnet" : score >= 5 ? "Ganske greit" : "Litt krevende";

  return (
    <div className="rounded-card border border-line bg-card p-5 shadow-card sm:p-[22px]">
      <span className="mb-3.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fog">
        Familievennlig
      </span>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-[2.75rem] font-semibold leading-none text-pine-deep sm:text-5xl">
          {score}
        </span>
        <span className="font-mono text-sm text-fog">/ 10</span>
        <span className="ml-auto text-sm font-semibold text-pine-deep">{ord}</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber to-pine"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-fog">
        Basert på lengde og vanskegrad på turene i kommunen.
      </p>
    </div>
  );
}

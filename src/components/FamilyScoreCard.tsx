interface FamilyScoreCardProps {
  score: number;
}

export default function FamilyScoreCard({ score }: FamilyScoreCardProps) {
  const pct = Math.round((score / 10) * 100);

  return (
    <div className="rounded-card border border-line bg-card p-5 shadow-card sm:p-[22px]">
      <span className="mb-3.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fog">
        Familievennlig-skår
      </span>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-pine/10 px-3 py-1.5 text-sm font-semibold text-pine-deep">
          Barnevogn OK
        </span>
        <span className="rounded-full bg-amber/20 px-3 py-1.5 text-sm font-semibold text-amber-deep">
          Kort avstand
        </span>
        <span className="rounded-full bg-pine/10 px-3 py-1.5 text-sm font-semibold text-pine-deep">
          Toalett i nærheten
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber to-pine"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-sm text-pine-deep">{score} / 10</span>
      </div>
      <p className="mt-3 text-xs text-fog">
        Plassholder-skår &mdash; regnes ut fra eksempeldata, se lib/familyScore.ts
      </p>
    </div>
  );
}

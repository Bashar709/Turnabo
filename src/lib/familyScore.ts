import { Kommune } from "./types";

/**
 * Regner ut en "familievennlig-skår" fra 1-10 for en kommune, basert på
 * hvor mange lette turer den har og hvor korte de er i snitt.
 *
 * Når detaljerte turbeskrivelser er på plass kan skåren utvides med
 * tilrettelegging for barnevogn, avstand til parkering, toalett i
 * nærheten og lignende.
 */
export function calculateFamilyScore(kommune: Kommune): number {
  if (!kommune.turer.length) return 5;

  const easyTrails = kommune.turer.filter(
    (t) => t.vanskegrad === "Lett"
  ).length;
  const avgDistance =
    kommune.turer.reduce((sum, t) => sum + t.distanse, 0) /
    kommune.turer.length;

  const raw = 6 + easyTrails * 1.2 - avgDistance * 0.15;
  const clamped = Math.max(1, Math.min(10, raw));
  return Math.round(clamped * 10) / 10;
}

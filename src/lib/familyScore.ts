import { Kommune } from "./types";

/**
 * Regner ut en "familievennlig-skaar" fra 1-10 for en kommune.
 *
 * TODO: Dette er en midlertidig plassholder-formel basert kun paa
 * eksempeldataene vi genererer lokalt (antall lette turer og
 * gjennomsnittlig distanse). Naar Nasjonal Turbase er koblet til,
 * bor formelen i stedet bruke ekte data om f.eks. tilrettelegging
 * for barnevogn, avstand til parkering, toalett i naerheten osv.
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

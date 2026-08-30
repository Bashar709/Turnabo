export type Vanskegrad = "Lett" | "Middels" | "Krevende";

export type Aktivitet =
  | "Fottur"
  | "Fjelltur"
  | "Løpetur"
  | "Sykkeltur"
  | "Skitur";

/** Alle aktivitetstyper i visningsrekkefølge, brukt av filteret. */
export const AKTIVITETER: Aktivitet[] = [
  "Fottur",
  "Fjelltur",
  "Løpetur",
  "Sykkeltur",
  "Skitur",
];

/** Alle vanskegrader i stigende rekkefølge, brukt av filteret. */
export const VANSKEGRADER: Vanskegrad[] = ["Lett", "Middels", "Krevende"];

export interface Trail {
  navn: string;
  aktivitet: Aktivitet;
  distanse: number; // km
  stigning: number; // meter
  vanskegrad: Vanskegrad;
  tid: number; // minutter
}

export interface Kommune {
  fylke: string;
  kommune: string;
  turer: Trail[];
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  symbol: string;
  precipitation: number;
}

export interface GeocodeResult {
  lat: number;
  lon: number;
  displayName: string;
}

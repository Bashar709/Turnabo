export type Vanskegrad = "Lett" | "Middels" | "Krevende";

export interface Trail {
  navn: string;
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

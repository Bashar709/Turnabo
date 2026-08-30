import { WeatherData } from "@/lib/types";

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
  error: boolean;
}

export default function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  return (
    <div className="rounded-card border border-line bg-card p-5 shadow-card sm:p-[22px]">
      <span className="mb-3.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fog">
        Vær nå
      </span>

      {loading && (
        <p className="text-sm text-muted">Henter værdata fra MET Norway …</p>
      )}

      {!loading && error && (
        <p className="text-sm text-muted">
          Fikk ikke hentet værdata akkurat nå. Prøv igjen om litt.
        </p>
      )}

      {!loading && !error && weather && (
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="font-display text-[2.75rem] font-semibold leading-none text-fjord sm:text-5xl">
            {weather.temperature}&deg;
          </div>
          <div className="text-[0.9rem] leading-relaxed text-muted">
            Vindstyrke <b className="text-ink">{weather.windSpeed} m/s</b>
            <br />
            Nedbør neste time{" "}
            <b className="text-ink">{weather.precipitation} mm</b>
            <br />
            <span className="text-fog">Kilde: MET Norway (Locationforecast)</span>
          </div>
        </div>
      )}

      {!loading && !error && !weather && (
        <p className="text-sm text-fog">Søk på en kommune for å se værvarselet.</p>
      )}
    </div>
  );
}

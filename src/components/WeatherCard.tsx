import { WeatherData } from "@/lib/types";

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
  error: boolean;
}

export default function WeatherCard({ weather, loading, error }: WeatherCardProps) {
  return (
    <div className="rounded-card border border-line bg-card p-[22px]">
      <span className="mb-3.5 block font-mono text-[0.7rem] uppercase tracking-wider text-fog">
        Vaer na
      </span>

      {loading && (
        <p className="text-sm text-fog">Henter vaerdata fra MET Norway ...</p>
      )}

      {!loading && error && (
        <p className="text-sm text-fog">
          Fikk ikke hentet vaerdata akkurat na. Provo igjen om litt.
        </p>
      )}

      {!loading && !error && weather && (
        <div className="flex items-center gap-4.5">
          <div className="font-display text-5xl font-semibold leading-none text-fjord">
            {weather.temperature}&deg;
          </div>
          <div className="text-[0.92rem] leading-relaxed text-[#3c4a44]">
            Vindstyrke <b className="text-ink">{weather.windSpeed} m/s</b>
            <br />
            Nedbor neste time{" "}
            <b className="text-ink">{weather.precipitation} mm</b>
            <br />
            Kilde: MET Norway (Locationforecast)
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import kommunerData from "@/data/kommuner.json";
import {
  Kommune,
  WeatherData,
  GeocodeResult,
  Aktivitet,
  Vanskegrad,
  AKTIVITETER,
  VANSKEGRADER,
} from "@/lib/types";
import { calculateFamilyScore } from "@/lib/familyScore";

import Header from "@/components/Header";
import ContourBackground from "@/components/ContourBackground";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import FamilyScoreCard from "@/components/FamilyScoreCard";
import MapView from "@/components/MapView";
import TrailFilter from "@/components/TrailFilter";
import TrailList from "@/components/TrailList";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";

const KOMMUNER = kommunerData as Kommune[];
const POPULAERE = ["Hareid", "Bergen", "Tromsø", "Bodø", "Oslo"];

function findKommune(navn: string): Kommune | undefined {
  const n = navn.trim().toLowerCase();
  return (
    KOMMUNER.find((k) => k.kommune.toLowerCase() === n) ||
    KOMMUNER.find((k) => k.kommune.toLowerCase().startsWith(n))
  );
}

export default function Home() {
  const [query, setQuery] = useState("Hareid");
  const [selected, setSelected] = useState<Kommune | null>(null);
  const [showResult, setShowResult] = useState(false);

  const [geo, setGeo] = useState<GeocodeResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  const [aktFilter, setAktFilter] = useState<Set<Aktivitet>>(new Set());
  const [vanskeFilter, setVanskeFilter] = useState<Set<Vanskegrad>>(new Set());

  function toggleAkt(a: Aktivitet) {
    setAktFilter((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  }

  function toggleVanske(v: Vanskegrad) {
    setVanskeFilter((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  }

  function nullstillFilter() {
    setAktFilter(new Set());
    setVanskeFilter(new Set());
  }

  async function handleSelect(navn: string) {
    const kobj = findKommune(navn) ?? null;
    setQuery(navn);
    setSelected(kobj);
    setShowResult(true);
    setWeather(null);
    setWeatherError(false);
    nullstillFilter();

    const displayName = kobj?.kommune ?? navn;
    const fylke = kobj?.fylke ?? "";

    try {
      const geoRes = await fetch(
        `/api/geocode?q=${encodeURIComponent(
          `${displayName} kommune, ${fylke}, Norge`
        )}`
      );
      const geoData = await geoRes.json();
      if (geoRes.ok) {
        setGeo(geoData);
        setWeatherLoading(true);
        const wRes = await fetch(
          `/api/weather?lat=${geoData.lat}&lon=${geoData.lon}`
        );
        const wData = await wRes.json();
        setWeatherLoading(false);
        if (wRes.ok) {
          setWeather(wData);
        } else {
          setWeatherError(true);
        }
      } else {
        setGeo(null);
      }
    } catch {
      setGeo(null);
      setWeatherLoading(false);
      setWeatherError(true);
    }
  }

  const familyScore = selected ? calculateFamilyScore(selected) : 0;

  const alleTurer = selected?.turer ?? [];
  const tilgjengeligeAkt = AKTIVITETER.filter((a) =>
    alleTurer.some((t) => t.aktivitet === a)
  );
  const tilgjengeligeVanske = VANSKEGRADER.filter((v) =>
    alleTurer.some((t) => t.vanskegrad === v)
  );
  const synligeTurer = alleTurer.filter(
    (t) =>
      (aktFilter.size === 0 || aktFilter.has(t.aktivitet)) &&
      (vanskeFilter.size === 0 || vanskeFilter.has(t.vanskegrad))
  );

  return (
    <>
      <div className="relative">
        <ContourBackground />
        <Header />

        <section className="relative px-[5vw] pb-[90px] pt-16">
          <div className="relative z-10 max-w-[720px]">
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.12em] text-amber-deep">
              Turfinner for alle Norges 358 kommuner
            </span>
            <h1 className="mb-5 font-display text-[clamp(2.3rem,5.2vw,3.6rem)] font-semibold leading-[1.06] text-pine-deep">
              Hvor vil du <em className="text-fjord not-italic italic">gå</em> i dag?
            </h1>
            <p className="mb-8 max-w-[52ch] text-[1.05rem] leading-relaxed text-[#3c4a44]">
              Skriv inn en kommune, så viser vi turer i nærheten &mdash; med
              vær, hvor familievennlig det er, kart og bilder, samlet på ett
              sted.
            </p>

            <SearchBar
              kommuner={KOMMUNER}
              initialValue={query}
              onSelect={handleSelect}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAERE.map((navn) => (
                <button
                  key={navn}
                  onClick={() => handleSelect(navn)}
                  className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.78rem] text-pine-deep transition-colors hover:border-pine-deep hover:bg-pine/5"
                >
                  {navn}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section
        className={`relative z-10 px-[5vw] pb-16 transition-all duration-500 ${
          showResult
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-4"
        }`}
      >
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4.5">
          <h2 className="font-display text-[2rem] font-semibold text-pine-deep">
            {selected?.kommune ?? query}
          </h2>
          <span className="font-mono text-sm text-fog">
            {selected?.fylke ?? ""}
          </span>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-5 max-[760px]:grid-cols-1">
          <WeatherCard
            weather={weather}
            loading={weatherLoading}
            error={weatherError}
          />
          <FamilyScoreCard score={familyScore} />
        </div>

        <h3 className="mb-4 font-display text-[1.3rem] font-semibold text-pine-deep">
          Kart
        </h3>
        <MapView
          lat={geo?.lat ?? null}
          lon={geo?.lon ?? null}
          label={selected?.kommune ?? query}
        />
        <p className="-mt-7 mb-9 font-mono text-xs text-fog">
          Ekte kart (OpenStreetMap) &mdash; sentrerer automatisk på kommunen du søker på.
        </p>

        <h3 className="mb-4 font-display text-[1.3rem] font-semibold text-pine-deep">
          Turer i nærheten
        </h3>
        <p className="-mt-2 mb-4 text-sm text-fog">
          Eksempeldata generert for demoen &mdash; i den ferdige appen hentes
          ekte turer fra Nasjonal Turbase / UT.no.
        </p>

        {alleTurer.length > 0 && (
          <TrailFilter
            aktiviteter={tilgjengeligeAkt}
            vanskegrader={tilgjengeligeVanske}
            valgtAktivitet={aktFilter}
            valgtVanske={vanskeFilter}
            onToggleAktivitet={toggleAkt}
            onToggleVanske={toggleVanske}
            onNullstill={nullstillFilter}
            antallVist={synligeTurer.length}
            antallTotalt={alleTurer.length}
          />
        )}

        <TrailList
          trails={synligeTurer}
          emptyText={
            alleTurer.length > 0
              ? "Ingen turer matcher filteret. Prøv å fjerne noen valg."
              : "Fant ingen turer for denne kommunen ennå."
          }
        />

        <h3 className="mb-4 font-display text-[1.3rem] font-semibold text-pine-deep">
          Bilder fra området
        </h3>
        <PhotoGrid />
      </section>

      <Footer />
    </>
  );
}

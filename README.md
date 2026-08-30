# Turnabo

Turnabo er en webapp som viser turer i din kommune, med vær, familievennlighet,
kart og bilder samlet på ett sted. Startet som et lærings- og porteføljeprosjekt.

Laga av [bashar.no](https://bashar.no).

## Status akkurat nå

| Del | Status |
|---|---|
| Søk med autocomplete på alle 358 kommuner | Ferdig |
| Kart (OpenStreetMap / Leaflet) | Ferdig, ekte geokoding |
| Vær | Ferdig, ekte data fra MET Norway |
| Turer per kommune | 4–6 stk, med aktivitetstype og vanskegrad – men generert plassholder-data, ikke ekte |
| Filter på aktivitet og vanskegrad | Ferdig (klientside) |
| Familievennlig-skår | Plassholder-formel, se `src/lib/familyScore.ts` |
| Bilder | Plassholder, ikke koblet til Google Places ennå |

## Komme i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:3000

## Prosjektstruktur

```
src/
  app/
    page.tsx            <- hovedsiden, samler alt + filtrering av turlista
    layout.tsx          <- fonter og global HTML-struktur
    globals.css
    api/
      weather/route.ts  <- proxy mot MET Norway (server-side, unngår CORS/User-Agent-krav)
      geocode/route.ts  <- proxy mot Nominatim/OpenStreetMap
  components/
    Header.tsx           <- logo + klikkbar navbar
    ContourBackground.tsx
    SearchBar.tsx
    WeatherCard.tsx
    FamilyScoreCard.tsx
    MapView.tsx          <- Leaflet-kart, kjører kun i nettleseren
    TrailFilter.tsx      <- filterknapper for aktivitet og vanskegrad
    TrailList.tsx
    PhotoGrid.tsx
    Footer.tsx           <- «Om oss» / datakilder / «Laga av bashar.no»
  lib/
    types.ts             <- Trail, Kommune, Aktivitet, Vanskegrad m.m.
    familyScore.ts
  data/
    kommuner.json        <- alle 358 kommuner + 4–6 genererte turer hver

scripts brukt for å lage data ligger utenfor repoet (engangs-generering).
```

## Turdata

`src/data/kommuner.json` er generert lokalt og deterministisk (seed fra
kommunenavn), så fila er lik hver gang. Hver tur har:

- `navn`, `aktivitet` (Fottur / Fjelltur / Løpetur / Sykkeltur / Skitur),
  `distanse` (km), `stigning` (m), `vanskegrad` (Lett / Middels / Krevende)
  og `tid` (minutter, grovt anslag).

Dette er **ikke** ekte turdata – det er fyll for å vise fram grensesnittet og
filtreringen inntil ekte turer er koblet til.

## Veien videre (prioritert)

1. **Ekte turdata**: søk om API-tilgang hos [Nasjonal Turbase](https://www.nasjonalturbase.no/)
   eller bruk UT.no sitt API. Bytt ut `src/data/kommuner.json` med et kall
   til et nytt `src/app/api/trails/route.ts`.
2. **Ekte bilder**: skaff en Google Places API-nøkkel, legg den i `.env.local`
   som `GOOGLE_PLACES_API_KEY`, og lag en `src/app/api/photos/route.ts` etter
   samme mønster som vær-routen.
3. **Familievennlig-skår**: når turdataen er ekte, bytt ut plassholder-
   formelen i `src/lib/familyScore.ts` med noe basert på faktisk
   tilrettelegging, avstand til parkering, toalett osv.
4. **Database/caching**: når datamengden vokser (bilder, ekte turer for 358
   kommuner), vurder å cache i en database (f.eks. Supabase/Postgres) i
   stedet for å kalle eksterne API-er live hver gang.
5. **App**: når webappen er stabil, kan Capacitor pakke den samme Next.js-
   koden som iOS/Android-app uten å skrive alt på nytt.

## Miljøvariabler

Kopier `.env.example` til `.env.local` og fyll inn nøkler etter hvert som du
kobler til flere tjenester. MET Norway sitt vær-API krever ingen nøkkel.

## Teknologier

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Leaflet.

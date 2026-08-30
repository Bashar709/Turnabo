# Turnabo

Turnabo samler turer, vær, familievennlighet, kart og bilder for hver av
Norges 358 kommuner på ett sted, så du raskt ser hvor og når det er verdt å
dra ut.

Laga av [bashar.no](https://bashar.no).

## Hva som er på plass

| Del | Status |
|---|---|
| Søk med autofullfør på alle 358 kommuner | I bruk |
| Smart søk – fritekst tolkes til filtre med Claude | I bruk (krever `ANTHROPIC_API_KEY`) |
| Kart (OpenStreetMap / CARTO / Leaflet) | I bruk |
| Værvarsel (MET Norway) | I bruk |
| Turnavn – ekte fjell- og toppnavn fra Kartverket | I bruk (353/358 kommuner) |
| Filter på aktivitet, lengde og vanskegrad | I bruk |
| Turdetaljer (lengde/stigning/tid) | Automatiske estimater |
| Detaljerte turbeskrivelser (Nasjonal Turbase / UT.no) | På vei |
| Bilder (Google Places) | På vei |

## Komme i gang

```bash
npm install
npm run dev
```

Åpne http://localhost:3000

## Miljøvariabler

Kopier `.env.example` til `.env.local` og fyll inn nøkler.

- `ANTHROPIC_API_KEY` – for «Smart søk». Uten den fungerer resten av appen
  som normalt; smart-søk-feltet viser en melding om at det ikke er skrudd på.
- MET Norway og Kartverket krever ingen nøkkel.

## Prosjektstruktur

```
src/
  app/
    page.tsx            hovedsiden, samler alt + filtrering av turlista
    om/page.tsx         «Om oss»-side
    layout.tsx          fonter og global HTML-struktur
    globals.css
    api/
      weather/route.ts  proxy mot MET Norway (server-side)
      geocode/route.ts  proxy mot Nominatim/OpenStreetMap
      sok/route.ts      smart søk – tolker fritekst med Claude
  components/
    Header.tsx  ContourBackground.tsx  SearchBar.tsx  SmartSearch.tsx
    WeatherCard.tsx  FamilyScoreCard.tsx  MapView.tsx
    TrailFilter.tsx  TrailList.tsx  PhotoGrid.tsx  Footer.tsx
  lib/
    types.ts            Trail, Kommune, Aktivitet, Vanskegrad m.m.
    familyScore.ts
  data/
    kommuner.json       alle 358 kommuner + 4–6 turforslag hver
```

## Turdata

`src/data/kommuner.json` er bygget deterministisk. Turnavnene er ekte fjell-
og toppnavn hentet fra Kartverket sitt stedsnavn-API
(`ws.geonorge.no/stedsnavn/v1`). Aktivitet, distanse, stigning, vanskegrad og
tid er automatiske estimater i påvente av detaljerte turbeskrivelser.

## Teknologi

Next.js 14 (App Router), TypeScript, Tailwind CSS, Leaflet og Claude API.

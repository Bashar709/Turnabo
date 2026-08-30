# Turnabo

Turnabo er en webapp som viser turer i din kommune, med vaer, familievennlighet,
kart og bilder samlet paa ett sted. Startet som et laeringsprosjekt / portefoljeprosjekt.

## Status akkurat na

| Del | Status |
|---|---|
| Sok med autocomplete pa alle 358 kommuner | Ferdig |
| Kart (OpenStreetMap / Leaflet) | Ferdig, ekte geokoding |
| Vaer | Ferdig, ekte data fra MET Norway |
| Turer per kommune | Plassholder-data (generert), ikke ekte |
| Familievennlig-skaar | Plassholder-formel, se `src/lib/familyScore.ts` |
| Bilder | Plassholder, ikke koblet til Google Places enna |

## Komme i gang

```bash
npm install
npm run dev
```

Apne http://localhost:3000

## Prosjektstruktur

```
src/
  app/
    page.tsx           <- hovedsiden, samler alt
    layout.tsx          <- fonter og global HTML-struktur
    globals.css
    api/
      weather/route.ts  <- proxy mot MET Norway (server-side, unngar CORS/User-Agent-krav)
      geocode/route.ts  <- proxy mot Nominatim/OpenStreetMap
  components/
    Header.tsx
    ContourBackground.tsx
    SearchBar.tsx
    WeatherCard.tsx
    FamilyScoreCard.tsx
    MapView.tsx          <- Leaflet-kart, kjorer kun i nettleseren
    TrailList.tsx
    PhotoGrid.tsx
    Footer.tsx
  lib/
    types.ts
    familyScore.ts
  data/
    kommuner.json        <- alle 358 kommuner + 2 plassholder-turer hver
```

## Veien videre (prioritert)

1. **Ekte turdata**: soek om API-tilgang hos [Nasjonal Turbase](https://www.nasjonalturbase.no/)
   eller bruk UT.no sitt API. Bytt ut `src/data/kommuner.json` med et kall
   til et nytt `src/app/api/trails/route.ts`.
2. **Ekte bilder**: skaff en Google Places API-nokkel, legg den i `.env.local`
   som `GOOGLE_PLACES_API_KEY`, og lag en `src/app/api/photos/route.ts` etter
   samme moenster som vaer-routen.
3. **Familievennlig-skaar**: naar turdataen er ekte, bytt ut plassholder-
   formelen i `src/lib/familyScore.ts` med noe basert paa faktisk
   tilrettelegging, avstand til parkering, toalett osv.
4. **Database/caching**: nar datamengden vokser (bilder, ekte turer for 358
   kommuner), vurder aa cache i en database (f.eks. Supabase/Postgres) i
   stedet for aa kalle eksterne API-er live hver gang.
5. **App**: nar webappen er stabil, kan Capacitor pakke den samme Next.js-
   koden som iOS/Android-app uten aa skrive alt paa nytt.

## Miljovariabler

Kopier `.env.example` til `.env.local` og fyll inn nokler etter hvert som du
kobler til flere tjenester. MET Norway sitt vaer-API krever ingen nokkel.

## Teknologier

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Leaflet.

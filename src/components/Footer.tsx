export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-alt px-[5vw] pb-9 pt-11">
      <div className="mb-7 grid grid-cols-[1.3fr_1fr_1fr] gap-8 max-[700px]:grid-cols-1 max-[700px]:gap-6">
        <div>
          <h4 className="mb-2.5 font-display text-base font-semibold text-pine-deep">
            Om Turnabo
          </h4>
          <p className="text-[0.86rem] leading-relaxed text-[#4a5850]">
            Turnabo er et laeringsprosjekt som viser turer i din kommune
            &mdash; med vaer, familievennlighet, kart og bilder samlet paa ett
            sted. Bygget for aa vise fram frontend- og API-ferdigheter.
          </p>
        </div>
        <div>
          <h4 className="mb-2.5 font-display text-base font-semibold text-pine-deep">
            Planlagte datakilder
          </h4>
          <ul className="flex flex-col gap-1.5 text-[0.86rem] leading-relaxed text-[#4a5850]">
            <li>Nasjonal Turbase / UT.no &mdash; turer og stier</li>
            <li>MET Norway &mdash; vaervarsel (koblet til)</li>
            <li>Google Places API &mdash; bilder og fasiliteter</li>
            <li>OpenStreetMap / Leaflet &mdash; kart (koblet til)</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2.5 font-display text-base font-semibold text-pine-deep">
            Status
          </h4>
          <p className="text-[0.86rem] leading-relaxed text-[#4a5850]">
            Vaer og kart bruker ekte, live data. Turdetaljer og
            familievennlig-skaar er foreløpig plassholdere &mdash; se
            README.md for veien videre.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2.5 border-t border-line pt-4 font-mono text-xs text-fog">
        <span>Turnabo &copy; 2026 &mdash; portefoljeprosjekt, ikke en publisert tjeneste</span>
        <span>Bygget med Next.js, Leaflet og MET Norway sitt vaer-API</span>
      </div>
    </footer>
  );
}

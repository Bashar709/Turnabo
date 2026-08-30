import Link from "next/link";

const DATAKILDER = [
  { navn: "MET Norway – værvarsel", status: "live" },
  { navn: "Kartverket – stedsnavn / fjelltopper", status: "live" },
  { navn: "OpenStreetMap / CARTO – kart", status: "live" },
  { navn: "Nasjonal Turbase / UT.no – turbeskrivelser", status: "planlagt" },
  { navn: "Google Places – bilder og fasiliteter", status: "planlagt" },
] as const;

function BasharLenke() {
  return (
    <a
      href="https://bashar.no"
      target="_blank"
      rel="noreferrer"
      className="font-semibold text-pine-deep underline underline-offset-2 hover:text-fjord"
    >
      bashar.no
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-alt px-5 pb-9 pt-12 md:px-[5vw] md:pt-14">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-10 max-[820px]:grid-cols-1 max-[820px]:gap-8">
        <div>
          <div className="flex items-center gap-2 font-display text-xl font-semibold text-pine-deep">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M3 18L9 7L13 14L16 9L21 18H3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            Turnabo
          </div>
          <p className="mt-3 max-w-[44ch] text-[0.9rem] leading-relaxed text-muted">
            Et lærings- og porteføljeprosjekt som samler turer, vær,
            familievennlighet, kart og bilder for hver av Norges 358 kommuner
            på ett sted.
          </p>
          <p className="mt-4 font-mono text-xs text-fog">
            Laga av <BasharLenke />
          </p>
          <Link
            href="/om"
            className="mt-2 inline-block font-mono text-xs text-pine-deep underline underline-offset-2 hover:text-fjord"
          >
            Mer om produktet →
          </Link>
        </div>

        <div id="datakilder">
          <h4 className="mb-3 font-display text-base font-semibold text-pine-deep">
            Datakilder
          </h4>
          <ul className="flex flex-col gap-2 text-[0.86rem] leading-relaxed text-muted">
            {DATAKILDER.map((d) => (
              <li key={d.navn} className="flex items-start gap-2">
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    d.status === "live" ? "bg-pine" : "bg-amber"
                  }`}
                  aria-hidden
                />
                <span>
                  {d.navn}
                  <span className="font-mono text-[0.7rem] text-fog">
                    {" · "}
                    {d.status === "live" ? "koblet til" : "planlagt"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-base font-semibold text-pine-deep">
            Status
          </h4>
          <p className="text-[0.86rem] leading-relaxed text-muted">
            Vær og kart bruker ekte, live data, og turnavnene er ekte
            fjelltopper fra Kartverket. Turdetaljer, familievennlig-skår og
            bilder er foreløpig plassholdere.
          </p>
          <a
            href="https://github.com/Bashar709/Turnabo"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block font-mono text-xs text-pine-deep underline underline-offset-2 hover:text-fjord"
          >
            Kildekode på GitHub ↗
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-5 font-mono text-xs text-fog">
        <span>
          &copy; 2026 Turnabo &mdash; porteføljeprosjekt, ikke en publisert
          tjeneste
        </span>
        <span>
          Laga av <BasharLenke />
        </span>
      </div>
    </footer>
  );
}

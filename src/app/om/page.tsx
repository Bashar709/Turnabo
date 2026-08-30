import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Om Turnabo",
  description:
    "Hva Turnabo er, hva som virker nå, hvilke datakilder som brukes, og hvem som står bak.",
};

function Bolk({
  tittel,
  children,
}: {
  tittel: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-7">
      <h2 className="mb-3 font-display text-[1.35rem] font-semibold text-pine-deep">
        {tittel}
      </h2>
      <div className="flex flex-col gap-3 text-[1rem] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function OmPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-[680px] px-5 py-12 md:px-6 md:py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-amber-deep">
          Om produktet
        </p>
        <h1 className="mb-5 font-display text-[clamp(2rem,6vw,2.9rem)] font-semibold leading-[1.1] text-pine-deep">
          Én side for hele turplanleggingen
        </h1>
        <p className="mb-10 text-[1.08rem] leading-relaxed text-muted">
          Turnabo samler det du vanligvis må sjekke på fem forskjellige
          nettsteder før en tur &mdash; turforslag, vær, hvor familievennlig
          området er, kart og bilder &mdash; på ett sted, for hver av Norges
          358 kommuner.
        </p>

        <div className="flex flex-col gap-8">
          <Bolk tittel="Hvorfor">
            <p>
              Det finnes mye god turinformasjon i Norge, men den ligger spredt:
              turbeskrivelser ett sted, værvarsel et annet, kart et tredje.
              Turnabo prøver å svare på det enkle spørsmålet &laquo;hvor bør jeg
              gå tur i dag, og hvordan blir forholdene?&raquo; uten at du må
              hoppe mellom faner.
            </p>
          </Bolk>

          <Bolk tittel="Hva virker nå">
            <p>
              <strong className="text-ink">Søk</strong> på alle 358 kommuner med
              autofullfør, <strong className="text-ink">kart</strong> som
              sentrerer seg automatisk på kommunen (OpenStreetMap), og{" "}
              <strong className="text-ink">værvarsel</strong> med ekte, ferske
              data fra MET Norway.
            </p>
            <p>
              <strong className="text-ink">Turlista</strong> og{" "}
              <strong className="text-ink">familievennlig-skåren</strong> er
              foreløpig eksempeldata. Turnavnene er ekte fjell- og toppnavn
              hentet fra Kartverket, men lengde, stigning og tid er anslag for å
              vise fram grensesnittet og filteret. <strong className="text-ink">Bildene</strong>{" "}
              er plassholdere til Google Places kobles på.
            </p>
          </Bolk>

          <Bolk tittel="Datakilder">
            <ul className="flex flex-col gap-2">
              <li>
                <span className="font-semibold text-ink">MET Norway</span> &mdash;
                værvarsel (koblet til)
              </li>
              <li>
                <span className="font-semibold text-ink">Kartverket</span> &mdash;
                stedsnavn / fjelltopper (koblet til)
              </li>
              <li>
                <span className="font-semibold text-ink">
                  OpenStreetMap / Leaflet
                </span>{" "}
                &mdash; kart (koblet til)
              </li>
              <li>
                <span className="font-semibold text-ink">
                  Nasjonal Turbase / UT.no
                </span>{" "}
                &mdash; ekte turbeskrivelser (planlagt)
              </li>
              <li>
                <span className="font-semibold text-ink">Google Places</span>{" "}
                &mdash; bilder og fasiliteter (planlagt)
              </li>
            </ul>
          </Bolk>

          <Bolk tittel="Teknologi">
            <p>
              Next.js 14 med App Router, TypeScript, Tailwind CSS og Leaflet.
              Eksterne API-er kalles via serverruter så nøkler og
              User-Agent-krav holdes utenfor nettleseren.
            </p>
          </Bolk>

          <Bolk tittel="Hvem">
            <p>
              Turnabo er et lærings- og porteføljeprosjekt. Laga av{" "}
              <a
                href="https://bashar.no"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-pine-deep underline underline-offset-2 hover:text-fjord"
              >
                bashar.no
              </a>
              . Kildekoden ligger på{" "}
              <a
                href="https://github.com/Bashar709/Turnabo"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-pine-deep underline underline-offset-2 hover:text-fjord"
              >
                GitHub
              </a>
              .
            </p>
          </Bolk>
        </div>

        <div className="mt-12 border-t border-line pt-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-pine-deep px-5 py-3 font-body text-sm font-bold text-card transition-colors hover:bg-fjord"
          >
            <span aria-hidden>←</span> Til forsiden
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

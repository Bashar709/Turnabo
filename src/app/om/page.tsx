import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Om Turnabo",
  description:
    "Hva Turnabo er, hva som er på plass, hvilke datakilder som brukes, og hvem som står bak.",
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
          Om Turnabo
        </p>
        <h1 className="mb-5 font-display text-[clamp(2rem,6vw,2.9rem)] font-semibold leading-[1.1] text-pine-deep">
          Én side for hele turplanleggingen
        </h1>
        <p className="mb-10 text-[1.08rem] leading-relaxed text-muted">
          Turnabo samler det du vanligvis må sjekke på flere forskjellige
          nettsteder før en tur &mdash; turforslag, vær, hvor familievennlig
          området er, kart og bilder &mdash; på ett sted, for hver av Norges
          358 kommuner.
        </p>

        <div className="flex flex-col gap-8">
          <Bolk tittel="Hvorfor">
            <p>
              Det finnes mye god turinformasjon i Norge, men den ligger spredt:
              turbeskrivelser ett sted, værvarsel et annet, kart et tredje.
              Turnabo svarer på det enkle spørsmålet &laquo;hvor bør jeg gå tur
              i dag, og hvordan blir forholdene?&raquo; uten at du må hoppe
              mellom faner.
            </p>
          </Bolk>

          <Bolk tittel="Slik bruker du den">
            <p>
              Søk på en kommune, eller beskriv turen med egne ord &mdash;
              &laquo;kort tur med barnevogn nær Bergen&raquo; &mdash; så tolker
              Turnabo ønsket og setter filtrene for deg. Du får kart, værvarsel
              og en liste med turforslag du kan filtrere på aktivitet, lengde
              og vanskegrad.
            </p>
          </Bolk>

          <Bolk tittel="Hva som er på plass">
            <p>
              <strong className="text-ink">Søk</strong> på alle 358 kommuner,{" "}
              <strong className="text-ink">kart</strong> som sentrerer seg på
              kommunen, <strong className="text-ink">værvarsel</strong> med
              ferske data fra MET Norway, og{" "}
              <strong className="text-ink">smart søk</strong> som forstår
              fritekst.
            </p>
            <p>
              Turforslagene bygger på ekte fjell- og toppnavn fra Kartverket.
              Lengde, stigning og tid er automatiske estimater i dag &mdash;
              detaljerte turbeskrivelser og bilder kobles på etter hvert.
            </p>
          </Bolk>

          <Bolk tittel="Datakilder">
            <ul className="flex flex-col gap-2">
              <li>
                <span className="font-semibold text-ink">MET Norway</span> &mdash;
                værvarsel
              </li>
              <li>
                <span className="font-semibold text-ink">Kartverket</span> &mdash;
                stedsnavn og fjelltopper
              </li>
              <li>
                <span className="font-semibold text-ink">
                  OpenStreetMap / CARTO
                </span>{" "}
                &mdash; kart
              </li>
              <li>
                <span className="font-semibold text-ink">
                  Nasjonal Turbase / UT.no
                </span>{" "}
                &mdash; turbeskrivelser (på vei)
              </li>
              <li>
                <span className="font-semibold text-ink">Google Places</span>{" "}
                &mdash; bilder og fasiliteter (på vei)
              </li>
            </ul>
          </Bolk>

          <Bolk tittel="Hvem">
            <p>
              Turnabo er laga av{" "}
              <a
                href="https://bashar.no"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-pine-deep underline underline-offset-2 hover:text-fjord"
              >
                bashar.no
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

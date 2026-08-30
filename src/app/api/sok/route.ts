import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import kommunerData from "@/data/kommuner.json";
import { AKTIVITETER, VANSKEGRADER, Kommune } from "@/lib/types";

/**
 * Smart søk: tolker et fritekst-ønske på norsk ("kort tur med barnevogn
 * nær Bergen") til strukturerte filtre, ved hjelp av Claude.
 *
 * Krever ANTHROPIC_API_KEY i miljøet (.env.local). Uten nøkkel svarer
 * ruta pent med en 503 slik at resten av appen fungerer som før.
 */

// Bytt til "claude-haiku-4-5" for lavere kostnad og raskere svar hvis ønskelig.
const MODEL = "claude-opus-5";

const KOMMUNENAVN = (kommunerData as Kommune[]).map((k) => k.kommune);
const KOMMUNE_SET = new Map(
  KOMMUNENAVN.map((n) => [n.toLowerCase(), n] as const)
);

const SYSTEM = `Du hjelper en norsk turplanleggings-app. Brukeren skriver et ønske i fritekst.
Din jobb er å oversette ønsket til strukturerte filtre.

Svar KUN med gyldig JSON på nøyaktig denne formen, uten tekst rundt:
{
  "kommune": <string eller null>,
  "aktiviteter": <liste med 0 eller flere av: ${AKTIVITETER.join(", ")}>,
  "vanskegrader": <liste med 0 eller flere av: ${VANSKEGRADER.join(", ")}>,
  "maksLengdeKm": <tall eller null>,
  "familievennlig": <true eller false>,
  "svar": <kort, vennlig setning på norsk som oppsummerer hva du forsto>
}

Regler:
- "kommune" MÅ være et eksakt navn fra denne lista, ellers null:
${KOMMUNENAVN.join(", ")}
- Nevner brukeren et sted som ikke er en kommune (bydel, fjell, region), velg nærmeste kommune fra lista.
- "kort tur", "med barn", "barnevogn", "lett" → familievennlig=true og gjerne maksLengdeKm 5.
- "løpe"→Løpetur, "sykle"→Sykkeltur, "på ski"→Skitur, "topptur"/"fjell"→Fjelltur, "gåtur"→Fottur.
- Tom liste betyr "ingen preferanse". Ikke gjett vilt.
- "svar" skal være på norsk og maks én setning.`;

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Smart søk er ikke skrudd på. Legg ANTHROPIC_API_KEY i .env.local og start appen på nytt.",
      },
      { status: 503 }
    );
  }

  let tekst = "";
  try {
    const body = await req.json();
    tekst = (body?.tekst ?? "").toString().trim();
  } catch {
    return NextResponse.json({ error: "Ugyldig forespørsel" }, { status: 400 });
  }
  if (!tekst) {
    return NextResponse.json({ error: "Skriv hva slags tur du vil ha" }, { status: 400 });
  }
  if (tekst.length > 400) tekst = tekst.slice(0, 400);

  try {
    const client = new Anthropic();
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      output_config: { effort: "low" },
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: tekst }],
    });

    const raw = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    const jsonStr = raw.startsWith("{") ? raw : raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(jsonStr) as Record<string, unknown>;

    // Valider og rensk opp
    const kommuneInn = (parsed.kommune ?? "").toString().toLowerCase();
    const kommune = KOMMUNE_SET.get(kommuneInn) ?? null;

    const aktiviteter = Array.isArray(parsed.aktiviteter)
      ? parsed.aktiviteter.filter((a) => (AKTIVITETER as string[]).includes(String(a)))
      : [];
    const vanskegrader = Array.isArray(parsed.vanskegrader)
      ? parsed.vanskegrader.filter((v) => (VANSKEGRADER as string[]).includes(String(v)))
      : [];

    const maksTall = Number(parsed.maksLengdeKm);
    const maksLengdeKm =
      Number.isFinite(maksTall) && maksTall > 0 && maksTall < 200 ? maksTall : null;

    return NextResponse.json({
      kommune,
      aktiviteter,
      vanskegrader,
      maksLengdeKm,
      familievennlig: parsed.familievennlig === true,
      svar: (parsed.svar ?? "").toString().slice(0, 200),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Klarte ikke tolke søket akkurat nå. Prøv å skrive det litt enklere." },
      { status: 502 }
    );
  }
}

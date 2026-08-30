import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy mot OpenStreetMap sitt Nominatim-API for geokoding.
 *
 * Kjøres server-side med en identifiserbar User-Agent i tråd med
 * Nominatims bruksvilkår: https://operations.osmfoundation.org/policies/nominatim/
 * Ved større trafikk bør dette byttes ut med en betalt geokodingstjeneste
 * eller egen selvhostet Nominatim-instans.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Mangler søkeord" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        q
      )}`,
      {
        headers: {
          "User-Agent": "Turnabo/0.1 github.com/Bashar709/turnabo (kontakt@example.com)",
        },
      }
    );

    const data = await res.json();

    if (!data?.[0]) {
      return NextResponse.json({ error: "Fant ikke stedet" }, { status: 404 });
    }

    return NextResponse.json({
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Uventet feil ved geokoding" },
      { status: 500 }
    );
  }
}

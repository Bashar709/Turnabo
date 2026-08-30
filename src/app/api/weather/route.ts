import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy mot MET Norway sitt Locationforecast-API.
 *
 * Vi henter vaerdata her (server-side) i stedet for direkte fra
 * nettleseren, fordi MET Norway krever en identifiserbar
 * User-Agent-header per bruksvilkarene deres:
 * https://api.met.no/doc/TermsOfService
 *
 * Bytt ut kontakt-e-posten under med din egen for i produksjon.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Mangler lat/lon i foresporselen" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "Turnabo/0.1 github.com/Bashar709/turnabo (kontakt@example.com)",
        },
        // Cacher i 10 minutter - MET ber om at man ikke sparner unodvendig
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Klarte ikke hente vaerdata fra MET Norway" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const now = data?.properties?.timeseries?.[0];

    if (!now) {
      return NextResponse.json(
        { error: "Fant ingen vaerdata for dette punktet" },
        { status: 404 }
      );
    }

    const details = now.data.instant.details;
    const symbol =
      now.data.next_1_hours?.summary?.symbol_code ??
      now.data.next_6_hours?.summary?.symbol_code ??
      "unknown";
    const precipitation =
      now.data.next_1_hours?.details?.precipitation_amount ?? 0;

    return NextResponse.json({
      temperature: Math.round(details.air_temperature),
      windSpeed: details.wind_speed,
      symbol,
      precipitation,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Uventet feil ved henting av vaerdata" },
      { status: 500 }
    );
  }
}

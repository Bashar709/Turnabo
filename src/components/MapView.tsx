"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

interface MapViewProps {
  lat: number | null;
  lon: number | null;
  label: string;
}

// SVG-pin som divIcon – unngår at Leaflet sine standard marker-bilder
// brekker i Next.js-bygget, og matcher fargepaletten.
const PIN_SVG = `
<svg width="30" height="38" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 13 21.6 13.6 22.1a2 2 0 0 0 2.8 0C17 36.6 30 25.5 30 15 30 6.7 23.3 0 15 0z" fill="#194b63"/>
  <circle cx="15" cy="15" r="6" fill="#fffef9"/>
</svg>`;

export default function MapView({ lat, lon, label }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const [ready, setReady] = useState(false);

  // Init kartet én gang
  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      mapRef.current = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([64.5, 12.0], 4);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &middot; &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(mapRef.current);

      setReady(true);
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Oppdater posisjon når lat/lon endres
  useEffect(() => {
    if (lat == null || lon == null || !mapRef.current || !ready) return;

    import("leaflet").then((L) => {
      const map = mapRef.current;
      if (!map) return;

      map.flyTo([lat, lon], 11, { duration: 0.8 });

      const icon = L.divIcon({
        html: PIN_SVG,
        className: "",
        iconSize: [30, 38],
        iconAnchor: [15, 37],
        popupAnchor: [0, -32],
      });

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]).setIcon(icon);
      } else {
        markerRef.current = L.marker([lat, lon], { icon }).addTo(map);
      }
      markerRef.current.bindPopup(`<b>${label}</b>`);
    });
  }, [lat, lon, label, ready]);

  const harPosisjon = lat != null && lon != null;

  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-bg-alt shadow-card">
      <div
        ref={containerRef}
        className="h-[240px] w-full sm:h-[340px]"
        aria-label={`Kart sentrert på ${label}`}
      />
      {!harPosisjon && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-bg-alt/70 backdrop-blur-[1px]">
          <p className="rounded-full bg-card px-4 py-2 font-mono text-xs text-fog shadow-card">
            Søk på en kommune for å se den på kartet
          </p>
        </div>
      )}
    </div>
  );
}

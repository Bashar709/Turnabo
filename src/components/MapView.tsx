"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

interface MapViewProps {
  lat: number | null;
  lon: number | null;
  label: string;
}

export default function MapView({ lat, lon, label }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);

  // Init kartet en gang
  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      mapRef.current = L.map(containerRef.current, {
        scrollWheelZoom: false,
      }).setView([62.0, 10.0], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap-bidragsytere",
        maxZoom: 18,
      }).addTo(mapRef.current);
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Oppdater posisjon nar lat/lon endres
  useEffect(() => {
    if (lat == null || lon == null || !mapRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;
      mapRef.current.setView([lat, lon], 11);

      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = L.marker([lat, lon])
        .addTo(mapRef.current)
        .bindPopup(label)
        .openPopup();
    });
  }, [lat, lon, label]);

  return (
    <div
      ref={containerRef}
      className="h-80 w-full rounded-card border border-line bg-card"
    />
  );
}

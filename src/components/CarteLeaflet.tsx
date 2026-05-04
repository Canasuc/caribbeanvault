"use client";
import { useEffect, useRef } from "react";
import type { BIENS } from "@/lib/biens";

type Bien = (typeof BIENS)[number];

interface CarteLeafletProps {
  biens: Bien[];
  onBienClick: (bien: Bien) => void;
}

export default function CarteLeaflet({ biens, onBienClick }: CarteLeafletProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then(L => {
      const container = mapRef.current as HTMLDivElement & { _leaflet_id?: number };
      if (container._leaflet_id) return;

      delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [14.5, -61.0],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      biens.forEach(bien => {
        const color = bien.tokensDispo === 0 ? "#9CA3AF" : "#0891B2";

        const svgIcon = L.divIcon({
          html: `
            <div style="
              width: 36px; height: 36px;
              background: ${color};
              border: 3px solid white;
              border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              font-weight: 700; font-size: 13px; color: white;
              box-shadow: 0 2px 8px rgba(0,0,0,.3);
              cursor: pointer;
              font-family: system-ui;
            ">${bien.id}</div>
          `,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20],
        });

        const marker = L.marker(
          [bien.coordonnees.lat, bien.coordonnees.lng],
          { icon: svgIcon }
        ).addTo(map);

        const popupContent = `
          <div style="font-family: system-ui; min-width: 200px;">
            <div style="color: #0891B2; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">${bien.type}</div>
            <div style="color: #111827; font-size: 14px; font-weight: 700; margin-bottom: 2px;">${bien.nom}</div>
            <div style="color: #4B5563; font-size: 11px; margin-bottom: 8px;">${bien.ile} · ${bien.region}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #E5E7EB;">
              <span style="color: #0891B2; font-size: 14px; font-weight: 700;">${bien.rendementBrut}</span>
              <span style="color: #9CA3AF; font-size: 11px;">${bien.prixToken}€/token</span>
            </div>
            <div style="margin-top: 8px;">
              <div style="background: #E5E7EB; border-radius: 4px; height: 4px;">
                <div style="background: ${bien.tokensDispo === 0 ? "#9CA3AF" : "#0891B2"}; height: 100%; border-radius: 4px; width: ${Math.round(((bien.tokensTotal - bien.tokensDispo) / bien.tokensTotal) * 100)}%;"></div>
              </div>
              <div style="font-size: 10px; color: #6B7280; margin-top: 3px;">${bien.tokensDispo === 0 ? "Complet" : `${bien.tokensDispo} tokens disponibles`}</div>
            </div>
            <button
              onclick="document.getElementById('selection').scrollIntoView({behavior:'smooth'}); window.dispatchEvent(new CustomEvent('filtreRegion', {detail: '${bien.ile}'}))"
              style="
                width: 100%; margin-top: 10px; padding: 8px;
                background: #0891B2; color: white; border: none;
                border-radius: 6px; font-size: 12px; font-weight: 600;
                cursor: pointer;
              "
            >
              Voir ce bien →
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 240 });

        marker.on("click", () => {
          onBienClick(bien);
        });
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mapInstanceRef.current) return;
  }, [biens]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div
        ref={mapRef}
        style={{
          height: "420px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          border: "0.5px solid #E5E7EB",
          zIndex: 1,
        }}
      />
    </>
  );
}
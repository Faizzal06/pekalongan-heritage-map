"use client";

import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface Location {
  id: string;
  nama: string;
  kategori: string;
  koordinat: { lat: number; lng: number };
  foto_utama: string;
  deskripsi_singkat: string;
}

interface MapContainerProps {
  locations: Location[];
  selectedLocationId: string | null;
  onSelectLocation: (id: string | null) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  museum: "#1A3A6B",
  "kampung-batik": "#B5292B",
  "bangunan-kolonial": "#6B6B6B",
  "tempat-religi": "#1A6B3A",
  "kuliner-legendaris": "#D4600A",
  "hidden-gems": "#6B1A6B",
};

const CATEGORY_LABELS: Record<string, string> = {
  museum: "MUSEUM",
  "kampung-batik": "KAMPUNG BATIK",
  "bangunan-kolonial": "BANGUNAN KOLONIAL",
  "tempat-religi": "TEMPAT RELIGI",
  "kuliner-legendaris": "KULINER LEGENDARIS",
  "hidden-gems": "HIDDEN GEMS",
};

function createCustomIcon(kategori: string) {
  const color = CATEGORY_COLORS[kategori] || "#6B6B6B";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44">
      <defs>
        <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="${color}" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 28 16 28s16-16 16-28C32 7.163 24.837 0 16 0z" 
            fill="${color}" filter="url(#shadow)"/>
      <circle cx="16" cy="16" r="7" fill="white" opacity="0.9"/>
      <circle cx="16" cy="16" r="4" fill="${color}"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "heritage-marker",
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -44],
  });
}

function FlyToLocation({ location }: { location: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.koordinat.lat, location.koordinat.lng], 16, {
        duration: 1,
      });
    }
  }, [location, map]);
  return null;
}

function LocationMarker({ loc, isSelected, onSelectLocation }: { loc: Location; isSelected: boolean; onSelectLocation: (id: string) => void }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[loc.koordinat.lat, loc.koordinat.lng]}
      icon={createCustomIcon(loc.kategori)}
      eventHandlers={{
        click: () => onSelectLocation(loc.id),
      }}
    >
      <Popup>
        <div className="w-[280px] font-body">
          {/* Image */}
          <div className="w-full h-[140px] bg-surface-container-high relative overflow-hidden">
            {loc.foto_utama && <img src={loc.foto_utama} alt={loc.nama} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
            <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-display text-lg font-bold text-primary mb-1">
              {loc.nama}
            </h3>

            <span
              className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] uppercase rounded text-white mb-3"
              style={{ backgroundColor: CATEGORY_COLORS[loc.kategori] }}
            >
              {CATEGORY_LABELS[loc.kategori]}
            </span>

            <div className="flex gap-2 mt-2">
              <Link
                href={`/tempat/${loc.id}`}
                className="flex-1 text-center py-2 bg-batik-red text-white text-sm font-semibold rounded-lg hover:bg-batik-red/90 transition-colors"
              >
                Lihat Detail
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.koordinat.lat},${loc.koordinat.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 border-2 border-batik-gold text-primary text-sm font-semibold rounded-lg hover:bg-batik-gold/10 transition-colors flex items-center justify-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default function MapContainerComponent({
  locations,
  selectedLocationId,
  onSelectLocation,
}: MapContainerProps) {
  const selectedLocation = locations.find((l) => l.id === selectedLocationId) || null;

  return (
    <LeafletMap
      center={[-6.889, 109.675]}
      zoom={14}
      className="w-full h-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToLocation location={selectedLocation} />

      {locations.map((loc) => (
        <LocationMarker
          key={loc.id}
          loc={loc}
          isSelected={loc.id === selectedLocationId}
          onSelectLocation={onSelectLocation}
        />
      ))}
    </LeafletMap>
  );
}


"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import MapSidebar from "@/components/map/MapSidebar";
import heritageLocationsId from "@/data/heritage-locations.json";
import heritageLocationsEn from "@/data/heritage-locations-en.json";
import { useLanguage } from "@/context/LanguageContext";

const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-surface-container">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-on-surface-variant font-medium">Memuat peta...</p>
      </div>
    </div>
  ),
});

export type Kategori =
  | "museum"
  | "kampung-batik"
  | "bangunan-kolonial"
  | "tempat-religi"
  | "kuliner-legendaris"
  | "hidden-gems";

const allKategori: Kategori[] = [
  "museum",
  "kampung-batik",
  "bangunan-kolonial",
  "tempat-religi",
  "kuliner-legendaris",
  "hidden-gems",
];

export default function PetaPage() {
  const { language } = useLanguage();
  const heritageLocations = language === "en" ? heritageLocationsEn : heritageLocationsId;

  const [activeFilters, setActiveFilters] = useState<Set<Kategori>>(
    new Set(allKategori)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const gemId = params.get("gem");
      const locId = params.get("loc");
      const targetId = gemId || locId;
      if (targetId) {
        setSelectedLocationId(targetId);
      }
    }
  }, []);

  const toggleFilter = (kategori: Kategori) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(kategori)) {
        next.delete(kategori);
      } else {
        next.add(kategori);
      }
      return next;
    });
  };

  const filteredLocations = useMemo(() => {
    return heritageLocations.filter((loc) => {
      const matchesFilter = activeFilters.has(loc.kategori as Kategori);
      const matchesSearch =
        searchQuery === "" ||
        loc.nama.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilters, searchQuery]);

  return (
    <div className="flex h-[calc(100dvh-4rem)] relative overflow-hidden">
      {/* Sidebar */}
      <MapSidebar
        locations={filteredLocations}
        allLocations={heritageLocations}
        activeFilters={activeFilters}
        searchQuery={searchQuery}
        onToggleFilter={toggleFilter}
        onSearchChange={setSearchQuery}
        onSelectLocation={setSelectedLocationId}
        selectedLocationId={selectedLocationId}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Map */}
      <div className="flex-1 relative">
        {!isMobileSidebarOpen && (
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[400] md:hidden px-5 py-3 bg-surface text-primary shadow-heritage rounded-full border border-outline-variant/30 hover:bg-surface-container-high transition-colors flex items-center gap-2 font-medium"
            aria-label="Buka Menu Filter dan Lokasi"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span className="text-sm font-medium">Filter & Lokasi</span>
          </button>
        )}

        <MapContainer
          locations={filteredLocations}
          selectedLocationId={selectedLocationId}
          onSelectLocation={setSelectedLocationId}
        />
      </div>
    </div>
  );
}

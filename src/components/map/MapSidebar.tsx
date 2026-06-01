"use client";

import type { Kategori } from "@/app/peta/page";

interface Location {
  id: string;
  nama: string;
  kategori: string;
}

interface MapSidebarProps {
  locations: Location[];
  allLocations: Location[];
  activeFilters: Set<Kategori>;
  searchQuery: string;
  onToggleFilter: (k: Kategori) => void;
  onSearchChange: (q: string) => void;
  onSelectLocation: (id: string) => void;
  selectedLocationId: string | null;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const KATEGORI_INFO: { key: Kategori; label: string; color: string }[] = [
  { key: "museum", label: "Museum", color: "#1A3A6B" },
  { key: "kampung-batik", label: "Kampung Batik", color: "#B5292B" },
  { key: "bangunan-kolonial", label: "Bangunan Kolonial", color: "#6B6B6B" },
  { key: "tempat-religi", label: "Tempat Religi", color: "#1A6B3A" },
  { key: "kuliner-legendaris", label: "Kuliner Legendaris", color: "#D4600A" },
  { key: "hidden-gems", label: "Hidden Gems", color: "#6B1A6B" },
];

const KATEGORI_LABELS: Record<string, string> = {
  museum: "MUSEUM",
  "kampung-batik": "KAMPUNG BATIK",
  "bangunan-kolonial": "BANGUNAN KOLONIAL",
  "tempat-religi": "TEMPAT RELIGI",
  "kuliner-legendaris": "KULINER LEGENDARIS",
  "hidden-gems": "HIDDEN GEMS",
};

const KATEGORI_COLORS: Record<string, string> = {
  museum: "#1A3A6B",
  "kampung-batik": "#B5292B",
  "bangunan-kolonial": "#6B6B6B",
  "tempat-religi": "#1A6B3A",
  "kuliner-legendaris": "#D4600A",
  "hidden-gems": "#6B1A6B",
};

export default function MapSidebar({
  locations,
  activeFilters,
  searchQuery,
  onToggleFilter,
  onSearchChange,
  onSelectLocation,
  selectedLocationId,
  isOpenMobile,
  onCloseMobile,
}: MapSidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="absolute inset-0 z-40 bg-black/50 md:hidden"
          onClick={onCloseMobile}
        />
      )}
      
      <aside className={`
        absolute md:static top-0 left-0 bottom-0 z-50
        w-[85vw] max-w-[320px] lg:w-[380px] 
        ${isOpenMobile ? "flex" : "hidden"} md:flex 
        flex-col bg-surface border-r border-outline-variant/30 h-full
        transform transition-transform duration-300 ease-in-out
        ${isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
      {/* Search */}
      <div className="p-5 md:p-6 border-b border-outline-variant/20 flex flex-col gap-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <h2 className="font-display font-bold text-lg text-primary">Filter & Lokasi</h2>
          <button onClick={onCloseMobile} className="p-2 -mr-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container-high transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-batik-gold/50 focus:border-batik-gold transition-all placeholder:text-outline"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="p-5 md:p-6 border-b border-outline-variant/20">
        <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-on-surface-variant font-medium mb-3">
          Filter Kategori
        </h3>
        <div className="space-y-2">
          {KATEGORI_INFO.map((k) => (
            <label
              key={k.key}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={activeFilters.has(k.key)}
                onChange={() => onToggleFilter(k.key)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  activeFilters.has(k.key)
                    ? "border-transparent"
                    : "border-outline-variant bg-white"
                }`}
                style={
                  activeFilters.has(k.key)
                    ? { backgroundColor: k.color, borderColor: k.color }
                    : undefined
                }
              >
                {activeFilters.has(k.key) && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: k.color }}
              />
              <span className="text-sm text-on-surface group-hover:text-primary transition-colors">
                {k.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-5 pt-5 pb-3">
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-on-surface-variant">
            {locations.length} Lokasi
          </span>
        </div>
        <div className="px-3 md:px-4 pb-6">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc.id)}
              className={`w-full text-left px-4 py-3.5 rounded-xl transition-all hover:bg-surface-container-high group ${
                selectedLocationId === loc.id
                  ? "bg-surface-container-high"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{
                    backgroundColor: KATEGORI_COLORS[loc.kategori],
                  }}
                />
                <div>
                  <p
                    className={`text-sm font-semibold group-hover:text-primary transition-colors ${
                      selectedLocationId === loc.id
                        ? "text-primary"
                        : "text-on-surface"
                    }`}
                  >
                    {loc.nama}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-on-surface-variant mt-0.5">
                    {KATEGORI_LABELS[loc.kategori]}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
    </>
  );
}


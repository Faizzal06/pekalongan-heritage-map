"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Location {
  id: string;
  nama: string;
  kategori: string;
  koordinat: { lat: number; lng: number };
  foto_utama: string;
  galeri: string[];
  tahun_berdiri: string;
  jam_buka: string;
  harga_tiket: string;
  sejarah: string;
  cerita_budaya: string;
  alamat: string;
  deskripsi_singkat: string;
}

const KATEGORI_LABELS: Record<string, string> = {
  museum: "Museum",
  "kampung-batik": "Kampung Batik",
  "bangunan-kolonial": "Bangunan Kolonial",
  "tempat-religi": "Tempat Religi",
  "kuliner-legendaris": "Kuliner Legendaris",
  "hidden-gems": "Hidden Gems",
};

const KATEGORI_COLORS: Record<string, string> = {
  museum: "#1A3A6B",
  "kampung-batik": "#B5292B",
  "bangunan-kolonial": "#6B6B6B",
  "tempat-religi": "#1A6B3A",
  "kuliner-legendaris": "#D4600A",
  "hidden-gems": "#6B1A6B",
};

export default function PlaceDetailClient({ location }: { location: Location }) {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="relative h-[300px] md:h-[400px] bg-surface-container-high overflow-hidden">
        {location.foto_utama && <img src={location.foto_utama} alt={location.nama} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }} />}
        <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30 z-0" style={{ display: location.foto_utama ? 'none' : 'flex' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {/* Back button */}
        <Link
          href="/peta"
          className="absolute top-4 left-4 z-10 glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-semibold text-primary hover:bg-white/80 transition-colors shadow-heritage"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Kembali
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-heritage-lg p-6 md:p-10"
        >
          {/* Category Badge */}
          <span
            className="inline-block px-3 py-1 text-xs font-bold tracking-[0.1em] uppercase rounded-full text-white mb-4"
            style={{ backgroundColor: KATEGORI_COLORS[location.kategori] }}
          >
            {KATEGORI_LABELS[location.kategori]}
          </span>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
            {location.nama}
          </h1>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <InfoCard
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              }
              label="Tahun Berdiri"
              value={location.tahun_berdiri}
            />
            <InfoCard
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              }
              label="Jam Buka"
              value={location.jam_buka}
            />
            <InfoCard
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              }
              label="Harga Tiket"
              value={location.harga_tiket}
            />
          </div>

          {/* Sejarah */}
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-primary mb-3">
              Sejarah
            </h2>
            <div className="text-on-surface-variant leading-relaxed whitespace-pre-line">
              {location.sejarah}
            </div>
          </section>

          {/* Cerita Budaya */}
          {location.cerita_budaya && (
            <section className="mb-8">
              <h2 className="font-display text-xl font-bold text-primary mb-3">
                Cerita Budaya
              </h2>
              <div className="text-on-surface-variant leading-relaxed italic border-l-4 border-batik-gold pl-4">
                {location.cerita_budaya}
              </div>
            </section>
          )}

          {/* Galeri Foto */}
          {location.galeri && location.galeri.length > 0 && (
            <section className="mb-8">
              <h2 className="font-display text-xl font-bold text-primary mb-3">
                Galeri Foto
              </h2>
              {/* Native scroll-snap gallery */}
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory custom-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                {location.galeri.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    className="relative w-[260px] md:w-[300px] h-[180px] md:h-[200px] shrink-0 rounded-2xl overflow-hidden snap-center shadow-sm bg-surface-container-high"
                  >
                    <img
                      src={imgUrl}
                      alt={`Galeri ${location.nama} ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover z-10"
                      onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }}
                    />
                    {/* Placeholder fallback underneath */}
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30 z-0" style={{ display: imgUrl ? 'none' : 'flex' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Alamat */}
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-primary mb-3">
              Alamat
            </h2>
            <p className="text-on-surface-variant">{location.alamat}</p>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location.koordinat.lat},${location.koordinat.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-heritage"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Buka di Google Maps
            </a>
            <Link
              href={`/peta?loc=${location.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-batik-gold text-primary font-semibold rounded-xl hover:bg-batik-gold/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              Lihat di Peta
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-surface-container-low rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-batik-gold">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold text-primary">{value}</p>
    </div>
  );
}


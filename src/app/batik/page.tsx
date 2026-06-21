"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import batikMotifsId from "@/data/batik-motifs.json";
import batikMotifsEn from "@/data/batik-motifs-en.json";
import { useLanguage } from "@/context/LanguageContext";

/* ─── types ─── */
interface BatikMotif {
  id: string;
  nama: string;
  pengaruh: string;
  foto: string;
  warna_utama: string;
  filosofi: string;
  deskripsi: string;
  ciri_khas: string;
  daerah_asal: string;
}


/* ─── filter categories ─── */
const FILTERS = ["Semua", "Arab", "Tionghoa", "Jawa", "Belanda"] as const;

/* ─── gradient map per influence for placeholder images ─── */
const gradientMap: Record<string, string> = {
  Arab: "from-batik-red/80 via-batik-gold/60 to-primary/70",
  Tionghoa: "from-red-500/70 via-amber-400/50 to-rose-600/60",
  Jawa: "from-primary/80 via-batik-gold/50 to-secondary/60",
  Belanda: "from-deep-navy/70 via-tertiary/50 to-batik-gold/40",
};

/* ─── animation variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 26, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 24,
    transition: { duration: 0.2 },
  },
};

/* ══════════════════════════════════════════════════════
   Batik Detail Modal
   ══════════════════════════════════════════════════════ */
function BatikDetailModal({
  motif,
  onClose,
  t
}: {
  motif: BatikMotif;
  onClose: () => void;
  t: (key: string) => string;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={modalOverlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* modal panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl rounded-3xl bg-white shadow-heritage-active overflow-hidden max-h-[90vh] flex flex-col"
        variants={modalContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* ── image area ── */}
        <div className="relative h-[260px] md:h-[320px] shrink-0">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientMap[motif.pengaruh] ?? "from-primary/70 to-batik-gold/50"}`}
          />
          {motif.foto && <img src={motif.foto} alt={motif.nama} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }} />}
          <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30 z-0" style={{ display: motif.foto ? 'none' : 'flex' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          {/* decorative pattern */}
          <div
            className="absolute inset-0 opacity-10 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M20 0l10 20-10 20L10 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <span className="absolute bottom-4 left-6 font-display text-white text-lg font-bold drop-shadow-lg">
            {motif.nama}
          </span>

          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── content ── */}
        <div className="overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
          {/* title */}
          <h2 className="font-display text-2xl font-bold text-primary">
            {motif.nama}
          </h2>

          {/* meta grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                {t("batik.influence")}
              </span>
              <p className="font-semibold text-primary mt-0.5">
                {motif.pengaruh}
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
                {t("batik.main_color")}
              </span>
              <p className="font-semibold text-primary mt-0.5">
                {motif.warna_utama}
              </p>
            </div>
          </div>

          {/* filosofi */}
          <div>
            <h3 className="font-display text-lg font-bold text-primary mb-2">
              {t("batik.philosophy")}
            </h3>
            <p className="italic text-batik-gold leading-relaxed">
              &ldquo;{motif.filosofi}&rdquo;
            </p>
          </div>

          {/* deskripsi */}
          <p className="text-on-surface-variant leading-relaxed">
            {motif.deskripsi}
          </p>

          {/* ciri khas */}
          <div className="flex flex-wrap gap-2">
            {motif.ciri_khas.split(", ").map((ciri) => (
              <span
                key={ciri}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant"
              >
                {ciri}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   Batik Explorer Page
   ══════════════════════════════════════════════════════ */
export default function BatikPage() {
  const { language, t } = useLanguage();
  const motifs: BatikMotif[] = (language === "en" ? batikMotifsEn : batikMotifsId) as BatikMotif[];

  const FILTERS = [t("batik.all"), "Arab", "Tionghoa", "Jawa", "Belanda"] as const;

  const [activeFilter, setActiveFilter] = useState<string>(FILTERS[0]);
  const [selectedMotif, setSelectedMotif] = useState<BatikMotif | null>(null);

  const filtered =
    activeFilter === t("batik.all")
      ? motifs
      : motifs.filter((m) => m.pengaruh === activeFilter);

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero header ── */}
      <section className="px-4 md:px-8 pt-12 pb-6 max-w-3xl mx-auto text-center">
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("batik.title1")}
          <span className="text-batik-red">{t("batik.title2")}</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-on-surface-variant text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("batik.subtitle")}
        </motion.p>
      </section>

      {/* ── Filter chips ── */}
      <section className="px-4 md:px-8 max-w-3xl mx-auto">
        <motion.div
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-batik-red text-white shadow-md"
                    : "border border-outline-variant bg-white text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* ── Card list ── */}
      <section className="px-4 md:px-8 py-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((motif, i) => (
            <motion.article
              key={motif.id}
              layout
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedMotif(motif)}
              className="rounded-2xl shadow-heritage overflow-hidden bg-white cursor-pointer transition-shadow hover:shadow-heritage-lg"
            >
              {/* image area */}
              <div className="relative h-[220px] md:h-[300px]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradientMap[motif.pengaruh] ?? "from-primary/70 to-batik-gold/50"}`}
                />
                {motif.foto && <img src={motif.foto} alt={motif.nama} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }} />}
                <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30 z-0" style={{ display: motif.foto ? 'none' : 'flex' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                {/* decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10 z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M20 0l10 20-10 20L10 20z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* category badge */}
                <span className="absolute top-4 right-4 bg-batik-red text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {motif.pengaruh}
                </span>
              </div>

              {/* card body */}
              <div className="p-5 md:p-6">
                <h2 className="font-display text-lg font-bold text-primary">
                  {motif.nama}
                </h2>
                <p className="mt-2 text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                  {motif.deskripsi}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.p
            className="text-center text-on-surface-variant py-16 md:col-span-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Tidak ada motif ditemukan untuk filter ini.
          </motion.p>
        )}
      </section>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedMotif && (
          <BatikDetailModal
            motif={selectedMotif}
            onClose={() => setSelectedMotif(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


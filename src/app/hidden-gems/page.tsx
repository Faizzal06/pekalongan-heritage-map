"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import hiddenGems from "@/data/hidden-gems.json";

/* ─── types ─── */
interface HiddenGem {
  id: string;
  nama: string;
  foto: string;
  deskripsi: string;
  tips: string;
  koordinat: { lat: number; lng: number };
}

const gems: HiddenGem[] = hiddenGems as HiddenGem[];

/* ─── gradient palette per index ─── */
const gradients = [
  "from-pin-hidden-gems/70 via-purple-400/50 to-pin-hidden-gems/40",
  "from-deep-navy/60 via-pin-hidden-gems/40 to-purple-500/50",
  "from-batik-gold/60 via-pin-kuliner/40 to-pin-hidden-gems/30",
  "from-pin-religi/50 via-pin-hidden-gems/40 to-deep-navy/40",
  "from-pin-hidden-gems/60 via-batik-red/30 to-deep-navy/50",
];

/* ─── animation variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/* ══════════════════════════════════════════════════════
   Hidden Gems Page
   ══════════════════════════════════════════════════════ */
export default function HiddenGemsPage() {
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
          Hidden Gems{" "}
          <span className="text-pin-hidden-gems">Pekalongan</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-on-surface-variant text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tempat-tempat tersembunyi yang wajib dikunjungi
        </motion.p>
      </section>

      {/* ── Card list ── */}
      <motion.section
        className="px-4 md:px-8 py-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gems.map((gem, i) => (
          <motion.article
            key={gem.id}
            variants={cardVariants}
            className="rounded-2xl overflow-hidden shadow-heritage bg-white"
          >
            {/* ── image area ── */}
            <div className="relative h-[220px] md:h-[260px]">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`}
              />
              {/* subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* gem badge */}
              <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-pin-hidden-gems flex items-center justify-center text-xl shadow-lg">
                💎
              </span>
            </div>

            {/* ── content ── */}
            <div className="p-5 md:p-6 space-y-4">
              {/* name */}
              <h2 className="font-display text-xl font-bold text-primary">
                {gem.nama}
              </h2>

              {/* description */}
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {gem.deskripsi}
              </p>

              {/* tips box */}
              <div className="border border-outline-variant/60 rounded-xl p-4 bg-surface-container-lowest">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg" role="img" aria-label="tips">
                    💡
                  </span>
                  <span className="font-bold text-batik-red text-sm uppercase tracking-wide">
                    Tips
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {gem.tips}
                </p>
              </div>

              {/* CTA button */}
              <Link
                href={`/peta?lat=${gem.koordinat.lat}&lng=${gem.koordinat.lng}&gem=${gem.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-pin-hidden-gems text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Lihat di Peta
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.section>
    </div>
  );
}


"use client";

import { motion } from "framer-motion";
import eventsData from "@/data/events.json";

interface EventItem {
  id: string;
  nama: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  foto: string;
  deskripsi: string;
}

const events: EventItem[] = eventsData;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function CategoryIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-outline-variant/60"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function EventsGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-14 md:mb-18"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
            Acara & Festival
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
            Kalender acara dan festival budaya yang mewarnai kehidupan Kota
            Pekalongan sepanjang tahun
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {events.map((event) => (
            <motion.article
              key={event.id}
              variants={cardVariants}
              className="rounded-3xl shadow-heritage overflow-hidden bg-white"
            >
              {/* Image placeholder area */}
              <div className="relative h-[240px] bg-surface-container-high flex items-center justify-center overflow-hidden">
                {event.foto && <img src={event.foto} alt={event.nama} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'; }} />}
                <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/30 z-0" style={{ display: event.foto ? 'none' : 'flex' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                {/* Subtle pattern background */}
                <div
                  className="absolute inset-0 opacity-[0.04] z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23421e04' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l2 3-2 3zm0-9V9H0V7h20V5l2 3-2 3z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-batik-red text-white text-xs font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-lg">
                  {event.kategori}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h2 className="font-display text-xl md:text-2xl font-bold text-primary mb-4">
                  {event.nama}
                </h2>

                <div className="space-y-4 mb-5">
                  {/* Date */}
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-on-surface-variant font-medium flex items-center gap-1.5 mb-1">
                      <CalendarIcon />
                      TANGGAL
                    </span>
                    <p className="text-sm text-on-surface-variant pl-6">
                      {event.tanggal}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-on-surface-variant font-medium flex items-center gap-1.5 mb-1">
                      <PinIcon />
                      LOKASI
                    </span>
                    <p className="text-sm text-on-surface-variant pl-6">
                      {event.lokasi}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {event.deskripsi}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


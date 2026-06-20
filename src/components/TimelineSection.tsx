"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import timelineData from "@/data/timeline.json";

interface TimelineItem {
  id: string;
  era: string;
  judul: string;
  periode: string;
  deskripsi: string;
  highlight: string;
  image?: string;
}

const items: TimelineItem[] = timelineData;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function TimelineSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
            Perjalanan Sejarah Pekalongan
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl mx-auto">
            Dari Pelabuhan Dagang hingga Kota Batik Dunia
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gold gradient line */}
          <div className="timeline-line" aria-hidden="true" />

          <div className="flex flex-col gap-10 md:gap-14">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative pl-14 md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="timeline-dot"
                  aria-hidden="true"
                />

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-heritage p-6 md:p-8">
                  {/* Image */}
                  {item.image && (
                    <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={item.image}
                        alt={item.judul}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Era label */}
                  <span className="font-mono text-xs tracking-[0.15em] uppercase text-batik-gold font-medium">
                    {item.era}
                  </span>

                  {/* Title + Period badge */}
                  <div className="flex flex-wrap items-center gap-3 mt-2 mb-3">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-primary">
                      {item.judul}
                    </h2>
                    <span className="inline-block bg-batik-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.periode}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-on-surface-variant leading-relaxed mb-4">
                    {item.deskripsi}
                  </p>

                  {/* Highlight */}
                  <div className="border-l-3 border-batik-red pl-4">
                    <p className="text-batik-red italic text-sm leading-relaxed">
                      {item.highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


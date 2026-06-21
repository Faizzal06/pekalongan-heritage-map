"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const getNavItems = (t: (key: string) => string) => [
  { href: "/peta", label: t("nav.peta") },
  { href: "/sejarah", label: t("nav.sejarah") },
  { href: "/batik", label: t("nav.batik") },
  { href: "/acara", label: t("nav.acara") },
  { href: "/hidden-gems", label: t("nav.hidden-gems") },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const navItems = getNavItems(t);

  return (
    <nav className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
              Pekalongan
            </span>
            <span className="font-mono text-[10px] md:text-xs text-on-surface-variant tracking-[0.2em] uppercase mt-1">
              Heritage Map
            </span>
          </div>
          <Image
            src="/canting.png"
            alt="Canting Icon"
            width={32}
            height={32}
            className="group-hover:-rotate-12 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-batik-red text-white shadow-md"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Language Badge + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className="text-sm font-bold border-2 border-on-surface px-3 py-1 rounded-md select-none hover:bg-on-surface hover:text-surface transition-colors cursor-pointer"
            aria-label="Toggle Language"
          >
            {language.toUpperCase()}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="md:hidden overflow-hidden border-t border-outline-variant/30"
          >
            <div className="px-4 py-4 flex flex-col gap-2 bg-surface">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-batik-red text-white"
                        : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


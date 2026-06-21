"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const dictionaries = {
  id: {
    // Navbar
    "nav.peta": "Peta",
    "nav.sejarah": "Sejarah",
    "nav.batik": "Batik",
    "nav.acara": "Acara",
    "nav.hidden-gems": "Hidden Gems",
    // Homepage
    "home.subtitle": "Jelajahi kekayaan warisan budaya Kota Batik melalui peta interaktif. Temukan museum, kampung batik, kuliner legendaris, dan hidden gems.",
    "home.cta.start": "Mulai Jelajah",
    "home.cta.history": "Lihat Sejarah",
    "home.stats.locations": "Lokasi Heritage",
    "home.stats.categories": "Kategori",
    "home.stats.motifs": "Motif Batik",
    // UI Common
    "ui.back": "Kembali",
    "ui.see_on_map": "Lihat di Peta",
    "ui.open_gmaps": "Buka di Google Maps",
    // Batik
    "batik.title1": "Ensiklopedia Batik ",
    "batik.title2": "Pekalongan",
    "batik.subtitle": "Motif-motif khas yang mencerminkan keberagaman budaya pesisir utara Jawa",
    "batik.influence": "Pengaruh",
    "batik.main_color": "Warna Utama",
    "batik.philosophy": "Filosofi",
    "batik.all": "Semua",
    // Events
    "events.title": "Acara & Festival",
    "events.subtitle": "Kalender acara dan festival budaya yang mewarnai kehidupan Kota Pekalongan sepanjang tahun",
    "events.date": "TANGGAL",
    "events.location": "LOKASI",
    // Hidden Gems
    "gems.title1": "Hidden Gems ",
    "gems.title2": "Pekalongan",
    "gems.subtitle": "Tempat-tempat tersembunyi yang wajib dikunjungi",
    "gems.tips": "Tips",
    // Place Detail
    "place.established": "Tahun Berdiri",
    "place.open_hours": "Jam Buka",
    "place.ticket": "Harga Tiket",
    "place.history": "Sejarah",
    "place.culture": "Cerita Budaya",
    "place.gallery": "Galeri Foto",
    "place.address": "Alamat",
  },
  en: {
    // Navbar
    "nav.peta": "Map",
    "nav.sejarah": "History",
    "nav.batik": "Batik",
    "nav.acara": "Events",
    "nav.hidden-gems": "Hidden Gems",
    // Homepage
    "home.subtitle": "Explore the rich cultural heritage of the Batik City through an interactive map. Discover museums, batik villages, legendary culinary spots, and hidden gems.",
    "home.cta.start": "Start Exploring",
    "home.cta.history": "View History",
    "home.stats.locations": "Heritage Locations",
    "home.stats.categories": "Categories",
    "home.stats.motifs": "Batik Motifs",
    // UI Common
    "ui.back": "Back",
    "ui.see_on_map": "View on Map",
    "ui.open_gmaps": "Open in Google Maps",
    // Batik
    "batik.title1": "Batik Encyclopedia ",
    "batik.title2": "of Pekalongan",
    "batik.subtitle": "Distinctive motifs reflecting the cultural diversity of Java's northern coast",
    "batik.influence": "Influence",
    "batik.main_color": "Main Color",
    "batik.philosophy": "Philosophy",
    "batik.all": "All",
    // Events
    "events.title": "Events & Festivals",
    "events.subtitle": "Calendar of cultural events and festivals coloring the life of Pekalongan City throughout the year",
    "events.date": "DATE",
    "events.location": "LOCATION",
    // Hidden Gems
    "gems.title1": "Hidden Gems ",
    "gems.title2": "of Pekalongan",
    "gems.subtitle": "Hidden spots you must visit",
    "gems.tips": "Tips",
    // Place Detail
    "place.established": "Established",
    "place.open_hours": "Opening Hours",
    "place.ticket": "Ticket Price",
    "place.history": "History",
    "place.culture": "Cultural Story",
    "place.gallery": "Photo Gallery",
    "place.address": "Address",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from local storage if available
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    const dict = dictionaries[language];
    return (dict as any)[key] || key;
  };

  // Prevent hydration mismatch by not rendering until mounted
  // or return children directly but accept that first render will be 'id'
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div key={language} className="contents">
         {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

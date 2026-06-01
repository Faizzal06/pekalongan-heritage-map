import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 md:py-20 flex flex-col justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23421e04' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary-container/20 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-batik-red/5 blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Overline */}
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-on-surface-variant mb-4 animate-fade-in-up">
          UNESCO Creative City of Craft and Folk Art
        </p>

        {/* Main Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold text-primary leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Pekalongan
          <br />
          <span className="text-batik-red">Heritage</span> Map
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-10 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Jelajahi kekayaan warisan budaya Kota Batik melalui peta interaktif.
          Temukan museum, kampung batik, kuliner legendaris, dan hidden gems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/peta"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-semibold rounded-2xl shadow-heritage-lg hover:shadow-heritage-active transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            Mulai Jelajah
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link
            href="/sejarah"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary/20 text-primary font-semibold rounded-2xl hover:bg-primary/5 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Lihat Sejarah
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          {[
            { value: "26+", label: "Lokasi Heritage" },
            { value: "6", label: "Kategori" },
            { value: "6", label: "Motif Batik" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-batik-red">
                {stat.value}
              </div>
              <div className="text-xs text-on-surface-variant mt-1 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


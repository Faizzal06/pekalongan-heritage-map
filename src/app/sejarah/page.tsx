import type { Metadata } from "next";
import TimelineSection from "@/components/TimelineSection";

export const metadata: Metadata = {
  title: "Sejarah Pekalongan",
  description:
    "Perjalanan sejarah Kota Pekalongan dari pelabuhan dagang abad ke-14 hingga menjadi Kota Batik Dunia. Jelajahi 6 era penting dalam timeline interaktif.",
};

export default function SejarahPage() {
  return (
    <div className="min-h-screen bg-surface">
      <TimelineSection />
    </div>
  );
}

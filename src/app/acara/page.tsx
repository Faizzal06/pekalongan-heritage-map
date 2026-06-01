import type { Metadata } from "next";
import EventsGrid from "@/components/EventsGrid";

export const metadata: Metadata = {
  title: "Acara & Festival",
  description:
    "Kalender acara dan festival budaya Pekalongan. Pekan Batik Internasional, Kirab Budaya, Syawalan Krapyak, dan perayaan tradisional lainnya.",
};

export default function AcaraPage() {
  return (
    <div className="min-h-screen bg-surface">
      <EventsGrid />
    </div>
  );
}

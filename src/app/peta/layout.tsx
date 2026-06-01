import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Interaktif",
  description:
    "Jelajahi peta interaktif warisan budaya Pekalongan. Temukan museum, kampung batik, bangunan kolonial, tempat religi, kuliner legendaris, dan hidden gems.",
};

export default function PetaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

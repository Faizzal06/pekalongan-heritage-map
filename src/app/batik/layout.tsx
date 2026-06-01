import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batik Explorer",
  description:
    "Ensiklopedia interaktif motif batik khas Pekalongan. Jelajahi motif Jlamprang, Encim, Pesisiran, Buketan, Terang Bulan, dan Liong beserta filosofinya.",
};

export default function BatikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

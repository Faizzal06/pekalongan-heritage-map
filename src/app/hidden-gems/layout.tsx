import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hidden Gems",
  description:
    "Temukan hidden gems Pekalongan — tempat-tempat tersembunyi yang jarang diketahui wisatawan. Kampung batik autentik, gang mural, warung legendaris.",
};

export default function HiddenGemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

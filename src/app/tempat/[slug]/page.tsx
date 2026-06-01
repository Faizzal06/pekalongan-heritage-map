import { notFound } from "next/navigation";
import type { Metadata } from "next";
import heritageLocations from "@/data/heritage-locations.json";
import PlaceDetailClient from "@/components/detail/PlaceDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return heritageLocations.map((loc) => ({
    slug: loc.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = heritageLocations.find((loc) => loc.id === slug);
  if (!location) return { title: "Tidak Ditemukan" };

  return {
    title: location.nama,
    description: location.deskripsi_singkat,
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const location = heritageLocations.find((loc) => loc.id === slug);

  if (!location) {
    notFound();
  }

  return <PlaceDetailClient location={location} />;
}

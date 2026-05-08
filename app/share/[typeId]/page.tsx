import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSoulType, SOUL_TYPES } from "@/data/soulTypes";

interface PageProps {
  params: { typeId: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://soul-mission.example.com";

export async function generateStaticParams() {
  return SOUL_TYPES.map((t) => ({ typeId: t.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const type = getSoulType(params.typeId);
  if (!type) return {};
  const title = `私のソウルミッションは「${type.name}」でした | 穴口恵子`;
  const description = type.essence;
  const ogImage = `${SITE_URL}/api/og/${type.id}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      url: `${SITE_URL}/share/${type.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function SharePage({ params }: PageProps) {
  const type = getSoulType(params.typeId);
  if (!type) notFound();
  // SNSクローラー以外は診断トップへ送る。
  redirect(`/result/${type.id}`);
}

import type { MetadataRoute } from "next";
import { SOUL_TYPES } from "@/data/soulTypes";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://soul-mission.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/register`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
  const questionEntries: MetadataRoute.Sitemap = Array.from({ length: 5 }, (_, i) => ({
    url: `${SITE}/question/${i + 1}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.4,
  }));
  const resultEntries: MetadataRoute.Sitemap = SOUL_TYPES.flatMap((t) => [
    { url: `${SITE}/result/${t.id}`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/share/${t.id}`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ]);
  return [...staticEntries, ...questionEntries, ...resultEntries];
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://future-professional-profiles.vercel.app/",
      lastModified: new Date("2026-09-02T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

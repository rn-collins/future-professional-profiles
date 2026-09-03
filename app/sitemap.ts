import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://future-professional-profiles.vercel.app/",
      lastModified: new Date("2026-09-02T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...(["mark", "sam"] as const).map((slug) => ({
      url: `https://future-professional-profiles.vercel.app/profiles/${slug}`,
      lastModified: new Date("2026-09-02T00:00:00.000Z"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: "https://future-professional-profiles.vercel.app/intelligence",
      lastModified: new Date("2026-09-03T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://future-professional-profiles.vercel.app/corrections",
      lastModified: new Date("2026-09-03T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

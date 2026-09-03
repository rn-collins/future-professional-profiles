import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Future Professional Profiles — RN Studio",
    short_name: "RN Profiles",
    description:
      "Evidence-led professional presence and content strategy concepts.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#f4f2ee",
    theme_color: "#123b4c",
    lang: "en-US",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icons/rn-profile-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/rn-profile-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/rn-profile-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

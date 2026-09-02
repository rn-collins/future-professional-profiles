import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Future Professional Profiles — RN Studio",
    short_name: "RN Profiles",
    description:
      "Evidence-led professional presence and content strategy concepts.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2ee",
    theme_color: "#123b4c",
  };
}

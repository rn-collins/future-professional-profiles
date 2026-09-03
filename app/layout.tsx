import type { Metadata } from "next";
import SiteTelemetry from "./components/SiteTelemetry";
import "./globals.css";

const siteUrl = "https://future-professional-profiles.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Future Professional Profiles — RN Studio",
    template: "%s — RN Studio",
  },
  description:
    "Evidence-led professional presence concepts for Mark H. Young and Samuel Wolff, created by RN Studio.",
  applicationName: "Future Professional Profiles",
  keywords: [
    "professional presence strategy",
    "content strategy Hawaiʻi",
    "personal brand strategy",
    "Mark H. Young",
    "Samuel Wolff",
    "RN Studio",
  ],
  authors: [{ name: "RN Studio" }],
  creator: "RN Studio",
  publisher: "RN Studio",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icons/rn-profile-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/rn-profile-192.png", sizes: "192x192", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Future Professional Profiles — RN Studio",
    description:
      "Two evidence-led demonstrations of what strategic professional presence can become.",
    siteName: "RN Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Future Professional Profiles by RN Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Professional Profiles — RN Studio",
    description:
      "Evidence-led professional presence and content strategy concepts.",
    images: ["/opengraph-image"],
  },
  category: "business",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Future Professional Profiles",
    url: siteUrl,
    creator: { "@type": "Organization", name: "RN Studio" },
    description:
      "Profile and publishing concepts prepared by RN Studio from public sources.",
    about: ["content strategy", "professional presence", "brand strategy"],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteTelemetry />
      </body>
    </html>
  );
}

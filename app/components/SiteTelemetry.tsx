"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function SiteTelemetry() {
  const pathname = usePathname();

  if (pathname.startsWith("/for-mark")) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

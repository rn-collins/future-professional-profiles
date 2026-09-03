"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  ["/", "Profiles"],
  ["/strategy-lab", "Strategy lab"],
  ["/studio", "Content studio"],
  ["/workspace", "Workspace"],
  ["/opportunities", "Opportunities"],
  ["/intelligence", "Evidence"],
  ["/provenance", "Provenance"],
  ["/engage", "Work together"],
] as const;

export default function ProductNavigation({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav className={className} aria-label="Product navigation">
      {destinations.map(([href, label]) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
      ))}
    </nav>
  );
}

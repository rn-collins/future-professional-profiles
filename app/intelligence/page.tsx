import type { Metadata } from "next";
import Link from "next/link";
import IntelligenceConsole from "../components/IntelligenceConsole";
import ProductNavigation from "../components/ProductNavigation";
import { profiles } from "../data";
import { evidenceProfiles } from "../evidence";

export const metadata: Metadata = { title: "Profile Intelligence Console", description: "Search the public evidence, career records, audience strategy, and evidence-constrained content concepts behind two professional-presence dossiers.", alternates: { canonical: "/intelligence" } };

export default function IntelligencePage() {
  return <main className="intelPage">
    <nav className="briefNav" aria-label="Intelligence console navigation"><Link href="/">← Interactive profiles</Link><span>RN Studio · Research operating system</span></nav>
    <ProductNavigation className="productNav" />
    <header className="intelHero"><p className="sectionLabel">Evidence before assertion</p><h1>Profile Intelligence Console</h1><p>One searchable surface for the public record, career history, audience architecture, and proposed content behind both dossiers.</p></header>
    <aside className="intelBoundary"><strong>Evidence boundary</strong><p>Public sources and career records describe retrieved evidence. Audience strategies and content concepts are editorial proposals. Search results never convert a proposal into a verified event, endorsement, or outcome.</p></aside>
    <IntelligenceConsole profiles={Object.values(profiles)} ledgers={Object.values(evidenceProfiles)} />
  </main>;
}

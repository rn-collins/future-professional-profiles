import type { Metadata } from "next";
import Link from "next/link";
import StrategyStudio from "../components/StrategyStudio";
import ProductNavigation from "../components/ProductNavigation";

export const metadata: Metadata = {
  title: "Evidence Strategy Studio",
  description: "Ask the evidence ledger, trace strategy to proof, generate source-governed content, and operate a 90-day editorial system.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return <main className="studioPage">
    <nav className="briefNav" aria-label="Strategy studio navigation"><Link href="/">← Interactive profiles</Link><span><Link href="/intelligence">Research intelligence</Link> · RN Studio</span></nav>
    <ProductNavigation className="productNav" />
    <header className="studioHero"><p className="sectionLabel">From evidence to commercial editorial system</p><h1>The strategy is now executable.</h1><p>Interrogate the public record, inspect the logic connecting proof to positioning, commission evidence-constrained drafts, and move them through explicit publication gates.</p></header>
    <aside className="conceptBoundary"><strong>Demonstration boundary</strong><p>Outputs are independent RN Studio proposals. They are not subject-authored, commissioned, approved, published, or evidence of results. Every proposed output retains its evidence and human-review requirements.</p></aside>
    <StrategyStudio />
  </main>;
}

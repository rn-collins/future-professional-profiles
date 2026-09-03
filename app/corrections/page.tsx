import type { Metadata } from "next";
import Link from "next/link";
import ProductNavigation from "../components/ProductNavigation";

const issueUrl = "https://github.com/rn-collins/future-professional-profiles/issues/new?template=correction-or-takedown.md&title=Correction%20or%20takedown%20request";

export const metadata: Metadata = {
  title: "Corrections and takedown requests",
  description: "Request a factual correction, source update, image review, or takedown for Future Professional Profiles.",
  alternates: { canonical: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <main className="correctionsPage">
      <nav className="briefNav" aria-label="Corrections navigation">
        <Link href="/">← Future Professional Profiles</Link>
        <span>RN Studio · Evidence governance</span>
      </nav>
      <ProductNavigation className="productNav" />
      <header>
        <p className="sectionLabel">Corrections, rights, and removal</p>
        <h1>Tell us what needs to change.</h1>
        <p>
          These are independent speculative profile concepts assembled from public evidence. If a fact is wrong, a source has changed, an image raises a rights or privacy concern, or material should be removed, submit a documented request for review.
        </p>
      </header>
      <section>
        <h2>What to include</h2>
        <ul>
          <li>The profile, passage, image, or source URL at issue.</li>
          <li>The requested correction or removal and the reason.</li>
          <li>A public source supporting a factual correction, when available.</li>
          <li>Your relationship to the subject or material when requesting a rights-based takedown.</li>
        </ul>
        <p>Do not publish private identification, addresses, phone numbers, family details, or other sensitive information in an issue.</p>
        <a className="correctionAction" href={issueUrl} target="_blank" rel="noreferrer">Open a correction or takedown request ↗</a>
      </section>
      <section>
        <h2>Review boundary</h2>
        <p>
          A request begins review; it does not itself establish the requested factual conclusion. Clear image-rights, privacy, identity, and material factual issues should be prioritized. The public evidence ledger preserves qualifications and source dates so corrections can be evaluated without silently rewriting the record.
        </p>
      </section>
    </main>
  );
}

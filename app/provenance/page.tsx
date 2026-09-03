import type { Metadata } from "next";
import ProductNavigation from "../components/ProductNavigation";
import { confirmationQuestions, gapRecords, imageProvenance, provenanceMeta, provenanceRechecks } from "../provenance-intelligence";
import ProvenanceExplorer from "./ProvenanceExplorer";
import styles from "./provenance.module.css";

export const metadata: Metadata = {
  title: "Provenance & Claim Integrity | RN Studio",
  description: "The bounded source census, identity reconciliation, image-rights boundaries, unresolved gaps, and recheck policy behind two speculative professional profiles.",
  alternates: { canonical: "/provenance" },
};

export default function ProvenancePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand}><span aria-hidden="true">RN</span><strong>Future professional profiles</strong></a>
        <ProductNavigation className={styles.nav} />
      </header>
      <section className={styles.hero}>
        <p>PROVENANCE · CLAIM INTEGRITY · RIGHTS</p>
        <h1>What we know.<br />What we do not.</h1>
        <div className={styles.heroGrid}>
          <p>A public accountability surface for every identity match, claim boundary, stale record, missing proof, and image-use decision behind this speculative prototype.</p>
          <div role="note"><strong>Research boundary</strong>{provenanceMeta.scope} {provenanceMeta.completenessBoundary}</div>
        </div>
      </section>
      <ProvenanceExplorer gaps={gapRecords} images={imageProvenance} rechecks={provenanceRechecks} questions={confirmationQuestions} meta={provenanceMeta} />
    </main>
  );
}

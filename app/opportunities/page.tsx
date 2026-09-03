import type { Metadata } from "next";
import { getMonitoredSources, sourceMonitoringMeta } from "../source-monitoring";
import {
  audienceJourneys,
  audienceLanguageSignals,
  competitorSurfaces,
  intelligenceMeta,
  intelligenceSources,
  platformOpportunities,
  proofGaps,
  searchIntents,
  topicOpportunities,
} from "../market-intelligence";
import OpportunityExplorer from "./OpportunityExplorer";
import styles from "./opportunities.module.css";

export const metadata: Metadata = {
  title: "Opportunity Intelligence | RN Studio",
  description: "Evidence-controlled audience, search, competitor, proof-gap, and content-whitespace analysis for two speculative professional profiles.",
  alternates: { canonical: "/opportunities" },
};

export default function OpportunitiesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <a className={styles.brand} href="/" aria-label="RN Studio future professional profiles home">
          <span aria-hidden="true">RN</span>
          <strong>Opportunity Intelligence</strong>
        </a>
        <p className={styles.eyebrow}>RESEARCH → POSITION → PROVE</p>
        <h1>Find the territory worth owning.</h1>
        <p className={styles.lede}>A source-visible comparison of what each public record supports, what the market already answers, what audiences still need, and what must be verified before publication.</p>
        <div className={styles.boundary} role="note">
          <strong>Speculative strategy prototype.</strong> Qualitative public-search research, not measured keyword volume. RN Studio’s recommendations—not subject-authored, hired, approved, or endorsed work.
        </div>
      </header>
      <OpportunityExplorer
        meta={intelligenceMeta}
        audiences={audienceJourneys}
        language={audienceLanguageSignals}
        competitors={competitorSurfaces}
        intents={searchIntents}
        opportunities={topicOpportunities}
        gaps={proofGaps}
        platforms={platformOpportunities}
        sources={intelligenceSources}
        monitors={getMonitoredSources()}
        monitorMeta={sourceMonitoringMeta}
      />
    </main>
  );
}

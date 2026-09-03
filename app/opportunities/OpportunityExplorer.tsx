"use client";

import { useMemo, useState } from "react";
import type {
  AudienceJourney,
  AudienceLanguageSignal,
  CompetitorSurface,
  IntelligenceSource,
  PlatformOpportunity,
  ProfileKey,
  ProofGap,
  SearchIntent,
  TopicOpportunity,
} from "../market-intelligence";
import type { SourceMonitor } from "../source-monitoring";
import styles from "./opportunities.module.css";

type ProfileFilter = "all" | ProfileKey;
type MonitorRow = SourceMonitor & { source?: IntelligenceSource };

type Props = {
  meta: { researchedAt: string; geography: string; methodology: string; volumeBoundary: string; publicationBoundary: string };
  audiences: AudienceJourney[];
  language: AudienceLanguageSignal[];
  competitors: CompetitorSurface[];
  intents: SearchIntent[];
  opportunities: TopicOpportunity[];
  gaps: ProofGap[];
  platforms: PlatformOpportunity[];
  sources: IntelligenceSource[];
  monitors: MonitorRow[];
  monitorMeta: { baseline: string; automation: string; limitation: string };
};

const profileName = { mark: "Mark H. Young", sam: "Samuel “Sam” Wolff" } as const;

function includesProfile(itemProfile: ProfileKey | "shared", selected: ProfileFilter) {
  return selected === "all" || itemProfile === selected || itemProfile === "shared";
}

function track(action: string, detail: string) {
  const payload = { event: "opportunity_intelligence", action, detail, at: new Date().toISOString() };
  window.dispatchEvent(new CustomEvent("rn:analytics", { detail: payload }));
  const analyticsWindow = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer?.push(payload);
}

export default function OpportunityExplorer(props: Props) {
  const [profile, setProfile] = useState<ProfileFilter>("all");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const normalized = query.trim().toLowerCase();
  const matches = (value: unknown) => !normalized || JSON.stringify(value).toLowerCase().includes(normalized);

  const filtered = useMemo(() => ({
    audiences: props.audiences.filter((item) => includesProfile(item.profile, profile) && matches(item)),
    language: props.language.filter((item) => includesProfile(item.profile, profile) && matches(item)),
    competitors: props.competitors.filter((item) => includesProfile(item.profile, profile) && matches(item)),
    intents: props.intents.filter((item) => includesProfile(item.profile, profile) && matches(item)),
    opportunities: props.opportunities.filter((item) => includesProfile(item.profile, profile) && matches(item)).sort((a, b) => b.score - a.score),
    gaps: props.gaps.filter((item) => includesProfile(item.profile, profile) && matches(item)),
    platforms: props.platforms.filter((item) => includesProfile(item.profile, profile) && matches(item)),
  }), [profile, normalized, props]);

  const visibleCount = Object.values(filtered).reduce((sum, collection) => sum + collection.length, 0);

  function selectProfile(next: ProfileFilter) {
    setProfile(next);
    track("profile_filter", next);
  }

  return (
    <div className={styles.explorer}>
      <section className={styles.controls} aria-label="Opportunity filters">
        <div>
          <p className={styles.controlLabel}>Compare or focus</p>
          <div className={styles.segmented} aria-label="Profile" role="group">
            {(["all", "mark", "sam"] as const).map((value) => (
              <button key={value} type="button" aria-pressed={profile === value} onClick={() => selectProfile(value)}>
                {value === "all" ? "Compare both" : value === "mark" ? "Mark" : "Sam"}
              </button>
            ))}
          </div>
        </div>
        <label className={styles.search}>
          <span>Search the intelligence</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} onBlur={() => query && track("search", `length:${Math.min(query.length, 200)};results:${visibleCount}`)} placeholder="Try flood, investor, LinkedIn…" type="search" />
        </label>
        <p className={styles.resultCount} aria-live="polite">{visibleCount} matching intelligence records</p>
      </section>

      <nav className={styles.jump} aria-label="Opportunity sections">
        {[["comparison", "Theses"], ["audiences", "Audiences"], ["search-intent", "Search"], ["landscape", "Landscape"], ["whitespace", "Whitespace"], ["proof", "Proof gaps"], ["platforms", "Platforms"], ["sources", "Sources"]].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="comparison" className={styles.section}>
        <SectionHead number="01" title="The territory" description="One researched professional record; one differentiated editorial promise." />
        <div className={styles.comparison}>
          <article className={styles.thesisCard} data-profile="mark">
            <ProfileTag profile="mark" />
            <h3>Clear counsel before commitment.</h3>
            <p>Make appraisal-trained reasoning visible before a buyer, seller, or investor puts something important at risk.</p>
            <small>Best-owned territory</small><strong>Source-visible pre-offer judgment</strong>
          </article>
          <article className={styles.thesisCard} data-profile="sam">
            <ProfileTag profile="sam" />
            <h3>Put the place back into the model.</h3>
            <p>Translate how energy, infrastructure, permitting, policy, and community process change a property decision.</p>
            <small>Best-owned territory</small><strong>Public-system → private consequence</strong>
          </article>
        </div>
      </section>

      <section id="audiences" className={styles.section}>
        <SectionHead number="02" title="Audience decisions and language" description="Not demographics for decoration: the question, proof burden, and next useful action." />
        <div className={styles.cardGrid}>
          {filtered.audiences.map((item) => (
            <article className={styles.card} key={item.id}>
              <ProfileTag profile={item.profile} />
              <h3>{item.label}</h3><p className={styles.decision}>{item.decision}</p>
              <h4>Questions in the decision</h4><ChipList items={item.questions} />
              <h4>Proof before advice</h4><ul>{item.proofNeeded.map((proof) => <li key={proof}>{proof}</li>)}</ul>
              <p className={styles.conversion}><span>Useful conversion</span>{item.conversion}</p>
              {item.riskNote && <p className={styles.warning}>{item.riskNote}</p>}
            </article>
          ))}
        </div>
        <div className={styles.languageGrid}>
          {filtered.language.map((item) => (
            <article className={styles.languageCard} key={item.id}>
              <div><ProfileTag profile={item.profile} /><Confidence value={item.confidence} /></div>
              <h3>{item.audience} says…</h3>
              <blockquote>“{item.language.join("” · “")}”</blockquote>
              <p><strong>Underlying need:</strong> {item.underlyingNeed}</p>
              <p><strong>Copy move:</strong> {item.copyMove}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="search-intent" className={styles.section}>
        <SectionHead number="03" title="Search-intent clusters" description="Observed question families—deliberately shown without fake volume or difficulty scores." />
        <div className={styles.intentList}>
          {filtered.intents.map((item) => (
            <article className={styles.intent} key={item.id}>
              <div><ProfileTag profile={item.profile === "shared" ? "mark" : item.profile} label={item.profile === "shared" ? "Shared" : undefined} /><span className={styles.coverage}>Observed coverage · {item.observedCoverage}</span></div>
              <h3>{item.queryFamily}</h3><p>{item.intent}</p><ChipList items={item.recurringQuestions} />
              <p className={styles.opportunity}><strong>Answer opportunity:</strong> {item.opportunity}</p>
              <small>{item.limitation}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="landscape" className={styles.section}>
        <SectionHead number="04" title="Answer-competitor patterns" description="Organizations and formats competing to answer the same question—not claims of personal rivalry." />
        <div className={styles.tableWrap}><table><thead><tr><th>Surface</th><th>Owns</th><th>Strength</th><th>Our move</th></tr></thead><tbody>
          {filtered.competitors.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.category}</small></td><td>{item.owns}</td><td>{item.strength}</td><td>{item.implication}<SourceLinks ids={item.sourceIds} sources={props.sources} onOpen={(id) => track("source_open", id)} /></td></tr>)}
        </tbody></table></div>
      </section>

      <section id="whitespace" className={styles.section}>
        <SectionHead number="05" title="Topic whitespace" description="Scored editorial opportunity, not predicted performance. Open each territory to inspect its publication gate." />
        <div className={styles.opportunityGrid}>
          {filtered.opportunities.map((item) => {
            const open = detail === item.id;
            return <article className={styles.opportunityCard} key={item.id}>
              <div className={styles.score} aria-label={`Strategic opportunity score ${item.score} out of 100`}><span>{item.score}</span><small>/ 100</small></div>
              <ProfileTag profile={item.profile} /><span className={styles.saturation}>Saturation · {item.saturation}</span>
              <h3>{item.territory}</h3><p>{item.editorialMove}</p><strong className={styles.format}>{item.format}</strong>
              <button className={styles.detailButton} type="button" aria-expanded={open} onClick={() => { setDetail(open ? null : item.id); track("opportunity_detail", item.id); }}>{open ? "Hide evidence gate" : "Show evidence gate"}</button>
              {open && <div className={styles.detail}><p><strong>Evidence permission:</strong> {item.evidencePermission}</p><p><strong>Gate:</strong> {item.gate}</p></div>}
            </article>;
          })}
        </div>
      </section>

      <section id="proof" className={styles.section}>
        <SectionHead number="06" title="Reputation and proof gaps" description="The red-team layer: what would make otherwise beautiful copy misleading." />
        <div className={styles.gapList}>{filtered.gaps.map((item) => <article className={styles.gap} key={item.id}><div><ProfileTag profile={item.profile} /><span data-severity={item.severity}>{item.severity}</span></div><h3>{item.label}</h3><p><strong>Missing:</strong> {item.missing}</p><p><strong>Consequence:</strong> {item.consequence}</p><p className={styles.resolution}><strong>Close it:</strong> {item.resolution}</p></article>)}</div>
      </section>

      <section id="platforms" className={styles.section}>
        <SectionHead number="07" title="Platform roles" description="Each channel receives a job, a native form, and an evidence behavior." />
        <div className={styles.cardGrid}>{filtered.platforms.map((item) => <article className={styles.card} key={item.id}><div><ProfileTag profile={item.profile} /><span className={styles.priority}>{item.priority}</span></div><h3>{item.platform}</h3><p>{item.job}</p><ChipList items={item.nativeFormats} /><p className={styles.evidenceBehavior}><strong>Evidence behavior</strong>{item.evidenceBehavior}</p></article>)}</div>
      </section>

      <section id="sources" className={styles.section}>
        <SectionHead number="08" title="Sources and monitoring" description="Every market input remains clickable, dated, classified, and assigned a volatility-based review cadence." />
        <div className={styles.monitorNote}><strong>Monitoring register only.</strong> {props.monitorMeta.limitation} Baseline: {props.monitorMeta.baseline}.</div>
        <div className={styles.sourceGrid}>{props.monitors.map((row) => row.source && <article className={styles.sourceCard} key={row.sourceId}><div><span>{row.source.sourceClass}</span><span>{row.volatility} · {row.cadenceDays}d</span></div><h3><a href={row.source.url} target="_blank" rel="noreferrer" onClick={() => track("source_open", row.sourceId)}>{row.source.title} <span aria-hidden="true">↗</span></a></h3><p>{row.source.publisher} · {row.source.date}</p><p>{row.watchFor}</p><small>Next scheduled review: <time dateTime={row.nextReview}>{row.nextReview}</time></small></article>)}</div>
      </section>

      {visibleCount === 0 && <div className={styles.empty}><h2>No matching intelligence</h2><p>Try a broader term or compare both profiles.</p><button type="button" onClick={() => { setQuery(""); setProfile("all"); }}>Clear filters</button></div>}

      <footer className={styles.footer}><p>Researched {props.meta.researchedAt} · {props.meta.geography}</p><p>{props.meta.volumeBoundary}</p><a href="/intelligence">Open the complete evidence ledger →</a></footer>
    </div>
  );
}

function SectionHead({ number, title, description }: { number: string; title: string; description: string }) { return <header className={styles.sectionHead}><p>{number} · INTELLIGENCE LAYER</p><h2>{title}</h2><span>{description}</span></header>; }
function ProfileTag({ profile, label }: { profile: ProfileKey; label?: string }) { return <span className={styles.profileTag} data-profile={profile}>{label ?? profileName[profile]}</span>; }
function Confidence({ value }: { value: string }) { return <span className={styles.confidence} data-confidence={value}>Confidence · {value}</span>; }
function ChipList({ items }: { items: string[] }) { return <ul className={styles.chips}>{items.map((item) => <li key={item}>{item}</li>)}</ul>; }
function SourceLinks({ ids, sources, onOpen }: { ids: string[]; sources: IntelligenceSource[]; onOpen: (id: string) => void }) { return <div className={styles.sourceLinks}>{ids.map((id) => { const source = sources.find((item) => item.id === id); return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer" onClick={() => onOpen(id)}>{source.publisher} ↗</a> : null; })}</div>; }

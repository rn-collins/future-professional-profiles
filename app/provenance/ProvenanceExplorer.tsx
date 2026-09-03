"use client";

import { useMemo, useState } from "react";
import type { ConfirmationQuestion, GapRecord, ImageProvenance, ProvenanceRecheck, SubjectKey, VerificationState } from "../provenance-intelligence";
import styles from "./provenance.module.css";

type Filter = "all" | SubjectKey;
type Props = { gaps: GapRecord[]; images: ImageProvenance[]; rechecks: ProvenanceRecheck[]; questions: ConfirmationQuestion[]; meta: { researchedAt: string; scope: string; completenessBoundary: string; rightsBoundary: string } };
const names = { mark: "Mark H. Young", sam: "Samuel “Sam” Wolff" } as const;
const stateMeaning: Record<VerificationState, string> = {
  verified: "Direct institutional or primary support for the bounded statement.",
  qualified: "Usable only with attribution, date, or another stated limit.",
  unresolved: "Searched but not established; do not convert absence into fact.",
  excluded: "Conflicting, stale, wrong-person, or insufficient evidence; do not use.",
};

export default function ProvenanceExplorer({ gaps, images, rechecks, questions, meta }: Props) {
  const [subject, setSubject] = useState<Filter>("all");
  const [state, setState] = useState<"all" | VerificationState>("all");
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const subjectMatch = (value: SubjectKey) => subject === "all" || value === subject;
  const textMatch = (value: unknown) => !normalized || JSON.stringify(value).toLowerCase().includes(normalized);
  const filtered = useMemo(() => ({
    gaps: gaps.filter((item) => subjectMatch(item.subject) && (state === "all" || item.state === state) && textMatch(item)),
    images: images.filter((item) => subjectMatch(item.subject) && textMatch(item)),
    rechecks: rechecks.filter((item) => subjectMatch(item.subject) && textMatch(item)),
    questions: questions.filter((item) => subjectMatch(item.subject) && textMatch(item)),
  }), [subject, state, normalized, gaps, images, rechecks, questions]);
  const count = filtered.gaps.length + filtered.images.length + filtered.rechecks.length + filtered.questions.length;

  return <div className={styles.explorer}>
    <section className={styles.method} aria-labelledby="method-title">
      <div><p>RESEARCHED</p><strong>{meta.researchedAt}</strong></div>
      <div><p>IDENTITY STANDARD</p><strong>Name + two professional anchors</strong></div>
      <div><p>NEGATIVE FINDINGS</p><strong>“Not located,” never “does not exist”</strong></div>
      <div><p>IMAGE STANDARD</p><strong>Identity ≠ permission</strong></div>
      <h2 id="method-title">Bounded, reproducible, correctable.</h2>
      <p>Records were admitted only when geography, employer, license, institutional role, consistent imagery, or a resolved subject-controlled account distinguished the subject from same-name people. Sensitive/private records were not collected.</p>
    </section>

    <section className={styles.controls} aria-label="Provenance filters">
      <fieldset><legend>Subject</legend><div>{(["all", "mark", "sam"] as const).map((item) => <button type="button" key={item} aria-pressed={subject === item} onClick={() => setSubject(item)}>{item === "all" ? "Both" : item === "mark" ? "Mark" : "Sam"}</button>)}</div></fieldset>
      <label><span>Evidence state</span><select value={state} onChange={(event) => setState(event.target.value as typeof state)}><option value="all">All states</option><option value="verified">Verified</option><option value="qualified">Qualified</option><option value="unresolved">Unresolved</option><option value="excluded">Stale / excluded</option></select></label>
      <label><span>Search records</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try award, license, image…" /></label>
      <p aria-live="polite">{count} matching records</p>
    </section>

    <section className={styles.section} id="states">
      <SectionHeader number="01" title="Evidence states" text="A verified identity does not make every associated claim verified." />
      <div className={styles.legend}>{Object.entries(stateMeaning).map(([key, value]) => <div key={key}><Status state={key as VerificationState} /><p>{value}</p></div>)}</div>
      <div className={styles.recordList}>{filtered.gaps.map((item) => <article key={item.id} className={styles.record}>
        <div className={styles.recordTop}><Subject subject={item.subject} /><Status state={item.state} /><span>{item.lane}</span></div>
        <h3>{item.claim}</h3><dl><div><dt>Evidence</dt><dd>{item.evidence}</dd></div><div><dt>Safe public copy</dt><dd>{item.safeCopy}</dd></div><div><dt>Still missing</dt><dd>{item.missing}</dd></div><div><dt>Next action</dt><dd>{item.nextAction}</dd></div></dl>
        {item.sourceUrls.length > 0 && <div className={styles.links}>{item.sourceUrls.map((url, index) => <a href={url} target="_blank" rel="noreferrer" key={url}>Open source {index + 1} <span aria-hidden="true">↗</span></a>)}</div>}
      </article>)}</div>
    </section>

    <section className={styles.section} id="images">
      <SectionHeader number="02" title="Image identity ≠ image rights" text={meta.rightsBoundary} />
      <div className={styles.imageGrid}>{filtered.images.map((item) => <article className={styles.imageCard} key={item.id}>
        <div><Subject subject={item.subject} /><span data-rights={item.rightsState}>{item.rightsState.replaceAll("-", " ")}</span></div>
        <h3>{item.depicts}</h3><p><strong>Identity confidence:</strong> {item.identityConfidence}</p><p>{item.rightsNote}</p>
        {(item.dimensions || item.sha256) && <dl><div><dt>File</dt><dd>{item.dimensions ?? "External only"}</dd></div>{item.sha256 && <div><dt>SHA-256</dt><dd className={styles.hash}>{item.sha256}</dd></div>}</dl>}
        <p className={styles.allowed}><strong>Current handling note</strong>{item.allowedUse}</p><div className={styles.prohibited}><strong>Do not</strong><ul>{item.prohibitedUse.map((rule) => <li key={rule}>{rule}</li>)}</ul></div>
        <a href={item.sourceUrl} target="_blank" rel="noreferrer">View provenance source ↗</a>
      </article>)}</div>
      <p className={styles.rightsNote}><strong>A correction or takedown channel is not permission.</strong> For production, obtain the original, creator/owner identity, written license, crop/derivative terms, subject/model releases, permitted channels and duration.</p>
    </section>

    <section className={styles.section} id="rechecks">
      <SectionHeader number="03" title="Recheck register" text="Volatility determines cadence; publication risk can trigger an earlier review." />
      <div className={styles.tableWrap}><table><thead><tr><th>Record</th><th>Cadence</th><th>Next review</th><th>Trigger</th><th>Owner</th></tr></thead><tbody>{filtered.rechecks.map((item) => <tr key={item.id}><td><Subject subject={item.subject} /><strong>{item.label}</strong></td><td>{item.cadence.replaceAll("-", " ")}</td><td>{item.nextReview}</td><td>{item.trigger}</td><td>{item.evidenceOwner}</td></tr>)}</tbody></table></div>
    </section>

    <section className={styles.section} id="confirmation">
      <SectionHeader number="04" title="Questions only the subject can close" text="Public-web research stops where current role, consent, confidential work, and personal boundaries begin." />
      <div className={styles.questionGrid}>{filtered.questions.map((item, index) => <article key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><Subject subject={item.subject} /><small>{item.category}</small><h3>{item.question}</h3><p><strong>Blocks:</strong> {item.blocks}</p></article>)}</div>
    </section>

    {count === 0 && <div className={styles.empty}><h2>No matching records</h2><p>Broaden the search or reset the evidence state.</p><button type="button" onClick={() => { setSubject("all"); setState("all"); setQuery(""); }}>Clear filters</button></div>}

    <footer className={styles.footer}><p>{meta.completenessBoundary}</p><div><a href="/intelligence">Evidence ledger</a><a href="/opportunities">Opportunity intelligence</a><a href="/corrections">Corrections & takedown</a></div></footer>
  </div>;
}

function SectionHeader({ number, title, text }: { number: string; title: string; text: string }) { return <header className={styles.sectionHeader}><p>{number} · PROVENANCE LAYER</p><h2>{title}</h2><span>{text}</span></header>; }
function Subject({ subject }: { subject: SubjectKey }) { return <span className={styles.subject} data-subject={subject}>{names[subject]}</span>; }
function Status({ state }: { state: VerificationState }) { return <span className={styles.status} data-state={state}>{state === "excluded" ? "stale / excluded" : state}</span>; }

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import type { Profile } from "../data";
import type { EvidenceProfile } from "../evidence";

type RecordKind = "all" | "claim" | "gap" | "source" | "experience" | "concept" | "audience";
type IntelligenceRecord = { id: string; profile: Profile["slug"]; profileName: string; kind: Exclude<RecordKind, "all">; title: string; detail: string; url?: string; status: string };

function buildRecords(profiles: Profile[], ledgers: EvidenceProfile[]): IntelligenceRecord[] {
  const editorialRecords = profiles.flatMap((profile) => [
    ...profile.sources.map((source, index) => ({ id: `${profile.slug}-source-${index}`, profile: profile.slug, profileName: profile.name, kind: "source" as const, title: source.label, detail: source.url, url: source.url, status: "Public source" })),
    ...profile.experience.map((item, index) => ({ id: `${profile.slug}-experience-${index}`, profile: profile.slug, profileName: profile.name, kind: "experience" as const, title: `${item.role} · ${item.org}`, detail: `${item.dates}. ${item.detail}`, status: "Career record" })),
    ...profile.posts.map((post, index) => ({ id: `${profile.slug}-concept-${index}`, profile: profile.slug, profileName: profile.name, kind: "concept" as const, title: post.strategy, detail: post.text, status: post.status })),
    ...profile.strategyLayers.map((layer) => ({ id: `${profile.slug}-audience-${layer.id}`, profile: profile.slug, profileName: profile.name, kind: "audience" as const, title: layer.label, detail: `${layer.audience} ${layer.tension} ${layer.editorialMove} ${layer.outcome}`, status: "Audience strategy" })),
  ]);
  const evidenceRecords = ledgers.flatMap((ledger) => [
    ...ledger.claims.map((claim) => ({ id: claim.id, profile: ledger.slug, profileName: ledger.subject, kind: "claim" as const, title: claim.claim, detail: `${claim.boundary ?? "No additional boundary."}${claim.recheck ? ` Recheck: ${claim.recheck}` : ""}`, status: `${claim.status} · ${claim.confidence} confidence` })),
    ...ledger.gaps.map((gap) => ({ id: gap.id, profile: ledger.slug, profileName: ledger.subject, kind: "gap" as const, title: gap.question, detail: gap.resolution, status: `Open gap · ${gap.impact}` })),
  ]);
  return [...evidenceRecords, ...editorialRecords];
}

export default function IntelligenceConsole({ profiles, ledgers }: { profiles: Profile[]; ledgers: EvidenceProfile[] }) {
  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState<"all" | Profile["slug"]>("all");
  const [kind, setKind] = useState<RecordKind>("all");
  const records = useMemo(() => buildRecords(profiles, ledgers), [profiles, ledgers]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return records.filter((record) => (profile === "all" || record.profile === profile) && (kind === "all" || record.kind === kind) && (!needle || `${record.title} ${record.detail} ${record.profileName}`.toLocaleLowerCase().includes(needle)));
  }, [kind, profile, query, records]);
  const reportFilter = (value: string, dimension: string) => track("intelligence_filter_changed", { dimension, value });

  return <div className="intelConsole">
    <div className="intelControls" role="search" aria-label="Search profile intelligence">
      <label><span>Search everything</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try appraisal, energy, Koko Head…" type="search" /></label>
      <label><span>Person</span><select value={profile} onChange={(event) => { const next = event.target.value as typeof profile; setProfile(next); reportFilter(next, "profile"); }}><option value="all">Both profiles</option>{profiles.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label>
      <label><span>Record type</span><select value={kind} onChange={(event) => { const next = event.target.value as RecordKind; setKind(next); reportFilter(next, "kind"); }}><option value="all">All records</option><option value="claim">Bounded claims</option><option value="gap">Open evidence gaps</option><option value="source">Public sources</option><option value="experience">Career record</option><option value="concept">Content concepts</option><option value="audience">Audience strategy</option></select></label>
    </div>
    <div className="intelSummary" aria-live="polite"><strong>{filtered.length}</strong> of {records.length} records <span>{ledgers.reduce((sum, item) => sum + item.claims.length, 0)} bounded claims</span><span>{ledgers.reduce((sum, item) => sum + item.gaps.length, 0)} visible gaps</span></div>
    {filtered.length ? <div className="intelResults">{filtered.map((record) => <article key={record.id}><div><span className={`recordKind recordKind-${record.kind}`}>{record.status}</span><span className="recordPerson">{record.profileName}</span></div><h2>{record.title}</h2><p>{record.detail}</p><div className="recordActions"><Link href={`/profiles/${record.profile}`}>Open dossier</Link>{record.url && <a href={record.url} target="_blank" rel="noreferrer" onClick={() => track("intelligence_source_opened", { profile: record.profile })}>Inspect source ↗</a>}</div></article>)}</div> : <div className="intelEmpty"><h2>No matching records</h2><p>Broaden the search or reset one of the filters. Nothing is hidden behind an empty result.</p></div>}
  </div>;
}

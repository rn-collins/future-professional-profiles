"use client";

import { track } from "@vercel/analytics";
import { useEffect, useMemo, useState } from "react";
import { profiles } from "../data";
import { buildEvidenceGraph, type StudioAudience, type StudioFormat } from "../engine";
import type { ProfileSlug } from "../evidence";
import type { WorkspaceDraft, WorkspaceState } from "../workspace/workspace-types";

type ConciergeResult = ReturnType<typeof import("../engine").answerEvidenceQuestion>;
type DraftResult = ReturnType<typeof import("../engine").generateEvidenceDraft>;

const audiences: StudioAudience[] = ["client", "investor", "partner", "journalist", "community", "event-organizer", "referral"];
const formats: StudioFormat[] = ["linkedin", "carousel", "newsletter", "video-script", "brief"];

export default function StrategyStudio() {
  const [profile, setProfile] = useState<ProfileSlug>("mark");
  const [question, setQuestion] = useState("What documented experience supports this person’s positioning?");
  const [answer, setAnswer] = useState<ConciergeResult | null>(null);
  const [audience, setAudience] = useState<StudioAudience>("client");
  const [format, setFormat] = useState<StudioFormat>("linkedin");
  const [objective, setObjective] = useState("Make the hidden decision logic useful before a first conversation.");
  const [draft, setDraft] = useState<DraftResult | null>(null);
  const [saved, setSaved] = useState<WorkspaceDraft[]>([]);
  const [status, setStatus] = useState("");
  const graph = useMemo(() => buildEvidenceGraph(profile), [profile]);
  const person = profiles[profile];

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("rn-studio-workspace-v1") ?? "null") as Partial<WorkspaceState> | null;
      setSaved(parsed?.schema === 1 && Array.isArray(parsed.drafts) ? parsed.drafts : []);
    } catch { setSaved([]); }
  }, []);

  const ask = async () => {
    setStatus("Retrieving evidence…");
    try {
      const response = await fetch("/api/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profile, question }) });
      const result = await response.json();
      if (!response.ok) { setStatus(result.error ?? "The evidence request failed."); return; }
      setAnswer(result); setStatus("Evidence answer ready."); track("concierge_answered", { profile });
    } catch { setStatus("The evidence service is temporarily unavailable. Nothing was generated."); }
  };

  const generate = async () => {
    setStatus("Composing from approved evidence…");
    try {
      const response = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ profile, audience, format, objective }) });
      const result = await response.json();
      if (!response.ok) { setStatus(result.error ?? "Draft generation failed."); return; }
      setDraft(result); setStatus("Source-governed draft ready."); track("evidence_draft_generated", { profile, audience, format });
    } catch { setStatus("The generation service is temporarily unavailable. No draft was created."); }
  };

  const saveDraft = () => {
    if (!draft) return;
    const raw = localStorage.getItem("rn-studio-workspace-v1");
    let current: WorkspaceState = { schema: 1, drafts: [] };
    try {
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<WorkspaceState>;
        if (parsed.schema !== 1 || !Array.isArray(parsed.drafts)) {
          setStatus("This browser contains an incompatible workspace. Nothing was overwritten; export the draft instead.");
          return;
        }
        current = { schema: 1, drafts: parsed.drafts as WorkspaceDraft[], selectedId: parsed.selectedId };
      }
    } catch {
      setStatus("This browser workspace could not be read. Nothing was overwritten; export the draft instead.");
      return;
    }
    const now = new Date().toISOString();
    const workspaceDraft: WorkspaceDraft = {
      id: draft.id,
      profile,
      title: `${draft.series} · ${draft.format.replace("-", " ")}`,
      body: draft.draft,
      status: "draft",
      note: `${draft.boundary}\n\nPublication gates: ${draft.gates.map((gate) => gate.question).join(" | ") || "Human evidence review required."}`,
      gates: { facts: false, sources: false, rights: false, subject: false, editorial: true },
      versions: [],
      activity: [{ id: `${draft.id}-imported`, at: now, action: "Evidence-studio draft imported for review" }],
      updatedAt: now,
    };
    const next = [workspaceDraft, ...current.drafts.filter((item) => item.id !== draft.id)].slice(0, 25);
    try {
      localStorage.setItem("rn-studio-workspace-v1", JSON.stringify({ schema: 1, drafts: next, selectedId: draft.id } satisfies WorkspaceState));
      setSaved(next);
      setStatus("Saved to this browser’s approval workspace with all publication gates closed for review.");
    } catch {
      setStatus("Browser storage is unavailable or full. Nothing was saved; export the Markdown instead.");
    }
  };

  const download = () => {
    if (!draft) return;
    const blob = new Blob([`${draft.draft}\n\n---\n${draft.boundary}`], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${draft.id}.md`; anchor.click(); URL.revokeObjectURL(url);
    track("evidence_draft_exported", { profile, format });
  };

  return <div className="strategyStudio">
    <section className="studioControl" aria-labelledby="studio-person">
      <div><p className="sectionLabel">Operating profile</p><h2 id="studio-person">Build with {person.name}</h2></div>
      <div className="segmented">{(["mark", "sam"] as const).map((slug) => <button key={slug} aria-pressed={profile === slug} onClick={() => { setProfile(slug); setAnswer(null); setDraft(null); }}>{profiles[slug].name}</button>)}</div>
    </section>

    <section className="studioModule" aria-labelledby="concierge-title">
      <p className="sectionLabel">Evidence-controlled concierge</p><h2 id="concierge-title">Ask the public record, not a hallucination.</h2>
      <div className="studioQuestion"><label htmlFor="evidence-question">Question</label><textarea id="evidence-question" value={question} maxLength={600} onChange={(event) => setQuestion(event.target.value)} /><button onClick={ask}>Retrieve answer</button></div>
      {answer && <article className="answerCard"><strong>{answer.answer}</strong><p className="boundaryText">{answer.boundary}</p>{answer.limitations.map((item) => <p key={item}><b>Qualification:</b> {item}</p>)}<h3>Direct evidence</h3><ul>{answer.citations.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher} · Grade {source.grade}</span></li>)}</ul></article>}
    </section>

    <section className="studioModule" aria-labelledby="graph-title">
      <p className="sectionLabel">Interactive evidence graph</p><h2 id="graph-title">Trace the strategy all the way back to proof.</h2>
      <ol className="evidenceChain">{graph.chain.map((node, index) => <li key={`${node.type}-${index}`}><span>{node.type}</span><p>{node.label}</p></li>)}</ol>
    </section>

    <section className="studioModule" aria-labelledby="generator-title">
      <p className="sectionLabel">Content-generation studio</p><h2 id="generator-title">Commission a source-governed draft.</h2>
      <div className="generatorGrid">
        <label>Audience<select value={audience} onChange={(event) => setAudience(event.target.value as StudioAudience)}>{audiences.map((item) => <option key={item} value={item}>{item.replace("-", " ")}</option>)}</select></label>
        <label>Format<select value={format} onChange={(event) => setFormat(event.target.value as StudioFormat)}>{formats.map((item) => <option key={item} value={item}>{item.replace("-", " ")}</option>)}</select></label>
        <label className="wide">Objective<textarea value={objective} onChange={(event) => setObjective(event.target.value)} /></label>
      </div><button className="studioPrimary" onClick={generate}>Generate from evidence</button>
      {draft && <article className="draftCard"><div><span>{draft.format}</span><span>{draft.audience}</span><span>{draft.series}</span></div><pre>{draft.draft}</pre><p className="boundaryText">{draft.boundary}</p><h3>Publication gates</h3><ul>{draft.gates.map((gate) => <li key={gate.id}>{gate.question} — {gate.resolution}</li>)}</ul><div className="draftActions"><button onClick={saveDraft}>Save workspace copy</button><button onClick={() => navigator.clipboard.writeText(draft.draft).then(() => setStatus("Draft copied.")).catch(() => setStatus("Clipboard access was blocked. Export the Markdown instead."))}>Copy draft</button><button onClick={download}>Export Markdown</button></div></article>}
      <p aria-live="polite" className="studioStatus">{status}</p>
    </section>

    <section className="studioModule" aria-labelledby="calendar-title"><p className="sectionLabel">Self-generating 90-day system</p><h2 id="calendar-title">Every week has an assignment and a gate.</h2><div className="calendarGrid">{person.editorialSystem.ninetyDayPlan.flatMap((phase, phaseIndex) => phase.weeklyMoves.map((move, moveIndex) => <article key={`${phase.phase}-${move}`}><span>Week {phaseIndex * 4 + moveIndex + 1}</span><h3>{move}</h3><p>{phase.objective}</p><small>Gate: {phase.decisionGate}</small></article>))}</div></section>

    {saved.length > 0 && <section className="studioModule"><p className="sectionLabel">Private browser workspace</p><h2>Saved drafts</h2><div className="savedDrafts">{saved.map((item) => <a key={item.id} href="/workspace"><b>{item.title}</b><span>{item.profile} · {item.status}</span></a>)}</div></section>}
  </div>;
}

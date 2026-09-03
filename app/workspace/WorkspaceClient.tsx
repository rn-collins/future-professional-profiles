"use client";

import { track } from "@vercel/analytics";
import { useEffect, useMemo, useState } from "react";
import ProductNavigation from "../components/ProductNavigation";
import { createStarterDrafts, gateLabels, type DraftStatus, type GateKey, type WorkspaceDraft, type WorkspaceState } from "./workspace-types";
import styles from "./workspace.module.css";

const STORAGE_KEY = "rn-studio-workspace-v1";
const statuses: DraftStatus[] = ["draft", "review", "approved", "hold"];
const stamp = () => new Date().toISOString();
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function normalize(value: unknown): WorkspaceState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<WorkspaceState> & { drafts?: unknown };
  if (!Array.isArray(candidate.drafts)) return null;
  const valid = candidate.drafts.filter((item): item is WorkspaceDraft => Boolean(item && typeof item === "object" && "id" in item && "title" in item && "body" in item && "gates" in item)).map((item) => ({ ...item, status: statuses.includes(item.status) ? item.status : "draft", gates: { facts: Boolean(item.gates?.facts), sources: Boolean(item.gates?.sources), rights: Boolean(item.gates?.rights), subject: Boolean(item.gates?.subject), editorial: Boolean(item.gates?.editorial) }, versions: Array.isArray(item.versions) ? item.versions : [], activity: Array.isArray(item.activity) ? item.activity : [], note: typeof item.note === "string" ? item.note : "", updatedAt: item.updatedAt || stamp() }));
  return { schema: 1, drafts: valid, selectedId: typeof candidate.selectedId === "string" ? candidate.selectedId : valid[0]?.id };
}

export default function WorkspaceClient() {
  const [state, setState] = useState<WorkspaceState>({ schema: 1, drafts: [] });
  const [ready, setReady] = useState(false);
  const [storageEnabled, setStorageEnabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? normalize(JSON.parse(raw)) : null;
      if (parsed) setState(parsed);
      else if (raw) { setStorageEnabled(false); setStatusMessage("The existing browser workspace has an unsupported structure. It was not overwritten; export or clear it manually before saving here."); }
    } catch { setStorageEnabled(false); setStatusMessage("The existing browser workspace could not be read. Nothing was overwritten; saving is disabled for this session."); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready && storageEnabled) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { setStorageEnabled(false); setStatusMessage("Browser storage is unavailable or full. Export now to preserve this workspace."); } } }, [ready, state, storageEnabled]);

  const selected = useMemo(() => state.drafts.find((draft) => draft.id === state.selectedId) ?? state.drafts[0], [state]);
  const updateDraft = (id: string, change: (draft: WorkspaceDraft) => WorkspaceDraft) => setState((current) => ({ ...current, drafts: current.drafts.map((draft) => draft.id === id ? change(draft) : draft) }));
  const activity = (draft: WorkspaceDraft, action: string): WorkspaceDraft => ({ ...draft, updatedAt: stamp(), activity: [{ id: uid(), at: stamp(), action }, ...draft.activity] });

  const loadStarter = () => { const drafts = createStarterDrafts(); setState({ schema: 1, drafts, selectedId: drafts[0].id }); setStatusMessage(storageEnabled ? "Two concept drafts were added to this browser." : "Two concept drafts were added to this session only. Export to preserve them."); track("workspace_starter_loaded"); };
  const addDraft = () => {
    const now = stamp(); const next: WorkspaceDraft = { id: uid(), profile: "mark", title: "Untitled concept", body: "", status: "draft", note: "", gates: { facts: false, sources: false, rights: false, subject: false, editorial: false }, versions: [], activity: [{ id: uid(), at: now, action: "Draft created" }], updatedAt: now };
    setState((current) => ({ ...current, drafts: [next, ...current.drafts], selectedId: next.id })); track("workspace_draft_created");
  };
  const setDraftStatus = (next: DraftStatus) => {
    if (!selected) return;
    const gatesPass = Object.values(selected.gates).every(Boolean);
    if (next === "approved" && !gatesPass) { setStatusMessage("Approval is blocked until every evidence gate passes."); track("workspace_approval_blocked", { profile: selected.profile }); return; }
    updateDraft(selected.id, (draft) => activity({ ...draft, status: next }, `Status changed to ${next}`)); setStatusMessage(`Status changed to ${next}.`); track("workspace_status_changed", { profile: selected.profile, status: next });
  };
  const snapshot = () => {
    if (!selected) return; const version = { id: uid(), at: stamp(), title: selected.title, body: selected.body, status: selected.status, note: selected.note };
    updateDraft(selected.id, (draft) => activity({ ...draft, versions: [version, ...draft.versions] }, `Version ${draft.versions.length + 1} saved`)); setStatusMessage("Version snapshot saved in this browser."); track("workspace_version_saved", { profile: selected.profile });
  };
  const restore = (versionId: string) => {
    if (!selected) return; const version = selected.versions.find((item) => item.id === versionId); if (!version) return;
    updateDraft(selected.id, (draft) => activity({ ...draft, title: version.title, body: version.body, status: version.status, note: version.note }, "Earlier version restored")); setStatusMessage("Earlier version restored. The newer snapshot remains in history."); track("workspace_version_restored", { profile: selected.profile });
  };
  const setGate = (key: GateKey, passed: boolean) => {
    if (!selected) return;
    updateDraft(selected.id, (draft) => {
      const approvalReopened = !passed && draft.status === "approved";
      return activity({ ...draft, status: approvalReopened ? "review" : draft.status, gates: { ...draft.gates, [key]: passed } }, `${gateLabels[key]}: ${passed ? "passed" : "reopened"}${approvalReopened ? "; approval returned to review" : ""}`);
    });
    if (!passed && selected.status === "approved") setStatusMessage("A gate was reopened, so this draft returned to review.");
    track("workspace_gate_changed", { profile: selected.profile, gate: key, passed });
  };
  const exportFile = (format: "json" | "md") => {
    const body = format === "json" ? JSON.stringify(state, null, 2) : state.drafts.map((draft) => `# ${draft.title}\n\n- Profile: ${draft.profile}\n- Status: ${draft.status}\n- Updated: ${draft.updatedAt}\n\n${draft.body}\n\n## Review note\n\n${draft.note || "No note"}\n\n## Evidence gates\n\n${(Object.keys(gateLabels) as GateKey[]).map((key) => `- [${draft.gates[key] ? "x" : " "}] ${gateLabels[key]}`).join("\n")}`).join("\n\n---\n\n");
    const url = URL.createObjectURL(new Blob([body], { type: format === "json" ? "application/json" : "text/markdown" })); const link = document.createElement("a"); link.href = url; link.download = `rn-studio-workspace.${format}`; link.click(); URL.revokeObjectURL(url); setStatusMessage(`${format.toUpperCase()} export downloaded.`); track("workspace_exported", { format, drafts: state.drafts.length });
  };

  if (!ready) return <main className={styles.loading}>Opening this browser’s workspace…</main>;
  return <main className={styles.shell}>
    <ProductNavigation className={styles.productNav} />
    <header className={styles.header}><div><p className={styles.eyebrow}>RN Studio · Approval workspace</p><h1>Move drafts through evidence—not vibes.</h1><p>Drafts, notes, approvals, and version history remain in this browser’s local storage. They do not sync across devices, reach RN Studio, or transmit to anyone.</p></div><div className={styles.headerActions}><button onClick={() => exportFile("json")} disabled={!state.drafts.length}>Export JSON</button><button onClick={() => exportFile("md")} disabled={!state.drafts.length}>Export Markdown</button></div></header>
    {!storageEnabled && <p className={styles.storageWarning} role="alert">Persistent browser storage is disabled for this session. Changes remain in memory only; use JSON or Markdown export before leaving.</p>}
    <p className={styles.statusMessage} role="status">{statusMessage}</p>
    {!state.drafts.length ? <section className={styles.empty}><span>Empty browser workspace</span><h2>Start with a governed draft—not a blank promise.</h2><p>Load two demonstration concepts or create a clean draft. The examples are proposed editorial material and are not attributed to either subject.</p><div><button onClick={loadStarter}>Load demonstration drafts</button><button onClick={addDraft}>Create an empty draft</button></div></section> : <div className={styles.workspace}>
      <aside className={styles.draftRail}><div><span>{state.drafts.length} drafts</span><button onClick={addDraft}>+ New</button></div>{state.drafts.map((draft) => <button key={draft.id} className={draft.id === selected?.id ? styles.activeDraft : ""} onClick={() => { setState((current) => ({ ...current, selectedId: draft.id })); track("workspace_draft_opened", { profile: draft.profile }); }}><strong>{draft.title}</strong><small>{draft.profile} · {draft.status}</small></button>)}</aside>
      {selected && <section className={styles.editor} aria-label={`Editing ${selected.title}`}>
        <div className={styles.editorTop}><label>Profile<select value={selected.profile} onChange={(e) => updateDraft(selected.id, (draft) => activity({ ...draft, profile: e.target.value as "mark" | "sam" }, `Profile changed to ${e.target.value}`))}><option value="mark">Mark H. Young</option><option value="sam">Samuel “Sam” Wolff</option></select></label><label>Status<select value={selected.status} onChange={(e) => setDraftStatus(e.target.value as DraftStatus)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><button onClick={snapshot}>Save version</button></div>
        <label className={styles.titleLabel}>Draft title<input value={selected.title} onChange={(e) => updateDraft(selected.id, (draft) => ({ ...draft, title: e.target.value, updatedAt: stamp() }))} /></label><label>Draft copy<textarea className={styles.copyArea} value={selected.body} onChange={(e) => updateDraft(selected.id, (draft) => ({ ...draft, body: e.target.value, updatedAt: stamp() }))} /></label>
        <div className={styles.reviewGrid}><section><p className={styles.eyebrow}>Evidence gate</p><h2>Release checklist</h2><p>All five checks must pass before “approved” can be selected. Reopening a gate returns an approved draft to review.</p>{(Object.keys(gateLabels) as GateKey[]).map((key) => <label className={styles.gate} key={key}><input type="checkbox" checked={selected.gates[key]} onChange={(e) => setGate(key, e.target.checked)} /><span>{gateLabels[key]}</span></label>)}</section><section><p className={styles.eyebrow}>Reviewer context</p><h2>Review note</h2><textarea value={selected.note} onChange={(e) => updateDraft(selected.id, (draft) => ({ ...draft, note: e.target.value, updatedAt: stamp() }))} placeholder="What must change, be confirmed, or remain on hold?" /><button onClick={() => { updateDraft(selected.id, (draft) => activity(draft, "Review note updated")); setStatusMessage("Review note update recorded in the activity timeline."); track("workspace_review_note_recorded", { profile: selected.profile }); }}>Record note update</button></section></div>
        <div className={styles.history}><section><p className={styles.eyebrow}>Version snapshots</p><h2>{selected.versions.length} saved</h2>{selected.versions.length ? selected.versions.map((version, index) => <article key={version.id}><div><strong>Version {selected.versions.length - index}</strong><time dateTime={version.at}>{new Date(version.at).toLocaleString()}</time></div><button onClick={() => restore(version.id)}>Restore</button></article>) : <p>No snapshots yet. Save a version before substantial revision.</p>}</section><section><p className={styles.eyebrow}>Activity timeline</p><h2>Browser-local record</h2>{selected.activity.map((item) => <article key={item.id}><time dateTime={item.at}>{new Date(item.at).toLocaleString()}</time><p>{item.action}</p></article>)}</section></div>
      </section>}
    </div>}
  </main>;
}

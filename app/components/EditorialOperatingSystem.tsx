"use client";

import { useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import type { Profile } from "../data";

type View = "voice" | "plan" | "studio" | "governance";

export default function EditorialOperatingSystem({ profile }: { profile: Profile }) {
  const [view, setView] = useState<View>("voice");
  const [recipeId, setRecipeId] = useState(profile.editorialSystem.draftRecipes[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const recipe = useMemo(
    () => profile.editorialSystem.draftRecipes.find((item) => item.id === recipeId) ?? profile.editorialSystem.draftRecipes[0],
    [profile, recipeId],
  );

  const brief = recipe
    ? [
        `EDITORIAL COMMISSION — ${profile.name}`,
        `Status: PROPOSED; not published or subject-approved`,
        `Concept: ${recipe.label}`,
        `Audience: ${recipe.audience}`,
        `Format: ${recipe.format}`,
        `Assignment: ${recipe.prompt}`,
        `Evidence gate: ${recipe.requiredEvidence}`,
        `Call to action: ${recipe.callToAction}`,
        `Voice: ${profile.editorialSystem.voice.qualities.join(", ")}`,
        `Proof rule: ${profile.editorialSystem.voice.proofRule}`,
        `Final gate: Verify every factual sentence against an attached source; label analysis, hypothetical examples, and uncertainty; obtain subject approval before publishing in first person.`,
      ].join("\n\n")
    : "";

  const changeView = (next: View) => {
    setView(next);
    track("editorial_system_viewed", { profile: profile.slug, view: next });
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      track("editorial_brief_copied", { profile: profile.slug, recipe: recipe.id });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="editorialOS" aria-labelledby={`editorial-system-${profile.slug}`}>
      <div className="osIntro">
        <p>07 · Editorial operating system</p>
        <h2 id={`editorial-system-${profile.slug}`}>From public evidence to publishable judgment</h2>
        <span>
          A subject-specific voice, 90-day publishing sequence, and evidence-constrained commissioning tool. It creates briefs—not unsupported claims or autonomous publication.
        </span>
      </div>

      <div className="osTabs" role="tablist" aria-label="Editorial operating system views">
        {(["voice", "plan", "studio", "governance"] as View[]).map((item) => (
          <button key={item} role="tab" aria-selected={view === item} onClick={() => changeView(item)}>
            {item === "voice" ? "Voice system" : item === "plan" ? "90-day plan" : item === "studio" ? "Commissioning studio" : "Evidence gates"}
          </button>
        ))}
      </div>

      {view === "voice" && (
        <div className="osPanel osColumns">
          <div>
            <h3>Sound like</h3>
            <div className="osChips">{profile.editorialSystem.voice.qualities.map((item) => <span key={item}>{item}</span>)}</div>
            <h3>Opening rule</h3><p>{profile.editorialSystem.voice.openingRule}</p>
            <h3>Sentence rule</h3><p>{profile.editorialSystem.voice.sentenceRule}</p>
          </div>
          <div className="osDark">
            <h3>Proof rule</h3><p>{profile.editorialSystem.voice.proofRule}</p>
            <h3>Never drift into</h3>
            <ul>{profile.editorialSystem.voice.avoid.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      )}

      {view === "plan" && (
        <div className="osPanel osTimeline">
          {profile.editorialSystem.ninetyDayPlan.map((phase, index) => (
            <article key={phase.phase}>
              <span>0{index + 1}</span><div><h3>{phase.phase}</h3><p>{phase.objective}</p>
              <ol>{phase.weeklyMoves.map((move) => <li key={move}>{move}</li>)}</ol>
              <small><b>Decision gate:</b> {phase.decisionGate}</small></div>
            </article>
          ))}
        </div>
      )}

      {view === "studio" && recipe && (
        <div className="osPanel osStudio">
          <div>
            <label htmlFor={`recipe-${profile.slug}`}>Choose a source-governed assignment</label>
            <select id={`recipe-${profile.slug}`} value={recipe.id} onChange={(event) => { setRecipeId(event.target.value); setCopied(false); }}>
              {profile.editorialSystem.draftRecipes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <dl>
              <div><dt>Audience</dt><dd>{recipe.audience}</dd></div>
              <div><dt>Format</dt><dd>{recipe.format}</dd></div>
              <div><dt>Assignment</dt><dd>{recipe.prompt}</dd></div>
              <div><dt>Required evidence</dt><dd>{recipe.requiredEvidence}</dd></div>
              <div><dt>Call to action</dt><dd>{recipe.callToAction}</dd></div>
            </dl>
          </div>
          <div className="osBrief">
            <small>PROPOSED · COMMISSIONING BRIEF</small>
            <pre>{brief}</pre>
            <button onClick={copyBrief}>{copied ? "Copied" : "Copy complete brief"}</button>
          </div>
        </div>
      )}

      {view === "governance" && (
        <div className="osPanel osGates">
          <div className="allow"><h3>Ready to use with attribution</h3><ul>{profile.editorialSystem.evidencePolicy.allowed.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="review"><h3>Requires human review</h3><ul>{profile.editorialSystem.evidencePolicy.reviewRequired.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="stop"><h3>Never manufacture</h3><ul>{profile.editorialSystem.evidencePolicy.prohibited.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      )}

      <style jsx>{`
        .editorialOS{background:#fff;border:1px solid #d9d7d0;border-radius:18px;overflow:hidden;margin:0 0 18px;color:#191918}.osIntro{padding:30px 32px 24px;background:linear-gradient(125deg,#f3f0e8,#fff)}.osIntro>p{font:700 11px/1.2 system-ui;letter-spacing:.14em;text-transform:uppercase;color:#716c5f;margin:0 0 12px}.osIntro h2{font:500 clamp(25px,4vw,39px)/1.06 Georgia,serif;max-width:720px;margin:0 0 12px}.osIntro>span{display:block;max-width:760px;color:#5b5851;line-height:1.55}.osTabs{display:flex;gap:4px;padding:10px 14px;border-block:1px solid #e4e1da;overflow:auto}.osTabs button{white-space:nowrap;border:0;background:transparent;border-radius:999px;padding:9px 13px;font-weight:700;color:#615e57;cursor:pointer}.osTabs button[aria-selected=true]{background:#181817;color:#fff}.osPanel{padding:26px 32px}.osPanel h3{font-size:14px;margin:0 0 8px}.osPanel p,.osPanel li,.osPanel dd{line-height:1.55;color:#4e4b45}.osColumns{display:grid;grid-template-columns:1.15fr .85fr;gap:24px}.osChips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 24px}.osChips span{border:1px solid #d4d0c5;border-radius:999px;padding:7px 10px;font-size:12px}.osDark{background:#1d211f;color:white;padding:22px;border-radius:14px}.osDark p,.osDark li{color:#d8ddd9}.osTimeline article{display:grid;grid-template-columns:40px 1fr;gap:10px;padding:0 0 26px;position:relative}.osTimeline article>span{background:#1d211f;color:#fff;border-radius:50%;width:34px;height:34px;display:grid;place-items:center;font-size:11px;z-index:1}.osTimeline article:not(:last-child):before{content:"";position:absolute;left:16px;top:34px;bottom:0;border-left:1px solid #ccc}.osTimeline ol{padding-left:20px}.osTimeline small{display:block;padding:12px;background:#f4f1ea;border-radius:8px;line-height:1.5}.osStudio{display:grid;grid-template-columns:1fr 1fr;gap:24px}.osStudio label{display:block;font-weight:700;margin-bottom:8px}.osStudio select{width:100%;padding:12px;border:1px solid #bdb9ae;border-radius:9px;background:white}.osStudio dl>div{border-bottom:1px solid #e4e1da;padding:12px 0}.osStudio dt{font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:800}.osStudio dd{margin:4px 0 0}.osBrief{background:#18201d;color:#e9eee9;padding:20px;border-radius:14px;min-width:0}.osBrief>small{letter-spacing:.12em;color:#a9b9ae}.osBrief pre{white-space:pre-wrap;font:12px/1.55 ui-monospace,monospace;max-height:420px;overflow:auto}.osBrief button{border:0;border-radius:8px;background:#e6c86c;padding:10px 13px;font-weight:800;cursor:pointer}.osGates{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.osGates>div{padding:18px;border-radius:12px;border:1px solid}.allow{background:#edf6ef;border-color:#b7d1bd!important}.review{background:#fff7de;border-color:#dcc781!important}.stop{background:#fff0ee;border-color:#d8aaa3!important}.osGates ul{padding-left:18px}.osGates li{margin:7px 0}@media(max-width:720px){.osIntro,.osPanel{padding:22px 20px}.osColumns,.osStudio,.osGates{grid-template-columns:1fr}.osTabs{padding-inline:8px}.osGates{gap:9px}}@media print{.osTabs{display:none}.osPanel:not(.osTimeline){display:none}.editorialOS{break-inside:avoid}}
      `}</style>
    </section>
  );
}

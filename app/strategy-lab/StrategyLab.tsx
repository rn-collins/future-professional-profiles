"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useEffect, useMemo, useRef, useState } from "react";
import { profiles } from "../data";
import { browserAssignment, experiments, type ExperimentArm } from "../experiments";
import { strategyProfiles, type ProfileSlug } from "./strategy-data";
import styles from "./strategy-lab.module.css";

const stageNames = ["Before", "Strategy", "Future"] as const;

export default function StrategyLab() {
  const [slug, setSlug] = useState<ProfileSlug>("mark");
  const [stage, setStage] = useState<(typeof stageNames)[number]>("Before");
  const stageRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const strategy = strategyProfiles[slug];
  const profile = profiles[slug];
  const [journeyId, setJourneyId] = useState(strategy.journeys[0].id);
  const [scenarioId, setScenarioId] = useState(strategy.scenarios[0].id);
  const [experiment, setExperiment] = useState<{ arm: ExperimentArm; preview: boolean }>({ arm: "control", preview: false });
  const exposureTracked = useRef(false);
  const journey = useMemo(() => strategy.journeys.find((item) => item.id === journeyId) ?? strategy.journeys[0], [strategy, journeyId]);
  const scenario = useMemo(() => strategy.scenarios.find((item) => item.id === scenarioId) ?? strategy.scenarios[0], [strategy, scenarioId]);
  const printStrategy = () => { track("strategy_lab_printed", { profile: slug }); window.print(); };
  useEffect(() => {
    const assignment = browserAssignment(experiments.strategyOrientation);
    setExperiment(assignment);
    if (!exposureTracked.current) { track("experiment_exposure", { experiment: experiments.strategyOrientation.id, arm: assignment.arm, preview: assignment.preview }); exposureTracked.current = true; }
  }, []);

  const chooseProfile = (next: ProfileSlug) => {
    setSlug(next);
    setJourneyId(strategyProfiles[next].journeys[0].id);
    setScenarioId(strategyProfiles[next].scenarios[0].id);
    track("strategy_lab_profile_changed", { profile: next });
  };

  return (
    <main className={styles.shell}>
      <nav className={styles.nav} aria-label="Strategy lab navigation">
        <Link href="/">← Profiles</Link><span>RN Studio · Strategy lab</span><button onClick={printStrategy}>Print / save PDF</button>
      </nav>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Interactive positioning prototype</p>
        <h1>{experiment.arm === "variant" ? "Trace the decisions behind the profile." : "See the strategy—not just the finished profile."}</h1>
        <p>Move from the retrieved public signal to the editorial system it could support. Documented evidence and RN Studio proposals remain visibly distinct throughout.</p>
        <p className={styles.experimentNote}>Experience test: <strong>{experiment.arm}</strong>{experiment.preview ? " preview" : " assignment"}. Assignment stays in this browser. Aggregate exposure and conversion events contain no browser identifier. The test changes one accurate orientation line; evidence, access, and recommendations remain the same.</p>
      </header>

      <section className={styles.controls} aria-label="Profile selection">
        {(["mark", "sam"] as const).map((key) => <button key={key} aria-pressed={slug === key} onClick={() => chooseProfile(key)}>{profiles[key].name}</button>)}
      </section>

      <section className={styles.profileBar}>
        <Image src={profile.image} alt={slug === "sam" ? `${profile.name} with his family` : profile.name} width={80} height={80} sizes="80px" />
        <div><p className={styles.eyebrow}>Working profile</p><h2>{profile.name}</h2><p>{profile.headline}</p></div>
      </section>

      <section className={styles.section} aria-labelledby="transformation-title">
        <p className={styles.eyebrow}>01 · Transformation narrative</p>
        <h2 id="transformation-title">Before → strategy → future</h2>
        <div className={styles.stageTabs} role="tablist" aria-label="Transformation stage">
          {stageNames.map((name, index) => <button key={name} ref={(node) => { stageRefs.current[index] = node; }} id={`stage-tab-${name.toLowerCase()}`} role="tab" aria-selected={stage === name} aria-controls={`stage-${name.toLowerCase()}`} tabIndex={stage === name ? 0 : -1} onKeyDown={(event) => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? stageNames.length - 1 : event.key === "ArrowRight" ? (index + 1) % stageNames.length : (index - 1 + stageNames.length) % stageNames.length; setStage(stageNames[next]); track("strategy_stage_viewed", { profile: slug, stage: stageNames[next].toLowerCase(), input: "keyboard" }); stageRefs.current[next]?.focus(); }} onClick={() => { setStage(name); track("strategy_stage_viewed", { profile: slug, stage: name.toLowerCase() }); }}>{name}</button>)}
        </div>
        <div className={styles.stagePanel} role="tabpanel" id={`stage-${stage.toLowerCase()}`} aria-labelledby={`stage-tab-${stage.toLowerCase()}`}>
          {stage === "Before" && <><span className={styles.fact}>Documented synthesis</span><h3>What the public record communicates now</h3><p>{strategy.currentSignal}</p><h4>Value that remains difficult to see</h4><ul>{strategy.invisibleValue.map((item) => <li key={item}>{item}</li>)}</ul></>}
          {stage === "Strategy" && <><span className={styles.proposal}>RN Studio proposal</span><h3>The positioning move</h3><p>{strategy.opportunity}</p><blockquote>{profile.editorialPosition.thesis}</blockquote><p>{profile.editorialPosition.distinction}</p></>}
          {stage === "Future" && <><span className={styles.proposal}>Proposed future state</span><h3>What the system could make possible</h3><p>{strategy.futureState}</p><p className={styles.note}>This is a strategic projection, not a claim of adoption, publication, engagement, or commercial outcome.</p></>}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="journey-title">
        <p className={styles.eyebrow}>02 · Audience journey</p><h2 id="journey-title">Change the reader. Change the story.</h2>
        <div className={styles.journeyLayout}>
          <div className={styles.choiceList} role="list" aria-label="Audience choices">{strategy.journeys.map((item) => <button key={item.id} aria-pressed={journey.id === item.id} onClick={() => { setJourneyId(item.id); track("audience_journey_selected", { profile: slug, audience: item.id }); }}>{item.label}</button>)}</div>
          <article className={styles.journeyCard} aria-live="polite">
            <span className={styles.proposal}>Personalized editorial route</span><h3>{journey.label}</h3>
            <dl><div><dt>What this reader needs</dt><dd>{journey.need}</dd></div><div><dt>Lead with</dt><dd>{journey.lead}</dd></div><div><dt>Documented proof to surface</dt><dd><ul>{journey.proof.map((item) => <li key={item}>{item}</li>)}</ul></dd></div><div><dt>Proposed editorial move</dt><dd>{journey.proposedMove}</dd></div><div><dt>Intended conversion</dt><dd>{journey.conversion}</dd></div></dl>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="scenario-title">
        <p className={styles.eyebrow}>03 · Scenario simulator</p><h2 id="scenario-title">Change the objective. Reconfigure the system.</h2>
        <label className={styles.selectLabel}>Strategic objective<select value={scenario.id} onChange={(event) => { setScenarioId(event.target.value); track("strategy_scenario_selected", { profile: slug, scenario: event.target.value }); track("experiment_conversion", { experiment: experiments.strategyOrientation.id, arm: experiment.arm, action: "scenario_selected", preview: experiment.preview }); }}>{strategy.scenarios.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <div className={styles.scenarioGrid} aria-live="polite">
          <article><span>Objective</span><h3>{scenario.goal}</h3></article><article><span>Position</span><h3>{scenario.position}</h3></article>
          <article><span>Channel system</span><ul>{scenario.channels.map((item) => <li key={item}>{item}</li>)}</ul></article><article><span>First moves</span><ol>{scenario.firstMoves.map((item) => <li key={item}>{item}</li>)}</ol></article><article><span>Measure</span><ul>{scenario.measures.map((item) => <li key={item}>{item}</li>)}</ul></article>
        </div>
        <p className={styles.note}>Simulation output is an RN Studio recommendation. It does not indicate that {profile.name} requested, approved, or implemented this strategy.</p>
      </section>

      <footer className={styles.footer}><div><p className={styles.eyebrow}>Continue exploring</p><h2>Trace the strategy back to its evidence.</h2></div><div><Link href={`/profiles/${slug}`}>Open full dossier</Link><Link href={`/intelligence?profile=${slug}`}>Open intelligence index</Link></div></footer>
    </main>
  );
}

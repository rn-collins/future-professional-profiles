"use client";

import { track } from "@vercel/analytics";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import ProductNavigation from "../components/ProductNavigation";
import { browserAssignment, experiments, type ExperimentArm } from "../experiments";
import { deliverables, measures, options, timeline } from "./engagement-data";
import styles from "./engage.module.css";

type InitialContext = { recipient?: string; profile?: string; goal?: string };
type FormState = { name: string; organization: string; email: string; focus: string; audience: string; outcome: string; context: string };

const emptyForm: FormState = { name: "", organization: "", email: "", focus: "Strategy foundation", audience: "", outcome: "", context: "" };

export default function EngageClient({ initial }: { initial: InitialContext }) {
  const [form, setForm] = useState<FormState>(() => ({ ...emptyForm, name: initial.recipient ?? "", outcome: initial.goal ?? "", context: initial.profile ? `Profile context: ${initial.profile}` : "" }));
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState("");
  const [experiment, setExperiment] = useState<{ arm: ExperimentArm; preview: boolean }>({ arm: "control", preview: false });
  const exposureTracked = useRef(false);
  const inquiryHeading = useRef<HTMLHeadingElement>(null);
  const personalized = Boolean(initial.recipient || initial.profile || initial.goal);
  const printPage = () => { track("engagement_page_printed", { personalized }); window.print(); };
  useEffect(() => {
    const assignment = browserAssignment(experiments.engageBrief);
    setExperiment(assignment);
    if (!exposureTracked.current) { track("experiment_exposure", { experiment: experiments.engageBrief.id, arm: assignment.arm, preview: assignment.preview }); exposureTracked.current = true; }
  }, []);
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const selectOption = (id: string, name: string) => {
    update("focus", name);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    inquiryHeading.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    inquiryHeading.current?.focus({ preventScroll: true });
    track("engagement_option_selected", { option: id });
  };
  const briefText = useMemo(() => [
    "STRATEGY SESSION INQUIRY BRIEF",
    "Prepared locally—nothing has been submitted",
    "",
    `Name: ${form.name || "Not provided"}`,
    `Organization: ${form.organization || "Not provided"}`,
    `Reply email: ${form.email || "Not provided"}`,
    `Engagement interest: ${form.focus}`,
    `Priority audience: ${form.audience || "To be determined"}`,
    `Desired outcome: ${form.outcome || "To be determined"}`,
    `Context: ${form.context || "None provided"}`,
    "",
    "This brief expresses interest only. Scope, timing, access, permissions, deliverables, and fees remain to be agreed.",
  ].join("\n"), [form]);

  const createBrief = (event: FormEvent) => {
    event.preventDefault();
    setBrief(briefText);
    setStatus("Your inquiry brief is ready. Nothing was sent.");
    track("inquiry_brief_created", { option: form.focus, personalized });
    track("experiment_conversion", { experiment: experiments.engageBrief.id, arm: experiment.arm, action: "brief_created", preview: experiment.preview });
  };
  const copyBrief = async () => {
    try { await navigator.clipboard.writeText(brief); setStatus("Inquiry brief copied."); track("inquiry_brief_copied", { option: form.focus }); }
    catch { setStatus("Copy is unavailable in this browser. You can select the brief text manually."); }
  };
  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "rn-studio-inquiry-brief.txt"; link.click(); URL.revokeObjectURL(url);
    setStatus("Inquiry brief downloaded."); track("inquiry_brief_downloaded", { option: form.focus });
  };

  return <main className={styles.shell}>
    <ProductNavigation className={styles.productNav} /><button className={styles.printButton} onClick={printPage}>Print / save PDF</button>
    <header className={styles.hero}>
      <p className={styles.eyebrow}>RN Studio · Engagement design</p>
      <h1>{initial.recipient ? `${initial.recipient}, let’s make the invisible value visible.` : "Build the public evidence of consequential work."}</h1>
      <p>This is not a menu of generic content services. It is a research, positioning, editorial, and product system designed around the decision your audience needs to make.</p>
      {personalized && <div className={styles.privateContext}><strong>Private-link context</strong><span>{[initial.profile && `Profile: ${initial.profile}`, initial.goal && `Priority: ${initial.goal}`].filter(Boolean).join(" · ") || "Recipient-specific view"}</span></div>}
      <p className={styles.experimentNote}>Experience test: <strong>{experiment.arm}</strong>{experiment.preview ? " preview" : " assignment"}. Assignment stays in this browser. Aggregate exposure and conversion events contain no form text or browser identifier. The test changes one truthful button label—not scope, price, access, or eligibility.</p>
    </header>

    <section className={styles.discovery} aria-labelledby="discovery-title"><p className={styles.eyebrow}>01 · What the prototype demonstrates</p><h2 id="discovery-title">Discovery before deliverables.</h2><div><article><h3>The public record is not the strategy.</h3><p>Facts establish the permissible foundation. Research also reveals what is fragmented, invisible, undifferentiated, or still unresolved.</p></article><article><h3>The profile is not the product.</h3><p>The deeper product is a repeatable system connecting evidence, audience need, editorial choices, distribution, and measurable business movement.</p></article><article><h3>The future is not presented as fact.</h3><p>Proposed copy, content, journeys, and outcomes remain clearly separated from documented history and require approval before publication.</p></article></div></section>

    <section className={styles.section} aria-labelledby="deliverables-title"><p className={styles.eyebrow}>02 · Complete system</p><h2 id="deliverables-title">What RN Studio can build</h2><div className={styles.cardGrid}>{deliverables.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div></section>

    <section className={styles.darkSection} aria-labelledby="options-title"><p className={styles.eyebrow}>03 · Ways to work together</p><h2 id="options-title">Choose the depth—not a prefabricated package.</h2><p className={styles.intro}>These are engagement structures, not quotations. Scope and fees depend on evidence volume, production cadence, access, review requirements, rights, and technical complexity.</p><div className={styles.optionGrid}>{options.map((option) => <article key={option.id}><h3>{option.name}</h3><p>{option.fit}</p><ul>{option.includes.map((item) => <li key={item}>{item}</li>)}</ul><button onClick={() => selectOption(option.id, option.name)}>Build an inquiry around this</button></article>)}</div></section>

    <section className={styles.section} aria-labelledby="workflow-title"><p className={styles.eyebrow}>04 · Workflow</p><h2 id="workflow-title">A release process built for trust.</h2><ol className={styles.timeline}>{timeline.map(([number, title, detail]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol></section>

    <section className={styles.measureSection} aria-labelledby="measure-title"><p className={styles.eyebrow}>05 · Measurement</p><h2 id="measure-title">Measure movement, not applause.</h2><dl>{measures.map(([name, detail]) => <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>)}</dl><p>Targets are established only after baseline access, objectives, attribution rules, and the relevant decision cycle are known. No outcome is guaranteed.</p></section>

    <section className={styles.formSection} id="inquiry" aria-labelledby="inquiry-title"><div><p className={styles.eyebrow}>06 · Strategy-session brief</p><h2 id="inquiry-title" ref={inquiryHeading} tabIndex={-1}>Give the first conversation a useful starting point.</h2><p>This form does not transmit data. It creates a private text brief in your browser for you to review, copy, or download.</p></div><form onSubmit={createBrief}><label>Name<input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></label><label>Organization<input value={form.organization} onChange={(e) => update("organization", e.target.value)} autoComplete="organization" /></label><label>Reply email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></label><label>Engagement interest<select value={form.focus} onChange={(e) => update("focus", e.target.value)}>{options.map((option) => <option key={option.id}>{option.name}</option>)}</select></label><label>Priority audience<textarea value={form.audience} onChange={(e) => update("audience", e.target.value)} /></label><label>What should change?<textarea value={form.outcome} onChange={(e) => update("outcome", e.target.value)} /></label><label className={styles.wide}>Context, constraints, or timing<textarea value={form.context} onChange={(e) => update("context", e.target.value)} /></label><button className={styles.createButton} type="submit">{experiment.arm === "variant" ? "Prepare my private strategy brief" : "Create my inquiry brief"}</button></form>
      <p className={styles.status} role="status">{status}</p>{brief && <div className={styles.brief}><div><strong>Inquiry brief preview</strong><div><button onClick={copyBrief}>Copy brief</button><button onClick={downloadBrief}>Download .txt</button></div></div><pre tabIndex={0}>{brief}</pre></div>}
    </section>
  </main>;
}

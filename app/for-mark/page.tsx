import type { Metadata } from "next";
import Image from "next/image";
import markYoungPortrait from "../../public/mark-young.jpg";
import Link from "next/link";
import styles from "./for-mark.module.css";
import PrintButton from "./PrintButton";
import { markPrivateData, markPrivateSources } from "./mark-private-data";


export const metadata: Metadata = {
  title: { absolute: "A publishing plan for Mark H. Young | RN Studio" },
  description:
    "RN Studio researched Mark H. Young’s public work and prepared this private publishing concept.",
  applicationName: "Mark H. Young | Private RN Studio draft",
  keywords: [
    "Mark H. Young",
    "True Real Estate Hawaiʻi",
    "publishing plan for real estate professionals",
    "real estate content strategy",
    "RN Studio",
  ],
  authors: [{ name: "RN Studio" }],
  creator: "RN Studio",
  publisher: "RN Studio",
  alternates: { canonical: "/for-mark" },
  robots: { index: false, follow: false, nocache: true },
  referrer: "no-referrer",
  openGraph: {
    title: "A publishing plan for Mark H. Young",
    description: "A private working draft prepared by RN Studio.",
    url: "/for-mark",
    siteName: "RN Studio",
    images: [{ url: "/for-mark/opengraph-image", width: 1200, height: 630, alt: "A publishing plan for Mark H. Young, prepared by RN Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A publishing plan for Mark H. Young",
    description: "A private working draft prepared by RN Studio.",
    images: ["/for-mark/opengraph-image"],
  },
};

const proof = [
  {
    value: "Founder",
    label: "Founder of True Real Estate Hawaiʻi",
    source: "Pacific Business News",
    url: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html",
  },
  {
    value: "RS-72387",
    label: "License number listed by HBR",
    source: "Honolulu Board of REALTORS®",
    url: markPrivateData.sources.directory.url,
  },
  {
    value: "Finance and appraisal",
    label: "Training that shapes the idea on this page",
    source: "True Real Estate Hawaiʻi",
    url: markPrivateData.sources.biography.url,
  },
];

const system = [
  ["01", "Talk it through", "A recorded conversation gives RN Studio the language, stories, questions, and judgment needed for the first draft."],
  ["02", "Check every fact", "Each factual statement is tied to a source and dated. Uncertain details stay out until Mark confirms them."],
  ["03", "Write and design", "RN Studio turns the source material into the agreed series and prepares each piece for its intended channel."],
  ["04", "Mark reviews", "Mark decides whether the work sounds right and whether any client, transaction, or market detail can appear."],
  ["05", "Use the response", "Serious questions and relevant introductions help determine what to publish next. Raw reach is secondary."],
];

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className={styles.source} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}

export default function ForMarkPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#opportunity">Skip to the idea</a>
      <header className={styles.topbar}>
        <a href="#top" className={styles.brand} aria-label="RN Studio, return to beginning">
          <span aria-hidden="true">RN</span><b>RN Studio</b>
        </a>
        <nav aria-label="Presentation sections">
          <a href="#opportunity">Idea</a>
          <a href="#demonstration">Example</a>
          <Link href="/for-mark/research">Research</Link>
          <a href="#pilot">Engagement</a>
        </nav>
        <PrintButton />
      </header>

      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Prepared for Mark H. Young · Private working draft</p>
          <h1 id="hero-title">People can see what you sell. They cannot yet see how you decide.</h1>
          <p className={styles.lede}>Mark, your finance and appraisal background changes how you read a property. This page shows how that experience could become useful public work before someone calls you.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#opportunity">See the opportunity</a>
            <a className={styles.secondary} href="#pilot">See the engagement</a>
          </div>
          <p className={styles.boundary}><b>Before you read:</b> You did not ask for this, and you have not reviewed or approved it. Every recommendation is still a draft.</p>
        </div>
        <figure className={styles.portrait}>
          <div className={styles.imageFrame}>
            <Image
              src={markYoungPortrait}
              alt="Mark H. Young"
              fill
              priority
              placeholder="blur"
              quality={75}
              sizes="(max-width: 520px) calc(100vw - 2rem), (max-width: 860px) 460px, 38vw"
            />
          </div>
          <figcaption>
            <span>Mark H. Young</span>
            <small>Founder &amp; President · True Real Estate Hawaiʻi</small>
            <small>This portrait appears on Mark’s company website. RN Studio would obtain permission before using it publicly.</small>
          </figcaption>
        </figure>
      </section>

      <section className={styles.proofStrip} aria-label="Public facts used on this page">
        {proof.map((item) => <article key={item.value}>
          <strong>{item.value}</strong><p>{item.label}</p><SourceLink href={item.url}>{item.source}</SourceLink>
        </article>)}
      </section>

      <section className={styles.section} id="opportunity" aria-labelledby="opportunity-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>01 · The idea</p>
          <h2 id="opportunity-title">Your record is credible. The interesting part is still missing.</h2>
        </div>
        <div className={styles.signalGrid}>
          <article>
            <p className={styles.cardLabel}>What a prospect can see now</p>
            <h3>An Oʻahu broker with a long local record.</h3>
            <ul>
              <li>Founder and president of an independent Hawaiʻi brokerage.</li>
              <li>Finance education and earlier appraisal experience.</li>
              <li>A company-published recognition history and an active Oʻahu practice.</li>
            </ul>
            <p className={styles.note}>The credibility is already there. The harder problem is distinction: many accomplished agents lead with the same categories.</p>
          </article>
          <article className={styles.darkCard}>
            <p className={styles.cardLabel}>What I would ask Mark to show</p>
            <h3>The decisions behind the transaction.</h3>
            <ul>
              <li>What his appraisal training makes him notice first.</li>
              <li>How he orders the decisions in a purchase, sale, negotiation, or investment.</li>
              <li>Which local details change the risk.</li>
              <li>When he advises a client to slow down or walk away.</li>
            </ul>
          </article>
        </div>
        <blockquote className={styles.positioning}>
          <span>The position I would test</span>
          <p>“The advisor who sees beneath the listing.”</p>
          <div>Let people watch him think before they decide whom to call.</div>
        </blockquote>
        <aside className={styles.researchPreview} aria-labelledby="research-preview-title">
          <div><p className={styles.eyebrow}>What buyers, sellers, and owners need help deciding</p><h3 id="research-preview-title">Mark’s strongest subjects are the questions that require judgment.</h3><p>Public evidence points to decision-grade questions about condominium finances, value versus price, insurance and flood exposure, seller pricing, and investor downside. It also shows a crowded field of market updates, relocation guides, and luxury showcases.</p></div>
          <div><p><b>What the public evidence suggests:</b> Build recurring decision tools that show what Mark would verify, what changes the answer, and where clients need another licensed professional.</p><p><b>What we still need to learn from Mark:</b> His priority clients, transaction mix, service areas, referral relationships, and the language real clients use. Measured search volume and conversion demand require paid datasets and first-party analytics.</p><Link className={styles.secondary} href="/for-mark/research">Open the research dossier</Link></div>
        </aside>
      </section>

      <section className={styles.section} id="demonstration" aria-labelledby="demonstration-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>02 · What the content could be</p>
          <h2 id="demonstration-title">Turn the thinking into work people can use.</h2>
          <p>Each piece would answer a real property question and show the reasoning behind the answer. Over time, a prospective client could understand how Mark works before making contact.</p>
        </div>
        <div className={styles.seriesGrid}>
          <article><span>Weekly decision note</span><h3>What the Listing Doesn’t Tell You</h3><p>Take one overlooked question and explain when it changes the price, the risk, or the fit.</p><b>For buyers and investors</b></article>
          <article><span>Decision-tree carousel</span><h3>Decision Before Transaction</h3><p>Walk a household through the order of a move: timing, contingencies, carrying costs, and the priorities that settle a difficult choice.</p><b>For families and sellers</b></article>
          <article><span>Monthly market brief</span><h3>What the Oʻahu Numbers Actually Change</h3><p>Take one market headline and explain which property, place, and decision it actually applies to.</p><b>For owners and referral partners</b></article>
        </div>

        <article className={styles.sample} aria-labelledby="sample-title">
          <div className={styles.sampleMeta}>
            <span>Working example · Written by RN Studio</span>
            <p>Mark has not reviewed this. It shows the kind of practical question the proposed series could address.</p>
          </div>
          <div className={styles.sampleBody}>
            <p className={styles.sampleKicker}>What the listing doesn’t tell you · Concept 01</p>
            <h3 id="sample-title">The ocean view is obvious. Start with the expensive questions.</h3>
            <p>A waterfront showing pulls your eyes toward the horizon. Before discussing price, check the shoreline, flood exposure, deferred maintenance, renovation history, insurance, and the cost of a bad assumption.</p>
            <p>The view matters. So do the risks that never appear in listing photos.</p>
            <p className={styles.sampleClose}>Five questions to answer before writing an offer on an Oʻahu waterfront home.</p>
            <div className={styles.evidenceBox}><b>Why this example fits</b><p>Mark’s company biography documents his finance and appraisal background. RN Studio wrote the questions above as an example; they are not Mark’s advice. Publication would require his review, the records for the property in question, and photographs we have permission to use.</p><SourceLink href={markPrivateData.sources.biography.url}>Professional biography</SourceLink></div>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.systemSection}`} aria-labelledby="system-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>03 · How the work gets made</p>
          <h2 id="system-title">Mark supplies the judgment. RN Studio handles the production.</h2>
        </div>
        <ol className={styles.systemList}>
          {system.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ol>
        <div className={styles.guardrails}>
          <h3>Before anything is published</h3>
          <div><p><b>Ready after fact-checking</b> Career facts, dated market reports, public property records, and Mark’s own analysis.</p><p><b>Needs specific permission</b> Client stories, sales claims, property photographs, forecasts, and transaction examples.</p><p><b>Off limits</b> Invented testimonials, private client details, made-up results, false urgency, and draft work presented as something Mark already published.</p></div>
        </div>
      </section>

      <section className={styles.section} id="pilot" aria-labelledby="pilot-title">
        <aside className={styles.demonstrated} aria-labelledby="demonstrated-title">
          <p className={styles.eyebrow}>What I bring to the work</p>
          <h2 id="demonstrated-title">I find the story before I produce the content.</h2>
          <p>I researched your public record, checked the claims, found the clearest opening, developed the series, wrote an example, and built the page you are reading. Now you can judge the work itself.</p>
          <div className={styles.advantageGrid}>
            <article>
              <h3>Deep research</h3>
              <p>I examine your work, public record, market, audiences, competitors, and the questions people search before recommending what to make.</p>
            </article>
            <article>
              <h3>Original opportunities</h3>
              <p>I look beyond individual posts for useful series, client resources, partnerships, and subjects your experience allows you to explain well.</p>
            </article>
            <article>
              <h3>On-brand writing</h3>
              <p>I learn how you explain decisions, then write and edit for your voice, standards, audience, and channel.</p>
            </article>
            <article>
              <h3>Business purpose</h3>
              <p>Every piece should help the right person understand your judgment, make a better decision, or know when to call.</p>
            </article>
          </div>
          <p className={styles.advantageClose}>Research continues throughout the engagement. It shapes what we make next and can uncover opportunities outside the original content plan.</p><div className={styles.credentials}><p className={styles.eyebrow}>Why RN</p><h3>The person who finds the idea also makes the work.</h3><p>I am a researcher, writer, strategist, and hands-on producer. My work has included research at Harvard Business School, writing instruction as a Boston University Writing Fellow, regulatory and education work with the Yale Program for Psychedelic Science, and published long-form writing.</p><p>I hold graduate degrees in developmental psychology and anatomy and neurobiology, and I am now studying law at Northeastern. That background taught me to find the useful question, follow the evidence, understand how different audiences make decisions, and turn complex expertise into clear work people can use.</p><p>I would do that work personally for you, from the first interview through the research, writing, design, and final preparation.</p></div>
        </aside>
        <div className={styles.pilotIntro}>
          <p className={styles.eyebrow}>04 · A practical first engagement</p>
          <h2 id="pilot-title">A 90-day pilot built around useful work.</h2>
          <p>The first three months would establish the strategy, produce the first pieces, and give us enough evidence to decide what deserves continued investment. You would work directly with RN Studio throughout. There is no handoff to junior staff.</p>
          <p>We would begin with the audience and business priority that matter most now. This schedule is illustrative and would change as we learn from you, the available evidence, and the response to the work.</p>
        </div>
        <div className={styles.pilotMonths}>
          <article><span>Month 1</span><h3>Find the position and build the foundation</h3><ul><li>One focused voice and strategy interview</li><li>Priority-audience, competitor, search-result, and source review</li><li>Refined positioning, profile language, and editorial direction</li><li>One source-backed flagship piece and smaller adaptations</li><li>A prioritized 90-day editorial backlog</li></ul></article>
          <article><span>Month 2</span><h3>Establish a recognizable series</h3><ul><li>Continued audience and market research</li><li>The first installment of a recurring decision-focused series</li><li>Writing, fact-checking, design, and channel preparation</li><li>Useful adaptations and review of early audience signals</li><li>A recommendation for the next production priority</li></ul></article>
          <article><span>Month 3</span><h3>Turn the work into a repeatable system</h3><ul><li>A second major piece chosen from the evidence gathered</li><li>A client-education, referral, or market-intelligence resource</li><li>Supporting adaptations for the agreed channels</li><li>A review of what helped people understand your judgment</li><li>A next-quarter editorial and business recommendation</li></ul></article>
        </div>
        <p className={styles.pilotBoundary}>This is an illustrative sequence, not a promise that every possible format will be produced. The exact mix depends on the subject, evidence requirements, complexity, your review time, and any permissions needed.</p>
        <div className={styles.pilotGrid}>
          <div>
            <h3>What the working rhythm looks like</h3>
            <p>One primary piece moves through research, writing, design, fact-checking, and approval at a time. As soon as that piece is approved or completed, the next priority enters production.</p>
            <p>This limits simultaneous work; it does not mean one deliverable per month. Research, planning, performance review, and smaller adaptations can continue while the primary piece is active.</p>
            <h3>What I need from you</h3>
            <p>The usual rhythm would be one focused conversation for each major piece and one consolidated review. RN Studio handles the research, drafting, editing, design, sourcing, and preparation. Nothing written in your voice is published without your approval.</p>
            <h3>How we judge the pilot</h3>
            <p>Before production begins, we agree on the business priority and the signals worth watching: qualified questions, useful introductions, referral conversations, client responses, saves, replies, or clearer understanding of your judgment.</p>
            <h3>After 90 days</h3>
            <p>Either party may stop at the end of the pilot. If we both want to continue, the engagement becomes month to month at the agreed scope and rate. Any change in production capacity or scope would be agreed in writing first.</p>
          </div>
          <div className={styles.deliverables}>
            <div className={styles.priceBlock}><span>90-day pilot</span><div><strong>$5,000</strong><small>per month</small></div><p>Billed monthly for three months. You work directly with RN Studio from the first interview through final preparation.</p></div>
            <h3>Included during the pilot</h3>
            <ul><li>Audience, market, competitor, search-result, and reputation research</li><li>Positioning, messaging, and original editorial opportunities</li><li>Interviews and source gathering</li><li>Editorial concepts and a prioritized production backlog</li><li>Writing, editing, design, and fact-checking</li><li>Preparation for the agreed channels</li><li>Evidence links, attribution, and image-permission guidance</li><li>One consolidated revision process for each primary piece, with reasonable corrections</li><li>Smaller adaptations created from approved primary work</li><li>A rolling 90-day plan, performance review, and next-step recommendations</li></ul>
            <div className={styles.scopeNote}><h3>Quoted separately</h3><ul><li>Multiple primary pieces produced simultaneously</li><li>Daily publishing, inbox work, or community management</li><li>Paid advertising, sponsorships, and media spend</li><li>Professional photography, filming crews, travel, and event production</li><li>Printing, licensing, paid datasets, software, and outside costs</li><li>Full website development, public-relations outreach, and crisis communications</li><li>Rush production or revision cycles outside the agreed process</li></ul></div>
            <p>Audience growth, leads, transactions, revenue, and search rankings cannot be guaranteed. The pilot is designed to produce strong work, observe credible signals, and determine whether the system merits continued investment.</p>
          </div>
        </div>

        <div className={styles.objections}>
          <h3>Questions you may have</h3>
          <details><summary>“I do not want another job.”</summary><p>You would bring the judgment and approve the final work. RN Studio would do the research, writing, design, editing, and preparation for each channel.</p></details>
          <details><summary>“How much of my time would this take?”</summary><p>We would agree on a manageable interview and review schedule before starting. A typical cycle would include one focused conversation and one consolidated review, but the schedule would follow the work we choose.</p></details>
          <details><summary>“How would it sound like me?”</summary><p>The current example is RN Studio’s writing. An engagement would begin by recording how you explain decisions, which words you use, and what you would never say. Nothing written in your voice would be published until you approve it.</p></details>
          <details><summary>“What about my clients?”</summary><p>We would use client or transaction details only with appropriate permission. Otherwise, the detail would be removed. Any teaching example assembled from more than one situation would be labeled as an illustration.</p></details>
          <details><summary>“How would we judge the first 90 days?”</summary><p>Before publishing, we would agree on what counts: relevant replies, useful introductions, qualified questions, or new conversations. Audience size would provide context but would not decide the result by itself.</p></details>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="cta-title">
        <p className={styles.eyebrow}>The invitation</p>
        <h2 id="cta-title">Worth a conversation?</h2>
        <p>I would spend 30 minutes learning which part of the business matters most to you right now. From there, we could choose the first piece and decide whether the monthly subscription makes sense.</p>
        <div className={styles.actions}><a className={styles.primary} href="#conversation-brief">See the conversation brief</a><a className={styles.secondary} href="#sources">Review the evidence</a></div>
      </section>

      <section className={styles.brief} id="conversation-brief" aria-labelledby="brief-title">
        <p className={styles.eyebrow}>What I would want to learn from you</p>
        <h2 id="brief-title">The first call would answer these questions.</h2>
        <ol><li>Which kind of client or business opportunity matters most right now?</li><li>Which parts of your experience are you comfortable discussing publicly?</li><li>What would make the first 90 days worthwhile to you?</li></ol>
        <p className={styles.reply}>If I sent you this link, reply to my message and we can find a time.</p>
      </section>

      <section className={styles.sources} id="sources" aria-labelledby="sources-title">
        <div><p className={styles.eyebrow}>Sources</p><h2 id="sources-title">Sources for the facts on this page.</h2><p>These pages support the public facts used in this draft. They do not imply that Mark or any publisher approves the proposal.</p></div>
        <ul>{markPrivateSources.map((source) => <li key={source.url}><SourceLink href={source.url}>{source.label}</SourceLink></li>)}</ul>
      </section>

      <footer className={styles.footer}>
        <p><b>RN Studio prepared this independently.</b> Mark H. Young and True Real Estate Hawaiʻi did not commission or approve this private draft. The cited publishers are sources, not sponsors.</p>
        <p>Everything proposed here remains a draft. For a correction or removal request, see the <Link href="/for-mark/corrections">private reply instructions</Link>.</p>
      </footer>
    </main>
  );
}

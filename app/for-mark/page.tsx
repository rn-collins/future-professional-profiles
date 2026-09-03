import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./for-mark.module.css";
import PrintButton from "./PrintButton";
import { markPrivateData, markPrivateSources } from "./mark-private-data";


export const metadata: Metadata = {
  title: "A professional authority system for Mark H. Young",
  description:
    "A private, evidence-led strategic demonstration prepared for Mark H. Young by RN Studio.",
  applicationName: "Mark H. Young — Private RN Studio Demonstration",
  keywords: [
    "Mark H. Young",
    "True Real Estate Hawaiʻi",
    "professional authority strategy",
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
    title: "A professional authority system for Mark H. Young",
    description: "An independent strategic demonstration prepared by RN Studio.",
    url: "/for-mark",
    siteName: "RN Studio",
    images: [{ url: "/for-mark/opengraph-image", width: 1200, height: 630, alt: "A professional authority system for Mark H. Young, prepared by RN Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A professional authority system for Mark H. Young",
    description: "An independent strategic demonstration prepared by RN Studio.",
    images: ["/for-mark/opengraph-image"],
  },
};

const proof = [
  {
    value: "Founder",
    label: "PBN-documented company leadership",
    source: "Pacific Business News",
    url: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html",
  },
  {
    value: "RS-72387",
    label: "HBR-listed license number",
    source: "Honolulu Board of REALTORS®",
    url: markPrivateData.sources.directory.url,
  },
  {
    value: "Finance + appraisal",
    label: "A documented analytical foundation",
    source: "True Real Estate Hawaiʻi",
    url: markPrivateData.sources.biography.url,
  },
];

const system = [
  ["01", "Extract the judgment", "One structured conversation turns lived expertise, recurring client questions, and decision patterns into usable source material."],
  ["02", "Build the evidence", "Every factual statement receives a source, date, confidence level, and review status before it enters a draft."],
  ["03", "Produce the series", "RN Studio develops the writing, visual logic, repurposing, and publishing package around an agreed point of view."],
  ["04", "Protect the voice", "Nothing publishes without Mark’s review. Client details, transaction claims, and market conclusions receive additional gates."],
  ["05", "Learn from response", "Questions, qualified replies, evidence opens, and conversations guide the next cycle—not vanity reach alone."],
];

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className={styles.source} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}

export default function ForMarkPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#opportunity">Skip to the strategic opportunity</a>
      <header className={styles.topbar}>
        <a href="#top" className={styles.brand} aria-label="RN Studio, return to beginning">
          <span aria-hidden="true">RN</span><b>RN Studio</b>
        </a>
        <nav aria-label="Presentation sections">
          <a href="#opportunity">Opportunity</a>
          <a href="#demonstration">Demonstration</a>
          <a href="#pilot">Pilot</a>
        </nav>
        <PrintButton />
      </header>

      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Prepared for Mark H. Young · Private strategic demonstration</p>
          <h1 id="hero-title">Your most valuable inventory may be the judgment people cannot see yet.</h1>
          <p className={styles.lede}>Mark, this is a concrete demonstration of how your public presence could make the reasoning behind consequential property decisions visible—before someone needs an agent.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#opportunity">See the opportunity</a>
            <a className={styles.secondary} href="#pilot">Review the pilot</a>
          </div>
          <p className={styles.boundary}><b>Clear boundary:</b> RN Studio created this independently from public evidence. You did not request, approve, hire, or endorse this work. All future-facing language is a proposal for your review.</p>
        </div>
        <figure className={styles.portrait}>
          <div className={styles.imageFrame}>
            <Image src={markPrivateData.image} alt="Mark H. Young" fill priority sizes="(max-width: 760px) 82vw, 38vw" />
          </div>
          <figcaption>
            <span>Mark H. Young</span>
            <small>Founder &amp; President · True Real Estate Hawaiʻi</small>
            <small>Public professional portrait; reuse authorization should be confirmed before external publication.</small>
          </figcaption>
        </figure>
      </section>

      <section className={styles.proofStrip} aria-label="Selected documented foundation">
        {proof.map((item) => <article key={item.value}>
          <strong>{item.value}</strong><p>{item.label}</p><SourceLink href={item.url}>{item.source}</SourceLink>
        </article>)}
      </section>

      <section className={styles.section} id="opportunity" aria-labelledby="opportunity-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>01 · The opportunity</p>
          <h2 id="opportunity-title">The public record establishes credibility. It does not yet reveal the method.</h2>
        </div>
        <div className={styles.signalGrid}>
          <article>
            <p className={styles.cardLabel}>What a prospect can see now</p>
            <h3>A locally rooted brokerage leader.</h3>
            <ul>
              <li>Founder and president of an independent Hawaiʻi brokerage.</li>
              <li>Finance education and earlier appraisal experience.</li>
              <li>A company-published recognition history and public listing activity across Oʻahu.</li>
            </ul>
            <p className={styles.note}>These are useful trust signals. They also resemble the categories many accomplished agents lead with.</p>
          </article>
          <article className={styles.darkCard}>
            <p className={styles.cardLabel}>The method RN Studio proposes making visible</p>
            <h3>How Mark could make the hard call legible.</h3>
            <ul>
              <li>How appraisal discipline changes what he notices.</li>
              <li>How he sequences a sale, purchase, negotiation, or investment decision.</li>
              <li>How local fluency becomes practical risk detection—not atmosphere.</li>
              <li>How he protects the client when the beautiful answer is not the right one.</li>
            </ul>
          </article>
        </div>
        <blockquote className={styles.positioning}>
          <span>RN Studio’s proposed position</span>
          <p>“The advisor who sees beneath the listing.”</p>
          <footer>Make consequential reasoning visible before a prospect ever needs an agent.</footer>
        </blockquote>
      </section>

      <section className={styles.section} id="demonstration" aria-labelledby="demonstration-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>02 · Content demonstration</p>
          <h2 id="demonstration-title">Not more real-estate content. A body of useful judgment.</h2>
          <p>The advantage is not publishing more often. It is showing, with discipline and proof, the reasoning a client would otherwise discover only after hiring you.</p>
        </div>
        <div className={styles.seriesGrid}>
          <article><span>Weekly decision note</span><h3>What the Listing Doesn’t Tell You</h3><p>Expose one overlooked diligence question and show exactly when it changes cost, value, risk, or fit.</p><b>For buyers + investors</b></article>
          <article><span>Decision-tree carousel</span><h3>Decision Before Transaction</h3><p>Make the hidden sequencing of a move legible: timing, contingencies, carrying cost, leverage, and the household priority beneath each term.</p><b>For families + sellers</b></article>
          <article><span>Monthly market brief</span><h3>What the Oʻahu Numbers Actually Change</h3><p>Separate a broad headline from the specific segment, place, and decision the underlying data can actually inform.</p><b>For owners + referral partners</b></article>
        </div>

        <article className={styles.sample} aria-labelledby="sample-title">
          <div className={styles.sampleMeta}>
            <span>Proposed post · Not written, published, or approved by Mark</span>
            <p>Purpose: demonstrate appraisal-informed judgment through an immediately useful diligence frame.</p>
          </div>
          <div className={styles.sampleBody}>
            <p className={styles.sampleKicker}>What the listing doesn’t tell you · Concept 01</p>
            <h3 id="sample-title">A view can win the showing. It cannot make the wrong property the right decision.</h3>
            <p>Before letting the horizon set the price, put the unphotogenic facts back into the decision: shoreline condition, flood exposure, deferred maintenance, renovation history, insurance, and the cost of being wrong.</p>
            <p>Beauty belongs in the analysis. It should never be allowed to replace it.</p>
            <p className={styles.sampleClose}>Five questions to answer before writing an offer on an Oʻahu waterfront home.</p>
            <div className={styles.evidenceBox}><b>Evidence basis</b><p>The strategic premise derives from Mark’s documented finance and appraisal background. The diligence questions are illustrative editorial framing—not attributed advice from Mark. Any publishable or property-specific version would require his technical review, applicable property records, and permission-cleared imagery.</p><SourceLink href={markPrivateData.sources.biography.url}>Professional biography</SourceLink></div>
          </div>
        </article>
      </section>

      <section className={`${styles.section} ${styles.systemSection}`} aria-labelledby="system-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>03 · The operating system</p>
          <h2 id="system-title">The work is designed to protect your time, voice, clients, and credibility.</h2>
        </div>
        <ol className={styles.systemList}>
          {system.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
        </ol>
        <div className={styles.guardrails}>
          <h3>Publication guardrails</h3>
          <div><p><b>Allowed</b> Verified career facts, dated market sources, public property records, and clearly labeled professional analysis.</p><p><b>Additional review</b> Client stories, production claims, property imagery, predictions, and any anonymized transaction pattern.</p><p><b>Never</b> Invented testimonials, private client details, fabricated outcomes, manufactured urgency, or a concept represented as past work.</p></div>
        </div>
      </section>

      <section className={styles.section} id="pilot" aria-labelledby="pilot-title">
        <aside className={styles.demonstrated} aria-labelledby="demonstrated-title">
          <p className={styles.eyebrow}>What this page already proves</p>
          <h2 id="demonstrated-title">This is not a list of services RN Studio might perform.</h2>
          <p>The public-record research, source ledger, positioning, editorial concepts, writing, interaction design, and private presentation you are reviewing are the work itself—applied to your actual professional presence before an engagement existed.</p>
        </aside>
        <div className={styles.pilotGrid}>
          <div>
            <p className={styles.eyebrow}>04 · A focused way to begin</p>
            <h2 id="pilot-title">One authority system. Ninety days. Built around the questions only you can answer.</h2>
            <p>The pilot would establish the positioning, extract the knowledge, produce a disciplined first body of work, and create a repeatable approval system your team can continue using.</p>
          </div>
          <div className={styles.deliverables}>
            <h3>Proposed pilot</h3>
            <ul>
              <li>Positioning and audience priorities</li>
              <li>Source-backed professional narrative</li>
              <li>Three signature editorial series</li>
              <li>Ninety-day content plan</li>
              <li>Core long-form piece and repurposing system</li>
              <li>Voice, evidence, and approval standards</li>
              <li>Measurement and learning review</li>
            </ul>
            <p>Scope, cadence, channels, and fee would be defined together after a fit conversation. No invented ROI or predetermined package is implied here.</p>
          </div>
        </div>

        <div className={styles.objections}>
          <h3>The reasonable questions</h3>
          <details><summary>“I do not want to become a full-time content creator.”</summary><p>You should not. The system is designed around periodic knowledge capture; RN Studio handles research, structure, drafting, visual direction, and repurposing. Your highest-value role is judgment and approval.</p></details>
          <details><summary>“What would this require from me?”</summary><p>A focused knowledge-capture conversation, decisions on what remains private, and one consolidated review per production cycle. The exact cadence would be agreed before work begins; this demonstration does not presume unlimited access to your time.</p></details>
          <details><summary>“How would this still sound like me?”</summary><p>Nothing in this demonstration is presented as your voice. A real engagement begins with language capture, examples, explicit voice rules, and an approval loop. First-person material cannot publish until you recognize yourself in it.</p></details>
          <details><summary>“What about client privacy and compliance?”</summary><p>Client and transaction material receives a separate evidence gate. Details are used only with appropriate permission, anonymized beyond recognition where that is genuinely sufficient, or excluded. If examples are combined for teaching purposes, they must be explicitly labeled as illustrative—not presented as an actual client or transaction.</p></details>
          <details><summary>“How would we know whether it is working?”</summary><p>We would establish a baseline, then attribute substantive replies, referral introductions, qualified questions, evidence engagement, and conversations to the ideas that created them. Reach is context—not the verdict.</p></details>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="cta-title">
        <p className={styles.eyebrow}>The invitation</p>
        <h2 id="cta-title">If this makes your existing expertise newly visible, let’s test whether the idea is worth building.</h2>
        <p>No formal presentation and no assumption of fit. In one conversation, we would identify the business priority, decide whether content is the right instrument, and define what a worthwhile pilot would need to prove.</p>
        <div className={styles.actions}><a className={styles.primary} href="#conversation-brief">See the conversation brief</a><a className={styles.secondary} href="#sources">Review the evidence</a></div>
      </section>

      <section className={styles.brief} id="conversation-brief" aria-labelledby="brief-title">
        <p className={styles.eyebrow}>A useful first conversation</p>
        <h2 id="brief-title">Thirty minutes, three decisions.</h2>
        <ol><li><b>Priority:</b> Which audience or business conversation matters most now?</li><li><b>Permission:</b> Which parts of Mark’s expertise should become publicly legible—and which should remain private?</li><li><b>Pilot:</b> What is the smallest body of work capable of proving strategic value?</li></ol>
        <p className={styles.reply}>If RN Studio sent you this link, replying to that message is the intended next step.</p>
      </section>

      <section className={styles.sources} id="sources" aria-labelledby="sources-title">
        <div><p className={styles.eyebrow}>Evidence ledger</p><h2 id="sources-title">The facts behind this demonstration.</h2><p>Sources establish specific public facts—not Mark’s approval of this strategy or every claim a source may contain.</p></div>
        <ul>{markPrivateSources.map((source) => <li key={source.url}><SourceLink href={source.url}>{source.label}</SourceLink></li>)}</ul>
      </section>

      <footer className={styles.footer}>
        <p><b>Independent work by RN Studio.</b> This private demonstration is not affiliated with Mark H. Young, True Real Estate Hawaiʻi, LinkedIn, or any source organization.</p>
        <p>Proposed copy remains proposed until subject review. Corrections or removal: <Link href="/for-mark/corrections">private-response instructions</Link>.</p>
      </footer>
    </main>
  );
}

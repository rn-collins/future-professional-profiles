"use client";

import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useEffect, useMemo, useState } from "react";
import { profiles, type Profile } from "./data";
import EditorialOperatingSystem from "./components/EditorialOperatingSystem";

type ProfileKey = "mark" | "sam";
type Lens = "overview" | "client" | "investor" | "community";
const lensCopy: Record<
  Lens,
  { label: string; eyebrow: string; description: string }
> = {
  overview: {
    label: "Full profile",
    eyebrow: "Complete narrative",
    description: "See the complete, source-governed professional story.",
  },
  client: {
    label: "Potential client",
    eyebrow: "Trust + decision support",
    description:
      "Prioritize the experience and ideas most useful to someone choosing an advisor.",
  },
  investor: {
    label: "Investor",
    eyebrow: "Risk + opportunity",
    description:
      "Surface valuation, infrastructure, downside, and investment judgment.",
  },
  community: {
    label: "Community",
    eyebrow: "Place + public consequence",
    description:
      "Emphasize local knowledge, public service, access, and community impact.",
  },
};
const themes: Record<ProfileKey, Record<Lens, string[]>> = {
  mark: {
    overview: ["local fluency", "disciplined analysis", "earned trust"],
    client: ["clear counsel", "prepared negotiation", "service after closing"],
    investor: ["valuation", "downside", "property strategy"],
    community: ["Kāneʻohe roots", "Oʻahu knowledge", "long-term stewardship"],
  },
  sam: {
    overview: ["land", "energy", "systems"],
    client: ["translation", "commercial transition", "honest tradeoffs"],
    investor: ["infrastructure", "cash flow", "risk discipline"],
    community: ["public process", "shared space", "neighborhood impact"],
  },
};

function Header({ openStrategy }: { openStrategy: () => void }) {
  return (
    <header className="topbar">
      <div className="topinner">
        <button
          className="brandMark"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="RN Studio profiles: return to top"
        >
          RN
        </button>
        <span className="siteName">Future professional profiles</span>
        <nav aria-label="Page navigation">
          <a href="#about">About</a>
          <a href="#featured">Featured</a>
          <a href="#activity">Ideas</a>
          <a href="#experience">Experience</a>
          <Link href="/intelligence">Intelligence</Link>
          <button onClick={openStrategy}>Strategy</button>
        </nav>
      </div>
    </header>
  );
}
function ProfileHero({ p, lens }: { p: Profile; lens: Lens }) {
  return (
    <section className="card hero" aria-labelledby="profile-name">
      <div className={`cover cover-${p.slug}`}>
        <div className="coverWords" aria-hidden="true">
          {p.slug === "mark" ? (
            <>
              PLACE
              <br />
              JUDGMENT
              <br />
              <i>TRUST</i>
            </>
          ) : (
            <>
              LAND
              <br />
              ENERGY
              <br />
              <i>SYSTEMS</i>
            </>
          )}
        </div>
      </div>
      <div className="heroBody">
        <div className={`avatar photo avatar-${p.slug}`}>
          <Image
            src={p.image}
            alt={`${p.name}${p.slug === "sam" ? " with his family" : ""}`}
            fill
            sizes="(max-width: 600px) 104px, 152px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="lensStamp">
          <small>{lensCopy[lens].eyebrow}</small>
          <span>{lensCopy[lens].description}</span>
        </div>
        <div className="heroGrid">
          <div>
            <h1 id="profile-name">{p.name}</h1>
            <p className="headline">{p.headline}</p>
            <p className="muted">{p.location}</p>
            <div className="themeChips" aria-label="Profile themes">
              {themes[p.slug][lens].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
          <div className="affiliations">
            <b>
              <span className="orgmark">{p.slug === "mark" ? "TR" : "RE"}</span>
              {p.company}
            </b>
            <b>
              <span className="schoolmark">H</span>
              {p.school}
            </b>
          </div>
        </div>
        <div className="actions">
          <a className="primary actionLink" href="#activity">
            Explore their ideas
          </a>
          <a className="outline actionLink" href="#research">
            Review sources
          </a>
          <Link
            className="outline actionLink"
            href={`/profiles/${p.slug}`}
            onClick={() =>
              track("standalone_profile_opened", { profile: p.slug })
            }
          >
            Open full dossier
          </Link>
        </div>
      </div>
    </section>
  );
}
function About({ p }: { p: Profile }) {
  return (
    <section className="card pad" id="about">
      <div className="sectionLabel">01 · Narrative</div>
      <h2>About</h2>
      {p.about.map((x, i) => (
        <p className="about" key={i}>
          {x}
        </p>
      ))}
    </section>
  );
}
function Featured({ p }: { p: Profile }) {
  return (
    <section className="card pad" id="featured">
      <div className="sectionLabel">02 · Editorial architecture</div>
      <h2>Featured ideas</h2>
      <div className="featured">
        {p.featured.map((f) => (
          <article key={f.title} className="feature">
            <div className={`featureArt ${f.tone}`}>
              <small>{f.status ?? f.kicker}</small>
              <strong>{f.title}</strong>
              <span aria-hidden="true">→</span>
            </div>
            <div className="featureCopy">
              <small>{f.kicker.toLowerCase()}</small>
              <b>{f.title}</b>
              <p>{f.description}</p>
              {f.evidence?.map((note) => (
                <p className="featureEvidence" key={note}>
                  Evidence basis: {note}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Activity({
  p,
  saved,
  toggleSaved,
}: {
  p: Profile;
  saved: string[];
  toggleSaved: (id: string) => void;
}) {
  const [view, setView] = useState<"posts" | "evidence">("posts");
  const [status, setStatus] = useState("");
  const copyLink = async (id: string) => {
    const url = `${location.origin}${location.pathname}?profile=${p.slug}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
      track("profile_link_copied", { profile: p.slug });
    } catch {
      setStatus("Copy unavailable.");
    }
  };
  return (
    <section className="card pad" id="activity">
      <div className="sectionLabel">03 · Content prototype</div>
      <div className="sectionHead">
        <div>
          <h2>Ideas in public</h2>
          <p>
            Editorial concepts grounded in the documented profile—not claims
            that these were published.
          </p>
        </div>
      </div>
      <div className="tabs" role="tablist" aria-label="Activity view">
        <button
          role="tab"
          aria-selected={view === "posts"}
          onClick={() => {
            setView("posts");
            track("activity_view_changed", { profile: p.slug, view: "posts" });
          }}
        >
          Concept posts
        </button>
        <button
          role="tab"
          aria-selected={view === "evidence"}
          onClick={() => {
            setView("evidence");
            track("activity_view_changed", {
              profile: p.slug,
              view: "evidence",
            });
          }}
        >
          Evidence map
        </button>
      </div>
      <p className="srOnly" aria-live="polite">
        {status}
      </p>
      {view === "posts" ? (
        p.posts.map((post, i) => {
          const id = `${p.slug}-post-${i + 1}`;
          const isSaved = saved.includes(id);
          return (
            <article className="post" id={id} key={id}>
              <div className="postHead">
                <div className={`miniAvatar photoMini avatar-${p.slug}`}>
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="48px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <b>{p.name}</b>
                  <small>Editorial content concept</small>
                  <small>{post.date} · source-governed prototype</small>
                </div>
                <span className="conceptPill">CONCEPT</span>
              </div>
              <p className="postText">{post.text}</p>
              <div className={`postArt ${post.art}`}>
                <span>
                  {post.art === "water"
                    ? "VALUE BEGINS BELOW THE VIEW"
                    : post.art === "keys"
                      ? "PREPARATION CREATES LEVERAGE"
                      : post.art === "grid"
                        ? "THE PLACE BELONGS IN THE MODEL"
                        : "CHANGE THE ASSET. CHANGE THE QUESTIONS."}
                </span>
              </div>
              <div className="evidenceLine">
                <span>{post.status} · directly linked evidence</span>
                {post.evidence.map((source, sourceIndex) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      track("post_evidence_opened", {
                        profile: p.slug,
                        post_index: i + 1,
                        source_index: sourceIndex + 1,
                      })
                    }
                  >
                    {source.label} ↗
                  </a>
                ))}
              </div>
              <details className="strategyNote">
                <summary>Why this concept exists</summary>
                <p>{post.strategy}</p>
              </details>
              <div className="postActions">
                <button
                  aria-pressed={isSaved}
                  onClick={() => {
                    toggleSaved(id);
                    track("concept_saved", {
                      profile: p.slug,
                      saved: !isSaved,
                    });
                  }}
                >
                  {isSaved ? "★ Saved" : "☆ Save"}
                </button>
                <button onClick={() => copyLink(id)}>↗ Copy link</button>
                <button
                  onClick={() => {
                    document.getElementById("strategy-open")?.click();
                  }}
                >
                  Open strategy
                </button>
              </div>
            </article>
          );
        })
      ) : (
        <div className="evidenceMap">
          {p.sources.map((source, i) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("source_opened", { profile: p.slug, source_index: i + 1 })
              }
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <b>{source.label}</b>
                <small>Public evidence · opens original source</small>
              </div>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
function Experience({ p }: { p: Profile }) {
  return (
    <section className="card pad" id="experience">
      <div className="sectionLabel">04 · Track record</div>
      <h2>Experience</h2>
      {p.experience.map((e) => (
        <article className="experience" key={e.role}>
          <div className="expMark">{e.mark}</div>
          <div>
            <h3>{e.role}</h3>
            <p>{e.org}</p>
            <small>{e.dates}</small>
            <p className="detail">{e.detail}</p>
          </div>
        </article>
      ))}
      <h2 className="educationTitle">Education</h2>
      {p.education.map((e) => (
        <article className="experience" key={e.school}>
          <div className="expMark schoolmark">H</div>
          <div>
            <h3>{e.school}</h3>
            <p>{e.degree}</p>
            <small>{e.dates}</small>
          </div>
        </article>
      ))}
    </section>
  );
}
function Skills({ p }: { p: Profile }) {
  return (
    <section className="card pad">
      <div className="sectionLabel">05 · Capabilities</div>
      <h2>Areas of practice</h2>
      <div className="skillCloud">
        {p.skills.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </section>
  );
}
function Research({ p }: { p: Profile }) {
  return (
    <section className="card pad sourceNote" id="research">
      <div className="sectionLabel">06 · Provenance</div>
      <h2>Research foundation</h2>
      <p>
        Every factual statement is governed by public evidence. Strategic
        concepts are labeled separately.
      </p>
      <ol>
        {p.sources.map((s, i) => (
          <li key={s.url}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("source_opened", { profile: p.slug, source_index: i + 1 })
              }
            >
              {s.label} ↗
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function StrategyPanel({
  p,
  lens,
  open,
  close,
}: {
  p: Profile;
  lens: Lens;
  open: boolean;
  close: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, close]);
  if (!open) return null;
  const layerId: Record<ProfileKey, Record<Lens, string>> = {
    mark: {
      overview: "owners",
      client: "families",
      investor: "investors",
      community: "referrals",
    },
    sam: {
      overview: "energy",
      client: "owners",
      investor: "transition",
      community: "civic",
    },
  };
  const layer =
    p.strategyLayers.find((item) => item.id === layerId[p.slug][lens]) ??
    p.strategyLayers[0];
  return (
    <div
      className="drawerShell"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <aside
        className="strategyDrawer"
        id="strategy"
        role="dialog"
        aria-modal="true"
        aria-labelledby="strategy-title"
      >
        <button
          className="drawerClose"
          onClick={close}
          aria-label="Close strategy panel"
        >
          ×
        </button>
        <small>RN STUDIO · STRATEGY LAYER</small>
        <h2 id="strategy-title">{p.editorialPosition.thesis}</h2>
        <p>{p.editorialPosition.distinction}</p>
        <blockquote>{p.editorialPosition.promise}</blockquote>
        <h3>{layer.label}</h3>
        <p>
          <b>Audience:</b> {layer.audience}
        </p>
        <p>
          <b>Tension:</b> {layer.tension}
        </p>
        <p>
          <b>Editorial move:</b> {layer.editorialMove}
        </p>
        <p>
          <b>Designed outcome:</b> {layer.outcome}
        </p>
        <h3>Content engine</h3>
        <p>{p.contentEngine.northStar}</p>
        <p className="drawerCadence">{p.contentEngine.cadence}</p>
        <ol>
          {p.contentEngine.series.map((series, i) => (
            <li key={series.name}>
              <span>0{i + 1}</span>
              <div>
                {series.name}
                <small>{series.purpose}</small>
              </div>
            </li>
          ))}
        </ol>
        <a href="#research" onClick={close}>
          Inspect the evidence foundation →
        </a>
      </aside>
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState<ProfileKey>("mark");
  const [lens, setLens] = useState<Lens>("overview");
  const [saved, setSaved] = useState<string[]>([]);
  const [strategyOpen, setStrategyOpen] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const profile = params.get("profile");
    const oldLens = localStorage.getItem("profile-lens");
    const oldSaved = localStorage.getItem("saved-profile-ideas");
    if (profile === "mark" || profile === "sam") setCurrent(profile);
    if (oldLens && oldLens in lensCopy) setLens(oldLens as Lens);
    if (oldSaved)
      try {
        setSaved(JSON.parse(oldSaved));
      } catch {}
  }, []);
  const p = profiles[current];
  const options = useMemo(
    () => Object.entries(lensCopy) as [Lens, (typeof lensCopy)[Lens]][],
    [],
  );
  const selectProfile = (slug: ProfileKey) => {
    setCurrent(slug);
    const url = new URL(location.href);
    url.searchParams.set("profile", slug);
    history.replaceState({}, "", url);
    scrollTo({ top: 0, behavior: "smooth" });
    track("profile_switched", { profile: slug });
  };
  const openStrategy = () => {
    setStrategyOpen(true);
    track("strategy_opened", { profile: current, lens });
  };
  const toggleSaved = (id: string) =>
    setSaved((previous) => {
      const next = previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id];
      localStorage.setItem("saved-profile-ideas", JSON.stringify(next));
      return next;
    });
  return (
    <>
      <Header openStrategy={openStrategy} />
      <section
        className="controlDeck"
        aria-label="Profile personalization controls"
      >
        <div>
          <span className="controlLabel">Profile</span>
          <div className="segmented">
            {(["mark", "sam"] as const).map((slug) => (
              <button
                key={slug}
                aria-pressed={current === slug}
                onClick={() => selectProfile(slug)}
              >
                {slug === "mark" ? "Mark H. Young" : "Sam Wolff"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="controlLabel" htmlFor="reader-lens">
            Read this as a
          </label>
          <select
            id="reader-lens"
            value={lens}
            onChange={(e) => {
              const next = e.target.value as Lens;
              setLens(next);
              localStorage.setItem("profile-lens", next);
              track("reader_lens_changed", { profile: current, lens: next });
            }}
          >
            {options.map(([value, copy]) => (
              <option value={value} key={value}>
                {copy.label}
              </option>
            ))}
          </select>
        </div>
        <button
          className="strategyTrigger"
          id="strategy-open"
          onClick={openStrategy}
        >
          Open strategy layer <span>↗</span>
        </button>
      </section>
      <main>
        <div className="mainColumn">
          <ProfileHero p={p} lens={lens} />
          <About p={p} />
          <Featured p={p} />
          <Activity p={p} saved={saved} toggleSaved={toggleSaved} />
          <Experience p={p} />
          <Skills p={p} />
          <Research p={p} />
          <EditorialOperatingSystem profile={p} />
        </div>
        <aside className="contextRail">
          <section className="card asideCard">
            <small>YOUR READING LENS</small>
            <h2>{lensCopy[lens].label}</h2>
            <p>{lensCopy[lens].description}</p>
            <button onClick={openStrategy}>See narrative logic →</button>
          </section>
          <section className="card asideCard">
            <small>PROFILE INDEX</small>
            <button
              className="otherPerson"
              onClick={() => selectProfile(current === "mark" ? "sam" : "mark")}
            >
              <span
                className={`miniAvatar avatar-${current === "mark" ? "sam" : "mark"}`}
              >
                {profiles[current === "mark" ? "sam" : "mark"].initials}
              </span>
              <span>
                <b>{profiles[current === "mark" ? "sam" : "mark"].name}</b>
                <small>View the other reconstruction →</small>
              </span>
            </button>
          </section>
          <section className="card asideCard strategy">
            <small>RN STUDIO</small>
            <h2>Make expertise visible before the meeting.</h2>
            <p>
              Research, positioning, editorial systems, and digital experiences
              for consequential work.
            </p>
          </section>
        </aside>
      </main>
      <StrategyPanel
        p={p}
        lens={lens}
        open={strategyOpen}
        close={() => setStrategyOpen(false)}
      />
      <footer>
        <b>Editorial reconstruction by RN Studio.</b> This is a speculative
        professional-presence prototype—not an actual LinkedIn profile,
        published activity, endorsement, or representation of employment.
      </footer>
    </>
  );
}

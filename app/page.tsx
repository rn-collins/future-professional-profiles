"use client";

import { useState } from "react";
import Image from "next/image";
import { profiles, type Profile } from "./data";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="navIcon" aria-hidden>
    {children}
  </span>
);

function Header() {
  return (
    <header className="topbar">
      <div className="topinner">
        <button className="liLogo" aria-label="Home">
          in
        </button>
        <div className="search">
          <span>⌕</span>
          <input aria-label="Search" placeholder="Search" />
        </div>
        <nav aria-label="Primary">
          <button>
            <Icon>⌂</Icon>
            <span>Home</span>
          </button>
          <button>
            <Icon>♟</Icon>
            <span>My Network</span>
          </button>
          <button>
            <Icon>▣</Icon>
            <span>Jobs</span>
          </button>
          <button>
            <Icon>✉</Icon>
            <span>Messaging</span>
          </button>
          <button>
            <Icon>●</Icon>
            <span>Notifications</span>
          </button>
          <button>
            <Icon>◉</Icon>
            <span>Me⌄</span>
          </button>
          <button className="business">
            <Icon>▦</Icon>
            <span>For Business⌄</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function ProfileHero({ p }: { p: Profile }) {
  return (
    <section className="card hero">
      <div className={`cover cover-${p.slug}`}>
        <div className="coverWords">
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
        <div
          className={`avatar photo avatar-${p.slug}`}
          role={p.slug === "sam" ? "img" : undefined}
          aria-label={
            p.slug === "sam" ? `${p.name} profile photograph` : undefined
          }
          style={
            p.slug === "sam"
              ? {
                  overflow: "hidden",
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "500%",
                  backgroundPosition: "46.5% 34.4%",
                  backgroundRepeat: "no-repeat",
                }
              : { overflow: "hidden" }
          }
        >
          {p.slug === "mark" && (
            <Image
              src={p.image}
              alt={`${p.name} profile photograph`}
              fill
              sizes="152px"
              priority
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <button className="more" aria-label="More options">
          •••
        </button>
        <div className="heroGrid">
          <div>
            <h1>
              {p.name}
              {p.verified && (
                <span className="verified" title="Verified">
                  ✓
                </span>
              )}
            </h1>
            <p className="headline">{p.headline}</p>
            <p className="muted">
              {p.location} · <a href="#contact">Contact info</a>
            </p>
            <a href="#network" className="connections">
              {p.connections}
            </a>
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
          <button className="primary">Connect</button>
          <button className="outline">Message</button>
          <button className="outline mobileHide">More</button>
        </div>
      </div>
    </section>
  );
}

function About({ p }: { p: Profile }) {
  return (
    <section className="card pad">
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
    <section className="card pad">
      <h2>Featured</h2>
      <div className="featured">
        {p.featured.map((f, i) => (
          <article key={f.title} className="feature">
            <div className={`featureArt ${f.tone}`}>
              <small>{f.kicker}</small>
              <strong>{f.title}</strong>
              <span>→</span>
            </div>
            <div className="featureCopy">
              <small>{f.kicker.toLowerCase()}</small>
              <b>{f.title}</b>
              <p>{f.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Activity({ p }: { p: Profile }) {
  return (
    <section className="card pad">
      <div className="sectionHead">
        <div>
          <h2>Activity</h2>
          <a>{p.slug === "mark" ? "4,862" : "1,974"} followers</a>
        </div>
        <button className="outline">Follow</button>
      </div>
      <div className="tabs">
        <b>Posts</b>
        <span>Comments</span>
        <span>Images</span>
      </div>
      {p.posts.map((post, i) => (
        <article className="post" key={i}>
          <div className="postHead">
            <div className={`miniAvatar avatar-${p.slug}`}>{p.initials}</div>
            <div>
              <b>{p.name}</b>
              <small>{p.headline.split("|")[0]}</small>
              <small>{post.date} · 🌐</small>
            </div>
            <button>•••</button>
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
          <div className="socialProof">
            <span>🔵 🟢 🟠 {post.reactions}</span>
            <span>
              {post.comments} comments · {post.reposts} reposts
            </span>
          </div>
          <div className="postActions">
            <button>♡ Like</button>
            <button>▢ Comment</button>
            <button>↻ Repost</button>
            <button>➤ Send</button>
          </div>
        </article>
      ))}
    </section>
  );
}

function Experience({ p }: { p: Profile }) {
  return (
    <section className="card pad">
      <h2>Experience</h2>
      {p.experience.map((e, i) => (
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
      <h2>Skills</h2>
      {p.skills.map((s, i) => (
        <div className="skill" key={s}>
          <b>{s}</b>
          <span>◉ Endorsed by {i * 7 + 12} colleagues</span>
        </div>
      ))}
    </section>
  );
}

function Sidebar({
  current,
  select,
}: {
  current: "mark" | "sam";
  select: (s: "mark" | "sam") => void;
}) {
  const other = current === "mark" ? profiles.sam : profiles.mark;
  return (
    <aside>
      <section className="card asideCard">
        <h3>Profile language</h3>
        <p>English</p>
        <hr />
        <h3>Public profile & URL</h3>
        <p>rn-studio.com/in/{current}</p>
      </section>
      <section className="card asideCard">
        <h2>People also viewed</h2>
        <div className="otherPerson">
          <div className={`miniAvatar avatar-${other.slug}`}>
            {other.initials}
          </div>
          <div>
            <b>{other.name}</b>
            <p>{other.headline}</p>
            <button className="outline" onClick={() => select(other.slug)}>
              View profile
            </button>
          </div>
        </div>
      </section>
      <section className="card asideCard strategy">
        <small>RN STUDIO</small>
        <h2>Your work deserves a public life.</h2>
        <p>
          Content production, editorial strategy, and brand systems for people
          building what comes next.
        </p>
        <a href="mailto:hello@example.com">Start a conversation →</a>
      </section>
    </aside>
  );
}

export default function Home() {
  const [current, setCurrent] = useState<"mark" | "sam">("mark");
  const p = profiles[current];
  return (
    <>
      <Header />
      <div className="switcher" role="group" aria-label="Choose profile">
        <span>View profile:</span>
        <button
          className={current === "mark" ? "active" : ""}
          onClick={() => setCurrent("mark")}
        >
          Mark H. Young
        </button>
        <button
          className={current === "sam" ? "active" : ""}
          onClick={() => setCurrent("sam")}
        >
          Sam Wolff
        </button>
      </div>
      <main>
        <div className="mainColumn">
          <ProfileHero p={p} />
          <About p={p} />
          <Featured p={p} />
          <Activity p={p} />
          <Experience p={p} />
          <Skills p={p} />
          <section className="card pad sourceNote">
            <h2>Research foundation</h2>
            <p>Public sources used to reconstruct this professional story.</p>
            <ul>
              {p.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <Sidebar current={current} select={setCurrent} />
      </main>
      <footer>
        Professional-presence concept created by RN Studio. Editorial
        reconstruction; not an actual LinkedIn profile or endorsement.
      </footer>
    </>
  );
}

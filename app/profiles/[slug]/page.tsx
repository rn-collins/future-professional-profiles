import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileTools from "../../components/ProfileTools";
import { profiles, type Profile } from "../../data";

type ProfileSlug = keyof typeof profiles;

function isProfileSlug(value: string): value is ProfileSlug {
  return value in profiles;
}

function buildMarkdown(profile: Profile) {
  const sections = [
    `# ${profile.name}`,
    profile.headline,
    `## Editorial position\n${profile.editorialPosition.thesis}\n\n${profile.editorialPosition.distinction}\n\n${profile.editorialPosition.promise}`,
    `## About\n${profile.about.join("\n\n")}`,
    `## Experience\n${profile.experience.map((item) => `### ${item.role}\n${item.org} — ${item.dates}\n\n${item.detail}`).join("\n\n")}`,
    `## Audience strategy\n${profile.strategyLayers.map((layer) => `### ${layer.label}\n- Audience: ${layer.audience}\n- Tension: ${layer.tension}\n- Editorial move: ${layer.editorialMove}\n- Designed outcome: ${layer.outcome}`).join("\n\n")}`,
    `## Content engine\n${profile.contentEngine.northStar}\n\n${profile.contentEngine.cadence}\n\n${profile.contentEngine.series.map((series) => `### ${series.name}\n${series.purpose}\n\nFormats: ${series.formats.join(", ")}\n\nConversion: ${series.conversion}`).join("\n\n")}`,
    `## Public sources\n${profile.sources.map((source) => `- [${source.label}](${source.url})`).join("\n")}`,
    "---\nEditorial reconstruction and professional-presence strategy by RN Studio. Proposed content is not evidence of publication, approval, employment, or endorsement.",
  ];
  return sections.join("\n\n");
}

export function generateStaticParams() {
  return Object.keys(profiles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isProfileSlug(slug)) return {};
  const profile = profiles[slug];
  const title = `${profile.name} — Evidence-Led Professional Profile`;
  const description = `${profile.editorialPosition.thesis} An evidence-led professional-presence and content-strategy reconstruction by RN Studio.`;
  return {
    title,
    description,
    alternates: { canonical: `/profiles/${slug}` },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/profiles/${slug}`,
      images: [{ url: `/profiles/${slug}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StandaloneProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isProfileSlug(slug)) notFound();
  const profile = profiles[slug];
  const markdown = buildMarkdown(profile);

  return (
    <main className={`standalone standalone-${profile.slug}`}>
      <nav className="briefNav" aria-label="Standalone profile navigation">
        <Link href={`/?profile=${profile.slug}`}>← Interactive profile</Link>
        <span>RN Studio · Evidence-led reconstruction</span>
      </nav>
      <header className="briefHero">
        <div className="briefPortrait">
          <Image
            src={profile.image}
            alt={`${profile.name}${profile.slug === "sam" ? " with his family" : ""}`}
            fill
            sizes="(max-width: 700px) 132px, 180px"
            priority
          />
        </div>
        <div>
          <p className="sectionLabel">Professional presence dossier</p>
          <h1>{profile.name}</h1>
          <p className="briefHeadline">{profile.headline}</p>
          <p>{profile.location}</p>
        </div>
      </header>
      <ProfileTools name={profile.name} slug={slug} markdown={markdown} />

      <section className="briefLead">
        <p className="sectionLabel">Editorial position</p>
        <h2>{profile.editorialPosition.thesis}</h2>
        <p>{profile.editorialPosition.distinction}</p>
        <blockquote>{profile.editorialPosition.promise}</blockquote>
      </section>

      <section className="briefSection">
        <p className="sectionLabel">Complete narrative</p>
        <h2>About</h2>
        {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section className="briefSection">
        <p className="sectionLabel">Audience intelligence</p>
        <h2>Four ways the story creates relevance</h2>
        <div className="strategyGrid">
          {profile.strategyLayers.map((layer) => (
            <article key={layer.id}>
              <h3>{layer.label}</h3>
              <p><b>Audience</b>{layer.audience}</p>
              <p><b>Tension</b>{layer.tension}</p>
              <p><b>Editorial move</b>{layer.editorialMove}</p>
              <p><b>Designed outcome</b>{layer.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="briefSection">
        <p className="sectionLabel">Publishing system</p>
        <h2>Individualized content engine</h2>
        <p className="briefNorthStar">{profile.contentEngine.northStar}</p>
        <p>{profile.contentEngine.cadence}</p>
        <div className="seriesGrid">
          {profile.contentEngine.series.map((series, index) => (
            <article key={series.name}>
              <span>0{index + 1}</span>
              <h3>{series.name}</h3>
              <p>{series.purpose}</p>
              <p><b>Formats:</b> {series.formats.join(" · ")}</p>
              <p><b>Conversion:</b> {series.conversion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="briefSection">
        <p className="sectionLabel">Career record</p>
        <h2>Experience and education</h2>
        {profile.experience.map((item) => (
          <article className="briefExperience" key={`${item.role}-${item.org}`}>
            <span>{item.mark}</span><div><h3>{item.role}</h3><p>{item.org} · {item.dates}</p><p>{item.detail}</p></div>
          </article>
        ))}
        {profile.education.map((item) => (
          <article className="briefExperience" key={item.school}>
            <span>H</span><div><h3>{item.school}</h3><p>{item.degree} · {item.dates}</p></div>
          </article>
        ))}
      </section>

      <section className="briefSection" id="evidence">
        <p className="sectionLabel">Evidence architecture</p>
        <h2>Public source register</h2>
        <ol className="briefSources">
          {profile.sources.map((source) => (
            <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></li>
          ))}
        </ol>
        <p className="briefBoundary">The sources support the underlying public record. Proposed posts, series, positioning, and outcomes remain editorial strategy—not claims that either subject commissioned, approved, published, or achieved them.</p>
      </section>
    </main>
  );
}

import { profiles, type Profile } from "./data";
import { evidenceProfiles, type EvidenceClaim, type EvidenceSource, type ProfileSlug } from "./evidence";

export type StudioAudience = "client" | "investor" | "partner" | "journalist" | "community" | "event-organizer" | "referral";
export type StudioFormat = "linkedin" | "carousel" | "newsletter" | "video-script" | "brief";

const audienceTerms: Record<StudioAudience, string[]> = {
  client: ["client", "buyer", "seller", "owner", "household", "decision"],
  investor: ["investor", "investment", "return", "risk", "value", "commercial"],
  partner: ["partner", "advisor", "collaboration", "system", "referral"],
  journalist: ["public", "record", "reported", "context", "policy"],
  community: ["community", "neighborhood", "public", "place", "board"],
  "event-organizer": ["speaker", "briefing", "audience", "public", "education"],
  referral: ["referral", "advisor", "client", "situation", "decision"],
};

const stopWords = new Set(["what", "which", "with", "that", "this", "from", "their", "about", "does", "have", "show", "could", "would", "should", "into", "more", "most", "they", "them", "then", "than"]);

function tokens(value: string) {
  return value.toLowerCase().match(/[a-zʻ’'-]{3,}/g)?.filter((word) => !stopWords.has(word)) ?? [];
}

function scoreClaim(claim: EvidenceClaim, sourceMap: Map<string, EvidenceSource>, query: string) {
  const queryTokens = tokens(query);
  const body = `${claim.claim} ${claim.boundary ?? ""} ${claim.sourceIds.map((id) => sourceMap.get(id)?.title ?? "").join(" ")}`.toLowerCase();
  return queryTokens.reduce((score, token) => score + (body.includes(token) ? 3 : 0), 0)
    + (claim.status === "verified" ? 2 : claim.status === "qualified" ? 1 : 0);
}

function claimMatchesQuery(claim: EvidenceClaim, sourceMap: Map<string, EvidenceSource>, query: string) {
  const queryTokens = tokens(query);
  if (!queryTokens.length) return false;
  const body = `${claim.claim} ${claim.boundary ?? ""} ${claim.sourceIds.map((id) => sourceMap.get(id)?.title ?? "").join(" ")}`.toLowerCase();
  const bodyTokens = new Set(tokens(body));
  return queryTokens.some((token) => bodyTokens.has(token));
}

export function answerEvidenceQuestion(slug: ProfileSlug, question: string) {
  const ledger = evidenceProfiles[slug];
  const sourceMap = new Map(ledger.sources.map((source) => [source.id, source]));
  const ranked = ledger.claims
    .map((claim) => ({ claim, score: scoreClaim(claim, sourceMap, question) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const selected = ranked.filter(({ claim }) => claimMatchesQuery(claim, sourceMap, question));
  const citations = Array.from(new Set(selected.flatMap(({ claim }) => claim.sourceIds)))
    .map((id) => sourceMap.get(id))
    .filter((source): source is EvidenceSource => Boolean(source));
  const limitations = Array.from(new Set(selected.flatMap(({ claim }) => claim.boundary ? [claim.boundary] : [])));
  return {
    profile: ledger.subject,
    question,
    answer: selected.length
      ? selected.map(({ claim }) => claim.claim).join(" ")
      : "The documented ledger does not contain evidence that answers this question. Try a question about the person’s recorded work, experience, public service, positioning, or source history.",
    claims: selected.map(({ claim }) => ({ id: claim.id, status: claim.status, confidence: claim.confidence, text: claim.claim })),
    citations: citations.map(({ id, title, publisher, url, grade }) => ({ id, title, publisher, url, grade })),
    limitations,
    boundary: "This answer retrieves and composes the documented ledger. It does not infer private facts, approval, endorsement, outcomes, or missing employment details.",
  };
}

function bestLayer(profile: Profile, audience: StudioAudience) {
  const terms = audienceTerms[audience];
  return profile.strategyLayers
    .map((layer) => ({ layer, score: terms.reduce((score, term) => score + (`${layer.label} ${layer.audience} ${layer.tension}`.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .sort((a, b) => b.score - a.score)[0].layer;
}

export function generateEvidenceDraft(input: { slug: ProfileSlug; audience: StudioAudience; format: StudioFormat; objective: string; series?: string }) {
  const profile = profiles[input.slug];
  const ledger = evidenceProfiles[input.slug];
  const layer = bestLayer(profile, input.audience);
  const series = profile.contentEngine.series.find((item) => item.name === input.series) ?? profile.contentEngine.series[0];
  const evidence = ledger.claims.filter((claim) => claim.status !== "editorial-synthesis").slice(0, 3);
  const lead = input.slug === "mark"
    ? "The most consequential property decision is often hiding beneath the most attractive surface."
    : "A property decision is rarely only about property; land, infrastructure, policy, and public consequence arrive together.";
  const body = [
    lead,
    layer.tension,
    `A useful way to approach it: ${layer.editorialMove}`,
    `Documented foundation: ${evidence.map((claim) => claim.claim).join(" ")}`,
    `Editorial objective: ${input.objective || series.purpose}`,
    series.conversion,
  ];
  const formatLabels: Record<StudioFormat, string> = {
    linkedin: body.join("\n\n"),
    carousel: body.map((line, index) => `Slide ${index + 1} — ${line}`).join("\n\n"),
    newsletter: `# ${series.name}\n\n${body.join("\n\n")}`,
    "video-script": body.map((line, index) => `${index === 0 ? "HOOK" : index === body.length - 1 ? "CLOSE" : "BEAT"}: ${line}`).join("\n\n"),
    brief: `## ${series.name}\n\n**Audience:** ${layer.audience}\n\n**Decision tension:** ${layer.tension}\n\n${body.slice(2).join("\n\n")}`,
  };
  return {
    id: `${input.slug}-${input.format}-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    profile: profile.name,
    audience: input.audience,
    format: input.format,
    series: series.name,
    draft: formatLabels[input.format],
    evidence: evidence.map((claim) => ({ id: claim.id, status: claim.status, sourceIds: claim.sourceIds })),
    gates: ledger.gaps.filter((gap) => gap.impact === "publication-critical"),
    boundary: "Generated editorial proposal. Human review and source verification are required before publication. This is not subject-authored or approved copy.",
  };
}

export function buildEvidenceGraph(slug: ProfileSlug) {
  const profile = profiles[slug];
  const ledger = evidenceProfiles[slug];
  const layer = profile.strategyLayers[0];
  const series = profile.contentEngine.series[0];
  return {
    sources: ledger.sources.slice(0, 5),
    claims: ledger.claims.slice(0, 6),
    chain: [
      { type: "source", label: ledger.sources[0].title },
      { type: "claim", label: ledger.claims[0].claim },
      { type: "position", label: profile.editorialPosition.thesis },
      { type: "audience", label: layer.audience },
      { type: "concept", label: series.name },
      { type: "objective", label: series.conversion },
    ],
  };
}

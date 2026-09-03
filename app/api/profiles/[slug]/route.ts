import { profiles } from "../../../data";
import { evidenceProfiles, evidenceSummary } from "../../../evidence";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(profiles).map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!(slug in profiles)) {
    return Response.json({ error: "Profile not found" }, { status: 404 });
  }
  const profile = profiles[slug as keyof typeof profiles];
  const evidence = evidenceProfiles[slug as keyof typeof evidenceProfiles];
  return Response.json({
    ...profile,
    evidence: evidenceSummary(evidence),
    evidenceUrl: `/api/evidence/${slug}`,
    editorialBoundary:
      "Factual biography is source-governed. Posts, series, positioning, and outcomes are proposed editorial strategy.",
  });
}

import {
  evidenceProfiles,
  evidenceSummary,
  validateEvidenceProfile,
} from "../../../evidence";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(evidenceProfiles).map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!(slug in evidenceProfiles)) {
    return Response.json({ error: "Evidence profile not found" }, { status: 404 });
  }
  const profile = evidenceProfiles[slug as keyof typeof evidenceProfiles];
  return Response.json({
    schemaVersion: "1.0.0",
    summary: evidenceSummary(profile),
    integrity: validateEvidenceProfile(profile),
    ...profile,
  });
}

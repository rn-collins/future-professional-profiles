import { evidenceProfiles, evidenceSummary } from "../../evidence";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: "1.0.0",
    generatedFrom: "claim-level evidence ledgers",
    editorialBoundary:
      "Verified, qualified, attributed, and editorial-synthesis claims are distinct states. A source link does not imply subject approval or endorsement.",
    gradeGuide: {
      A: "Official, first-party, or authoritative professional record",
      B: "Dated independent reporting or publication archive",
      C: "Platform index or otherwise incomplete public surface",
    },
    profiles: Object.values(evidenceProfiles).map((profile) => ({
      slug: profile.slug,
      subject: profile.subject,
      ...evidenceSummary(profile),
      url: `/api/evidence/${profile.slug}`,
    })),
  });
}

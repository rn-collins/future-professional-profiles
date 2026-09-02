import { profiles } from "../../data";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    generatedAt: "2026-09-02",
    editorialBoundary:
      "Evidence-led editorial reconstructions; not actual social profiles, endorsements, or employment representations.",
    profiles: Object.values(profiles).map((profile) => ({
      slug: profile.slug,
      name: profile.name,
      headline: profile.headline,
      thesis: profile.editorialPosition.thesis,
      url: `/profiles/${profile.slug}`,
      sourceCount: profile.sources.length,
    })),
  });
}

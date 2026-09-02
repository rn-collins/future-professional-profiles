import { profiles } from "../../../data";

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
  return Response.json({
    ...profile,
    editorialBoundary:
      "Factual biography is source-governed. Posts, series, positioning, and outcomes are proposed editorial strategy.",
  });
}

import { getProfileIntelligence, type ProfileKey } from "../../../market-intelligence";

export function generateStaticParams() { return [{ slug: "mark" }, { slug: "sam" }]; }

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== "mark" && slug !== "sam") return Response.json({ error: "Profile not found" }, { status: 404 });
  return Response.json(getProfileIntelligence(slug as ProfileKey), {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}

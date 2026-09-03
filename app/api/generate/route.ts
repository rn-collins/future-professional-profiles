import { generateEvidenceDraft, type StudioAudience, type StudioFormat } from "../../engine";
import type { ProfileSlug } from "../../evidence";

const audiences = new Set<StudioAudience>(["client", "investor", "partner", "journalist", "community", "event-organizer", "referral"]);
const formats = new Set<StudioFormat>(["linkedin", "carousel", "newsletter", "video-script", "brief"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const profile = body?.profile;
  const audience = body?.audience;
  const format = body?.format;
  const objective = typeof body?.objective === "string" ? body.objective.trim().slice(0, 400) : "";
  if ((profile !== "mark" && profile !== "sam") || typeof audience !== "string" || !audiences.has(audience as StudioAudience) || typeof format !== "string" || !formats.has(format as StudioFormat)) {
    return Response.json({ error: "Invalid profile, audience, or format." }, { status: 400 });
  }
  const result = generateEvidenceDraft({ slug: profile as ProfileSlug, audience: audience as StudioAudience, format: format as StudioFormat, objective, series: typeof body?.series === "string" ? body.series : undefined });
  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}

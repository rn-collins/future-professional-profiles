import { answerEvidenceQuestion } from "../../engine";
import type { ProfileSlug } from "../../evidence";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { profile?: string; question?: string } | null;
  const profile = body?.profile;
  const question = body?.question?.trim();
  if ((profile !== "mark" && profile !== "sam") || !question || question.length > 600) {
    return Response.json({ error: "Provide profile=mark|sam and a question between 1 and 600 characters." }, { status: 400 });
  }
  return Response.json(answerEvidenceQuestion(profile as ProfileSlug, question), {
    headers: { "Cache-Control": "no-store" },
  });
}

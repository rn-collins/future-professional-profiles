import { evidenceProfiles, validateEvidenceProfile } from "../../evidence";
import { marketIntelligence } from "../../market-intelligence";

export function GET() {
  const ledgers = Object.values(evidenceProfiles).map((profile) => ({ slug: profile.slug, ...validateEvidenceProfile(profile) }));
  const healthy = ledgers.every((ledger) => ledger.valid) && marketIntelligence.sources.length > 0;
  return Response.json({
    status: healthy ? "healthy" : "degraded",
    version: "2026-09-03",
    ledgers,
    counts: {
      evidenceSources: Object.values(evidenceProfiles).reduce((sum, profile) => sum + profile.sources.length, 0),
      evidenceClaims: Object.values(evidenceProfiles).reduce((sum, profile) => sum + profile.claims.length, 0),
      marketSources: marketIntelligence.sources.length,
      opportunities: marketIntelligence.opportunities.length,
    },
  }, { status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}

import { intelligenceSources, type IntelligenceSource } from "./market-intelligence";

export type Volatility = "monthly" | "quarterly" | "event-driven" | "annual" | "historical";

export type SourceMonitor = {
  sourceId: string;
  volatility: Volatility;
  cadenceDays: number;
  nextReview: string;
  watchFor: string;
  trigger: string;
  owner: "research" | "editorial" | "rights";
};

const baseline = "2026-09-03";

const monitoringPolicy: Record<Volatility, { cadenceDays: number; nextReview: string }> = {
  monthly: { cadenceDays: 30, nextReview: "2026-10-03" },
  quarterly: { cadenceDays: 90, nextReview: "2026-12-02" },
  "event-driven": { cadenceDays: 30, nextReview: "2026-10-03" },
  annual: { cadenceDays: 365, nextReview: "2027-09-03" },
  historical: { cadenceDays: 180, nextReview: "2027-03-02" },
};

function classify(source: IntelligenceSource): Volatility {
  if (["hbr-archive", "locations-report", "dpp-faq", "sewer-fees"].includes(source.id)) return "monthly";
  if (["colliers-office", "colliers-retail", "colliers-industrial"].includes(source.id)) return "quarterly";
  if (["dpp-resources", "firm-update", "hseo-fuels", "oahu-plan"].includes(source.id)) return "event-driven";
  if (["census-honolulu", "naiop", "ulupono"].includes(source.id)) return "annual";
  return "historical";
}

function watchFor(source: IntelligenceSource): string {
  if (source.id.startsWith("hbr") || source.id === "locations-report") return "New period, revisions, changed segment definitions, or superseding market release";
  if (source.id.startsWith("colliers")) return "New quarter, revised vacancy/absorption, sector methodology, or changed outlook";
  if (["dpp-resources", "dpp-faq", "firm-update"].includes(source.id)) return "Effective-date, map, portal, permit-rule, or agency-guidance change";
  if (source.id === "sewer-fees") return "Scheduled rate step, amended ordinance, applicability, or implementation notice";
  if (["hseo-fuels", "oahu-plan"].includes(source.id)) return "Superseding plan, adopted policy, correction, or implementation milestone";
  if (source.id === "census-honolulu") return "New ACS vintage, estimate revision, geography or definition change";
  return "Material page revision, removal, correction, changed ownership, or new authoritative replacement";
}

export const sourceMonitoringRegister: SourceMonitor[] = intelligenceSources.map((source) => {
  const volatility = classify(source);
  const policy = monitoringPolicy[volatility];
  return {
    sourceId: source.id,
    volatility,
    cadenceDays: policy.cadenceDays,
    nextReview: policy.nextReview,
    watchFor: watchFor(source),
    trigger: volatility === "event-driven" ? "Check at cadence and before any related publication" : "Check at cadence and before reusing a time-sensitive claim",
    owner: source.sourceClass === "first-party" ? "editorial" : "research",
  };
});

export const sourceMonitoringMeta = {
  baseline,
  automation: "register-only",
  limitation: "No external scheduler, fetcher, diff store, alert delivery, or uptime guarantee is active yet.",
  policy: monitoringPolicy,
} as const;

export function getMonitoredSources() {
  return sourceMonitoringRegister.map((monitor) => ({
    ...monitor,
    source: intelligenceSources.find((source) => source.id === monitor.sourceId),
  }));
}

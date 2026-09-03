export type ExperimentArm = "control" | "variant";
export type ExperimentDefinition = { id: string; queryKey: string; storageKey: string; description: string };

export const experiments = {
  engageBrief: { id: "engage-brief-language-v1", queryKey: "exp_engage_brief", storageKey: "rn-studio-experiment-seed-v1", description: "Compares two accurate labels for the browser-local inquiry brief." },
  strategyOrientation: { id: "strategy-orientation-v1", queryKey: "exp_strategy_orientation", storageKey: "rn-studio-experiment-seed-v1", description: "Compares two accurate introductions to the strategy transformation." },
} satisfies Record<string, ExperimentDefinition>;

export function deterministicArm(seed: string, experimentId: string): ExperimentArm {
  let hash = 2166136261;
  const input = `${seed}:${experimentId}`;
  for (let index = 0; index < input.length; index += 1) { hash ^= input.charCodeAt(index); hash = Math.imul(hash, 16777619); }
  return (hash >>> 0) % 2 === 0 ? "control" : "variant";
}

export function previewOverride(params: URLSearchParams, definition: ExperimentDefinition): ExperimentArm | null {
  const value = params.get(definition.queryKey);
  return value === "control" || value === "variant" ? value : null;
}

export function browserAssignment(definition: ExperimentDefinition): { arm: ExperimentArm; preview: boolean } {
  if (typeof window === "undefined") return { arm: "control", preview: false };
  const override = previewOverride(new URLSearchParams(window.location.search), definition);
  if (override) return { arm: override, preview: true };
  let seed = "storage-unavailable";
  try { seed = localStorage.getItem(definition.storageKey) || crypto.randomUUID(); localStorage.setItem(definition.storageKey, seed); } catch { /* Stable fallback for storage-restricted contexts. */ }
  return { arm: deterministicArm(seed, definition.id), preview: false };
}

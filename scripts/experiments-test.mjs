import assert from "node:assert/strict";
import { deterministicArm, experiments, previewOverride } from "../app/experiments.ts";

assert.equal(deterministicArm("browser-a", experiments.engageBrief.id), deterministicArm("browser-a", experiments.engageBrief.id), "assignment must be stable");
const arms = new Set(Array.from({ length: 100 }, (_, index) => deterministicArm(`seed-${index}`, experiments.engageBrief.id)));
assert.deepEqual([...arms].sort(), ["control", "variant"], "deterministic allocation must reach both arms");
assert.equal(previewOverride(new URLSearchParams("exp_engage_brief=variant"), experiments.engageBrief), "variant");
assert.equal(previewOverride(new URLSearchParams("exp_engage_brief=control"), experiments.engageBrief), "control");
assert.equal(previewOverride(new URLSearchParams("exp_engage_brief=winner"), experiments.engageBrief), null);
assert.equal(previewOverride(new URLSearchParams(""), experiments.engageBrief), null);
const serialized = JSON.stringify(experiments).toLowerCase();
for (const forbidden of ["email", "recipient", "name", "organization"]) assert.equal(serialized.includes(forbidden), false, `definition must not contain personal-data field: ${forbidden}`);
console.log("Experiment framework checks passed.");

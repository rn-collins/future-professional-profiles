import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { safeProfile, safeQueryText } from "../app/input-safety.ts";

assert.equal(safeQueryText("  Ada\nLovelace  ", 80), "Ada Lovelace");
assert.equal(safeQueryText("safe\u202etext", 80), "safe text");
assert.equal(safeQueryText("x".repeat(200), 80)?.length, 80);
assert.equal(safeQueryText(["unexpected"]), undefined);
assert.equal(safeQueryText("\n\t"), undefined);
assert.equal(safeProfile("mark"), "mark");
assert.equal(safeProfile("sam"), "sam");
assert.equal(safeProfile("arbitrary-person"), undefined);

const workspace = await readFile(new URL("../app/workspace/WorkspaceClient.tsx", import.meta.url), "utf8");
assert.match(workspace, /if \(ready && storageEnabled\)/, "persistence must stop after unsafe storage reads");
assert.match(workspace, /It was not overwritten/, "unsupported storage must disclose non-overwrite behavior");
assert.match(workspace, /approval returned to review/, "reopened evidence must invalidate approval");

const engage = await readFile(new URL("../app/engage/EngageClient.tsx", import.meta.url), "utf8");
for (const event of ["experiment_exposure", "experiment_conversion"]) assert.ok(engage.includes(event));
for (const forbiddenPayload of ["email: form.email", "name: form.name", "context: form.context"]) assert.equal(engage.includes(forbiddenPayload), false, `analytics must omit ${forbiddenPayload}`);

console.log("Product safety checks passed.");

# Privacy-safe product experiments

The experiment framework in `app/experiments.ts` is deliberately small, deterministic, and inspectable.

## Guarantees

- Assignment uses a random identifier stored only in `localStorage`; the identifier is never included in analytics.
- The same browser receives the same arm for a given experiment unless local storage is cleared.
- `?exp_engage_brief=control|variant` and `?exp_strategy_orientation=control|variant` provide non-persistent preview overrides.
- The interface visibly discloses the assigned or preview arm and exactly what changes.
- Experiments may vary accurate language or orientation. They may not vary price, access, eligibility, evidence, permissions, consent, or risk disclosure.
- Exposure and conversion events include only experiment ID, arm, preview state, and a bounded action name. They include no inquiry text, email, recipient, stable seed, or profile narrative.
- No arm is described as a winner without sufficient real observations and an agreed decision rule.

## Current experiments

| ID | Surface | Variable | Conversion |
|---|---|---|---|
| `engage-brief-language-v1` | `/engage` | Accurate submit-button framing | Browser-local brief created |
| `strategy-orientation-v1` | `/strategy-lab` | Accurate hero orientation | Scenario selected |

## QA

Run `node --experimental-strip-types scripts/experiments-test.mjs` and `node --experimental-strip-types scripts/product-safety-test.mjs`. The tests verify deterministic assignment, both-arm reachability, valid/invalid overrides, query sanitization, profile allowlisting, storage-failure protection, approval invalidation, and omission of free-text fields from analytics payloads.

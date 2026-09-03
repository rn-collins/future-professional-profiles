# Evidence architecture

Last reconciled: 2026-09-02

## Purpose

The public profiles, strategy concepts, and machine-readable data now share a claim-level evidence model. The model prevents a source list from laundering every nearby sentence into an equally verified fact.

## Evidence states

| State | Meaning | Publication rule |
|---|---|---|
| `verified` | The retrieved record directly supports the bounded factual statement. | May be stated as fact within the recorded date and scope. |
| `qualified` | The source supports the claim, but recency, platform provenance, methodology, or completeness limits it. | The qualification travels with every reuse. |
| `attributed` | The source establishes that a person or publisher said something. | Attribute it; do not convert the statement into an independently proven fact. |
| `editorial-synthesis` | RN Studio derived positioning or strategy from multiple public facts. | Label as proposed strategy, never as the subject's own language or approval. |

## Source grades

- **A:** official record, first-party record, or authoritative professional directory.
- **B:** dated independent reporting or recognizable publication archive.
- **C:** platform index or incomplete/gated public surface.

A grade describes the source relationship to the recorded claim. It is not a universal truth score. A first-party biography can be A-grade evidence of what a company publishes while still requiring independent corroboration for performance claims.

## Data surfaces

- `/api/evidence` — collection summary, state counts, grade guide, open-gap counts, and reconciliation dates.
- `/api/evidence/mark` — Mark's full source, claim, contradiction, freshness, and gap ledger.
- `/api/evidence/sam` — Sam's full source, claim, contradiction, freshness, and gap ledger.
- `/api/profiles` and `/api/profiles/[slug]` — publishing data with evidence summaries and links to the detailed ledger.

The ledger schema lives in `app/evidence.ts`. Module initialization validates unique identifiers, valid URLs, claim-to-source references, and source-to-claim references. A broken reference fails the production build instead of silently shipping.

## Freshness policy

| Volatility | Examples | Required treatment |
|---|---|---|
| Stable | Archived article, dated testimony, meeting record | Preserve publication and retrieval dates; recheck only if the underlying interpretation changes. |
| Periodic | Company biography, directory, current leadership | Recheck before broad publication and on a regular editorial review cycle. |
| High | Platform-indexed job status or activity totals | Recheck every time the claim is reused; retain platform, window, and retrieval date. |

## Attribution controls

1. Individual speech, full-board action, reporter description, employer copy, platform index, and RN Studio synthesis remain separate evidence classes.
2. A board roster does not establish authorship or an individual vote.
3. A subject's testimony proves what the subject argued, not the empirical truth of every assertion in it.
4. Platform-derived production figures are not converted into audited lifetime totals.
5. Proposed posts, content series, engagement, outcomes, partnerships, and positioning are not evidence of publication, approval, or endorsement.
6. Public availability does not establish image-republication rights.

## Diminishing-return stop condition

The public-web census stopped after identity-resolved high-signal surfaces converged, consequential claims had direct support or an explicit limitation, and repeated searches produced duplicates, weaker aggregators, gated pages, or unrelated names. Deleted, private, unindexed, authentication-only, and untranscribed material remains outside any honest completeness claim.

## Publication-critical human gates

- Confirm exact current titles and approved role descriptions.
- Confirm image rights, including recognizable family members in Sam's photograph.
- Approve any first-person voice, testimonial, outcome, or performance representation.
- Supply private career dates or records the subjects want included.
- Provide an immediate correction and takedown channel before broad promotion.

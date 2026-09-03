# Mark-only recipient route — factual-integrity signoff

Audit date: 3 September 2026  
Implementation reviewed: the original `/for-mark` release through commit `47c18b6`; current conclusions are superseded and extended by `research/mark-private-truth-audit-2026-09-03.md`.
Evidence baseline: `app/mark-private/mark-private-data.ts`, `research/mark-private-build-brief.md`, `research/mark-source-census.md`, and the live primary/institutional sources independently checked during the preceding research tranche.

## Final release decision: PASS

The route is unusually disciplined: it names the independent origin of the work, labels the specimen post, does not invent engagement or ROI, provides sources, preserves a correction path, and places a portrait-rights warning beside the image. The visible body contains no second subject.

The first audit found four blockers: an unsupported license-class inference, inherited metadata containing the other subject's name, non-isolated social metadata, and evaluative/transaction language presented too categorically. A subsequent full-surface audit also found that the original corrections link left the isolated recipient experience, the exact 2017 proof was over-precise for the currently exposed source text, and the proposed method needed a stronger label. Those defects are corrected in the current working tree and documented in the superseding truth audit.

## Surface-by-surface result

| Surface | Result | Finding | Exact correction |
|---|---|---|---|
| Recipient boundary | PASS | Opening and footer state that RN created the work independently and Mark did not request, approve, hire, or endorse it. | Retain verbatim. |
| Hero thesis | PASS | “May be” and “could” correctly frame the strategic thesis as a proposal, not a factual claim. | None. |
| Identity and portrait caption | PASS WITH QUALIFICATION | Name and current company identity are supported. Founder status is supported by PBN; president is first-party. The new adjacent rights note correctly says reuse authorization should be confirmed. | Prefer `Founder & President · True Real Estate Hawaiʻi` only while PBN remains in the visible ledger. Retain the rights note. |
| Proof strip: founder | PASS | The visible proof now says `Founder — PBN-documented company leadership`, which matches the currently exposed independent source without asserting an exact start year. | Do not restore a calendar year unless the exact statement is directly inspectable or independently corroborated. |
| Proof strip: RS-72387 | PASS | Corrected to `HBR-listed license number`, exactly matching what the institutional directory displays without inferring an uncaptured legal class. | Do not add issuance date, class, state status, or discipline language until a current DCCA record is captured. |
| Proof strip: finance + appraisal | PASS | Directly supported by the first-party biography and accurately described as a documented foundation. | None. |
| Opportunity: current proof | PASS | Corrected to `A locally rooted brokerage leader` and `A company-published recognition history and public listing activity across Oʻahu`. These preserve the persuasive point without converting syndicated activity into audited success or production. | Retain the company-attribution qualifier. |
| Opportunity: proposed method | PASS | The section now says `The method RN Studio proposes making visible` and asks how Mark `could` make the hard call legible. | Retain the proposal/counterfactual language until Mark supplies an interview or approved case record. |
| Proposed positioning | PASS | Explicitly labeled `RN Studio’s proposed position`; no endorsement is implied. | None. |
| Series concepts | PASS | Placement under `Content demonstration` makes them proposals; no past publication or performance is claimed. | For maximum rigor, add a single `All series below are proposed` label above the grid. Recommended, not blocking. |
| Specimen post | PASS | Explicitly says `Proposed post · Not written, published, or approved by Mark`; evidence basis and property-specific rights gate are present. | None. |
| Operating system | PASS WITH QUALIFICATION | Process promises are framed as how RN would operate. Approval, client, transaction, and evidence gates are explicit. | `One structured conversation` is a production assumption. Replace with `A structured conversation` unless RN is contractually willing to guarantee that one session will always be sufficient. Recommended. |
| Pilot scope | PASS | The 90-day pilot and deliverables are clearly proposed; scope/cadence/channels/fee remain subject to agreement; no ROI is invented. | None. |
| Commercial measurement | PASS | Describes a future baseline and attributable signals without inventing historic values, guaranteed results, or targets. | None. |
| Client privacy | PASS WITH QUALIFICATION | Permission, anonymization, composites, and exclusion are described. “Anonymized beyond recognition” is not itself a safe-harbor standard. | During contracting, require documented consent/redaction/withdrawal rules and legal/compliance review where applicable. No copy change required for this pitch. |
| Evidence ledger | PASS | Mark-only visible sources. Labels generally identify provenance and avoid representing each page as approval of the strategy. | Add the HBR awards-methodology page if the body later names Aloha ʻĀina recognition; it currently does not, so this is not blocking. |
| External links and correction path | PASS | Source links use HTTPS, open separately, and carry `rel=noreferrer`. Corrections now stays in `/for-mark/corrections`, contains Mark-only metadata, and directs the recipient to reply privately rather than create a public issue. | Retain the isolated route and private reply path. |
| Structured data | PASS WITH QUALIFICATION | No Person schema or Mark-specific hidden professional assertion is emitted. The root layout contributes generic `CreativeWork` JSON-LD naming `Future Professional Profiles` and RN Studio; it contains no other subject, endorsement, approval, or unsupported Mark claim. | A future nested-layout refactor could replace the umbrella CreativeWork name with a route-specific Mark-private CreativeWork, but this is not a factual or recipient-leakage blocker. Do not add Person schema before subject approval. |
| Route-specific title, description, canonical and robots metadata | PASS | Title/description identify an RN Studio demonstration; canonical resolves to `/for-mark`; page metadata is `noindex, nofollow, nocache`. | None. |
| Inherited keyword metadata | PASS | Route-specific keywords replace the inherited cross-profile list. The fresh prerendered HTML head contains only Mark, True Real Estate Hawaiʻi, professional-authority/content-strategy language, and RN Studio. | Retain the route override. |
| Twitter/social-card metadata | PASS | Open Graph and Twitter now use Mark-only title/description data and an original abstract RN Studio strategy card. The unresolved portrait is no longer a social-card asset. | Retain the original, non-portrait card until portrait social reuse is expressly authorized. |
| Portrait reuse boundary | PASS WITH REQUIRED OPERATIONAL GATE | The page now tells the recipient that authorization should be confirmed before external publication. The 1000×1000 file is authentic and adequate; public first-party placement is provenance, not a reuse license. | Keep this page unlisted and recipient-limited. Before broader sharing, obtain Mark/rights-owner permission, original file, photographer credit, channel/duration terms, and approved crop. Do not use PBN/MLS/social imagery as substitutes without rights. |
| Search controls | PASS | `/for-mark` is omitted from `app/sitemap.ts`, disallowed in `robots.ts`, has route metadata `noindex, nofollow, nocache`, and `next.config.ts` adds `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex` plus private/no-store caching. | Verify the header on production after deployment. Remember: `noindex` is not access control. |
| Visible Sam leakage | PASS | No `Sam`, `Samuel`, `Wolff`, civic-board, energy, or Contrarian material exists in `app/for-mark/*`. | Retain a Mark-only navigation and footer. |
| Hidden/built Sam leakage | PASS | A fresh build found no other-subject name, civic/energy/Contrarian term, or profile selector in the route source, prerendered HTML, RSC route segments, or the eleven JavaScript chunks actually referenced by `/for-mark`. | Keep the private route on its isolated data module and repeat the contract scan after future metadata/layout changes. |
| Non-affiliation language | PASS | Footer includes LinkedIn even though the interface is not a LinkedIn clone; the statement is conservative, accurate, and does not create a relationship. | None. |

## Claim reconciliation notes

### Founder and president

- The True Real Estate Hawaiʻi biography supplies the current leadership story and the broader career foundation.
- Pacific Business News supplies the founder/president context. Because access is partly constrained, the pitch no longer publishes an exact company-start year.
- The page does not infer a birth year from PBN’s dated age reference. PASS.

### License number

- HBR currently displays `License #: RS-72387`, `R`, and `SFR`.
- HBR is an institutional professional directory, not the captured state subject record.
- The pitch therefore may say **HBR-listed license number RS-72387**. It may not use this audit to claim issuance date, active state status, legal class, complaint/discipline history, brokerage entity status, or principal-broker authority.

### Recognition and production

- The route wisely omits numerical sales, dollar volume, ranking, annual production, testimonial, and award counts.
- `Professional recognition and a broad transaction record` is nevertheless too compressed. Mark’s long recognition chronology is primarily company-published, while selected directory/publisher surfaces corroborate only portions. Homes.com totals changed across adjacent crawls.
- The exact replacement above keeps the persuasive point without converting syndicated activity into an audited performance fact.

### Proposed expertise and voice

- The positioning, series, and specimen are visibly presented as RN Studio strategy.
- The specimen does not impersonate Mark: it contains no Mark byline, social metrics, reactions, comments, endorsements, or claim that he wrote/published it.
- The appraisal-informed premise is anchored to the biography and properly requires property-specific records and rights before adaptation.

## Completed post-correction assertions

The original four blocking corrections and the subsequent isolation/precision corrections were independently verified against the resulting source and fresh build:

1. **PASS:** Rendered body/head, RSC segments, and route-referenced client chunks contain no other-subject name or subject-specific term.
2. **PASS:** `RS-72387` is labeled `HBR-listed license number`, not salesperson, broker, principal broker, or an unverified legal class.
3. **PASS:** The opportunity card contains the exact qualified recognition/listing language.
4. **PASS:** Twitter/Open Graph previews are Mark-only and use an original abstract RN Studio image without portrait or third-party imagery.
5. **PASS:** No JSON-LD Person schema appears. The inherited generic CreativeWork schema is accurately bounded above.
6. **PASS:** `/sitemap.xml` does not list `/for-mark`.
7. **PASS:** `/robots.txt` disallows `/for-mark`.
8. **CONFIGURATION PASS / DEPLOYMENT CHECK REQUIRED:** Source configuration contains the exact X-Robots and private/no-store protections for `/for-mark` and nested recipient routes. The integrator must verify the actual HTTP headers after production deployment.
9. **PASS:** No profile switcher, shared-product navigation, other-subject link, public GitHub issue path, or other-subject error-state content is exposed by the recipient or correction route.

## Final sentence-level overclaim sweep

Every remaining declarative sentence was reclassified as one of: directly supported professional fact; clearly attributed evidence; explicitly proposed positioning/content/pilot; RN Studio description of work visibly present on the page; future operating commitment; or rhetorical/value language that does not purport to be an audited outcome.

No sentence claims a guaranteed lead, sale, price, timing, revenue, ROI, ranking, transaction total, client result, image permission, subject approval, endorsement, state license class, principal-broker status, or exclusive expertise. `One structured conversation` and `questions only you can answer` are persuasive service language, not historical claims; the former is an operating commitment RN should retain only if she is comfortable delivering that first-cycle extraction promise. Neither creates a factual misrepresentation in the current proposed-pilot context.

## Final disposition

**PASS for Mark-only factual release, subject to production HTTP-header verification by the integrator.** No new biographical research is required for this private presentation. The only research-dependent gates remaining apply to future expansion: direct DCCA record capture if more detailed license language is desired, portrait reuse authorization before broader publication, and Mark/client approval for any actual first-person or case-based campaign.

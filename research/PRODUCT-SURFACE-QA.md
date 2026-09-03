# Product surface QA — RN Studio expansion

Audited surfaces: `/strategy-lab`, `/engage`, `/workspace`, and `ProductNavigation`.

## Viewport and layout evidence

- [x] 360 px: single-column cards, stacked controls, horizontally scrollable workspace draft rail, no fixed-width content dependency.
- [x] 768 px: breakpoints collapse multi-column journeys, proposals, measurement, workflow, editor, and history regions.
- [x] 1440 px: content widths cap at 1180–1280 px; lines and cards do not stretch to the viewport edge.
- [x] Long user-entered text uses `overflow-wrap`; textareas resize vertically; grids use flexible tracks.

## Interaction and accessibility

- [x] Strategy stages use tab/tablist/tabpanel relationships, roving `tabIndex`, Arrow keys, Home, and End.
- [x] Audience/profile choices expose pressed state; every form control has a visible label.
- [x] Workspace and brief outcomes use polite status regions.
- [x] Evidence approval is blocked until all gates pass; reopening a gate returns an approved draft to review.
- [x] No interaction requires hover; reduced-motion rules neutralize invoked smooth scrolling.
- [x] Color pairs use the established dark teal, green, white, and cream system; state is never expressed by color alone.

## Integrity and state coverage

- [x] Documented synthesis, editorial proposal, and proposed future state are explicitly labeled.
- [x] No price, adoption, approval, publication, endorsement, or outcome is invented.
- [x] Inquiry form explicitly creates a local brief and never claims submission.
- [x] Workspace covers loading, empty, success, unreadable storage, blocked approval, storage failure, populated drafts, and empty history.
- [x] Imported `rn-studio-workspace-v1` data is normalized; missing gates, versions, activity, notes, and invalid status values receive safe defaults.
- [x] Unreadable or structurally unsupported existing storage is never overwritten; persistence stops and a durable warning directs the user to export.
- [x] Workspace explicitly states browser-only, non-cross-device persistence.

## Metadata, privacy, analytics, and portability

- [x] Each route has title, description, and canonical metadata.
- [x] Personalized `/engage` query views receive `noindex, nofollow`; canonical remains `/engage`.
- [x] Recipient/goal query text removes control and bidirectional-format characters, collapses whitespace, and is length-bounded; profile accepts only `mark` or `sam`.
- [x] Analytics cover profile, stage, audience, scenario, option, brief, workspace, gate, status, version, and export actions without sending free-text content.
- [x] Strategy and engagement pages offer print/PDF; workspace offers JSON and Markdown export plus print styling.
- [x] Product navigation uses `aria-current` and links the complete planned product system.

## Automated verification

- [x] `npm run typecheck`
- [x] `npm run build`
- [ ] Real-device Safari/Chrome, screen-reader, and browser download-dialog certification require external device/human testing.

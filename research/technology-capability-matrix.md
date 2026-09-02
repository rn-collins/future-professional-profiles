# Technology capability matrix

Audit date: 2 September 2026  
Product: Future Professional Profiles  
Standard: technology must improve evidence integrity, comprehension, personalization, distribution, conversion, accessibility, or operational learning. Novelty without one of those jobs is excluded.

## Implemented product architecture

| Capability | Product value | Implementation |
|---|---|---|
| Evidence-governed data model | Keeps factual biography, strategic interpretation, and proposed content separate | Typed `Profile` objects with explicit post status, strategy, evidence, audience layers, and content engines |
| Individual crawlable profiles | Gives each subject a durable, indexable, shareable destination | Static `/profiles/mark` and `/profiles/sam` routes with person-specific metadata and canonical URLs |
| Interactive profile studio | Allows a viewer to explore rather than passively read | URL-backed switching, content/evidence tabs, saved concepts, copy-link controls, and strategy drawer |
| Audience-lens personalization | Reorders strategic relevance without changing the factual record | Persistent client, investor, community, and complete-profile lenses stored locally |
| Individual content engines | Converts biography into an operating publishing system | Subject-specific north star, cadence, franchises, formats, conversions, and audience jobs |
| Evidence-linked proposed posts | Makes the premise behind every concept inspectable | Direct per-post source links and visible editorial rationale |
| Exportable strategy dossiers | Turns the webpage into a reusable sales/work product | Client-side Markdown download plus print/save-PDF presentation |
| Machine-readable publishing surface | Allows future agents, dashboards, and integrations to consume the system | Static JSON index and profile endpoints at `/api/profiles` and `/api/profiles/[slug]` |
| Dynamic social cards | Produces subject-specific preview imagery without manually exporting graphics | Next.js `ImageResponse` Open Graph route per profile |
| Search/answer-engine foundation | Makes the work legible beyond the interface | Canonical metadata, profile metadata, JSON-LD CreativeWork schema, sitemap, robots, descriptive hierarchy, and semantic links |
| First-party analytics | Measures whether the right ideas and evidence are being used | Vercel Web Analytics, custom interaction events, source opens, saves, lens changes, exports, and profile shares |
| Real-user performance monitoring | Reveals regressions on actual devices | Vercel Speed Insights / Core Web Vitals |
| Performance-conscious delivery | Minimizes avoidable latency and layout shift | Static generation, Next Image, responsive sizes, priority portrait loading, and no runtime data waterfall |
| Accessible interaction | Makes advanced functionality operable beyond pointer input | Semantic controls, focus-visible states, live regions, Escape/backdrop closing, image alternatives, reduced motion, and responsive reading order |
| Responsive and print systems | Supports phone, desktop, and decision-room use | Breakpoint-specific controls/cards/drawers plus print stylesheet |
| Public-source research architecture | Makes completeness claims auditable | Master dossier, source census, subject-specific censuses, image provenance, evidence grades, exclusions, and unresolved-source register |

## Deliberately excluded technology

| Candidate | Why it is not deployed now | Requirement before implementation |
|---|---|---|
| Unrestricted generative-AI copy endpoint | Could invent claims, expose the project to abuse/cost, and weaken the evidence contract | Auth, rate limits, budget, prompt/version logging, retrieval limited to the verified corpus, citations, moderation, and human approval |
| Visitor identity enrichment or fingerprinting | Adds privacy risk without improving this proof of concept | A specific lawful business purpose, consent, minimization, retention rules, and privacy notice |
| Fabricated recommendations, endorsements, engagement, or outcomes | Simulates social proof the evidence does not contain | Real subject-approved data only |
| Automated image enhancement presented as documentary truth | Invents pixels and can alter recognizable people | Original files or clearly disclosed enhancement with subject/rights-holder approval |
| CRM lead capture with placeholder destination | Would collect information without an identified operating workflow | Approved recipient, privacy terms, retention/deletion process, and secure backend |
| Database and editorial CMS | Current corpus is small, typed, version-controlled, and benefits from Git review | Add when nontechnical editors, approvals, scheduled publishing, or larger subject volume justify operational complexity |

## Next authority-dependent layer

The next genuinely advanced release is not another decorative widget. It is a governed editorial operating system: authenticated subject review, claim-level approval, versioned corrections, rights clearance, a retrieval-grounded writing assistant, content-calendar generation, publishing integrations, and CRM attribution. That layer requires subject participation, approved credentials, privacy/retention decisions, and a real destination for inquiries. It should not be impersonated with placeholder workflows.

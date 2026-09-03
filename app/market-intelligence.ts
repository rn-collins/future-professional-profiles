export type ProfileKey = "mark" | "sam";
export type Confidence = "high" | "medium" | "low" | "not-established";
export type SignalKind = "market" | "audience" | "search" | "competitor" | "whitespace" | "risk";

export type IntelligenceSource = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  sourceClass: "primary" | "institutional" | "first-party" | "reported";
  accessNote: string;
};

export type MarketSignal = {
  id: string;
  profile: ProfileKey | "shared";
  kind: SignalKind;
  headline: string;
  finding: string;
  implication: string;
  confidence: Confidence;
  sourceIds: string[];
  measured: boolean;
  asOf: string;
};

export type AudienceJourney = {
  id: string;
  profile: ProfileKey;
  label: string;
  decision: string;
  questions: string[];
  proofNeeded: string[];
  content: string[];
  conversion: string;
  riskNote?: string;
};

export type CompetitorSurface = {
  id: string;
  profile: ProfileKey | "shared";
  name: string;
  category: string;
  owns: string;
  strength: string;
  implication: string;
  sourceIds: string[];
};

export type SearchIntent = {
  id: string;
  profile: ProfileKey | "shared";
  queryFamily: string;
  intent: string;
  recurringQuestions: string[];
  observedCoverage: "high" | "medium" | "fragmented";
  opportunity: string;
  limitation: string;
};

export type TopicOpportunity = {
  id: string;
  profile: ProfileKey;
  territory: string;
  saturation: "high" | "medium" | "low";
  evidencePermission: string;
  format: string;
  editorialMove: string;
  gate: string;
  score: number;
};

export type AudienceLanguageSignal = {
  id: string;
  profile: ProfileKey;
  audience: string;
  language: string[];
  underlyingNeed: string;
  copyMove: string;
  confidence: Confidence;
};

export type ProofGap = {
  id: string;
  profile: ProfileKey;
  label: string;
  severity: "publication-critical" | "high" | "medium";
  missing: string;
  consequence: string;
  resolution: string;
};

export type PlatformOpportunity = {
  id: string;
  profile: ProfileKey;
  platform: string;
  job: string;
  nativeFormats: string[];
  evidenceBehavior: string;
  priority: "primary" | "supporting" | "experimental";
};

export const intelligenceMeta = {
  researchedAt: "2026-09-03",
  geography: "Oʻahu / Honolulu County, Hawaiʻi",
  methodology: "Bounded public-web query census reconciled to identity-controlled subject records.",
  volumeBoundary: "No search volume, traffic, ranking, conversion, or demand forecast is claimed. Search signals describe qualitative result coverage only.",
  publicationBoundary: "All positioning and content opportunities are RN Studio strategy proposals, not subject-authored, approved, or previously published material.",
} as const;

export const intelligenceSources: IntelligenceSource[] = [
  { id: "hbr-2025", title: "December 2025 Oʻahu Market Report", publisher: "Honolulu Board of REALTORS®", date: "2025-12", url: "https://www.hicentral.com/mpr/mpr-2025-12.php", sourceClass: "primary", accessNote: "MLS-derived annual and monthly resale statistics." },
  { id: "hbr-archive", title: "Hawaiʻi Real Estate Market Reports", publisher: "Honolulu Board of REALTORS®", date: "2010–2026 archive", url: "https://www.hicentral.com/market-press-releases.php", sourceClass: "primary", accessNote: "Current figures are time-sensitive and must be dated." },
  { id: "census-honolulu", title: "QuickFacts: Honolulu County, Hawaiʻi", publisher: "U.S. Census Bureau", date: "2020–2024 / 2025 fields", url: "https://www.census.gov/quickfacts/fact/table/honolulucountyhawaii/HEA775224", sourceClass: "primary", accessNote: "Population estimates and ACS context; not transaction data." },
  { id: "dpp-resources", title: "Planning and resilience resources", publisher: "City and County of Honolulu DPP", date: "accessed 2026-09-03", url: "https://www.honolulu.gov/dpp/resources/", sourceClass: "primary", accessNote: "Official routes to flood, sea-level-rise, shoreline, heat and planning tools." },
  { id: "firm-update", title: "Oʻahu FIRM Update", publisher: "Resilience Office, City and County of Honolulu", date: "effective 2026-06-10", url: "https://www.resilientoahu.org/firm-update", sourceClass: "primary", accessNote: "Official flood-map information; property-specific review still required." },
  { id: "dpp-faq", title: "DPP FAQ / HNL Build", publisher: "City and County of Honolulu DPP", date: "accessed 2026-09-03", url: "https://www.honolulu.gov/dpp/home/faq/", sourceClass: "primary", accessNote: "Current permit workflow; recheck before publication." },
  { id: "sewer-fees", title: "Sewer Fee Rates", publisher: "Honolulu Department of Environmental Services", date: "2026–2031 schedule", url: "https://www.honolulu.gov/env/sewer-fee-rates/", sourceClass: "primary", accessNote: "Applies to residential and commercial system users." },
  { id: "colliers-office", title: "Oʻahu Office Market Report Q1 2026", publisher: "Colliers / Mike Hamasu", date: "2026-04-24", url: "https://www.colliers.com/en/research/hawaii/oahu-office-market-report-q1-2026", sourceClass: "institutional", accessNote: "Commercial research; definitions belong to publisher methodology." },
  { id: "colliers-retail", title: "Oʻahu Retail Market Report Q1 2026", publisher: "Colliers / Mike Hamasu", date: "2026-05-11", url: "https://www.colliers.com/en/research/hawaii/oahu-retail-market-report-q1-2026", sourceClass: "institutional", accessNote: "Commercial research; definitions belong to publisher methodology." },
  { id: "colliers-industrial", title: "Oʻahu Industrial Market Report Q1 2026", publisher: "Colliers / Mike Hamasu", date: "2026-04-24", url: "https://www.colliers.com/en/research/hawaii/oahu-industrial-market-report-q1-2026", sourceClass: "institutional", accessNote: "Commercial research; definitions belong to publisher methodology." },
  { id: "hseo-fuels", title: "Alternative Fuel, Repowering, and Energy Transition Study", publisher: "Hawaiʻi State Energy Office", date: "revised 2026-05", url: "https://energy.hawaii.gov/wp-content/uploads/2026/05/HSEO-Alternative-Fuels-Study-Revised-May-2026.pdf", sourceClass: "primary", accessNote: "State energy context, not subject-specific proof." },
  { id: "oahu-plan", title: "Oʻahu General Plan Review Report", publisher: "City and County of Honolulu DPP", date: "2025-12 file", url: "https://www.honolulu.gov/dpp/wp-content/uploads/sites/56/2025/12/1-GP-Review-Report.pdf", sourceClass: "primary", accessNote: "Planning, infrastructure, resilience and housing context." },
  { id: "locations-report", title: "Oʻahu Real Estate Report", publisher: "Locations Hawaiʻi", date: "2026-07", url: "https://www.locationshawaii.com/learn/market-reports/oahu-real-estate-report/", sourceClass: "first-party", accessNote: "Answer-competitor format benchmark; validate underlying metrics against HBR." },
  { id: "kiriu-report", title: "Oʻahu Real Estate Market Update 2026", publisher: "Kiriu Sasaki Team", date: "2026-01-06", url: "https://www.myronkiriu.com/blog/2026/1/6/oahu-real-estate-market-report-2026", sourceClass: "first-party", accessNote: "Answer-competitor benchmark; credentials/performance are self-published." },
  { id: "boh-cre", title: "Generating Passive Income with Commercial Real Estate", publisher: "Bank of Hawaiʻi", date: "2021-09-13", url: "https://www.boh.com/blog/generating-passive-income-with-commercial-real-estate-investing", sourceClass: "institutional", accessNote: "Accessible, dated local primer; not individualized advice." },
  { id: "naiop", title: "NAIOP Hawaiʻi", publisher: "NAIOP Hawaiʻi", date: "accessed 2026-09-03", url: "https://www.naiophawaii.org/", sourceClass: "institutional", accessNote: "Commercial owner/developer/investor professional ecosystem." },
  { id: "ulupono", title: "Newsletter archive", publisher: "Ulupono Initiative", date: "accessed 2026-09-03", url: "https://ulupono.com/newsletter-listing", sourceClass: "institutional", accessNote: "Systems and energy attention benchmark; not a direct commercial competitor." },
];

export const marketSignals: MarketSignal[] = [
  { id: "resale-scale", profile: "mark", kind: "market", headline: "High-stakes household decisions", finding: "HBR reported 2025 Oʻahu resale medians of $1.139M for single-family homes and $507,250 for condos.", implication: "Content should reduce decision error, not merely create aspiration.", confidence: "high", sourceIds: ["hbr-2025"], measured: true, asOf: "2025 annual" },
  { id: "housing-cost", profile: "mark", kind: "audience", headline: "Housing cost remains structurally consequential", finding: "Census QuickFacts reports a $897,500 median owner-occupied value and $3,111 median monthly owner cost with a mortgage for 2020–2024.", implication: "Affordability, carrying cost, and downside deserve first-class editorial treatment.", confidence: "high", sourceIds: ["census-honolulu"], measured: true, asOf: "2020–2024" },
  { id: "risk-map-change", profile: "shared", kind: "market", headline: "Risk maps now change live property questions", finding: "Updated Oʻahu flood maps became effective in June 2026, while City tools expose flood, sea-level-rise, shoreline and heat context.", implication: "Build source-linked risk and permit explainers with property-specific limits.", confidence: "high", sourceIds: ["firm-update", "dpp-resources"], measured: false, asOf: "2026-06-10" },
  { id: "market-recap-crowding", profile: "mark", kind: "competitor", headline: "Generic market recaps are occupied", finding: "HBR, brokerage reports and agent video channels repeatedly answer monthly price, sales and inventory queries.", implication: "Interpret the decision a number changes; do not publish another undifferentiated recap.", confidence: "high", sourceIds: ["hbr-archive", "locations-report", "kiriu-report"], measured: false, asOf: "2026-09-03 crawl" },
  { id: "mark-whitespace", profile: "mark", kind: "whitespace", headline: "Appraisal process is the differentiator", finding: "The competitor set foregrounds statistics, neighborhoods, listings and credentials more often than a visible property-evidence method.", implication: "Own appraisal-trained pre-offer reasoning and a transparent evidence brief.", confidence: "medium", sourceIds: ["hbr-archive", "kiriu-report"], measured: false, asOf: "2026-09-03 crawl" },
  { id: "office-cost", profile: "sam", kind: "market", headline: "Commercial conditions require segment translation", finding: "Colliers reported 12.40% office vacancy in Q1 2026 and identified fuel and energy costs as operating pressures.", implication: "Translate institutional metrics into questions a small owner should investigate.", confidence: "high", sourceIds: ["colliers-office"], measured: true, asOf: "2026 Q1" },
  { id: "sector-divergence", profile: "sam", kind: "market", headline: "One CRE headline cannot describe every asset", finding: "Q1 2026 reported vacancy differed sharply across office, retail and industrial sectors.", implication: "Every CRE explainer must identify asset class, submarket, source date and decision horizon.", confidence: "high", sourceIds: ["colliers-office", "colliers-retail", "colliers-industrial"], measured: true, asOf: "2026 Q1" },
  { id: "public-private-cost", profile: "sam", kind: "whitespace", headline: "Public decisions enter private models", finding: "Flood maps, permits, sewer charges, energy systems and planning rules create a recurring official-source stream.", implication: "Build Public Meeting, Private Consequence and the Oʻahu Operating-Cost Map.", confidence: "high", sourceIds: ["firm-update", "dpp-faq", "sewer-fees", "hseo-fuels", "oahu-plan"], measured: false, asOf: "2026-09-03" },
  { id: "sam-credential-risk", profile: "sam", kind: "risk", headline: "Commercial authority is not yet established", finding: "Current advisor language is publicly indexed, but employer status, license, deal history and outcomes remain unverified in the identity census.", implication: "Keep CRE generation conditional until first-party evidence is supplied.", confidence: "high", sourceIds: [], measured: false, asOf: "2026-09-03" },
  { id: "no-volume", profile: "shared", kind: "search", headline: "Demand is qualitative, not quantified", finding: "Public result recurrence identifies question families but does not establish impressions, volume, ranking difficulty or conversion.", implication: "Do not display invented search metrics; connect approved first-party analytics later.", confidence: "high", sourceIds: [], measured: false, asOf: "2026-09-03" },
];

export const audienceJourneys: AudienceJourney[] = [
  { id: "mark-household-sequence", profile: "mark", label: "Move-up and move-down households", decision: "Sell first, buy first, bridge, renovate, or wait", questions: ["What must be protected?", "What can overlap?", "Which contingency changes leverage?", "What carrying cost is tolerable?"], proofNeeded: ["Dated segment data", "Financing scenario", "Property facts", "Explicit assumptions"], content: ["Sequencing simulator", "Decision-tree carousel", "Composite scenario memo"], conversion: "Sequencing consultation" },
  { id: "mark-buyer-diligence", profile: "mark", label: "First-time and returning buyers", decision: "Determine whether the attractive property is a defensible fit", questions: ["Fee simple or leasehold?", "What do reserves and assessments show?", "What changes insurance?", "Are permits and risk maps clean?"], proofNeeded: ["Governing documents", "Official maps", "Permit/property records", "Specialist input where required"], content: ["Pre-offer evidence brief", "Condo document room", "What the Listing Doesn’t Tell You"], conversion: "Pre-offer diligence conversation" },
  { id: "mark-owner", profile: "mark", label: "Owners and sellers", decision: "Sell, hold, renovate, rent, or reposition", questions: ["Which work changes the buyer pool?", "What is maintenance versus value creation?", "Which timing risk matters?"], proofNeeded: ["Dated comparables", "Condition evidence", "Cost assumptions", "Public records"], content: ["Renovate-versus-list model", "One Number, Three Markets", "Seller evidence brief"], conversion: "Property decision review" },
  { id: "mark-referral", profile: "mark", label: "Referral professionals", decision: "Know whether Mark is the right introduction", questions: ["What problem does he solve?", "What evidence standard does he use?", "Where does his scope stop?"], proofNeeded: ["Method statement", "Client-approved case", "Scope boundary"], content: ["Referral memo", "Method page", "Decision-case library"], conversion: "Qualified introduction" },
  { id: "sam-cre-transition", profile: "sam", label: "Residential investors considering CRE", decision: "Identify which familiar assumptions no longer transfer", questions: ["How do leases alter risk?", "Who pays operating expenses?", "What tenant concentration matters?", "What capex and debt scenarios break the thesis?"], proofNeeded: ["Current role confirmation", "Named market source", "Lease/rent-roll evidence", "Legal/financial/physical diligence"], content: ["Change the Asset, Change the Questions", "Transition diagnostic", "Scenario memo"], conversion: "Commercial-transition diagnostic", riskNote: "Do not launch as subject expertise until current role and compliant scope are confirmed." },
  { id: "sam-owner-operator", profile: "sam", label: "Local owners and operators", decision: "Understand how a public-system change affects cost, timing, or feasibility", questions: ["What changed?", "Who implements it?", "Which property is affected?", "What cost or delay enters the model?"], proofNeeded: ["Official agency record", "Affected-property facts", "Expert review for technical conclusions"], content: ["Oʻahu Operating-Cost Map", "Follow the Pathway", "Source annotation"], conversion: "Systems-impact briefing" },
  { id: "sam-civic", profile: "sam", label: "Civic and neighborhood stakeholders", decision: "Understand an issue without flattening the tradeoff", questions: ["What is the governing record?", "Whose position is documented?", "Who bears each consequence?", "What is still uncertain?"], proofNeeded: ["Agenda/minutes/testimony", "Exact attribution", "Countervailing evidence"], content: ["Public Meeting, Private Consequence", "Tradeoff ledger", "Primary-source reading guide"], conversion: "Stakeholder dialogue", riskNote: "Never assign a board action to Sam without individual evidence." },
  { id: "sam-energy-property", profile: "sam", label: "Energy and property professionals", decision: "Connect system design and policy to land, resilience, cost, and value", questions: ["Which dependency changes feasibility?", "What incentive or tariff applies?", "What operating consequence follows?"], proofNeeded: ["Utility/state source", "Credentialed technical review", "Historical role verification"], content: ["Energy-property system map", "Retrospective field essay", "Expert interview"], conversion: "Cross-sector collaboration", riskNote: "Documented RevoluSun work does not establish current engineering or scientific credentials." },
];

export const competitorSurfaces: CompetitorSurface[] = [
  { id: "hbr", profile: "shared", name: "Honolulu Board of REALTORS®", category: "Primary market data", owns: "Monthly and historical Oʻahu resale statistics", strength: "Canonical MLS-derived archive", implication: "Cite it; add transparent decision interpretation rather than restating headlines.", sourceIds: ["hbr-archive"] },
  { id: "locations", profile: "mark", name: "Locations Hawaiʻi", category: "Consumer market report", owns: "Scannable monthly price, sales and days-on-market presentation", strength: "Readable recurring tables", implication: "Generic recap is occupied; segment by decision and assumptions.", sourceIds: ["locations-report"] },
  { id: "kiriu", profile: "mark", name: "Kiriu Sasaki Team", category: "Credential-led residential advisory", owns: "Luxury neighborhood analysis, financial/legal credential story and conversion funnel", strength: "Mature proof and search architecture", implication: "Mark should own a visible appraisal process, not unsupported analytical superlatives.", sourceIds: ["kiriu-report"] },
  { id: "colliers", profile: "sam", name: "Colliers Hawaiʻi", category: "Institutional CRE research", owns: "Office, retail, industrial and investment metrics", strength: "Sector-specific professional research", implication: "Cite and translate; never imply proprietary market authority.", sourceIds: ["colliers-office", "colliers-retail", "colliers-industrial"] },
  { id: "boh", profile: "sam", name: "Bank of Hawaiʻi", category: "Commercial-investment education", owns: "Accessible local CRE and financing primer", strength: "Institutional trust", implication: "Basic definitions are occupied; add local scenario and public-system consequences.", sourceIds: ["boh-cre"] },
  { id: "government-records", profile: "sam", name: "City / State public records", category: "Primary systems intelligence", owns: "Permits, hazard maps, fees, plans and energy records", strength: "Authority but fragmented usability", implication: "Interpretation with exact provenance is the whitespace.", sourceIds: ["dpp-resources", "firm-update", "dpp-faq", "sewer-fees", "hseo-fuels", "oahu-plan"] },
  { id: "ulupono", profile: "sam", name: "Ulupono Initiative", category: "Systems narrative", owns: "Energy, food, water, transportation and resilience analysis", strength: "Established issue authority and audience", implication: "Use a procedural decision lens; do not borrow advocacy authority.", sourceIds: ["ulupono"] },
];

export const searchIntents: SearchIntent[] = [
  { id: "oahu-market", profile: "mark", queryFamily: "Oʻahu real-estate market update", intent: "Understand what prices, sales and inventory did", recurringQuestions: ["Are prices rising?", "Is inventory changing?", "Is it a buyer or seller market?"], observedCoverage: "high", opportunity: "Show which decision a dated, segmented metric changes—and which it cannot answer.", limitation: "No impression or volume data was available." },
  { id: "buyer-structure", profile: "mark", queryFamily: "Hawaiʻi buyer diligence", intent: "Avoid a local property-structure or cost surprise", recurringQuestions: ["Fee simple or leasehold?", "Are condo reserves adequate?", "Could there be an assessment?", "What changes flood insurance or permits?"], observedCoverage: "high", opportunity: "Turn FAQs into a source-visible evidence brief and decision tool.", limitation: "Observed recurrence does not measure demand size or commercial intent." },
  { id: "seller-sequence", profile: "mark", queryFamily: "Buy before selling / sell before buying", intent: "Sequence a household move without intolerable exposure", recurringQuestions: ["Can both transactions overlap?", "What contingency is viable?", "What is the carrying-cost downside?"], observedCoverage: "medium", opportunity: "Use transparent, labeled scenarios and a sequencing simulator.", limitation: "No subject-specific client-question dataset was available." },
  { id: "cre-transition", profile: "sam", queryFamily: "Residential investor moving into commercial real estate", intent: "Learn the vocabulary and changed risk model", recurringQuestions: ["How do NOI and cap rate work?", "What changes with leases and tenants?", "What diligence and financing are required?"], observedCoverage: "high", opportunity: "Localize the changed-question framework after credential verification.", limitation: "Most observed answers were national; no local search-volume data was available." },
  { id: "owner-systems", profile: "sam", queryFamily: "Honolulu owner costs, permits and resilience", intent: "Determine how a public change affects a property", recurringQuestions: ["Did my flood zone change?", "Which permit process applies?", "How will sewer or energy costs change?"], observedCoverage: "fragmented", opportunity: "Unify primary records in the Oʻahu Operating-Cost Map.", limitation: "Topics are time-sensitive and require agency-level refreshes." },
  { id: "civic-consequence", profile: "sam", queryFamily: "Hawaiʻi Kai development and community issues", intent: "Understand a contested local decision", recurringQuestions: ["Who decides?", "What is proposed?", "Who bears cost or risk?", "What evidence is official?"], observedCoverage: "fragmented", opportunity: "Annotate the record and preserve each stakeholder and uncertainty.", limitation: "Issue visibility does not establish endorsement by Sam or the full board." },
];

export const topicOpportunities: TopicOpportunity[] = [
  { id: "mark-preoffer", profile: "mark", territory: "Appraisal-trained pre-offer reasoning", saturation: "low", evidencePermission: "Documented finance and appraisal background plus property-specific public evidence", format: "Interactive evidence brief", editorialMove: "Reveal the five unglamorous facts that could reverse the attractive first impression.", gate: "Distinguish broker analysis from a formal appraisal; obtain rights for property imagery.", score: 96 },
  { id: "mark-sequence", profile: "mark", territory: "Household move sequencing", saturation: "medium", evidencePermission: "Public process facts and explicitly labeled composite scenarios", format: "Scenario simulator", editorialMove: "Make constraints and tradeoffs selectable instead of prescribing one universal sequence.", gate: "No invented client story, financing result or promised outcome.", score: 91 },
  { id: "mark-condo", profile: "mark", territory: "Condo document reading", saturation: "medium", evidencePermission: "Controlled documents, official sources and specialist input", format: "Document reading room", editorialMove: "Explain what each document establishes, what it does not, and the next question.", gate: "Redact private material; require legal, insurance or reserve specialist review when needed.", score: 89 },
  { id: "mark-market", profile: "mark", territory: "Decision-specific market interpretation", saturation: "high", evidencePermission: "Dated HBR statistics", format: "One Number, Three Markets", editorialMove: "Re-segment a headline by property, place, price and objective.", gate: "Cite source date and avoid forecasts not supported by evidence.", score: 82 },
  { id: "sam-public-private", profile: "sam", territory: "Public meeting, private consequence", saturation: "low", evidencePermission: "Official records and exact direct attribution", format: "Annotated system map", editorialMove: "Trace one public action into effects for residents, owners, operators and implementers.", gate: "Separate Sam’s words, board action, reporting and RN analysis.", score: 97 },
  { id: "sam-cost-map", profile: "sam", territory: "Oʻahu operating-cost map", saturation: "low", evidencePermission: "Agency fees, permits, maps, plans and utility/state records", format: "Living evidence dashboard", editorialMove: "Unify fragmented official changes by affected decision and effective date.", gate: "Refresh automatically and never generalize a property-specific conclusion.", score: 95 },
  { id: "sam-transition", profile: "sam", territory: "Residential-to-commercial transition", saturation: "medium", evidencePermission: "Currently only an indexed professional description", format: "Changed-question diagnostic", editorialMove: "Replace familiar residential assumptions with CRE diligence questions.", gate: "First-party role, scope, license and outcome verification required before subject-led launch.", score: 79 },
  { id: "sam-energy", profile: "sam", territory: "Energy as property-system context", saturation: "medium", evidencePermission: "Documented historical solar role plus primary energy records", format: "Follow the Pathway", editorialMove: "Trace policy or infrastructure through cost, feasibility, resilience and place.", gate: "Use credentialed experts for technical conclusions; do not imply current engineering authority.", score: 88 },
];

export const audienceLanguageSignals: AudienceLanguageSignal[] = [
  { id: "mark-protect", profile: "mark", audience: "Households", language: ["What can we safely afford?", "Do we sell first?", "What are we missing?", "What could go wrong after closing?"], underlyingNeed: "Reduce exposure while coordinating a consequential move.", copyMove: "Lead with what the decision protects, then show assumptions and sequence.", confidence: "medium" },
  { id: "mark-condo-language", profile: "mark", audience: "Condo buyers", language: ["Why are the fees so high?", "Is the building healthy?", "Could there be a special assessment?", "Fee simple or leasehold?"], underlyingNeed: "Translate documents and recurring costs into an intelligible ownership horizon.", copyMove: "Name the document, what it can prove, and the next unresolved question.", confidence: "medium" },
  { id: "mark-investor-language", profile: "mark", audience: "Residential investors", language: ["Does the basis work?", "What is the downside?", "Are permits clean?", "Who is the exit buyer?"], underlyingNeed: "Test the thesis before optimism hardens into price.", copyMove: "Use conditional reasoning and downside cases instead of certainty language.", confidence: "medium" },
  { id: "sam-transition-language", profile: "sam", audience: "CRE-transition investors", language: ["What changes from residential?", "Who pays which expenses?", "What happens when a tenant leaves?", "What capex is hiding?"], underlyingNeed: "Replace residential shortcuts with a commercial diligence model.", copyMove: "Pair each familiar assumption with the commercial question that supersedes it.", confidence: "low" },
  { id: "sam-owner-language", profile: "sam", audience: "Owners and operators", language: ["Does this apply to my property?", "When does it take effect?", "Who do I call?", "What changes the cost or timeline?"], underlyingNeed: "Convert fragmented agency information into an actionable consequence.", copyMove: "Start with effective date and affected decision; attach the controlling record.", confidence: "medium" },
  { id: "sam-civic-language", profile: "sam", audience: "Civic stakeholders", language: ["Who decided this?", "Was the community consulted?", "Who pays?", "What happens next?"], underlyingNeed: "See authority, process, burden and implementation without losing nuance.", copyMove: "Separate proposal, testimony, board action, agency implementation and uncertainty.", confidence: "medium" },
];

export const proofGaps: ProofGap[] = [
  { id: "mark-image-rights", profile: "mark", label: "Portrait and property-image rights", severity: "publication-critical", missing: "Written reuse permission, photographer credit and approved original files.", consequence: "Public availability cannot be treated as a publication license.", resolution: "Obtain a signed subject/rights-owner approval and store provenance with each asset." },
  { id: "mark-case-proof", profile: "mark", label: "Controlled case evidence", severity: "high", missing: "Client-approved chronology, inputs, Mark’s actions and outcome boundaries.", consequence: "MLS outcomes cannot prove strategy or causation.", resolution: "Commission one redacted, client-approved case packet." },
  { id: "mark-recognition", profile: "mark", label: "Recognition methodology", severity: "medium", missing: "Independent verification for each year and definition of each honor.", consequence: "The company-published ledger cannot become an audited ranking claim.", resolution: "Link award-owner records or label the chronology first-party." },
  { id: "sam-current-role", profile: "sam", label: "Current role and scope", severity: "publication-critical", missing: "First-party title, organization, dates, responsibilities and permitted public description.", consequence: "The indexed CRE identity may be stale or incomplete.", resolution: "Obtain confirmation from Sam and, where appropriate, the organization." },
  { id: "sam-commercial-proof", profile: "sam", label: "Commercial credentials and outcomes", severity: "publication-critical", missing: "License/scope, deal record, results methodology and compliant client evidence.", consequence: "The prototype cannot call him a broker, expert or proven advisor.", resolution: "Collect primary credential records and approved case evidence—or keep the lane hypothetical." },
  { id: "sam-attribution", profile: "sam", label: "Individual civic attribution", severity: "high", missing: "Vote-, authorship-, or quotation-level proof for many board matters.", consequence: "A board action could be incorrectly portrayed as Sam’s personal position.", resolution: "Use only direct remarks/testimony or label the matter as board context." },
  { id: "sam-image-rights", profile: "sam", label: "Family-image consent", severity: "publication-critical", missing: "Written consent covering Sam and recognizable family members plus original-resolution asset.", consequence: "A public family profile image is not sufficient permission for a campaign.", resolution: "Obtain permission or an approved solo portrait; preserve an immediate takedown route." },
];

export const platformOpportunities: PlatformOpportunity[] = [
  { id: "mark-site", profile: "mark", platform: "Owned evidence site", job: "Canonical home for durable search pages, tools and claim provenance", nativeFormats: ["pre-offer brief", "decision simulator", "source ledger"], evidenceBehavior: "Inline citations, dated inputs and correction history", priority: "primary" },
  { id: "mark-linkedin", profile: "mark", platform: "LinkedIn", job: "Referral visibility and professional decision education", nativeFormats: ["document carousel", "short evidence post", "monthly decision brief"], evidenceBehavior: "Link to the owned evidence page; keep concept status visible", priority: "primary" },
  { id: "mark-video", profile: "mark", platform: "YouTube / short video", job: "Show real-time property reasoning rather than only inventory", nativeFormats: ["field walk-through", "five-question short", "market interpretation"], evidenceBehavior: "On-screen source/date and companion evidence page", priority: "supporting" },
  { id: "sam-site", profile: "sam", platform: "Owned systems desk", job: "Unify public records by affected property decision", nativeFormats: ["operating-cost map", "record annotation", "tradeoff ledger"], evidenceBehavior: "Primary record, effective date, attribution and uncertainty", priority: "primary" },
  { id: "sam-linkedin", profile: "sam", platform: "LinkedIn", job: "Reach owners, investors, civic and cross-sector professionals", nativeFormats: ["system-map carousel", "changed-question framework", "source note"], evidenceBehavior: "Every professional claim gated; every civic position attributed", priority: "primary" },
  { id: "sam-briefing", profile: "sam", platform: "Email briefing", job: "Deliver a recurring, useful record-to-consequence digest", nativeFormats: ["monthly systems brief", "effective-date alert", "reading list"], evidenceBehavior: "Deep links to agency sources and corrections", priority: "supporting" },
];

export function getProfileIntelligence(profile: ProfileKey) {
  return {
    profile,
    signals: marketSignals.filter((item) => item.profile === profile || item.profile === "shared"),
    audiences: audienceJourneys.filter((item) => item.profile === profile),
    competitors: competitorSurfaces.filter((item) => item.profile === profile || item.profile === "shared"),
    searchIntents: searchIntents.filter((item) => item.profile === profile || item.profile === "shared"),
    opportunities: topicOpportunities
      .filter((item) => item.profile === profile)
      .sort((a, b) => b.score - a.score),
    language: audienceLanguageSignals.filter((item) => item.profile === profile),
    proofGaps: proofGaps.filter((item) => item.profile === profile),
    platforms: platformOpportunities.filter((item) => item.profile === profile),
  };
}

export const marketIntelligence = {
  meta: intelligenceMeta,
  sources: intelligenceSources,
  signals: marketSignals,
  audiences: audienceJourneys,
  competitors: competitorSurfaces,
  searchIntents,
  opportunities: topicOpportunities,
  language: audienceLanguageSignals,
  proofGaps,
  platforms: platformOpportunities,
} as const;

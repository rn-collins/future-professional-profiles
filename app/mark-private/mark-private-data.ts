export type MarkClaimState = "verified" | "attributed" | "qualified" | "withheld";

export type MarkSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceClass: "first-party" | "institutional" | "independent" | "syndicated";
  checked: string;
  supports: string[];
  limitation?: string;
};

export const markPrivateSources: MarkSource[] = [
  {
    id: "true-bio",
    title: "Mark H. Young",
    publisher: "True Real Estate Hawaiʻi",
    url: "https://truerealestatehawaii.com/agent/mark-young/",
    sourceClass: "first-party",
    checked: "2026-09-03",
    supports: ["Kāneʻohe origin", "education", "finance and appraisal foundation", "audiences served", "designations", "memberships", "company-published recognition and testimonials"],
    limitation: "A subject-controlled biography is authoritative for how Mark presents his history, but its accolades and testimonials are not independent outcome audits.",
  },
  {
    id: "hbr-directory",
    title: "About Mark H. Young",
    publisher: "Honolulu Board of REALTORS®",
    url: "https://www.hicentral.com/directory/member/40803/Mark-H-Young/%252Fdirectory%252Foffice%252F8676%253Furl%253D%2525252Fdirectory%2525252Foffices%2525253FcompanyName%2525253Da%25252526specialty%2525253D%25252526page%2525253D54%2526page%253D1",
    sourceClass: "institutional",
    checked: "2026-09-03",
    supports: ["current directory identity", "True Real Estate Hawaiʻi affiliation", "license number RS-72387", "R and SFR directory labels"],
    limitation: "Directory status is time-sensitive. The state regulator's interactive subject result was not captured, so this module does not infer license class, issuance date, discipline history, or state status beyond the HBR display.",
  },
  {
    id: "hbr-awards",
    title: "Awards Programs",
    publisher: "Honolulu Board of REALTORS®",
    url: "https://www.hicentral.com/awards-programs.php",
    sourceClass: "institutional",
    checked: "2026-09-03",
    supports: ["Aloha ʻĀina program purpose", "public-only nomination pathway", "program began in 1998"],
    limitation: "The page explains the program, not Mark's year-by-year nomination record. His chronology remains company-published unless an award-owner record is linked.",
  },
  {
    id: "honolulu-2022",
    title: "Mark H. Young",
    publisher: "HONOLULU Magazine",
    url: "https://www.honolulumagazine.com/listings/2022-hawaii-real-estate-pro-finder/mark-h-young-3/",
    sourceClass: "independent",
    checked: "2026-09-03",
    supports: ["2022 directory presence", "residential specialty", "True Real Estate Hawaiʻi affiliation"],
    limitation: "A directory entry does not establish transaction volume, client outcomes, or the methodology of every recognition year.",
  },
  {
    id: "pbn-2021",
    title: "True Real Estate carves out market share",
    publisher: "Pacific Business News",
    url: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html",
    sourceClass: "independent",
    checked: "2026-09-03",
    supports: ["2021 company profile", "reported 2017 company start", "founder context"],
    limitation: "Access is partly paywalled. Do not extrapolate a birth date, financial results, market share, or details absent from accessible text.",
  },
  {
    id: "hbr-market",
    title: "Oʻahu real-estate market reports",
    publisher: "Honolulu Board of REALTORS®",
    url: "https://www.hicentral.com/market-press-releases.php",
    sourceClass: "institutional",
    checked: "2026-09-03",
    supports: ["recurring market source for future editorial work"],
    limitation: "Every content item must cite the specific reporting period and preserve the source's property-type, geography, and measurement definitions.",
  },
  {
    id: "homes-profile",
    title: "Mark Young professional profile",
    publisher: "Homes.com",
    url: "https://www.homes.com/real-estate-agents/mark-young/wv0wsdk/",
    sourceClass: "syndicated",
    checked: "2026-09-03",
    supports: ["identity corroboration", "dated indication of broad Oʻahu activity"],
    limitation: "Displayed totals changed between adjacent crawls. Never convert them into audited, evergreen, or causal performance claims.",
  },
];

export const markPrivateFacts = [
  { id: "origin", copy: "Born and raised in Kāneʻohe, Hawaiʻi.", state: "verified" as MarkClaimState, sourceIds: ["true-bio"], use: "profile" },
  { id: "education", copy: "A graduate of Hawaiʻi Baptist Academy and the University of Hawaiʻi, with a finance degree.", state: "verified" as MarkClaimState, sourceIds: ["true-bio"], use: "profile" },
  { id: "appraisal", copy: "He began by applying that finance training in commercial and residential real-estate appraisal and analysis.", state: "verified" as MarkClaimState, sourceIds: ["true-bio"], use: "positioning" },
  { id: "leadership", copy: "He leads True Real Estate Hawaiʻi; independent reporting describes him as its founder and dates the company to 2017.", state: "qualified" as MarkClaimState, sourceIds: ["true-bio", "pbn-2021"], use: "profile" },
  { id: "directory", copy: "The Honolulu Board of REALTORS® directory lists Mark with True Real Estate Hawaiʻi, license number RS-72387, and the labels R and SFR.", state: "verified" as MarkClaimState, sourceIds: ["hbr-directory"], use: "proof" },
  { id: "clients", copy: "His company biography names first-time buyers, growing and downsizing families, developers, and investors among the people he serves.", state: "attributed" as MarkClaimState, sourceIds: ["true-bio"], use: "audience" },
  { id: "recognition", copy: "His company publishes a recognition record spanning 2009–2025; independent directories corroborate selected years, not the entire chronology.", state: "qualified" as MarkClaimState, sourceIds: ["true-bio", "honolulu-2022", "hbr-awards"], use: "proof" },
  { id: "production", copy: "Do not publish changing syndicated production totals as audited or permanent performance.", state: "withheld" as MarkClaimState, sourceIds: ["homes-profile"], use: "boundary" },
  { id: "accident", copy: "Do not use the personal accident story without the full source and Mark's express approval.", state: "withheld" as MarkClaimState, sourceIds: [], use: "boundary" },
] as const;

export const markPrivatePositioning = {
  core: "The appraisal-trained advisor who makes the reasoning visible before a consequential property decision.",
  whyItWins: "Mark's public record already contains a differentiated authority asset—finance applied to commercial and residential appraisal—but his searchable presence mostly proves identity, listings, and recognition. The opportunity is to productize his judgment: what he notices, what he verifies, what can reverse an attractive first impression, and where his analysis stops.",
  notThis: ["Another personality-led agent feed", "Undifferentiated market recaps", "Inventory spectacle presented as expertise", "Uncited superlatives or evergreen transaction totals"],
  promise: "Clearer questions, visible evidence, and a more defensible next decision—not a guaranteed transaction result.",
  credibilityStack: ["Kāneʻohe roots", "University finance training", "Commercial and residential appraisal foundation", "Brokerage leadership", "Institutionally corroborated professional identity", "A long, carefully attributed recognition footprint"],
};

export const markPrivateAudiences = [
  {
    id: "household-move",
    audience: "Households coordinating a move",
    decision: "Whether to buy first, sell first, or structure overlap without taking intolerable exposure.",
    feltQuestions: ["What can we safely afford?", "What are we missing?", "What could go wrong after closing?"],
    proof: ["Transparent assumptions", "Sequencing options", "Specialist boundaries", "Client-approved composite or case"],
    firstAction: "Use a move-sequencing diagnostic, then request a conversation only if the constraints fit Mark's practice.",
    priority: "primary",
  },
  {
    id: "investor",
    audience: "Residential investors and sophisticated buyers",
    decision: "Whether the basis, physical condition, documents, location, and exit assumptions survive diligence.",
    feltQuestions: ["What breaks the thesis?", "Are the permits clean?", "What cost is hiding?", "Who is the exit buyer?"],
    proof: ["Source-visible pre-offer brief", "Downside cases", "Public-record links", "Clear distinction from a formal appraisal"],
    firstAction: "Review a worked, redacted evidence brief.",
    priority: "primary",
  },
  {
    id: "condo",
    audience: "Condo buyers and owners",
    decision: "Whether documents, reserves, assessments, tenure, insurance, and recurring costs fit the ownership horizon.",
    feltQuestions: ["Could there be an assessment?", "Is the building healthy?", "What does this document actually establish?"],
    proof: ["Named document", "Source date", "What it establishes", "What requires legal, insurance, reserve, or inspection expertise"],
    firstAction: "Open a document-reading room organized by decision consequence.",
    priority: "primary",
  },
  {
    id: "seller",
    audience: "Sellers making a consequential transition",
    decision: "How to prepare, price, sequence, and negotiate without confusing activity with strategy.",
    feltQuestions: ["What changes the likely buyer?", "Which preparation matters?", "What is the downside of waiting?"],
    proof: ["Dated market segment", "Preparation rationale", "Approved case chronology", "No promised price or timing"],
    firstAction: "Review a decision memo rather than a generic valuation claim.",
    priority: "secondary",
  },
  {
    id: "referral",
    audience: "Attorneys, lenders, CPAs, wealth advisors, and past-client referrers",
    decision: "When Mark is the right introduction and what a referred client can expect.",
    feltQuestions: ["What problem is he unusually equipped to solve?", "What is his evidence standard?", "Where does his scope stop?"],
    proof: ["Method statement", "Referral triggers", "Scope boundary", "Approved client case"],
    firstAction: "Use a one-page referral memo with fit and non-fit conditions.",
    priority: "secondary",
  },
] as const;

export const markPrivateObjections = [
  { objection: "I do not want to become a content creator.", response: "The system extracts and packages judgment from scheduled conversations, active work, and primary sources. Mark supplies expertise and approval; RN owns research, drafting, production, repurposing, and the operating system.", proofRequired: "Show the monthly time budget and approval workflow before scope is accepted." },
  { objection: "This does not sound like me.", response: "No speculative draft becomes public without a voice interview, line edit, and explicit approval. The prototype demonstrates a strategic direction, not finished ghostwriting in Mark's voice.", proofRequired: "Run a voice-calibration session and present alternative tonal treatments." },
  { objection: "Real estate content is already everywhere.", response: "Generic inventory, lifestyle, and monthly recap content is crowded. Mark's defensible territory is evidence-visible pre-decision reasoning grounded in his documented appraisal foundation.", proofRequired: "Show a competitor/content audit and one genuinely differentiated pilot series." },
  { objection: "I cannot share client details.", response: "The system can use public records, controlled documents, composites, and redacted approved cases. It never reverse-engineers private client facts from an MLS result.", proofRequired: "Adopt consent, redaction, legal-review, and withdrawal gates." },
  { objection: "How does this produce business?", response: "Each asset is designed for a named decision-maker and next action: a diagnostic, source brief, referral memo, or qualified conversation. Measurement begins with attention quality and conversion behavior, not invented ROI.", proofRequired: "Agree on baseline, qualified-action definitions, attribution window, and reporting cadence." },
  { objection: "Why trust research performed without me?", response: "Every consequential fact is linked, graded, dated, and reversible. Unresolved claims remain excluded until Mark confirms them or supplies evidence.", proofRequired: "Complete a subject fact-check and corrections pass before publication." },
] as const;

export const markPrivateContentConcepts = [
  {
    id: "five-facts",
    title: "Five Facts Before the Feeling",
    premise: "Begin with an attractive property impression, then reveal five unglamorous facts that could change the decision.",
    audiences: ["household-move", "investor"],
    formats: ["field video", "LinkedIn document", "owned evidence brief"],
    evidence: ["property-specific public or controlled records", "inspection/appraisal boundaries", "source date and document links"],
    gates: ["Do not call broker analysis an appraisal", "Obtain image and document rights", "No inference about an actual client's decision"],
    businessAction: "Request a source-visible pre-offer conversation.",
  },
  {
    id: "one-number",
    title: "One Number, Three Markets",
    premise: "Take one current HBR headline number and show how its meaning changes by property type, place, price band, and objective.",
    audiences: ["household-move", "investor", "seller"],
    formats: ["monthly briefing", "chart-led carousel", "90-second video"],
    evidence: ["specific HBR reporting period", "source definitions", "clearly labeled interpretation"],
    gates: ["No forecast unless separately evidenced", "Do not generalize island-wide data to a specific property", "Archive source snapshot"],
    businessAction: "Open the current decision brief.",
  },
  {
    id: "document-room",
    title: "The Condo Document Reading Room",
    premise: "For each document, explain what it can establish, what it cannot, and the next expert or question it triggers.",
    audiences: ["condo"],
    formats: ["interactive guide", "annotated excerpt", "email sequence"],
    evidence: ["redacted/authorized documents", "official guidance", "specialist review where needed"],
    gates: ["Redact private data", "No legal, insurance, engineering, or reserve opinion outside scope", "Version and date every document"],
    businessAction: "Use the reading checklist before deciding whether to proceed.",
  },
  {
    id: "move-sequence",
    title: "The Move Sequence",
    premise: "Let households compare buy-first, sell-first, and overlap scenarios using their own constraints rather than a universal prescription.",
    audiences: ["household-move", "seller"],
    formats: ["interactive diagnostic", "decision memo", "consultation worksheet"],
    evidence: ["user-entered assumptions", "current financing inputs supplied by a qualified lender", "explicit scenario limitations"],
    gates: ["No financing promise", "No invented client anecdote", "Keep calculations labeled and reproducible"],
    businessAction: "Bring the selected scenario to a coordinated advisor conversation.",
  },
  {
    id: "referral-fit",
    title: "When to Call Mark",
    premise: "Give professional referrers precise fit signals, non-fit signals, process expectations, and evidence standards.",
    audiences: ["referral"],
    formats: ["one-page memo", "partner landing page", "quarterly case note"],
    evidence: ["Mark-approved scope", "approved case", "current directory identity"],
    gates: ["No professional-service scope beyond actual authority", "No testimonial without reuse permission", "No implied referral relationship"],
    businessAction: "Make a qualified introduction with the client's permission.",
  },
] as const;

export const markPrivateOffer = {
  title: "Make the judgment visible before the meeting.",
  outcome: "A source-backed authority system that turns Mark's documented appraisal foundation and local practice into useful decision tools, durable search surfaces, and qualified reasons to begin a conversation.",
  pilot: {
    name: "One decision territory, built end to end",
    scope: ["Subject fact-check and voice calibration", "Audience and competitor refinement", "One canonical evidence page", "One interactive decision tool", "Four source-governed social assets", "One short video treatment", "Approval and correction workflow", "Baseline and pilot readout"],
    exclusions: ["Paid media", "Guaranteed leads or revenue", "Unlicensed image use", "Automated publishing without approval", "Representation that Mark commissioned this prototype"],
  },
  phases: [
    { name: "Confirm", result: "Mark approves the facts, scope, voice boundaries, audiences, and image use." },
    { name: "Choose", result: "Select one decision territory with a measurable audience action." },
    { name: "Build", result: "RN researches, writes, designs, produces, and connects the evidence system." },
    { name: "Approve", result: "Nothing publishes without fact, voice, rights, and professional-scope gates." },
    { name: "Learn", result: "Evaluate qualified engagement, tool use, referrals, search discovery, and production efficiency." },
  ],
  nextStep: "A short working conversation to decide whether one decision territory is worth piloting. No endorsement or commitment is implied by viewing this concept.",
};

export const markPrivateProofGates = [
  { id: "subject-confirmation", severity: "publication-critical", missing: "Mark's confirmation of current title, founding language, history, designations, scope, and preferred voice.", action: "Conduct a recorded fact-check questionnaire and retain explicit approvals." },
  { id: "portrait-rights", severity: "publication-critical", missing: "Written reuse permission, original portrait, photographer credit, and permitted channels/duration.", action: "Keep the 1000×1000 first-party image limited to the private concept preview; replace or license it before public use." },
  { id: "case-rights", severity: "publication-critical", missing: "Client permission and a verified account of inputs, actions, chronology, and outcome boundaries.", action: "Build a redacted case packet; do not infer strategy or causation from syndicated transaction data." },
  { id: "license-state", severity: "high", missing: "A captured, current Hawaiʻi DCCA subject record.", action: "Verify interactively before a campaign makes detailed license-status claims; until then state only what HBR displays." },
  { id: "recognition-method", severity: "high", missing: "Award-owner evidence and year-specific methodology for much of the recognition chronology.", action: "Attribute the ledger to the company and link only independently corroborated years." },
  { id: "analytics-baseline", severity: "measurement", missing: "Current qualified inquiry, referral, search, and content-production baselines.", action: "Define them with Mark before setting targets; never backfill estimated historical performance as fact." },
] as const;

export const markPrivateImagePolicy = {
  selectedAsset: "/mark-young.jpg",
  dimensions: "1000×1000",
  provenanceUrl: "https://truerealestatehawaii.com/wp-content/uploads/Mark-square.jpg",
  status: "Private concept-preview use only; public accessibility and first-party placement do not establish a reuse license.",
  presentation: ["Use the actual square without AI upscaling", "Preserve natural facial proportions", "Use responsive delivery", "Display an unobtrusive source/rights note", "Offer immediate correction/takedown"],
  productionRequest: ["Original camera file", "Photographer name and credit", "Written channel and duration permission", "Mark-approved crop", "Alternative current portrait if preferred"],
  prohibited: ["PBN editorial portrait without publisher/photographer permission", "MLS photography without rights-owner approval", "Social-platform downloads treated as licensed originals", "AI-generated likeness or face alteration"],
};

export const markPrivateBoundary = {
  status: "Uncommissioned private strategic concept by RN Studio",
  statements: [
    "Mark H. Young did not commission, approve, or endorse this prototype.",
    "Verified facts, attributed claims, strategic inference, and proposed copy must remain visually distinct.",
    "No proposed post is represented as Mark's words or publication.",
    "No invented reactions, testimonials, partnerships, transaction outcomes, ROI, or performance metrics are permitted.",
    "The isolated route must contain no other subject's identity, imagery, evidence, or navigation.",
  ],
};

export const markPrivateExperience = {
  recipient: "Mark H. Young",
  opening: "Mark, your public record already contains a sharper story than the internet currently tells.",
  thesis: "The opportunity is not to post more. It is to make the decision-making discipline behind your work visible, useful, and easy to trust before someone ever asks for a meeting.",
  desiredSequence: ["Recognize the record", "See the invisible advantage", "Experience one useful demonstration", "Understand the system and safeguards", "Choose whether a pilot is worth discussing"],
  primaryCta: "Explore the decision system",
  finalCta: "Discuss one pilot territory",
};

export const markPrivateData = {
  sources: markPrivateSources,
  facts: markPrivateFacts,
  positioning: markPrivatePositioning,
  audiences: markPrivateAudiences,
  objections: markPrivateObjections,
  contentConcepts: markPrivateContentConcepts,
  offer: markPrivateOffer,
  proofGates: markPrivateProofGates,
  imagePolicy: markPrivateImagePolicy,
  boundary: markPrivateBoundary,
  experience: markPrivateExperience,
} as const;

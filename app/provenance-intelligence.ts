export type SubjectKey = "mark" | "sam";
export type VerificationState = "verified" | "qualified" | "unresolved" | "excluded";
export type RightsState = "permission-documented" | "public-source-only" | "permission-required" | "do-not-reuse";

export type GapRecord = {
  id: string;
  subject: SubjectKey;
  lane: "archive" | "license" | "corporate" | "civic" | "award" | "appearance" | "image";
  claim: string;
  state: VerificationState;
  evidence: string;
  safeCopy: string;
  missing: string;
  nextAction: string;
  sourceUrls: string[];
};

export type ImageProvenance = {
  id: string;
  subject: SubjectKey;
  localPath?: string;
  sourceUrl: string;
  dimensions?: string;
  sha256?: string;
  depicts: string;
  identityConfidence: "high" | "medium" | "low";
  rightsState: RightsState;
  rightsNote: string;
  allowedUse: string;
  prohibitedUse: string[];
};

export type ProvenanceRecheck = {
  id: string;
  subject: SubjectKey;
  label: string;
  cadence: "before-publication" | "monthly" | "quarterly" | "annual" | "on-change";
  nextReview: string;
  evidenceOwner: string;
  trigger: string;
};

export type ConfirmationQuestion = {
  id: string;
  subject: SubjectKey;
  category: "identity" | "career" | "claims" | "content" | "rights";
  question: string;
  blocks: string;
};

export const provenanceMeta = {
  researchedAt: "2026-09-03",
  scope: "Focused public-source gap audit; excludes sensitive family/private records and name-only matches.",
  completenessBoundary: "A negative search result means not located in this bounded crawl—not that the record does not exist.",
  rightsBoundary: "Public accessibility, first-party placement, or identity confidence does not itself grant republication permission.",
} as const;

export const gapRecords: GapRecord[] = [
  { id: "mark-hbr", subject: "mark", lane: "license", claim: "HBR member 40803 displays license RS-72387 at True Real Estate Hawaiʻi.", state: "verified", evidence: "Current institutional HBR member and office directories.", safeCopy: "HBR lists Mark with license RS-72387 at True Real Estate Hawaiʻi, as of the research date.", missing: "Direct subject-result capture from the Hawaiʻi DCCA state registry.", nextAction: "Run and archive the DCCA license/complaint-history search immediately before publication.", sourceUrls: ["https://www.hicentral.com/directory/member/40803/Mark-H-Young/%252Fdirectory%252Foffice%252F8676%253Furl%253D%2525252Fdirectory%2525252Foffices%2525253FcompanyName%2525253Da%25252526specialty%2525253D%25252526page%2525253D54%2526page%253D1", "https://cca.hawaii.gov/reb/"] },
  { id: "mark-corporate", subject: "mark", lane: "corporate", claim: "True Real Estate Hawaiʻi was founded in 2017 and Mark is its founder/president.", state: "qualified", evidence: "PBN 2021 profile plus current brokerage/HBR context.", safeCopy: "PBN reported in 2021 that Mark founded the company at 33 and dates its start to 2017.", missing: "Direct Hawaiʻi Business Express entity filing and officer history.", nextAction: "Capture the official entity record; do not infer legal ownership from branding.", sourceUrls: ["https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html"] },
  { id: "mark-aggregator-conflict", subject: "mark", lane: "license", claim: "Anyone.com assigns Mark to Budar Realty.", state: "excluded", evidence: "Conflicts with current HBR, first-party, MLS, Realtor.com and Homes.com records.", safeCopy: "Do not use.", missing: "Aggregator update provenance.", nextAction: "Treat as stale/error and monitor for search-reputation impact.", sourceUrls: ["https://anyone.com/agents/84e4af7d-df72-48cc-81ee-cf023e7b83fd"] },
  { id: "mark-aloha-aina", subject: "mark", lane: "award", claim: "Aloha ʻĀina nominations are accepted from the public at large.", state: "qualified", evidence: "HBR says nominations are accepted only from the public at large; Mark’s years are company-published.", safeCopy: "True Real Estate publishes a multi-year record of public-nominated Aloha ʻĀina recognition.", missing: "Year-by-year HBR nomination ledger for Mark.", nextAction: "Obtain award-owner confirmation for each published year.", sourceUrls: ["https://www.hicentral.com/awards-programs.php", "https://truerealestatehawaii.com/agent/mark-young/"] },
  { id: "mark-honolulu-method", subject: "mark", lane: "award", claim: "HONOLULU Magazine’s real-estate list used editorial survey selection.", state: "qualified", evidence: "The 2013 launch explains Ward Research’s 10,000+ respondent survey and editorial method.", safeCopy: "The 2013 list used an editorial customer-satisfaction/recommendation survey.", missing: "Year-specific method for every later Mark appearance.", nextAction: "Do not project the 2013 method across later years without confirmation.", sourceUrls: ["https://www.honolulumagazine.com/2013-homebuyers-guide/"] },
  { id: "mark-real-producers", subject: "mark", lane: "award", claim: "Mark was a Honolulu Real Producers top-producer cover subject in October 2020.", state: "qualified", evidence: "Publisher/company social archive and company accolade ledger.", safeCopy: "Featured as a 2020 Honolulu Real Producers cover subject, according to publisher/company archives.", missing: "Original issue and Honolulu-specific selection method.", nextAction: "Request the issue PDF, selection criteria, photographer credit and reuse permission.", sourceUrls: ["https://www.facebook.com/RealProducersMagazine/photos/congratulations-to-honolulu-real-producers-top-producer-mark-youngmark-young-kno/1046713439083834/"] },
  { id: "mark-appearance", subject: "mark", lane: "appearance", claim: "Podcast, conference, webinar or long-form interview appearances.", state: "unresolved", evidence: "Focused searches returned other Hawaiʻi professionals and generic content, not an identity-resolved appearance.", safeCopy: "No speaking/guest credential claimed.", missing: "Subject media sheet, unindexed recordings, event programs or publisher archive.", nextAction: "Ask Mark for approved appearance history and original links.", sourceUrls: [] },
  { id: "sam-role", subject: "sam", lane: "license", claim: "Current Real Estate Investment Advisor at Contrarian Academy.", state: "qualified", evidence: "Identity-resolved LinkedIn index only.", safeCopy: "Publicly indexed as a Honolulu-based Real Estate Investment Advisor associated with Contrarian Academy.", missing: "First-party organization/subject confirmation, dates, scope, credentials and outcomes.", nextAction: "Confirm directly before subject-led CRE publication.", sourceUrls: ["https://www.linkedin.com/in/samuel-wolff-4862303b"] },
  { id: "sam-license-negative", subject: "sam", lane: "license", claim: "Hawaiʻi real-estate license or REALTOR® membership.", state: "unresolved", evidence: "No identity-resolved entry was located; same-surname licensees are different people.", safeCopy: "Do not call Sam a REALTOR®, broker, agent or licensee.", missing: "Direct DCCA confirmation and any non-broker advisory scope.", nextAction: "Ask Sam for license/scope documentation if one exists.", sourceUrls: ["https://cca.hawaii.gov/reb/"] },
  { id: "sam-civic-current", subject: "sam", lane: "civic", claim: "Continued Hawaiʻi Kai Neighborhood Board service through August 2026.", state: "verified", evidence: "Official 25 August 2026 meeting attendance record and NCO member page.", safeCopy: "Recorded present as a board member on 25 August 2026.", missing: "Complete uninterrupted term/election history.", nextAction: "Recheck the NCO roster and latest minutes before publication.", sourceUrls: ["https://www.honolulu.gov/events/event/hawaii-kai-nb-regular-meeting-2026-08-25-30513/", "https://www.honolulu.gov/nco/member_bio/samuel-wolff/"] },
  { id: "sam-archive", subject: "sam", lane: "archive", claim: "FloWater, RevoluSun, City and Contrarian Academy chronology.", state: "qualified", evidence: "MidWeek verifies the 2014 RevoluSun appointment; other dates are self-report/indexed or incomplete.", safeCopy: "Use the documented appointment and duties; label other chronology self-reported or unverified.", missing: "Employer archives and City personnel classification history.", nextAction: "Request first-party résumé confirmation and archived role records.", sourceUrls: ["https://www.midweek.com/business-leaders-move-hawaii-92414/"] },
  { id: "sam-appearance", subject: "sam", lane: "appearance", claim: "Independent podcast, conference, keynote or authored-publication record.", state: "unresolved", evidence: "Focused searches produced unrelated Wolffs and board meeting video archives only.", safeCopy: "No independent speaking or authorship credential claimed.", missing: "Subject media sheet, unindexed programs or recordings.", nextAction: "Ask Sam for approved appearances and links; distinguish civic meeting participation.", sourceUrls: [] },
];

export const imageProvenance: ImageProvenance[] = [
  { id: "mark-headshot", subject: "mark", localPath: "/mark-young.jpg", sourceUrl: "https://truerealestatehawaii.com/wp-content/uploads/Mark-square.jpg", dimensions: "1000×1000 JPEG", sha256: "3ade1b341087bc02acd051e4a65d966163a0b452f13a877b81ee1dfd854b0f47", depicts: "Professional portrait of Mark H. Young", identityConfidence: "high", rightsState: "permission-required", rightsNote: "First-party brokerage placement establishes provenance, not a reuse license; photographer and campaign terms are unknown.", allowedUse: "No rights-cleared reuse is documented. Present prototype inclusion is an editorial risk decision, not authorization; retain the source and an immediate takedown path.", prohibitedUse: ["Claiming ownership or license", "Paid campaign before permission", "Undocumented generative alteration"] },
  { id: "sam-family", subject: "sam", localPath: "/sam-wolff.jpg", sourceUrl: "https://www.facebook.com/sbwolff/", dimensions: "720×720 JPEG", sha256: "505de62f8e487e07ac28fac6633c5fe9501a9285fedf5df526f7852dbd68b77a", depicts: "Samuel Wolff with family members", identityConfidence: "high", rightsState: "permission-required", rightsNote: "Public profile placement does not document Sam’s permission or consent covering recognizable family members/guardians.", allowedUse: "No rights-cleared reuse or recognizable-person consent is documented. Present full-composition prototype inclusion is an editorial risk decision, not authorization; do not identify family members and retain an immediate takedown path.", prohibitedUse: ["Cropping family out to imply a solo original", "Identifying or profiling family members", "Paid campaign before consent", "Face enhancement or generative reconstruction"] },
  { id: "mark-pbn", subject: "mark", sourceUrl: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html", depicts: "Editorial portrait accompanying PBN profile", identityConfidence: "high", rightsState: "do-not-reuse", rightsNote: "PBN credits Eugene Tanner; no republication license was found.", allowedUse: "Link to the article.", prohibitedUse: ["Download/republication without permission", "Removing publisher/photographer attribution"] },
  { id: "sam-midweek", subject: "sam", sourceUrl: "https://www.midweek.com/business-leaders-move-hawaii-92414/", depicts: "Appointment portrait associated with Sam’s 2014 RevoluSun item", identityConfidence: "high", rightsState: "do-not-reuse", rightsNote: "Publisher-controlled editorial asset; no reuse license was found.", allowedUse: "Link to the article.", prohibitedUse: ["Download/republication without publisher/photographer permission"] },
];

export const provenanceRechecks: ProvenanceRecheck[] = [
  { id: "mark-license-recheck", subject: "mark", label: "HBR and DCCA status", cadence: "before-publication", nextReview: "Before next public release", evidenceOwner: "Research", trigger: "Any affiliation, license-status, designation or complaint-history statement" },
  { id: "mark-production-recheck", subject: "mark", label: "Syndicated activity snapshots", cadence: "monthly", nextReview: "2026-10-03", evidenceOwner: "Research", trigger: "Any production, active-listing, geography or price-range number" },
  { id: "mark-award-recheck", subject: "mark", label: "Recognition ledger and methodology", cadence: "annual", nextReview: "2027-09-03", evidenceOwner: "Editorial", trigger: "New award year or a stronger ranking/selection statement" },
  { id: "mark-rights-recheck", subject: "mark", label: "Portrait/property-image permission", cadence: "on-change", nextReview: "Before expanded use", evidenceOwner: "Rights", trigger: "New channel, paid distribution, crop, derivative, or asset replacement" },
  { id: "sam-role-recheck", subject: "sam", label: "Current professional role and scope", cadence: "before-publication", nextReview: "Before next public release", evidenceOwner: "Research", trigger: "Any present-tense employer, advisor, license, expertise or outcome statement" },
  { id: "sam-board-recheck", subject: "sam", label: "Neighborhood Board status and attribution", cadence: "quarterly", nextReview: "2026-12-02", evidenceOwner: "Research", trigger: "New minutes, roster, election, testimony, quotation, or board action" },
  { id: "sam-rights-recheck", subject: "sam", label: "Family-image consent and source", cadence: "on-change", nextReview: "Before any reuse", evidenceOwner: "Rights", trigger: "Any publication, crop, derivative, paid use, new channel, or subject request" },
];

export const confirmationQuestions: ConfirmationQuestion[] = [
  { id: "mark-role", subject: "mark", category: "career", question: "What current title, license class, brokerage responsibilities and public service scope should be stated—and which official record should control?", blocks: "Unqualified present-tense leadership and license copy" },
  { id: "mark-chronology", subject: "mark", category: "career", question: "What were the exact organizations, titles and dates for appraisal/analysis, Benn Pacific and the founding of True Real Estate Hawaiʻi?", blocks: "A complete career chronology" },
  { id: "mark-awards", subject: "mark", category: "claims", question: "Which recognition years and selection methods can the award owner independently confirm?", blocks: "An audited recognition timeline" },
  { id: "mark-cases", subject: "mark", category: "claims", question: "Which transactions may become client-approved case studies, with documented inputs, actions, outcomes and privacy boundaries?", blocks: "Causal case-study claims" },
  { id: "mark-voice", subject: "mark", category: "content", question: "May proposed content be drafted in your first-person voice, and what topics, predictions or client matters are off limits?", blocks: "Subject-voiced publication" },
  { id: "mark-images", subject: "mark", category: "rights", question: "Who owns the portrait and property images, and can you provide originals plus written web/social/paid-use, crop and credit terms?", blocks: "Expanded image publication" },
  { id: "sam-role", subject: "sam", category: "career", question: "What is your current professional title, organization, start date, scope and permitted public description?", blocks: "Present-tense professional positioning" },
  { id: "sam-license", subject: "sam", category: "claims", question: "Do you hold a real-estate license or another credential relevant to advisory work? If not, how should your non-broker scope be described?", blocks: "Any broker, agent, REALTOR® or licensed-advisor language" },
  { id: "sam-chronology", subject: "sam", category: "career", question: "What were your exact dates, titles, duties and approved outcomes at FloWater, RevoluSun, the City and Contrarian Academy?", blocks: "A complete career chronology" },
  { id: "sam-civic", subject: "sam", category: "claims", question: "Which board matters and public statements represent your own views, rather than only a board matter or collective action?", blocks: "Individual civic-position attribution" },
  { id: "sam-voice", subject: "sam", category: "content", question: "May proposed content be drafted in your first-person voice, and which professional or civic boundaries should govern it?", blocks: "Subject-voiced publication" },
  { id: "sam-image", subject: "sam", category: "rights", question: "May the family profile image be republished, have all necessary recognizable-person/guardian consents been obtained, and can you supply the approved original or a solo portrait?", blocks: "Any expanded family-image use" },
];

export function getSubjectProvenance(subject: SubjectKey) {
  return {
    gaps: gapRecords.filter((record) => record.subject === subject),
    images: imageProvenance.filter((record) => record.subject === subject),
    rechecks: provenanceRechecks.filter((record) => record.subject === subject),
    questions: confirmationQuestions.filter((record) => record.subject === subject),
  };
}

export const provenanceIntelligence = { meta: provenanceMeta, gaps: gapRecords, images: imageProvenance, rechecks: provenanceRechecks, questions: confirmationQuestions } as const;

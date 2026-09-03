export type ProfileSlug = "mark" | "sam";
export type SourceGrade = "A" | "B" | "C";
export type ClaimStatus = "verified" | "qualified" | "attributed" | "editorial-synthesis";

export type EvidenceSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  grade: SourceGrade;
  sourceClass: "official-record" | "first-party" | "independent-reporting" | "professional-directory" | "platform-index" | "subject-controlled";
  supports: string[];
  published?: string;
  checked: string;
  volatility: "stable" | "periodic" | "high";
  accessNote?: string;
};

export type EvidenceClaim = {
  id: string;
  claim: string;
  status: ClaimStatus;
  confidence: "high" | "medium" | "low";
  sourceIds: string[];
  boundary?: string;
  recheck?: string;
};

export type EvidenceGap = {
  id: string;
  question: string;
  impact: "publication-critical" | "material" | "enhancement";
  resolution: string;
};

export type EvidenceProfile = {
  slug: ProfileSlug;
  subject: string;
  lastReconciled: string;
  methodology: string;
  sources: EvidenceSource[];
  claims: EvidenceClaim[];
  contradictions: { issue: string; treatment: string }[];
  gaps: EvidenceGap[];
};

const checked = "2026-09-02";

export const evidenceProfiles: Record<ProfileSlug, EvidenceProfile> = {
  mark: {
    slug: "mark",
    subject: "Mark H. Young",
    lastReconciled: checked,
    methodology: "Identity-resolved public-web census emphasizing first-party records, professional directories, dated independent reporting, explicit attribution, and non-invention.",
    sources: [
      { id: "mark-true-bio", title: "Mark H. Young", publisher: "True Real Estate Hawaiʻi", url: "https://truerealestatehawaii.com/agent/mark-young/", grade: "A", sourceClass: "first-party", supports: ["mark-local-education", "mark-appraisal", "mark-recognition"], checked, volatility: "periodic", accessNote: "Company-published biography; reliable for self-described background, not independent proof of performance claims." },
      { id: "mark-hbr", title: "Mark H. Young member directory", publisher: "Honolulu Board of REALTORS®", url: "https://www.hicentral.com/directory/member/40803/Mark-H-Young/%252Fdirectory%252Foffice%252F8676%253Furl%253D%2525252Fdirectory%2525252Foffices%2525253FcompanyName%2525253Da%25252526specialty%2525253D%25252526page%2525253D54%2526page%253D1", grade: "A", sourceClass: "professional-directory", supports: ["mark-professional-identity"], checked, volatility: "periodic", accessNote: "HiCentral's readable member path currently fails; this institution-indexed URL retains the encoded office-return path required to resolve the same member record." },
      { id: "mark-pbn", title: "True Real Estate carves out market share", publisher: "Pacific Business News", url: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html", grade: "B", sourceClass: "independent-reporting", supports: ["mark-company-founded", "mark-founder-age"], published: "2021-10-15", checked, volatility: "stable", accessNote: "Independent profile; portions may be paywalled." },
      { id: "mark-hm-2022", title: "2022 Hawaiʻi Real Estate Pro Finder: Mark H. Young", publisher: "HONOLULU Magazine", url: "https://www.honolulumagazine.com/listings/2022-hawaii-real-estate-pro-finder/mark-h-young-3/", grade: "B", sourceClass: "professional-directory", supports: ["mark-recognition"], published: "2022", checked, volatility: "stable" },
      { id: "mark-hm-2018", title: "2018 Hawaiʻi Real Estate Pro Finder: Mark Young", publisher: "HONOLULU Magazine", url: "https://www.honolulumagazine.com/listings/2018-hawaii-real-estate-pro-finder/mark-young/", grade: "B", sourceClass: "professional-directory", supports: ["mark-recognition"], published: "2018", checked, volatility: "stable" },
      { id: "mark-agents", title: "Agents", publisher: "True Real Estate Hawaiʻi", url: "https://truerealestatehawaii.com/agents/", grade: "A", sourceClass: "first-party", supports: ["mark-current-leadership"], checked, volatility: "periodic" },
      { id: "mark-homes", title: "Mark Young activity snapshot", publisher: "Homes.com", url: "https://www.homes.com/real-estate-agents/mark-young/wv0wsdk/", grade: "C", sourceClass: "platform-index", supports: ["mark-sales-snapshot"], checked, volatility: "high", accessNote: "Platform-derived five-year snapshot; not an audited lifetime total and must retain its retrieval date." },
      { id: "mark-real-producers", title: "Honolulu Real Producers recognition archive", publisher: "Real Producers Magazine", url: "https://www.facebook.com/RealProducersMagazine/photos/congratulations-to-honolulu-real-producers-top-producer-mark-youngmark-young-kno/1046713439083834/", grade: "B", sourceClass: "independent-reporting", supports: ["mark-recognition"], published: "2020", checked, volatility: "stable", accessNote: "Public Facebook-hosted publication archive; platform access may vary." },
    ],
    claims: [
      { id: "mark-professional-identity", claim: "Mark H. Young is publicly listed as a Hawaiʻi real-estate professional associated with True Real Estate Hawaiʻi.", status: "verified", confidence: "high", sourceIds: ["mark-hbr", "mark-true-bio", "mark-agents"], recheck: "Before broad publication or when current-role wording changes." },
      { id: "mark-company-founded", claim: "Pacific Business News dates True Real Estate Hawaiʻi's beginning to 2017.", status: "verified", confidence: "high", sourceIds: ["mark-pbn"] },
      { id: "mark-founder-age", claim: "Mark founded the company at age 33.", status: "attributed", confidence: "medium", sourceIds: ["mark-pbn"], boundary: "Reported by Pacific Business News; no birth record was sought or needed." },
      { id: "mark-local-education", claim: "His published biography identifies Kāneʻohe roots, Hawaiʻi Baptist Academy, and the University of Hawaiʻi.", status: "attributed", confidence: "high", sourceIds: ["mark-true-bio"], boundary: "Company-published biography." },
      { id: "mark-appraisal", claim: "His published background includes finance education and commercial and residential appraisal work.", status: "attributed", confidence: "high", sourceIds: ["mark-true-bio"] },
      { id: "mark-current-leadership", claim: "The company currently presents him in a brokerage leadership role.", status: "verified", confidence: "high", sourceIds: ["mark-true-bio", "mark-agents"], recheck: "Quarterly while presented as current." },
      { id: "mark-recognition", claim: "Public company and publication archives document recognition across multiple years.", status: "qualified", confidence: "high", sourceIds: ["mark-true-bio", "mark-hm-2018", "mark-hm-2022", "mark-real-producers"], boundary: "Awards and nominations are preserved by year and publisher; they are not converted into an unsupported statewide ranking." },
      { id: "mark-sales-snapshot", claim: "On September 2, 2026, Homes.com displayed a five-year snapshot of 198 closed sales and $205.3 million in value.", status: "qualified", confidence: "medium", sourceIds: ["mark-homes"], boundary: "Volatile platform-derived snapshot, not audited or lifetime production.", recheck: "At every publication or reuse." },
      { id: "mark-positioning", claim: "‘The advisor who sees beneath the listing’ is an editorial synthesis of the documented appraisal, finance, place, and brokerage record.", status: "editorial-synthesis", confidence: "high", sourceIds: ["mark-true-bio", "mark-pbn"], boundary: "Proposed positioning; not language Mark adopted or approved." },
    ],
    contradictions: [
      { issue: "Company origin, incorporation, and public launch may use different dates across surfaces.", treatment: "Use the 2017 Pacific Business News formulation rather than asserting an unqualified legal-incorporation date." },
      { issue: "Production figures change across listing platforms and time windows.", treatment: "Keep platform, retrieval date, time window, and non-audited limitation attached to every figure." },
    ],
    gaps: [
      { id: "mark-role-confirmation", question: "What exact current title and approved role description should be used?", impact: "publication-critical", resolution: "First-party confirmation from Mark or True Real Estate Hawaiʻi." },
      { id: "mark-performance-audit", question: "Which sales totals, date windows, and transaction definitions can be independently substantiated?", impact: "material", resolution: "Subject-provided MLS or brokerage records with permission and methodology." },
      { id: "mark-image-rights", question: "Is republication of the current portrait authorized?", impact: "publication-critical", resolution: "Written rights confirmation or an approved first-party image." },
      { id: "mark-career-dates", question: "What are the exact dates and duties for appraisal and pre-True brokerage roles?", impact: "material", resolution: "Résumé, employer archive, or subject confirmation." },
    ],
  },
  sam: {
    slug: "sam",
    subject: "Samuel “Sam” Wolff",
    lastReconciled: checked,
    methodology: "Identity-resolved public-record census separating Sam's own statements, full-board actions, reporter characterizations, indexed employment, and editorial strategy.",
    sources: [
      { id: "sam-linkedin", title: "Samuel Wolff professional index", publisher: "LinkedIn", url: "https://www.linkedin.com/in/samuel-wolff-4862303b", grade: "C", sourceClass: "platform-index", supports: ["sam-current-role"], checked, volatility: "high", accessNote: "Authentication prevented a complete role/date audit; current-role language remains qualified." },
      { id: "sam-midweek", title: "Business leaders on the move", publisher: "MidWeek", url: "https://www.midweek.com/business-leaders-move-hawaii-92414/", grade: "B", sourceClass: "independent-reporting", supports: ["sam-revolusun"], published: "2014-09", checked, volatility: "stable" },
      { id: "sam-city-2016", title: "Neighborhood Board public record", publisher: "City and County of Honolulu record mirror", url: "https://www.kaimukihawaii.com/news/201603/8545.html", grade: "A", sourceClass: "official-record", supports: ["sam-education", "sam-city-role"], published: "2016-03", checked, volatility: "stable" },
      { id: "sam-city-meeting-2016", title: "Public meeting record", publisher: "City and County of Honolulu record mirror", url: "https://www.kaimukihawaii.com/news/201605/8861.html", grade: "A", sourceClass: "official-record", supports: ["sam-city-role"], published: "2016-05", checked, volatility: "stable" },
      { id: "sam-board-2025", title: "Hawaiʻi Kai Neighborhood Board regular meeting", publisher: "City and County of Honolulu", url: "https://www.honolulu.gov/events/event/hawaii-kai-nb-regular-meeting-2025-09-30-19226/", grade: "A", sourceClass: "official-record", supports: ["sam-board-service"], published: "2025-09-30", checked, volatility: "stable" },
      { id: "sam-park", title: "Drugs, noise prompt calls for nighttime closure of East Oʻahu park", publisher: "Hawaiʻi News Now", url: "https://www.hawaiinewsnow.com/2025/06/07/drugs-noise-prompt-calls-nighttime-closure-east-oahu-park/", grade: "B", sourceClass: "independent-reporting", supports: ["sam-park-position"], published: "2025-06-07", checked, volatility: "stable" },
      { id: "sam-lead", title: "Closure of Oʻahu's only public shooting range draws questions about lead hazards", publisher: "Hawaiʻi News Now", url: "https://www.hawaiinewsnow.com/2022/10/26/closure-oahus-only-public-shooting-range-draws-questions-about-lead-hazards/", grade: "B", sourceClass: "independent-reporting", supports: ["sam-lead-position", "sam-board-service"], published: "2022-10-26", checked, volatility: "stable" },
      { id: "sam-testimony", title: "Resolution 23-204 testimony packet", publisher: "Honolulu City Council", url: "https://hnldoc.ehawaii.gov/hnldoc/document-download?id=19171", grade: "A", sourceClass: "official-record", supports: ["sam-feral-testimony"], published: "2023-10-17", checked, volatility: "stable" },
      { id: "sam-seabird", title: "Hawaiʻi Kai meeting summary: Kaiwi Coast seabird briefing", publisher: "City and County of Honolulu", url: "https://www.honolulu.gov/events/event/hawaii-kai-nb-regular-meeting-2025-11-25-19232/", grade: "A", sourceClass: "official-record", supports: ["sam-seabird-action"], published: "2025-11-25", checked, volatility: "stable" },
      { id: "sam-board-2026", title: "Hawaiʻi Kai Neighborhood Board attendance record", publisher: "City and County of Honolulu", url: "https://www.honolulu.gov/events/event/hawaii-kai-nb-regular-meeting-2026-08-25-30513/", grade: "A", sourceClass: "official-record", supports: ["sam-board-service"], published: "2026-08-25", checked, volatility: "stable" },
    ],
    claims: [
      { id: "sam-current-role", claim: "A public professional index identifies Sam as a Honolulu-based Real Estate Investment Advisor focused on residential-to-commercial transitions.", status: "qualified", confidence: "medium", sourceIds: ["sam-linkedin"], boundary: "Employer, current status, dates, duties, outcomes, and performance remain unconfirmed.", recheck: "At every publication or reuse." },
      { id: "sam-education", claim: "A 2016 City record identifies him as a 2014 University of Hawaiʻi at Mānoa political-science graduate originally from Los Angeles.", status: "verified", confidence: "high", sourceIds: ["sam-city-2016"] },
      { id: "sam-city-role", claim: "In 2016 he served in neighborhood administration, including meeting documentation, residency verification, and oath administration.", status: "verified", confidence: "high", sourceIds: ["sam-city-2016", "sam-city-meeting-2016"] },
      { id: "sam-revolusun", claim: "MidWeek reported his 2014 appointment as a RevoluSun project developer working with custom solar systems, financing, and incentives.", status: "verified", confidence: "high", sourceIds: ["sam-midweek"], boundary: "Departure date and outcomes are not independently established." },
      { id: "sam-board-service", claim: "Public records confirm service on Hawaiʻi Kai Neighborhood Board No. 1 by October 2022 and continuing through August 2026.", status: "verified", confidence: "high", sourceIds: ["sam-lead", "sam-board-2025", "sam-board-2026"], recheck: "Before describing service as current." },
      { id: "sam-lead-position", claim: "In October 2022, Sam raised concern that lead could move from the Koko Head Shooting Complex toward the ocean and requested closer review.", status: "attributed", confidence: "high", sourceIds: ["sam-lead"], boundary: "This records his concern; it does not establish the scientific conclusion." },
      { id: "sam-feral-testimony", claim: "In October 2023, Sam submitted personal testimony supporting Resolution 23-204 and proposing changes to feral-animal feeding policy.", status: "attributed", confidence: "high", sourceIds: ["sam-testimony"], boundary: "Empirical assertions in the testimony remain his views unless separately substantiated." },
      { id: "sam-park-position", claim: "In June 2025, Sam argued for preserving nighttime park access where a narrower safety intervention might work.", status: "attributed", confidence: "high", sourceIds: ["sam-park"], boundary: "The reported compromise was under board consideration and is not attributed to him as author." },
      { id: "sam-seabird-action", claim: "In an October 2025 meeting, Sam offered to connect the board with a seabird scientist concerning Kaiwi Coast protections.", status: "verified", confidence: "high", sourceIds: ["sam-seabird"], boundary: "This supports a connection-to-expertise pattern, not scientific credentials." },
      { id: "sam-positioning", claim: "‘Systems translator’ is an editorial synthesis of his documented work across energy, civic administration, property, and public issues.", status: "editorial-synthesis", confidence: "high", sourceIds: ["sam-midweek", "sam-city-2016", "sam-lead", "sam-seabird"], boundary: "Proposed positioning; not a title Sam adopted or approved." },
    ],
    contradictions: [
      { issue: "City records use both ‘Neighborhood Assistant’ and ‘Public Relations Assistant.’", treatment: "Treat them as potentially overlapping labels, not two career chapters, until City or subject confirmation." },
      { issue: "LinkedIn-indexed employment may be stale or incomplete.", treatment: "Use ‘publicly indexed’ and never infer deal volume, licenses, clients, returns, or current employment." },
      { issue: "A board roster does not prove individual authorship or a member's vote.", treatment: "Attribute only direct statements and personal testimony to Sam; describe other actions as board context." },
    ],
    gaps: [
      { id: "sam-employment", question: "What is Sam's current employer, exact title, dates, responsibilities, and approved outcomes?", impact: "publication-critical", resolution: "First-party confirmation from Sam and, where appropriate, the employer." },
      { id: "sam-board-term", question: "What was his exact start date, election or appointment route, and uninterrupted term history?", impact: "material", resolution: "Complete Neighborhood Commission roster/election record or first-party confirmation." },
      { id: "sam-video-census", question: "What additional individually attributable statements appear in untranscribed meeting video?", impact: "enhancement", resolution: "Transcript-level review of the complete accessible meeting-video set." },
      { id: "sam-image-rights", question: "May the family profile image be republished, and have recognizable adults or guardians consented?", impact: "publication-critical", resolution: "Written consent and preferably an original-resolution approved file or solo portrait." },
      { id: "sam-role-history", question: "What are the complete FloWater, RevoluSun, City, and later role dates?", impact: "material", resolution: "Résumé, employer records, or subject confirmation." },
    ],
  },
};

export function evidenceSummary(profile: EvidenceProfile) {
  const counts = profile.claims.reduce<Record<ClaimStatus, number>>((acc, claim) => {
    acc[claim.status] += 1;
    return acc;
  }, { verified: 0, qualified: 0, attributed: 0, "editorial-synthesis": 0 });
  return {
    sourceCount: profile.sources.length,
    claimCount: profile.claims.length,
    claimStatusCounts: counts,
    primaryOrFirstPartySources: profile.sources.filter((source) => source.grade === "A").length,
    volatileSources: profile.sources.filter((source) => source.volatility === "high").length,
    contradictionCount: profile.contradictions.length,
    openGapCount: profile.gaps.length,
    publicationCriticalGaps: profile.gaps.filter((gap) => gap.impact === "publication-critical").length,
    lastReconciled: profile.lastReconciled,
  };
}

export function validateEvidenceProfile(profile: EvidenceProfile) {
  const errors: string[] = [];
  const sourceIds = new Set<string>();
  const claimIds = new Set<string>();

  for (const source of profile.sources) {
    if (sourceIds.has(source.id)) errors.push(`Duplicate source id: ${source.id}`);
    sourceIds.add(source.id);
    try { new URL(source.url); } catch { errors.push(`Invalid source URL: ${source.id}`); }
  }
  for (const claim of profile.claims) {
    if (claimIds.has(claim.id)) errors.push(`Duplicate claim id: ${claim.id}`);
    claimIds.add(claim.id);
    if (claim.sourceIds.length === 0) errors.push(`Claim has no source: ${claim.id}`);
    for (const sourceId of claim.sourceIds) {
      if (!sourceIds.has(sourceId)) errors.push(`Claim ${claim.id} references missing source ${sourceId}`);
    }
  }
  for (const source of profile.sources) {
    for (const claimId of source.supports) {
      if (!claimIds.has(claimId)) errors.push(`Source ${source.id} references missing claim ${claimId}`);
    }
  }
  return { valid: errors.length === 0, errors };
}

for (const profile of Object.values(evidenceProfiles)) {
  const result = validateEvidenceProfile(profile);
  if (!result.valid) throw new Error(`Invalid evidence ledger for ${profile.slug}: ${result.errors.join("; ")}`);
}

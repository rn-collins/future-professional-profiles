export const deliverables = [
  { title: "Research and evidence system", detail: "A governed source census, claim ledger, confidence states, correction path, and subject-confirmation queue." },
  { title: "Positioning architecture", detail: "A distinct editorial thesis, audience priorities, message hierarchy, content territories, and defensible authority boundaries." },
  { title: "Professional-profile experience", detail: "A responsive, evidence-linked profile that adapts the narrative to the reader without misrepresenting the underlying record." },
  { title: "Content operating system", detail: "Series architecture, editorial calendar, draft recipes, approval gates, repurposing paths, and measurement logic." },
  { title: "Production and distribution", detail: "Source-constrained assets prepared for the agreed channels, formats, cadence, and owner-review process." },
  { title: "Learning and optimization", detail: "Attribution, meaningful-action metrics, audience-question capture, and recommendations for the next publishing cycle." },
];

export const options = [
  { id: "foundation", name: "Strategy foundation", fit: "For a person or organization that needs the evidence, positioning, and operating plan before production begins.", includes: ["Research reconciliation", "Audience and opportunity analysis", "Positioning system", "90-day editorial plan"] },
  { id: "prototype", name: "Interactive prototype", fit: "For a prospect who needs to see and test the future public experience before commissioning a complete program.", includes: ["Strategy foundation", "Adaptive profile or campaign prototype", "Evidence and strategy layers", "Stakeholder review package"] },
  { id: "engine", name: "Ongoing content engine", fit: "For a team ready to turn the strategy into a governed publishing and learning practice.", includes: ["Prototype or existing foundation", "Recurring production", "Approval workflow", "Measurement and iteration"] },
];

export const timeline = [
  ["01", "Discover", "Confirm goals, audiences, constraints, access, approvals, and the decision this work must support."],
  ["02", "Establish the record", "Retrieve, reconcile, classify, and source the public and owner-provided evidence."],
  ["03", "Design the system", "Develop positioning, journeys, content architecture, governance, and the interactive experience."],
  ["04", "Review and release", "Run factual, editorial, rights, accessibility, technical, and owner-final review before publication."],
  ["05", "Learn and improve", "Measure meaningful behavior, collect questions and corrections, and prioritize the next cycle."],
] as const;

export const measures = [
  ["Attention quality", "Evidence opens, substantive saves, reading depth, repeat visits"],
  ["Audience signal", "Qualified questions, replies, referrals, stakeholder corrections"],
  ["Commercial movement", "Attributed inquiries, fit rate, meeting progression, commissioned work"],
  ["Operational health", "Approval velocity, evidence coverage, content reuse, unresolved risks"],
] as const;

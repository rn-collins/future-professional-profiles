export type DraftStatus = "draft" | "review" | "approved" | "hold";
export type GateKey = "facts" | "sources" | "rights" | "subject" | "editorial";
export type Snapshot = { id: string; at: string; title: string; body: string; status: DraftStatus; note: string };
export type Activity = { id: string; at: string; action: string };
export type WorkspaceDraft = {
  id: string;
  profile: "mark" | "sam";
  title: string;
  body: string;
  status: DraftStatus;
  note: string;
  gates: Record<GateKey, boolean>;
  versions: Snapshot[];
  activity: Activity[];
  updatedAt: string;
};
export type WorkspaceState = { schema: 1; drafts: WorkspaceDraft[]; selectedId?: string };

export const gateLabels: Record<GateKey, string> = {
  facts: "Every factual claim matches the evidence ledger",
  sources: "Required sources are attached and accessible",
  rights: "Image, quotation, and asset rights are cleared",
  subject: "Subject-sensitive details and present-day claims are approved",
  editorial: "Concept status, uncertainty, and authorship are explicit",
};

const iso = () => new Date().toISOString();
export const createStarterDrafts = (): WorkspaceDraft[] => {
  const now = iso();
  return [
    { id: "mark-hidden-value", profile: "mark", title: "What the listing cannot decide for you", body: "A listing can show the view, the finishes, and the asking price. It cannot tell you whether the property fits the decision you are actually making.\n\nProposed direction: reveal the less visible questions—condition, carrying cost, timing, downside, and the household priority beneath the transaction.", status: "draft", note: "Concept copy. Replace the generalized opening with a sourced or visibly composite example before review.", gates: { facts: false, sources: false, rights: true, subject: false, editorial: true }, versions: [], activity: [{ id: `${now}-created`, at: now, action: "Starter concept created in this browser" }], updatedAt: now },
    { id: "sam-systems", profile: "sam", title: "Where energy systems meet place", body: "A technology can work and still fail to become infrastructure. Adoption depends on economics, land, regulation, trust, and the people who live with the result.\n\nProposed direction: connect Sam’s documented historical work across energy, real estate, and community-facing initiatives without implying a current role that has not been confirmed.", status: "hold", note: "Hold until current title, scope, and subject permissions are confirmed.", gates: { facts: true, sources: true, rights: true, subject: false, editorial: true }, versions: [], activity: [{ id: `${now}-created-sam`, at: now, action: "Starter concept created on hold" }], updatedAt: now },
  ];
};

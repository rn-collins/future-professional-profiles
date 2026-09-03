export type ProfileSlug = "mark" | "sam";

export type Journey = {
  id: string;
  label: string;
  need: string;
  lead: string;
  proof: string[];
  proposedMove: string;
  conversion: string;
};

export type Scenario = {
  id: string;
  label: string;
  goal: string;
  position: string;
  channels: string[];
  firstMoves: string[];
  measures: string[];
};

export type StrategyProfile = {
  currentSignal: string;
  invisibleValue: string[];
  opportunity: string;
  futureState: string;
  journeys: Journey[];
  scenarios: Scenario[];
};

const commonJourneys = {
  journalist: {
    id: "journalist",
    label: "Journalist",
    need: "A credible, quotable expert with a specific point of view and traceable support.",
    conversion: "A source request, interview, or recurring expert relationship.",
  },
  organizer: {
    id: "organizer",
    label: "Event organizer",
    need: "A speaker who can turn specialist knowledge into a useful audience experience.",
    conversion: "A briefing call, panel invitation, or commissioned session.",
  },
};

export const strategyProfiles: Record<ProfileSlug, StrategyProfile> = {
  mark: {
    currentSignal: "A highly recognized Oʻahu real-estate leader whose visible footprint emphasizes biography, awards, listings, and client service.",
    invisibleValue: [
      "Finance education applied to commercial and residential appraisal",
      "A repeatable way of testing value, downside, timing, and fit",
      "Kāneʻohe-rooted place knowledge that cannot be reproduced by generic market commentary",
      "The judgment required to coordinate consequential, interdependent property decisions",
    ],
    opportunity: "Move the public story from accomplished agent to appraisal-trained decision advisor—and demonstrate the method before a prospect enters a transaction.",
    futureState: "A source-visible body of work that helps households, owners, investors, and referrers recognize when Mark’s judgment is the product they need.",
    journeys: [
      { id: "client", label: "Prospective client", need: "Confidence that the advisor will protect the decision, not simply accelerate the transaction.", lead: "Begin with the hidden consequence inside an otherwise attractive property decision.", proof: ["Appraisal career foundation", "True Real Estate Hawaiʻi leadership", "Long-running professional recognition"], proposedMove: "Reorder the experience around decision discipline, then offer a property-specific strategy conversation.", conversion: "A buyer, seller, or owner strategy session." },
      { id: "investor", label: "Property investor", need: "A disciplined view of entry basis, condition, capex, permitting, insurance, and downside.", lead: "Lead with what the listing and projected upside do not resolve.", proof: ["Finance education", "Commercial and residential appraisal experience", "Oʻahu brokerage practice"], proposedMove: "Feature anonymized deal anatomy and evidence-led diligence notes.", conversion: "A risk-and-opportunity review before property selection." },
      { id: "partner", label: "Referral partner", need: "A precise reason to refer—and a clear picture of the situations Mark is unusually equipped to handle.", lead: "Name the complicated decision patterns, not a generic top-agent identity.", proof: ["Brokerage leadership", "Valuation background", "Documented local career"], proposedMove: "Build concise referral-trigger memos for attorneys, lenders, and wealth advisors.", conversion: "A high-fit introduction with context attached." },
      { ...commonJourneys.journalist, lead: "Offer evidence-led interpretation of a specific Oʻahu property decision—not a generic market forecast.", proof: ["Local roots", "Valuation experience", "Public professional record"], proposedMove: "Create a media-ready topic index with dated sources and explicit limits.", conversion: commonJourneys.journalist.conversion },
      { id: "community", label: "Community stakeholder", need: "Evidence that property advice understands place, consequence, and long-term stewardship.", lead: "Start with the decision’s effect on a household or neighborhood.", proof: ["Born and raised in Kāneʻohe", "Oʻahu-focused practice", "Publicly documented professional service"], proposedMove: "Publish place-specific explainers without turning community identity into marketing scenery.", conversion: "Trust, useful public dialogue, and informed local referrals." },
      { ...commonJourneys.organizer, lead: "Frame valuation as a practical way to see beneath presentation.", proof: ["Appraisal training", "Founder experience", "Client-facing practice"], proposedMove: "Package a decision-anatomy talk with a source sheet and audience worksheet.", conversion: commonJourneys.organizer.conversion },
      { id: "alumni", label: "Former client", need: "A useful reason to stay connected after closing and know exactly whom to refer.", lead: "Continue answering the ownership questions that begin after the keys change hands.", proof: ["Service positioning", "Repeat recognition", "Established brokerage"], proposedMove: "Create a quarterly owner memo and recognizable referral prompts.", conversion: "A reply, repeat engagement, or precise referral." },
    ],
    scenarios: [
      { id: "investors", label: "Win more investor clients", goal: "Become the first call before a promising property becomes an emotional commitment.", position: "Appraisal-trained Oʻahu decision counsel", channels: ["LinkedIn", "Search briefs", "Referral memos"], firstMoves: ["Publish a downside-first deal anatomy", "Build an investor diligence checklist", "Brief three referral partners"], measures: ["Qualified investor questions", "Evidence opens", "Attributed consultations"] },
      { id: "regional", label: "Build regional authority", goal: "Own a defensible interpretation territory rather than compete on market updates.", position: "The advisor who explains what Oʻahu property signals change—and what they do not", channels: ["Monthly briefing", "Newsletter", "Media source page"], firstMoves: ["Define the recurring market question", "Publish the methodology", "Create a dated interpretation archive"], measures: ["Returning readers", "Citations and invitations", "Subscriber quality"] },
      { id: "speaking", label: "Earn speaking invitations", goal: "Make Mark’s method easy for organizers to understand and program.", position: "Valuation thinking for high-consequence property decisions", channels: ["Signature talk page", "Short video", "Organizer brief"], firstMoves: ["Name the audience transformation", "Record a three-minute proof segment", "Publish the source companion"], measures: ["Organizer inquiries", "Brief downloads", "Talk-to-meeting conversion"] },
      { id: "low-lift", label: "No personal posting required", goal: "Build authority without depending on frequent first-person social publishing.", position: "An editorial desk powered by Mark’s documented method", channels: ["Quarterly essays", "Search library", "Brokerage newsletter"], firstMoves: ["Capture one monthly expert interview", "Turn it into a governed content package", "Distribute through owned and partner channels"], measures: ["Organic discovery", "Referral replies", "Content-assisted inquiries"] },
    ],
  },
  sam: {
    currentSignal: "A public record spanning clean energy, entrepreneurship, real estate, community work, and policy-adjacent systems—with no single professional profile connecting the chapters.",
    invisibleValue: [
      "The ability to translate between land, energy, business, and public consequence",
      "Operating experience across adoption, infrastructure, and commercial transition",
      "A pattern of working where private decisions meet shared systems",
      "A Hawaiʻi-specific perspective on constraints that generic innovation narratives miss",
    ],
    opportunity: "Turn a fragmented record into a coherent systems-leadership thesis while preserving uncertainty wherever titles, dates, or present affiliations require confirmation.",
    futureState: "A carefully governed profile and editorial system that makes Sam’s cross-sector pattern legible without inventing continuity, outcomes, or endorsement.",
    journeys: [
      { id: "client", label: "Prospective client", need: "A clear account of which complex transitions Sam can help navigate and how he thinks.", lead: "Begin with the collision between land, infrastructure, economics, and people.", proof: ["Documented clean-energy work", "Documented real-estate experience", "Public community-facing activity"], proposedMove: "Organize the record around systems translation, with confirmation gates around current services.", conversion: "A scoped exploratory conversation after role confirmation." },
      { id: "investor", label: "Investor", need: "Evidence that an operator sees adoption constraints and second-order effects, not technology alone.", lead: "Show where deployment succeeds or stalls in the real world.", proof: ["Energy-sector operating experience", "Entrepreneurial record", "Land and market exposure"], proposedMove: "Publish transition memos that distinguish documented experience from present analysis.", conversion: "A diligence, advisory, or operator conversation—only after scope confirmation." },
      { id: "partner", label: "Potential partner", need: "A coherent map of complementary experience and the problems worth solving together.", lead: "Name the boundary-crossing problem before listing credentials.", proof: ["Cross-sector public record", "Community engagement", "Business experience"], proposedMove: "Create partnership theses with explicit assumptions and open questions.", conversion: "A focused fit conversation." },
      { ...commonJourneys.journalist, lead: "Offer a systems view on a tightly bounded Hawaiʻi energy or land question.", proof: ["Public clean-energy record", "Local market experience", "Community-facing work"], proposedMove: "Build a quote-ready evidence file, separating historic experience from current affiliation.", conversion: commonJourneys.journalist.conversion },
      { id: "community", label: "Community stakeholder", need: "Clarity about whose interests are affected and what tradeoffs a transition creates.", lead: "Start with lived consequence rather than innovation language.", proof: ["Public neighborhood initiative", "Hawaiʻi-based energy work", "Land and real-estate experience"], proposedMove: "Use accessible systems maps and invite correction where the record is incomplete.", conversion: "Better-informed dialogue and accountable participation." },
      { ...commonJourneys.organizer, lead: "Frame the talk around how systems meet place—and where implementation gets difficult.", proof: ["Cross-sector work", "Entrepreneurial experience", "Public-facing initiatives"], proposedMove: "Develop one signature session only after Sam confirms the present-day thesis.", conversion: commonJourneys.organizer.conversion },
      { id: "referrer", label: "Referral source", need: "A concise description of Sam’s current work, which the retrieved public record cannot yet establish conclusively.", lead: "Lead with the confirmation gap rather than laundering history into a current claim.", proof: ["Verified historical records", "Source ledger", "Explicit unresolved fields"], proposedMove: "Use a fact-check interview to define current scope, then publish referral triggers.", conversion: "Accurate introductions after subject confirmation." },
    ],
    scenarios: [
      { id: "systems", label: "Own systems leadership", goal: "Make the through-line across energy, land, enterprise, and community intelligible.", position: "A Hawaiʻi systems translator—subject to confirmation", channels: ["Long-form essays", "Systems maps", "Briefing notes"], firstMoves: ["Conduct a fact-check interview", "Define the current mandate", "Publish one evidence-led systems thesis"], measures: ["High-quality replies", "Relevant invitations", "Corrections resolved"] },
      { id: "speaking", label: "Earn speaking invitations", goal: "Turn cross-sector experience into a bounded, memorable audience promise.", position: "What implementation teaches us about place, infrastructure, and adoption", channels: ["Signature talk page", "Event brief", "Recorded excerpt"], firstMoves: ["Confirm present title and permissions", "Choose one defensible talk thesis", "Build the evidence companion"], measures: ["Organizer inquiries", "Topic-fit rate", "Post-event conversations"] },
      { id: "regional", label: "Build regional authority", goal: "Contribute a distinctive Hawaiʻi lens without claiming to speak for communities or institutions.", position: "A practitioner’s view of transition constraints in island systems", channels: ["Field notes", "Roundtables", "Source-visible newsletter"], firstMoves: ["Define authority boundaries", "Invite expert and community review", "Publish one narrow analysis"], measures: ["Expert citations", "Meaningful corrections", "Repeat readership"] },
      { id: "low-lift", label: "No personal posting required", goal: "Create a durable body of work through structured interviews and editorial support.", position: "A governed editorial desk for cross-sector insight", channels: ["Quarterly interviews", "Search library", "Partner distribution"], firstMoves: ["Record a monthly source interview", "Route claims through evidence gates", "Publish only approved excerpts"], measures: ["Approval velocity", "Organic discovery", "Qualified introductions"] },
    ],
  },
};

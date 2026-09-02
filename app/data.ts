export type Profile = {
  slug: "mark" | "sam";
  name: string;
  initials: string;
  image: string;
  verified: boolean;
  headline: string;
  location: string;
  company: string;
  school: string;
  connections: string;
  about: string[];
  skills: string[];
  experience: { role: string; org: string; dates: string; detail: string; mark: string }[];
  education: { school: string; degree: string; dates: string }[];
  editorialPosition: { thesis: string; distinction: string; promise: string };
  strategyLayers: {
    id: string;
    label: string;
    audience: string;
    tension: string;
    editorialMove: string;
    outcome: string;
  }[];
  contentEngine: {
    northStar: string;
    cadence: string;
    series: { name: string; purpose: string; formats: string[]; conversion: string }[];
  };
  featured: { kicker: string; title: string; description: string; tone: string; status?: "Proposed series"; evidence?: string[] }[];
  posts: {
    date: string;
    text: string;
    reactions: number;
    comments: number;
    reposts: number;
    art: string;
    status: "Proposed post";
    strategy: string;
    evidence: { label: string; url: string }[];
  }[];
  sources: { label: string; url: string }[];
};

export const profiles: Record<"mark" | "sam", Profile> = {
  mark: {
    slug: "mark",
    name: "Mark H. Young",
    initials: "MY",
    image: "/mark-young.jpg",
    verified: false,
    headline: "President, True Real Estate Hawaiʻi | Appraisal-trained counsel for consequential property decisions across Oʻahu",
    location: "Honolulu, Hawaiʻi, United States",
    company: "True Real Estate Hawaiʻi",
    school: "University of Hawaiʻi at Mānoa",
    connections: "Evidence-linked public profile",
    editorialPosition: {
      thesis: "The advisor who sees beneath the listing.",
      distinction: "Mark’s defensible authority is not access to inventory. It is the combination of Kāneʻohe-rooted place knowledge, finance training, appraisal discipline, brokerage leadership, and a long client-recognition record.",
      promise: "Make the reasoning behind consequential property decisions visible before a prospect ever needs an agent."
    },
    strategyLayers: [
      { id: "families", label: "Move-up families", audience: "Oʻahu households coordinating a sale and purchase", tension: "Timing, carrying cost, contingencies, and community fit make one move feel like five interlocking decisions.", editorialMove: "Show the sequencing: the decision tree, leverage points, preventable risks, and the human priority beneath each term.", outcome: "Qualified seller and buyer conversations built on judgment rather than listing spectacle." },
      { id: "owners", label: "Prospective sellers", audience: "Owners deciding whether to sell, renovate, wait, or rent", tension: "Generic valuations hide preparation cost, condition, basis, and the consequences of getting the sequence wrong.", editorialMove: "Publish appraisal-informed seller memos that explain which facts change value—and which improvements merely photograph well.", outcome: "Valuation consultations and listings from owners already aligned with Mark’s analytical approach." },
      { id: "investors", label: "Property investors", audience: "Local and returning investors evaluating risk-adjusted opportunity", tension: "The view and projected upside can eclipse insurance, capex, permitting, condition, and a defensible entry basis.", editorialMove: "Turn anonymized deal anatomy into repeatable diligence education: what the listing omits, what the downside reveals, and what would change the answer.", outcome: "Investment conversations in which rigor is the product—not a decorative layer added after selection." },
      { id: "referrals", label: "Referral partners", audience: "Attorneys, lenders, wealth advisors, and former clients", tension: "A broad ‘top realtor’ identity does not tell a referrer which complicated situations Mark is best equipped to handle.", editorialMove: "Give the network concise referral triggers supported by case-pattern proof and a recognizable decision philosophy.", outcome: "More precise introductions and fewer low-fit inquiries." }
    ],
    contentEngine: {
      northStar: "Every piece should reveal a consequential fact the listing alone cannot explain.",
      cadence: "One weekly decision note, one twice-monthly visual case study, one monthly Oʻahu interpretation, and one quarterly long-form transaction anatomy.",
      series: [
        { name: "What the Listing Doesn’t Tell You", purpose: "Expose hidden diligence questions without sensationalizing risk.", formats: ["annotated carousel", "60-second field video", "search-led article"], conversion: "Property-specific diligence conversation" },
        { name: "Decision Before Transaction", purpose: "Help households sequence the choices surrounding a move before focusing on inventory.", formats: ["decision tree", "client scenario", "newsletter note"], conversion: "Buyer or seller strategy session" },
        { name: "Oʻahu, Without the Theater", purpose: "Interpret market information by segment, place, and decision—not headline alone.", formats: ["monthly briefing", "chart-led post", "referral memo"], conversion: "Newsletter subscription and referral-partner reply" }
      ]
    },
    about: [
      "A property can be beautiful and still be the wrong decision. My job is to know the difference—and to make the reasoning clear before a client puts anything important at risk.",
      "I was born and raised in Kāneʻohe, graduated from Hawaiʻi Baptist Academy and the University of Hawaiʻi, and began my career applying a finance education to commercial and residential appraisal. Valuation taught me to look beneath presentation: understand the land, test the assumptions, study the downside, and listen closely enough to learn what a client is really trying to protect.",
      "Today I lead True Real Estate Hawaiʻi and advise first-time buyers, growing and downsizing families, sellers, developers, and investors across Oʻahu. The assignments change. The standard does not: local fluency, disciplined analysis, resilient negotiation, and service that remains personal when the decision becomes complicated.",
      "My public record includes repeated True Real Estate Top Producer honors, Honolulu Magazine recognition, and client-nominated Aloha ʻĀina recognition across more than a decade. I treat that history as an obligation to keep earning trust—not a reason to coast on it."
    ],
    skills: ["Real Estate Strategy", "Property Valuation", "Negotiation", "Residential Real Estate", "Investment Properties"],
    experience: [
      { role: "President & Realtor-Broker", org: "True Real Estate Hawaiʻi, LLC", dates: "Current", detail: "Leading an independent Hawaiʻi brokerage and advising clients across residential, investment, and development decisions on Oʻahu.", mark: "TR" },
      { role: "Realtor", org: "Benn Pacific Group", dates: "Prior experience", detail: "Built an advisory practice grounded in market analysis, detailed client service, and negotiation. Public listing archives associate license RS-72387 with the firm.", mark: "BP" },
      { role: "Real Estate Appraiser & Analyst", org: "Hawaiʻi real-estate consulting", dates: "Earlier career", detail: "Analyzed commercial and residential property using a finance-based appraisal framework.", mark: "HI" }
    ],
    education: [{ school: "University of Hawaiʻi at Mānoa", degree: "Finance", dates: "Honolulu, Hawaiʻi" }, { school: "Hawaiʻi Baptist Academy", degree: "Graduate", dates: "Honolulu, Hawaiʻi" }],
    featured: [
      { kicker: "CASE STUDY", title: "The judgment behind a waterfront acquisition", description: "How appraisal logic, renovation economics, and a family’s actual needs can change the answer.", tone: "ocean", status: "Proposed series", evidence: ["Mark’s appraisal-and-analysis background is documented by True Real Estate Hawaiʻi."] },
      { kicker: "SERIES", title: "What the listing doesn’t tell you", description: "Field notes on value, risk, and decision-making in Oʻahu real estate.", tone: "sand", status: "Proposed series", evidence: ["Strategic format derived from Mark’s documented finance and appraisal foundation."] },
      { kicker: "MILESTONE", title: "Recognition earned across a decade", description: "A transparent look at the company-published recognition record—and the service standard it is meant to represent.", tone: "ink", status: "Proposed series", evidence: ["True Real Estate Hawaiʻi publishes annual recognition and nomination records spanning more than a decade."] }
    ],
    posts: [
      { date: "Concept", status: "Proposed post", strategy: "Convert appraisal discipline into an immediately useful waterfront diligence framework.", text: "A view can win the showing. It cannot rescue the wrong basis.\n\nBefore letting the horizon set the price, put the unphotogenic facts back into the decision: shoreline condition, flood exposure, deferred maintenance, renovation history, insurance, and the cost of being wrong.\n\nBeauty belongs in the analysis. It should never be allowed to replace it.\n\nFive questions I would answer before writing an offer on an Oʻahu waterfront home.", reactions: 0, comments: 0, reposts: 0, art: "water", evidence: [{ label: "True Real Estate Hawaiʻi — appraisal and analyst background", url: "https://truerealestatehawaii.com/agent/mark-young/" }] },
      { date: "Concept", status: "Proposed post", strategy: "Demonstrate Mark’s client-centered negotiation philosophy without implying a specific transaction.", text: "The most valuable part of a negotiation may happen before anyone writes a number.\n\nIt happens when preparation separates preference from necessity: what our client must protect, what the other side may need, which risks deserve a price, and which terms could create room that money alone cannot.\n\nPreparation does more than produce confidence. It produces options. Options are where leverage begins.", reactions: 0, comments: 0, reposts: 0, art: "keys", evidence: [{ label: "True Real Estate Hawaiʻi — professional biography", url: "https://truerealestatehawaii.com/agent/mark-young/" }] }
    ],
    sources: [
      { label: "True Real Estate Hawaiʻi biography", url: "https://truerealestatehawaii.com/agent/mark-young/" },
      { label: "Honolulu Board of REALTORS®", url: "https://www.hicentral.com/directory/member/40803/Mark-H-Young/" },
      { label: "Pacific Business News profile", url: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html" },
      { label: "HONOLULU Magazine directory", url: "https://www.honolulumagazine.com/listings/2022-hawaii-real-estate-pro-finder/mark-h-young-3/" }
    ]
  },
  sam: {
    slug: "sam",
    name: "Samuel “Sam” Wolff",
    initials: "SW",
    image: "/sam-wolff.jpg",
    verified: false,
    headline: "Real Estate Investment Advisor | Energy, land, and the systems that shape how Hawaiʻi grows",
    location: "Honolulu County, Hawaiʻi, United States",
    company: "Real Estate Investment Advisory",
    school: "University of Hawaiʻi at Mānoa",
    connections: "Evidence-linked public profile",
    editorialPosition: {
      thesis: "The systems translator for land, energy, policy, and return.",
      distinction: "Sam’s public record crosses water technology, residential solar development, municipal neighborhood administration, commercial-property advising, and elected neighborhood service. The coherent story is not a single industry; it is translation across systems that meet in place.",
      promise: "Make the policy, infrastructure, finance, and community conditions inside a property decision intelligible enough to act on."
    },
    strategyLayers: [
      { id: "transition", label: "Residential-to-commercial", audience: "Residential investors evaluating commercial property", tension: "Familiar confidence collides with a different vocabulary of leases, tenants, debt, diligence, and operating risk.", editorialMove: "Teach the transition as a sequence of changed questions rather than a status upgrade or asset-class sales pitch.", outcome: "Better-prepared advisory conversations with investors who understand the risks they are choosing." },
      { id: "owners", label: "Local owners and operators", audience: "Small property and business owners making occupancy and capital decisions", tension: "Permitting, energy, infrastructure, and policy appear outside the spreadsheet until they alter cost, timing, or feasibility.", editorialMove: "Translate a public-system change into the private decision it modifies, with the primary record attached.", outcome: "Trust from owners who need context before they need a transaction." },
      { id: "civic", label: "Civic stakeholders", audience: "Neighborhood participants, public servants, and place-based organizations", tension: "Public debate often collapses a real tradeoff into two performative positions.", editorialMove: "Model balanced, source-visible analysis that names safety, access, cost, implementation, and who carries each consequence.", outcome: "A credible public voice whose usefulness does not depend on winning every argument." },
      { id: "energy", label: "Energy and property", audience: "Property, infrastructure, and renewable-energy professionals", tension: "Operating systems are analyzed in silos even though owners experience them as one asset.", editorialMove: "Connect energy design, incentives, resilience, operating cost, and property value through visual system maps.", outcome: "Cross-sector advisory and collaboration opportunities grounded in Sam’s documented experience." }
    ],
    contentEngine: {
      northStar: "Every piece should reconnect a financial model to the place and public systems it abstracts away.",
      cadence: "One weekly systems explainer, one twice-monthly primary-source translation, one monthly investor transition lesson, and one quarterly field essay.",
      series: [
        { name: "The Place Belongs in the Model", purpose: "Show how infrastructure, policy, and community conditions become asset fundamentals.", formats: ["system map", "field note", "evidence-linked essay"], conversion: "Investment or cross-sector advisory conversation" },
        { name: "Public Meeting, Private Consequence", purpose: "Translate civic records into concrete implications without assigning a board position to one member.", formats: ["source annotation", "90-second explainer", "monthly briefing"], conversion: "Subscription and stakeholder dialogue" },
        { name: "Change the Asset, Change the Questions", purpose: "Prepare residential investors for commercial-property diligence and risk.", formats: ["framework carousel", "scenario memo", "live Q&A"], conversion: "Commercial-transition assessment" }
      ]
    },
    about: [
      "The spreadsheet is never the whole place.",
      "I work where property, energy, public policy, and community life collide—translating systems that are easy to discuss separately and impossible to experience that way. My path has moved from water technology and residential solar development to Honolulu neighborhood administration, commercial real-estate investment advising, and elected neighborhood service.",
      "At RevoluSun, the work meant custom solar design, financing, and incentive navigation: turning infrastructure into a decision a household could actually make. At the City and County of Honolulu, it meant helping public process function at neighborhood scale. In investment advisory, it has meant helping residential investors understand the different language, risks, and discipline of commercial property.",
      "I now serve Hawaiʻi Kai on Neighborhood Board No. 1. The work is practical and often unresolved: infrastructure, land use, transportation, water, public safety, schools, and access to shared space. When Kamiloʻiki Park faced calls for a nighttime closure, I argued for a response that addressed safety without casually taking a community resource away—including the simple freedom to stargaze there at night.",
      "That is the throughline: ask what the model misses, identify who carries the consequence, and make the tradeoff honest enough for people to act on."
    ],
    skills: ["Commercial Real Estate", "Investment Strategy", "Renewable Energy", "Community Engagement", "Financial Analysis"],
    experience: [
      { role: "Real Estate Investment Advisor", org: "Commercial Real Estate Advisory", dates: "Current role indexed publicly", detail: "Helping residential real-estate investors evaluate transitions into commercial property strategies. Employer and exact dates await first-party confirmation.", mark: "RE" },
      { role: "Board Member", org: "Hawaiʻi Kai Neighborhood Board No. 1", dates: "2025 – Present", detail: "Participating in public deliberation on infrastructure, safety, land use, transportation, schools, and neighborhood quality of life.", mark: "NB" },
      { role: "Neighborhood / Public Relations Assistant", org: "City & County of Honolulu", dates: "2016", detail: "Supported neighborhood-board proceedings, public records, and community-facing civic administration across Oʻahu.", mark: "CCH" },
      { role: "Project Developer", org: "RevoluSun Smart Home", dates: "Jun 2014 – Dec 2016", detail: "Designed custom residential solar systems and helped homeowners evaluate financing and government incentives.", mark: "RS" },
      { role: "Sales & Networking Coordinator", org: "FloWater", dates: "2010 – 2013", detail: "Early experience connecting a water-technology offering with customers and partner networks.", mark: "FW" }
    ],
    education: [{ school: "University of Hawaiʻi at Mānoa", degree: "B.A., Political Science / Political Theory", dates: "Class of 2014" }],
    featured: [
      { kicker: "FRAMEWORK", title: "Land, energy, policy, return", description: "Four lenses for evaluating a Hawaiʻi real-estate decision without abstracting the place away.", tone: "green", status: "Proposed series", evidence: ["This framework synthesizes Sam’s documented solar, civic, and real-estate work; it is an editorial proposal, not a past publication."] },
      { kicker: "FIELD NOTE", title: "What solar taught me about property", description: "Infrastructure changes the investment before it changes the spreadsheet.", tone: "sun", status: "Proposed series", evidence: ["MidWeek documents Sam’s role designing custom residential solar systems and navigating financing and incentives."] },
      { kicker: "EXPLAINER", title: "From one rental to commercial real estate", description: "The questions that change when an investor changes asset classes.", tone: "ink", status: "Proposed series", evidence: ["The advisory theme is corroborated only at public-index level and should be confirmed before publication in Sam’s voice."] }
    ],
    posts: [
      { date: "Concept", status: "Proposed post", strategy: "Unify Sam’s energy, civic, and property experience under one memorable analytical idea.", text: "In Hawaiʻi, a property decision is also an infrastructure decision.\n\nEnergy, water, transportation, insurance, permitting, and community legitimacy are often treated as context surrounding the asset. Owners experience them differently: as cost, delay, resilience, access, and risk.\n\nThe model becomes more honest when the place is put back inside it.", reactions: 0, comments: 0, reposts: 0, art: "grid", evidence: [{ label: "MidWeek — RevoluSun project-developer appointment", url: "https://www.midweek.com/business-leaders-move-hawaii-92414/" }, { label: "City and County of Honolulu — Samuel Wolff member page", url: "https://www.honolulu.gov/nco/member_bio/samuel-wolff/" }] },
      { date: "Concept", status: "Proposed post", strategy: "Create a credible education bridge for residential investors without asserting unverified employer details.", text: "Residential investors sometimes ask when they are ‘ready’ for commercial real estate.\n\nReadiness is not a larger down payment or a more impressive asset. It is the willingness to learn which risks have changed.\n\nLeases, tenant quality, debt structure, capital work, and diligence alter the vocabulary. The durable questions remain: Where does the cash flow come from? What breaks it? Who carries the downside? Why should this asset exist here?\n\nChange the asset. Change the questions before you change the allocation.", reactions: 0, comments: 0, reposts: 0, art: "city", evidence: [{ label: "Public professional-role index — verification boundary applies", url: "https://www.linkedin.com/in/samuel-wolff-4862303b" }] }
    ],
    sources: [
      { label: "University and current-role index", url: "https://www.linkedin.com/in/samuel-wolff-4862303b" },
      { label: "RevoluSun appointment", url: "https://www.midweek.com/business-leaders-move-hawaii-92414/" },
      { label: "Neighborhood Board record", url: "https://www.kaimukihawaii.com/news/201603/8545.html" },
      { label: "Public meeting record", url: "https://www.kaimukihawaii.com/news/201605/8861.html" },
      { label: "Current Hawaiʻi Kai board record", url: "https://www.honolulu.gov/events/event/hawaii-kai-nb-regular-meeting-2025-09-30-19226/" },
      { label: "Hawaiʻi News Now — Kamiloʻiki Park deliberation", url: "https://www.hawaiinewsnow.com/2025/06/07/drugs-noise-prompt-calls-nighttime-closure-east-oahu-park/" }
    ]
  }
};

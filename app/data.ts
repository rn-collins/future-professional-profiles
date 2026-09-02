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
  featured: { kicker: string; title: string; description: string; tone: string }[];
  posts: { date: string; text: string; reactions: number; comments: number; reposts: number; art: string }[];
  sources: { label: string; url: string }[];
};

export const profiles: Record<"mark" | "sam", Profile> = {
  mark: {
    slug: "mark",
    name: "Mark H. Young",
    initials: "MY",
    image: "/mark-young.jpg",
    verified: true,
    headline: "President, True Real Estate Hawaiʻi | Appraisal-trained advisor helping people make consequential property decisions across Oʻahu",
    location: "Honolulu, Hawaiʻi, United States",
    company: "True Real Estate Hawaiʻi",
    school: "University of Hawaiʻi at Mānoa",
    connections: "500+ connections",
    about: [
      "Real estate is never only a transaction. It is a family choosing what comes next, an investor testing an assumption, or a local owner deciding what a piece of Hawaiʻi will become.",
      "I began on the analytical side of the industry, applying a finance degree as a commercial and residential real-estate appraiser. That training taught me to look past the surface: understand the land, interrogate the numbers, and listen closely enough to know which details actually matter.",
      "Today I lead True Real Estate Hawaiʻi and advise buyers, sellers, families, developers, and investors across Oʻahu. My work combines local knowledge, rigorous valuation judgment, careful negotiation, and a client-first standard built over more than fifteen years."
    ],
    skills: ["Real Estate Strategy", "Property Valuation", "Negotiation", "Residential Real Estate", "Investment Properties"],
    experience: [
      { role: "President & Realtor-Broker", org: "True Real Estate Hawaiʻi, LLC", dates: "2016 – Present · 10 yrs", detail: "Leading an independent Hawaiʻi brokerage and advising clients across residential, investment, and development decisions on Oʻahu.", mark: "TR" },
      { role: "Realtor", org: "Benn Pacific Group", dates: "2009 – 2016 · 7 yrs", detail: "Built a top-producing advisory practice grounded in market analysis, detailed client service, and negotiation.", mark: "BP" },
      { role: "Real Estate Appraiser & Analyst", org: "Hawaiʻi real-estate consulting", dates: "Earlier career", detail: "Analyzed commercial and residential property using a finance-based appraisal framework.", mark: "HI" }
    ],
    education: [{ school: "University of Hawaiʻi at Mānoa", degree: "Finance", dates: "Honolulu, Hawaiʻi" }, { school: "Hawaiʻi Baptist Academy", degree: "Graduate", dates: "Honolulu, Hawaiʻi" }],
    featured: [
      { kicker: "CASE STUDY", title: "The judgment behind a waterfront acquisition", description: "How appraisal logic, renovation economics, and a family’s actual needs change the answer.", tone: "ocean" },
      { kicker: "SERIES", title: "What the listing doesn’t tell you", description: "Field notes on value, risk, and decision-making in Oʻahu real estate.", tone: "sand" },
      { kicker: "MILESTONE", title: "15 years of client-nominated recognition", description: "The service behaviors clients remember after closing.", tone: "ink" }
    ],
    posts: [
      { date: "3d", text: "A view can sell a showing. It cannot rescue the wrong basis.\n\nFor a waterfront property, I want to understand the seawall, flood exposure, deferred maintenance, renovation history, insurance reality—and only then the photograph. Beauty belongs in the analysis. It should never replace it.\n\nHere are the five questions I would ask before making an offer on an Oʻahu waterfront home.", reactions: 284, comments: 31, reposts: 18, art: "water" },
      { date: "1w", text: "The best negotiation often happens before anyone writes a number.\n\nIt happens when an advisor listens long enough to learn what the other side must protect—and what your own client can stop pretending matters. Preparation creates options. Options create leverage.", reactions: 191, comments: 22, reposts: 11, art: "keys" }
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
    connections: "500+ connections",
    about: [
      "I work at the intersection of property, energy, and public systems—helping people understand not only what an investment can return, but what has to be true for it to work.",
      "My path has moved through residential solar development, neighborhood-level civic service, and commercial real-estate investment advising. The thread is consistent: translate complicated systems into decisions people can act on.",
      "Hawaiʻi makes those systems visible. Land is finite. Energy is consequential. Housing policy changes lives. Good investment thinking here requires more than a spreadsheet; it requires context, patience, and an honest view of competing interests."
    ],
    skills: ["Commercial Real Estate", "Investment Strategy", "Renewable Energy", "Community Engagement", "Financial Analysis"],
    experience: [
      { role: "Real Estate Investment Advisor", org: "Commercial Real Estate Advisory", dates: "Recent", detail: "Helping residential real-estate investors evaluate transitions into commercial property strategies.", mark: "RE" },
      { role: "Board Member", org: "Hawaiʻi Kai Neighborhood Board No. 1", dates: "2025 – Present", detail: "Participating in public deliberation on infrastructure, safety, land use, transportation, schools, and neighborhood quality of life.", mark: "NB" },
      { role: "Neighborhood / Public Relations Assistant", org: "City & County of Honolulu", dates: "2016", detail: "Supported neighborhood-board proceedings, public records, and community-facing civic administration across Oʻahu.", mark: "CCH" },
      { role: "Project Developer", org: "RevoluSun Smart Home", dates: "Jun 2014 – Dec 2016", detail: "Designed custom residential solar systems and helped homeowners evaluate financing and government incentives.", mark: "RS" },
      { role: "Sales & Networking Coordinator", org: "FloWater", dates: "2010 – 2013", detail: "Early experience connecting a water-technology offering with customers and partner networks.", mark: "FW" }
    ],
    education: [{ school: "University of Hawaiʻi at Mānoa", degree: "B.A., Political Science / Political Theory", dates: "Class of 2014" }],
    featured: [
      { kicker: "FRAMEWORK", title: "Land, energy, policy, return", description: "Four lenses for evaluating a Hawaiʻi real-estate decision.", tone: "green" },
      { kicker: "FIELD NOTE", title: "What solar taught me about property", description: "Infrastructure changes the investment before it changes the spreadsheet.", tone: "sun" },
      { kicker: "EXPLAINER", title: "From one rental to commercial real estate", description: "The questions to answer before changing asset classes.", tone: "ink" }
    ],
    posts: [
      { date: "2d", text: "In Hawaiʻi, a property decision is also an infrastructure decision.\n\nEnergy cost, grid constraints, water, transportation, insurance, permitting, and community acceptance are not ‘externalities.’ They are part of the asset.\n\nThe strongest underwriting begins by putting the place back into the model.", reactions: 247, comments: 38, reposts: 29, art: "grid" },
      { date: "6d", text: "Residential investors often ask when they are ‘ready’ for commercial real estate.\n\nThe better question: which new risks are you now prepared to understand? Commercial property changes the vocabulary—leases, tenants, debt, diligence—but judgment still begins with cash flow, downside, and the reason this particular asset should exist.", reactions: 173, comments: 19, reposts: 15, art: "city" }
    ],
    sources: [
      { label: "University and current-role index", url: "https://www.linkedin.com/in/samuel-wolff-4862303b" },
      { label: "RevoluSun appointment", url: "https://www.midweek.com/business-leaders-move-hawaii-92414/" },
      { label: "Neighborhood Board record", url: "https://www.kaimukihawaii.com/news/201603/8545.html" },
      { label: "Public meeting record", url: "https://www.kaimukihawaii.com/news/201605/8861.html" }
      ,{ label: "Current Hawaiʻi Kai board record", url: "https://www.honolulu.gov/events/event/hawaii-kai-nb-regular-meeting-2025-09-30-19226/" }
    ]
  }
};

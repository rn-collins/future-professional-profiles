export const markPrivateData = {
  image: "/mark-young.jpg",
  sources: {
    biography: {
      label: "True Real Estate Hawaiʻi biography",
      url: "https://truerealestatehawaii.com/agent/mark-young/",
    },
    directory: {
      label: "Honolulu Board of REALTORS® directory",
      url: "https://www.hicentral.com/directory/member/40803/Mark-H-Young/%252Fdirectory%252Foffice%252F8676%253Furl%253D%2525252Fdirectory%2525252Foffices%2525253FcompanyName%2525253Da%25252526specialty%2525253D%25252526page%2525253D54%2526page%253D1",
    },
    businessProfile: {
      label: "Pacific Business News profile",
      url: "https://www.bizjournals.com/pacific/news/2021/10/15/true-real-estate-carves-out-market-share.html",
    },
    honolulu2022: {
      label: "HONOLULU Magazine 2022 directory",
      url: "https://www.honolulumagazine.com/listings/2022-hawaii-real-estate-pro-finder/mark-h-young-3/",
    },
    honolulu2018: {
      label: "HONOLULU Magazine 2018 directory",
      url: "https://www.honolulumagazine.com/listings/2018-hawaii-real-estate-pro-finder/mark-young/",
    },
    agentDirectory: {
      label: "True Real Estate Hawaiʻi agent directory",
      url: "https://truerealestatehawaii.com/agents/",
    },
  },
} as const;

export const markPrivateSources = Object.values(markPrivateData.sources);

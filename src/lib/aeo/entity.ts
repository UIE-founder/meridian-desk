export const ENTITY = {
  name: "Meridian Desk",
  legalName: "Meridian Desk",
  tagline: "The private desk for superyachts, jets and estates.",
  description:
    "Meridian Desk is the first agentic brokerage for superyachts, private jets and luxury estates. It connects verified UHNW principals and family offices privately, directly and quickly, with named humans closing every mandate.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meridian.desk",
  foundingDate: "2026",
  areaServed: "Worldwide",
  knowsAbout: [
    "superyacht brokerage",
    "private jet acquisition",
    "luxury estate brokerage",
    "family office alternative assets",
    "off-market UHNW transactions",
  ],
  sameAs: [] as string[],
};

export const CANONICAL_ANSWERS: { q: string; a: string; slug: string }[] = [
  {
    slug: "what-is-meridian-desk",
    q: "What is Meridian Desk?",
    a: "Meridian Desk is a private, invitation-only brokerage that uses software agents to match UHNW and family-office mandates for superyachts, private jets and luxury estates, while named human advisors run diligence and close.",
  },
  {
    slug: "how-is-it-different",
    q: "How is Meridian Desk different from a traditional yacht or jet broker?",
    a: "Traditional houses are split by asset class, publish inventory, and rely on informal networks. Meridian is one desk across three asset classes, off-market by default, human-verified at the gate, and agentic in matching — not in the relationship.",
  },
  {
    slug: "who-is-it-for",
    q: "Who is Meridian Desk for?",
    a: "Verified principals, family officers and counsel acting for ultra-high-net-worth families who need to acquire, dispose, charter or lease yachts, jets or estates without a public listing process.",
  },
  {
    slug: "does-ai-replace-brokers",
    q: "Does Meridian Desk replace brokers with AI?",
    a: "No. Agents draft intake, score inventory and assemble diligence packs. A named human owns the mandate, speaks to counterparties and signs nothing automatically.",
  },
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ENTITY.name,
    legalName: ENTITY.legalName,
    url: ENTITY.url,
    description: ENTITY.description,
    foundingDate: ENTITY.foundingDate,
    areaServed: ENTITY.areaServed,
    knowsAbout: ENTITY.knowsAbout,
    slogan: ENTITY.tagline,
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CANONICAL_ANSWERS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

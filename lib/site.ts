/**
 * Single source of truth for identity, contact, and canonical URL.
 * Every route's metadata, the JSON-LD graph, RSS, sitemap and llms.txt read
 * from here — change it once, it propagates.
 */
export const site = {
  name: "Austin O'Neil",
  role: "Developer and technical SEO specialist",
  // Apex is canonical; www redirects to it at the Vercel level. Every
  // canonical tag, OG url, sitemap entry and llms.txt link derives from this
  // value, so it must never carry a trailing slash or a www prefix.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://austinoneil.me",
  locale: "en-US",
  location: "Denver, Colorado",
  description:
    "Austin O'Neil is a developer and technical SEO specialist in Denver who spent twelve years in hospitality and sales first. He builds production software and runs technical SEO across a 100-plus client agency book. Case studies in AWS, WordPress plugin engineering, serverless AI and Next.js.",
  email: "austinroneil@gmail.com",
  socials: {
    github: "https://github.com/austin-oneil",
    linkedin: "https://linkedin.com/in/austinroneil",
  },
} as const;

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/uses", label: "Uses" },
] as const;

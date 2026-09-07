/**
 * Single source of truth for identity, contact, and canonical URL.
 * Every route's metadata, the JSON-LD graph, RSS, sitemap and llms.txt read
 * from here — change it once, it propagates.
 */
export const site = {
  name: "Austin O'Neil",
  role: "Developer and technical SEO specialist",
  // TODO(austin): swap to the real apex domain once it is registered and
  // pointed at Vercel. Every canonical, OG url and sitemap entry derives
  // from this value.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://austinoneil.dev",
  locale: "en-US",
  location: "Denver, Colorado",
  description:
    "Austin O'Neil builds production web software and runs technical SEO for a 100+ client agency book. Case studies in AWS, WordPress plugin engineering, Next.js and serverless AI.",
  email: "austinroneil@gmail.com",
  phone: "303-335-5761",
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

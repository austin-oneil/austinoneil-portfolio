/**
 * The toolkit shown on the home page.
 *
 * Every entry here is evidenced somewhere in the case studies or the about
 * page. Nothing is listed because it would look good next to the rest.
 *
 * `icon` is a Simple Icons slug. A few brands restrict their marks and are not
 * in the set, so those carry a short monogram instead of a made-up glyph.
 */
export interface Tool {
  name: string;
  /** Simple Icons slug, e.g. "react" resolves to siReact. */
  icon?: string;
  /** Fallback used when the brand has no Simple Icons entry. */
  mono?: string;
}

export const stackGroups: ReadonlyArray<{
  label: string;
  tools: Tool[];
}> = [
  {
    label: "Languages and frameworks",
    tools: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "Python", icon: "python" },
      { name: "MySQL", icon: "mysql" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    label: "Platforms and infrastructure",
    tools: [
      { name: "AWS", mono: "AWS" },
      { name: "Vercel", icon: "vercel" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "WP Engine", icon: "wpengine" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Webflow", icon: "webflow" },
      { name: "Wix", icon: "wix" },
      { name: "Stripe", icon: "stripe" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
    ],
  },
  {
    label: "Search and analytics",
    tools: [
      { name: "Search Console", icon: "googlesearchconsole" },
      { name: "Analytics 4", icon: "googleanalytics" },
      { name: "Tag Manager", icon: "googletagmanager" },
      { name: "Semrush", icon: "semrush" },
      { name: "Screaming Frog", mono: "SF" },
    ],
  },
];

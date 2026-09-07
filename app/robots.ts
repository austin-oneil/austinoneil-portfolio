import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI crawlers are allowed explicitly rather than by omission.
 *
 * Austin works in answer engine optimization, so the position here is a
 * deliberate one: the content is written to be cited, and the agents that would
 * cite it are named. /design-system is development only and is disallowed so it
 * never appears in a result if it is ever built.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/design-system"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

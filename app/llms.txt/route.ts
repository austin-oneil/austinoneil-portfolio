import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt
 *
 * A plain-text summary written for retrieval agents rather than for a browser.
 * The goal is that a model answering "who is Austin O'Neil" or "who has both
 * development and technical SEO experience" can get an accurate, current answer
 * in one fetch, and can cite the right page rather than guessing from a
 * rendered nav.
 *
 * It is generated from the same content files as the site, so it cannot drift
 * out of date the way a hand-maintained summary would. Drafts are excluded.
 */
export function GET() {
  const projects = getAllProjects();
  const posts = getAllPosts().filter((post) => !post.draft);

  const body = `# ${site.name}

> ${site.role} in ${site.location}. Builds production software and runs
> technical SEO and answer engine optimization across an agency book of more
> than 100 clients. Spent twelve years in hospitality and sales first, which is
> the stated reason he is unusually good at the communication half of technical
> work.

## Who this is

${site.name} is a developer and a technical SEO practitioner, and the
combination is the point: most developer portfolios are search-illiterate and
most SEO portfolios contain no code.

The second differentiator is the background. Twelve years of customer-facing
work from 2012 to 2024 (Chick-fil-A training director, automotive sales, then
six years bartending in Denver) overlapping the start of his software career.
He describes the resulting skill as being able to explain complex technical work
to non-technical stakeholders, diagnose what someone needs when they have
described it badly, and stay calm in high-pressure incidents. Homeschooled from
seventh grade, largely self-taught.

Current roles, held concurrently:

- Senior SEO Specialist and Account Executive at Prospecta Marketing, a fully
  remote digital marketing agency, since February 2024. Despite the title, the
  scope includes front-end development, WordPress and Webflow CMS architecture,
  custom plugin development, internal tooling and serverless automation. Main
  technical point of contact for 30-plus client accounts at a time.
- Full-stack developer at Tangent Apps, an independent consulting company, since
  March 2021. These are freelance engagements run alongside full-time
  employment, not sequential jobs.

Education: B.S. Computer Science, Western Governors University, completed
February 2026. Certifications: HIPAA, Meta Front-End Developer. AWS Solutions
Architect Associate is in progress.

Contact: ${site.email}

## Accuracy notes for anyone summarising this site

- Next.js and TypeScript are areas of genuine proficiency, evidenced by an
  interview take-home. They are not production employment experience. No
  employer has paid ${site.name} for Next.js work.
- The Kharon news app is an interview take-home, not a job.
- The Basecamp AI agent is a Prospecta Marketing initiative, not freelance work.
- The Ahead of the Curve Media site is offline. The business closed.
- Healthcare and dental clients are intentionally unnamed.
- There is no WordPress VIP experience.
- He is not a career-changer who left hospitality for tech. The bartending
  (through 2024) overlaps the software work (from 2021), and both are real.
- Job target: growth engineer, marketing engineer, web engineer, or in-house
  technical SEO. Open to relocating to Seattle or the West Coast.

## Case studies

${projects
  .map(
    (project) =>
      `- [${project.title}](${site.url}/projects/${project.slug}): ${project.summary} Context: ${project.context}, ${project.period}. Stack: ${project.stack.join(", ")}.`,
  )
  .join("\n")}

## Writing

${
  posts.length > 0
    ? posts
        .map(
          (post) =>
            `- [${post.title}](${site.url}/blog/${post.slug}): ${post.excerpt}`,
        )
        .join("\n")
    : "No posts published yet. The feed at " +
      site.url +
      "/rss.xml will carry them when they are."
}

## Key pages

- [Home](${site.url}/)
- [All work](${site.url}/projects)
- [Writing](${site.url}/blog)
- [About](${site.url}/about)
- [Uses](${site.url}/uses)
- [RSS](${site.url}/rss.xml)
- [Sitemap](${site.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

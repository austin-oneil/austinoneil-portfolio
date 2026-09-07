import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-semibold tracking-tight text-text">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {site.role} in {site.location}. Available for full-time roles.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block rounded-[--radius-sm] font-mono text-sm text-accent underline decoration-accent-border underline-offset-4 transition-colors duration-150 hover:decoration-accent"
          >
            {site.email}
          </a>
        </div>

        <div className="flex gap-12">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-[--radius-sm] text-text-muted transition-colors duration-150 hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <a
                href={site.socials.github}
                className="rounded-[--radius-sm] text-text-muted transition-colors duration-150 hover:text-text"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.socials.linkedin}
                className="rounded-[--radius-sm] text-text-muted transition-colors duration-150 hover:text-text"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="/rss.xml"
                className="rounded-[--radius-sm] text-text-muted transition-colors duration-150 hover:text-text"
              >
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page border-t border-border py-6">
        <p className="font-mono text-xs text-text-subtle">
          {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}

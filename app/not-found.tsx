import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60dvh] flex-col justify-center py-20">
      <p className="font-mono text-sm text-text-subtle">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
        That page does not exist
      </h1>
      <p className="mt-4 max-w-[52ch] leading-relaxed text-text-muted">
        The link may be out of date, or the page may have been renamed. The work
        and the writing are both one click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/projects">See the work</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Home
        </ButtonLink>
      </div>
    </div>
  );
}

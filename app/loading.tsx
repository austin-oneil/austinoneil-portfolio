/**
 * Route-level skeleton. Dimensions mirror the page header shared by every
 * route, so the real content lands in the same place the placeholder occupied.
 */
export default function Loading() {
  return (
    <div className="container-page py-16 md:py-20" aria-hidden>
      <div className="animate-pulse space-y-4">
        <div className="h-3 w-32 rounded-(--radius-sm) bg-surface-2" />
        <div className="h-10 w-4/5 max-w-3xl rounded-(--radius-sm) bg-surface-2 md:h-12" />
        <div className="h-5 w-full max-w-xl rounded-(--radius-sm) bg-surface-2" />
        <div className="h-5 w-2/3 max-w-lg rounded-(--radius-sm) bg-surface-2" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

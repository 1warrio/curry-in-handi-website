export default function LoadingMessages() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading contact messages">
      <div className="h-8 w-56 animate-pulse bg-charcoal/10" />
      <div className="h-10 w-full max-w-sm animate-pulse bg-charcoal/10" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 w-full animate-pulse bg-charcoal/5" />
        ))}
      </div>
    </div>
  );
}

export function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="border border-charcoal/10 bg-white/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/60">{label}</p>
      <p className={`mt-2 font-serif text-3xl font-medium ${accent ? "text-burgundy" : "text-charcoal"}`}>
        {value}
      </p>
    </div>
  );
}

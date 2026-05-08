export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-gold/10" />
        </div>
        <p className="text-[10px] tracking-[0.4em] text-gold/80">CONNECTING TO YOUR SOUL</p>
      </div>
    </main>
  );
}

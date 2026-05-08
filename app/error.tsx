"use client";

import Link from "next/link";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-[10px] tracking-[0.4em] text-gold">A SLIGHT INTERFERENCE</p>
        <h1 className="mt-4 font-serif text-3xl text-cream">星の周波数が乱れました</h1>
        <p className="mt-4 text-sm leading-relaxed text-starlight/70">
          少し時間をおいて、もう一度試してみてください。<br />
          静けさの中で、再び魂とつながり直します。
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={reset}
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-full border border-gold bg-gold/10 px-8 text-sm tracking-[0.2em] text-gold hover:bg-gold/20"
          >
            もう一度
          </button>
          <Link href="/" className="text-xs tracking-[0.3em] text-starlight/60 hover:text-gold">
            トップへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}

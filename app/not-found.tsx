import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-[10px] tracking-[0.4em] text-gold">UNCHARTED PATH</p>
        <h1 className="mt-4 font-serif text-3xl text-cream">この道は、まだ開かれていません</h1>
        <p className="mt-4 text-sm leading-relaxed text-starlight/70">
          お探しのページは見つかりませんでした。
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 min-w-[220px] items-center justify-center rounded-full border border-gold bg-gold/10 px-8 text-sm tracking-[0.2em] text-gold hover:bg-gold/20"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}

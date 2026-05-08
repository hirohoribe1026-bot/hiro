"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Starfield from "@/components/Starfield";
import { isRegistered, loadResultTypeId, setRegistered } from "@/lib/storage";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/R/ti/p/@your-line-id";

export default function RegisterPage() {
  const router = useRouter();
  const [typeId, setTypeId] = useState<string | null>(null);
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    setTypeId(loadResultTypeId());
    setHasRegistered(isRegistered());
  }, []);

  function handleLineClick() {
    setRegistered(true);
    setHasRegistered(true);
  }

  function handleViewResult() {
    if (typeId) {
      router.push(`/result/${typeId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield count={70} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] tracking-[0.5em] text-gold"
        >
          THE GATE IS OPENING
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-6 font-serif text-3xl leading-[1.5] text-cream md:text-4xl"
        >
          あなたのソウルミッションを<br />受け取る準備が整いました
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="my-10 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="max-w-md text-sm leading-[2] text-starlight/85 md:text-base"
        >
          LINEで友だち追加すると、結果ページとともに<br className="hidden md:inline" />
          <span className="text-gold">7日間の覚醒メッセージ</span>が届きます。
          <br />
          診断結果は登録後にすぐご覧いただけます。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="mt-12 flex w-full flex-col items-center gap-5"
        >
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="group flex h-16 w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#06C755] px-8 text-base font-bold tracking-wider text-white shadow-[0_10px_30px_-10px_rgba(6,199,85,0.6)] transition hover:scale-[1.02] active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M19.4 10.4c0-3.3-3.3-6-7.4-6S4.6 7 4.6 10.3c0 3 2.6 5.4 6.2 5.9.2 0 .5.2.6.4.1.2.1.5 0 .7l-.1.5c-.1.3-.4 1.2 1 .7 1.5-.6 7.9-4.6 7.9-8z" />
            </svg>
            LINEで友だち追加
          </a>

          <p className="text-xs leading-relaxed text-starlight/60">
            登録が完了したら、このページに戻ってきてください。
          </p>

          <button
            onClick={handleViewResult}
            disabled={!hasRegistered || !typeId}
            className={`mt-4 inline-flex h-14 min-w-[260px] items-center justify-center rounded-full border px-10 font-serif text-sm tracking-[0.25em] transition
              ${hasRegistered && typeId
                ? "border-gold bg-gold/10 text-gold shadow-gold hover:bg-gold/20"
                : "cursor-not-allowed border-white/15 text-starlight/40"}`}
          >
            結果を見る
          </button>

          {!hasRegistered && (
            <Link href="/" className="mt-2 text-[11px] tracking-[0.2em] text-starlight/50 underline-offset-4 hover:text-gold hover:underline">
              トップに戻る
            </Link>
          )}
        </motion.div>
      </div>
    </main>
  );
}

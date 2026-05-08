"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Starfield from "@/components/Starfield";
import { useEffect, useState } from "react";
import { clearAnswers, isRegistered, loadResultTypeId } from "@/lib/storage";

export default function LandingPage() {
  const [returningTypeId, setReturningTypeId] = useState<string | null>(null);

  useEffect(() => {
    if (isRegistered()) {
      setReturningTypeId(loadResultTypeId());
    }
  }, []);

  function handleStartFresh() {
    clearAnswers();
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield count={70} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-[10px] tracking-[0.5em] text-gold"
        >
          KEIKO ANAGUCHI PRESENTS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-4xl leading-[1.4] text-cream md:text-6xl"
        >
          ソウル<br className="md:hidden" />ミッション診断
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.6 }}
          className="my-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="font-serif text-lg leading-[2] text-starlight md:text-xl"
        >
          5つの問いに答えるだけ。<br />
          あなたの魂が、この地球で果たす<br className="md:hidden" />本当の使命を、<br className="hidden md:block" />
          12のタイプから読み解きます。
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.0 }}
          className="mt-6 max-w-md text-xs leading-relaxed text-starlight/60 md:text-sm"
        >
          所要時間は約1分。本来のあなたが宿す光の役割を、静けさの中で受け取ってください。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <Link
            href="/question/1"
            onClick={handleStartFresh}
            className="group relative inline-flex h-14 min-w-[260px] items-center justify-center overflow-hidden rounded-full bg-gold-sheen bg-[length:200%_100%] px-10 font-serif text-base tracking-[0.2em] text-ink shadow-gold transition-all hover:scale-[1.02] active:scale-[0.99] animate-shimmer"
          >
            <span className="relative z-10">診断を始める</span>
          </Link>

          {returningTypeId && (
            <Link
              href={`/result/${returningTypeId}`}
              className="text-xs tracking-[0.2em] text-starlight/70 underline-offset-4 hover:text-gold hover:underline"
            >
              前回の結果を見る →
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="mt-20 flex w-full flex-col gap-6"
        >
          <Feature
            num="01"
            title="5つの問い、約1分"
            text="魂が反応する選択肢を直感で選ぶだけ。考え込まなくて大丈夫。"
          />
          <Feature
            num="02"
            title="12タイプの魂の役割"
            text="クリエイター、ヒーラー、オラクル……あなたの本来の使命を読み解きます。"
          />
          <Feature
            num="03"
            title="7日間の覚醒メッセージ"
            text="LINE登録で、診断結果に合わせた7日間のステップ配信が届きます。"
          />
        </motion.div>
      </div>
    </main>
  );
}

function Feature({ num, title, text }: { num: string; title: string; text: string }) {
  return (
    <div className="glass mx-auto flex max-w-md items-start gap-5 rounded-2xl px-6 py-5 text-left">
      <span className="font-serif text-2xl text-gold/80">{num}</span>
      <div>
        <h3 className="font-serif text-base text-cream">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-starlight/70 md:text-sm">{text}</p>
      </div>
    </div>
  );
}

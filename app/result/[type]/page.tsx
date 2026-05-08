"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Starfield from "@/components/Starfield";
import ResultHero from "@/components/ResultHero";
import ShareButtons from "@/components/ShareButtons";
import SymbolSvg from "@/components/SymbolSvg";
import { PRODUCT_MAP, getSoulType } from "@/data/soulTypes";
import { clearAnswers, isRegistered } from "@/lib/storage";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL ?? "https://line.me/R/ti/p/@your-line-id";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://soul-mission.example.com";

interface PageProps {
  params: { type: string };
}

export default function ResultPage({ params }: PageProps) {
  const type = getSoulType(params.type);
  if (!type) notFound();

  const [registered, setRegistered] = useState(false);
  const [shareUrl, setShareUrl] = useState(`${SITE_URL}/result/${type.id}`);

  useEffect(() => {
    setRegistered(isRegistered());
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/result/${type.id}`);
    }
  }, [type.id]);

  const product = PRODUCT_MAP[type.productGroup];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield count={90} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16">
        {/* HERO */}
        <ResultHero type={type} />

        {/* SHAREABLE CARD (used by html2canvas) */}
        <div
          id="share-card"
          className="mx-auto mt-16 w-full max-w-md rounded-3xl border border-gold/30 bg-gradient-to-b from-[#1E1B4B]/95 via-[#251f5c]/90 to-[#0c0a2a]/95 p-8 text-center shadow-deep"
        >
          <p className="text-[9px] tracking-[0.5em] text-gold/80">SOUL MISSION</p>
          <div className="mt-4 flex justify-center">
            <SymbolSvg typeId={type.id} size={140} glow={false} />
          </div>
          <h2 className="mt-4 font-serif text-2xl text-cream">{type.name}</h2>
          <p className="mt-1 text-[11px] tracking-[0.3em] text-starlight/80">{type.subtitle}</p>
          <div className="my-5 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-serif text-sm leading-[1.9] text-gold">{type.essence}</p>
          <p className="mt-6 text-[10px] tracking-[0.3em] text-starlight/50">
            #ソウルミッション診断
          </p>
        </div>

        {/* SHARE BUTTONS */}
        <div className="mt-10">
          <ShareButtons type={type} shareUrl={shareUrl} />
        </div>

        {/* DESCRIPTION */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mt-20 space-y-4"
        >
          <p className="text-[10px] tracking-[0.4em] text-gold">YOUR ESSENCE</p>
          <p className="font-serif text-base leading-[2.1] text-cream md:text-lg">
            {type.description}
          </p>
        </motion.section>

        <div className="gold-divider my-12" />

        {/* STRENGTHS / SHADOW / MISSION */}
        <div className="grid gap-6 md:grid-cols-2">
          <Block title="STRENGTHS" subtitle="魂のギフト">
            <ul className="space-y-2">
              {type.strengths.map((s) => (
                <li key={s} className="flex items-center gap-3 text-cream">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="font-serif text-base">{s}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="SHADOW" subtitle="影の側面">
            <p className="text-sm leading-[2] text-cream/90">{type.shadow}</p>
          </Block>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mt-8 rounded-3xl border border-gold/40 bg-gradient-to-br from-violet/15 via-transparent to-gold/10 p-8 text-center"
        >
          <p className="text-[10px] tracking-[0.4em] text-gold">YOUR MISSION</p>
          <p className="mt-4 font-serif text-xl leading-[1.9] text-cream md:text-2xl">
            {type.mission}
          </p>
        </motion.div>

        {/* PRODUCT BLOCK */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mt-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-gold">RECOMMENDED PATH</p>
          <h3 className="mt-3 font-serif text-2xl text-cream">{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-starlight/80">{product.description}</p>
          <ul className="mt-6 space-y-3">
            {product.products.map((p) => (
              <li
                key={p}
                className="glass flex items-center gap-4 rounded-2xl px-5 py-4 text-left"
              >
                <span className="font-serif text-lg text-gold">◇</span>
                <span className="font-serif text-base text-cream md:text-lg">{p}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* NEXT ACTION */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mt-16 rounded-3xl border border-gold/40 bg-gradient-to-b from-[#1E1B4B]/80 to-[#0c0a2a]/80 p-8 text-center shadow-deep"
        >
          <p className="text-[10px] tracking-[0.4em] text-gold">NEXT STEP</p>
          <h3 className="mt-4 font-serif text-2xl leading-[1.6] text-cream md:text-3xl">
            7日間の覚醒メッセージを<br className="md:hidden" />受け取る
          </h3>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-starlight/80">
            {registered
              ? "LINE登録済み。あなたの魂のタイプに合わせた7日間のステップ配信が、まもなく届き始めます。"
              : "LINEで友だち追加すると、あなたのタイプに合わせた覚醒メッセージが7日間届きます。"}
          </p>
          {registered ? (
            <p className="mt-6 inline-block rounded-full border border-gold/50 bg-gold/10 px-6 py-2 text-xs tracking-[0.3em] text-gold">
              配信開始済
            </p>
          ) : (
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-14 min-w-[260px] items-center justify-center rounded-full bg-[#06C755] px-8 font-bold tracking-wider text-white shadow-[0_10px_30px_-10px_rgba(6,199,85,0.6)] transition hover:scale-[1.02] active:scale-[0.99]"
            >
              LINEで7日間メッセージを受け取る
            </a>
          )}
        </motion.section>

        {/* RESTART */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <Link
            href="/"
            onClick={() => clearAnswers()}
            className="text-xs tracking-[0.3em] text-starlight/60 underline-offset-4 hover:text-gold hover:underline"
          >
            もう一度受ける
          </Link>
          <p className="text-[10px] tracking-[0.3em] text-starlight/40">
            © 穴口恵子 / SOUL MISSION
          </p>
        </div>
      </div>
    </main>
  );
}

function Block({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-3xl p-6">
      <p className="text-[10px] tracking-[0.4em] text-gold">{title}</p>
      <p className="mt-1 text-[11px] text-starlight/70">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

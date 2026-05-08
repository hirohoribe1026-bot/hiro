"use client";

import { motion } from "framer-motion";
import SymbolSvg from "./SymbolSvg";
import type { SoulType } from "@/data/soulTypes";

interface ResultHeroProps {
  type: SoulType;
}

export default function ResultHero({ type }: ResultHeroProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10 animate-float blur-3xl">
          <div className="h-full w-full rounded-full bg-violet/30" />
        </div>
        <SymbolSvg typeId={type.id} size={220} className="drop-shadow-[0_0_24px_rgba(212,175,55,0.45)]" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-8 text-[10px] tracking-[0.45em] text-gold"
      >
        YOUR SOUL MISSION
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="mt-3 font-serif text-4xl text-cream md:text-5xl"
      >
        {type.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.9 }}
        className="mt-2 text-sm tracking-[0.35em] text-starlight/80"
      >
        — {type.subtitle} —
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="mx-auto mt-8 max-w-lg font-serif text-xl leading-[1.9] text-gold md:text-2xl"
      >
        {type.essence}
      </motion.p>
    </div>
  );
}

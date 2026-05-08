"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface OptionButtonProps {
  label: string;
  index: number;
  selected?: boolean;
  onSelect: () => void;
}

const PREFIX = ["I", "II", "III", "IV"];

export default function OptionButton({ label, index, selected, onSelect }: OptionButtonProps) {
  const [rippleKey, setRippleKey] = useState(0);

  function handleClick() {
    setRippleKey((k) => k + 1);
    // Slight delay so the ripple is visible before route change.
    setTimeout(onSelect, 280);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-full min-h-[64px] items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300
        ${selected
          ? "border-gold bg-gold/10 shadow-gold"
          : "border-white/15 bg-white/[0.03] hover:border-gold/60 hover:bg-white/[0.06]"
        }`}
      aria-pressed={selected}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-serif tracking-widest transition
          ${selected ? "border-gold text-gold" : "border-white/20 text-starlight/80 group-hover:border-gold/70 group-hover:text-gold"}`}
      >
        {PREFIX[index]}
      </span>
      <span className="flex-1 text-[15px] leading-relaxed text-cream md:text-base">{label}</span>

      {/* Ripple effect */}
      {rippleKey > 0 && (
        <span
          key={rippleKey}
          className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/40 animate-ripple"
        />
      )}
    </motion.button>
  );
}

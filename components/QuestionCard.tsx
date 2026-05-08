"use client";

import { motion } from "framer-motion";
import OptionButton from "./OptionButton";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  selectedIndex?: number;
  onSelect: (index: number) => void;
}

export default function QuestionCard({ question, selectedIndex, onSelect }: QuestionCardProps) {
  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <div className="mb-10 text-center">
        <p className="mb-3 text-[10px] tracking-[0.4em] text-gold/80">QUESTION {question.id}</p>
        <h2 className="font-serif text-2xl leading-tight text-cream md:text-3xl">
          {question.text}
        </h2>
        {question.caption && (
          <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-starlight/70 md:text-sm">
            {question.caption}
          </p>
        )}
      </div>

      <div className="mx-auto flex max-w-xl flex-col gap-3">
        {question.options.map((opt, i) => (
          <OptionButton
            key={i}
            index={i}
            label={opt.label}
            selected={selectedIndex === i}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
    </motion.section>
  );
}

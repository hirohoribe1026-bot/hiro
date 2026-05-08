"use client";

import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { QUESTIONS } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import Starfield from "@/components/Starfield";
import { calcResult } from "@/lib/scoring";
import { loadAnswers, saveAnswer, saveResultTypeId } from "@/lib/storage";

interface PageProps {
  params: { id: string };
}

export default function QuestionPage({ params }: PageProps) {
  const router = useRouter();
  const qNumber = Number(params.id);

  if (!Number.isInteger(qNumber) || qNumber < 1 || qNumber > QUESTIONS.length) {
    notFound();
  }

  const qIndex = qNumber - 1;
  const question = QUESTIONS[qIndex];

  const [selected, setSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    const stored = loadAnswers();
    if (stored[qIndex] !== undefined) {
      setSelected(stored[qIndex]);
    } else {
      setSelected(undefined);
    }
  }, [qIndex]);

  function handleSelect(optionIndex: number) {
    setSelected(optionIndex);
    saveAnswer(qIndex, optionIndex);

    if (qNumber < QUESTIONS.length) {
      router.push(`/question/${qNumber + 1}`);
    } else {
      // After Q5, compute and store the result, then send to register gate.
      const answers = loadAnswers();
      const fixed = answers.map((a) => (typeof a === "number" ? a : 0));
      try {
        const { typeId } = calcResult(fixed);
        saveResultTypeId(typeId);
      } catch {
        // Defensive: if anything is malformed, just go to register.
      }
      router.push("/register");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield count={50} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
        <div className="mb-12">
          <ProgressBar current={qNumber} total={QUESTIONS.length} />
        </div>

        <div className="flex flex-1 items-center">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={question.id}
              question={question}
              selectedIndex={selected}
              onSelect={handleSelect}
            />
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between text-[10px] tracking-[0.3em] text-starlight/50">
          {qNumber > 1 ? (
            <button
              onClick={() => router.push(`/question/${qNumber - 1}`)}
              className="underline-offset-4 hover:text-gold hover:underline"
            >
              ← 前の問いへ
            </button>
          ) : (
            <span />
          )}
          <span>SOUL MISSION</span>
        </div>
      </div>
    </main>
  );
}

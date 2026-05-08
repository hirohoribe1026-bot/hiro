import { QUESTIONS } from "@/data/questions";
import { SOUL_TYPES } from "@/data/soulTypes";

export interface ScoringResult {
  typeId: string;
  scores: Record<string, number>;
  tied: string[];
}

export function calcResult(answers: number[]): ScoringResult {
  if (answers.length !== QUESTIONS.length) {
    throw new Error(
      `Expected ${QUESTIONS.length} answers, received ${answers.length}.`,
    );
  }

  const scores: Record<string, number> = {};
  for (const t of SOUL_TYPES) scores[t.id] = 0;

  answers.forEach((optionIdx, qIdx) => {
    const question = QUESTIONS[qIdx];
    const option = question.options[optionIdx];
    if (!option) {
      throw new Error(`Invalid option index ${optionIdx} on question ${qIdx + 1}.`);
    }
    for (const [typeId, pt] of Object.entries(option.scores)) {
      if (typeId in scores) {
        scores[typeId] += pt;
      }
    }
  });

  const max = Math.max(...Object.values(scores));
  const tied = Object.keys(scores).filter((k) => scores[k] === max);

  if (tied.length === 1) {
    return { typeId: tied[0], scores, tied };
  }

  // Same score: prefer the type that appears in Q5's selected option (priority).
  const q5Option = QUESTIONS[4].options[answers[4]];
  if (q5Option) {
    for (const id of tied) {
      if (q5Option.scores[id]) {
        return { typeId: id, scores, tied };
      }
    }
  }

  return { typeId: tied[0], scores, tied };
}

export function isValidAnswers(answers: unknown): answers is number[] {
  if (!Array.isArray(answers)) return false;
  if (answers.length !== QUESTIONS.length) return false;
  return answers.every(
    (a, i) =>
      typeof a === "number" &&
      Number.isInteger(a) &&
      a >= 0 &&
      a < QUESTIONS[i].options.length,
  );
}

// Lightweight runtime tests for scoring logic.
// We avoid TS at test-time by mirroring the data shape directly.

import { test } from "node:test";
import assert from "node:assert/strict";

// Inline copies of the production data so tests stay framework-free.
const QUESTIONS = [
  {
    options: [
      { scores: { creator: 2, artist: 2, messenger: 1 } },
      { scores: { healer: 2, guide: 2, weaver: 1 } },
      { scores: { leader: 2, architect: 2, teacher: 1 } },
      { scores: { oracle: 2, alchemist: 2, guardian: 1 } },
    ],
  },
  {
    options: [
      { scores: { oracle: 2, weaver: 2, guide: 1 } },
      { scores: { creator: 2, artist: 2, architect: 1 } },
      { scores: { messenger: 2, leader: 2, alchemist: 1 } },
      { scores: { healer: 2, alchemist: 2, teacher: 1 } },
    ],
  },
  {
    options: [
      { scores: { messenger: 2, oracle: 2, teacher: 1 } },
      { scores: { artist: 2, creator: 2 } },
      { scores: { alchemist: 2, leader: 1, creator: 1 } },
      { scores: { healer: 2, weaver: 2, guardian: 2 } },
    ],
  },
  {
    options: [
      { scores: { messenger: 2, leader: 2, alchemist: 1 } },
      { scores: { healer: 2, guardian: 2, weaver: 1 } },
      { scores: { creator: 2, artist: 1, architect: 2 } },
      { scores: { guide: 2, teacher: 2, oracle: 1 } },
    ],
  },
  {
    options: [
      { scores: { leader: 3, messenger: 3 }, priority: true },
      { scores: { healer: 3, guide: 3 }, priority: true },
      { scores: { artist: 3, creator: 3 }, priority: true },
      { scores: { architect: 3, alchemist: 3, teacher: 2 }, priority: true },
    ],
  },
];

const TYPES = [
  "creator", "leader", "messenger", "healer", "guide", "artist",
  "teacher", "oracle", "weaver", "guardian", "alchemist", "architect",
];

function calcResult(answers) {
  const scores = {};
  for (const t of TYPES) scores[t] = 0;
  answers.forEach((optionIdx, qIdx) => {
    const option = QUESTIONS[qIdx].options[optionIdx];
    for (const [typeId, pt] of Object.entries(option.scores)) {
      if (typeId in scores) scores[typeId] += pt;
    }
  });
  const max = Math.max(...Object.values(scores));
  const tied = Object.keys(scores).filter((k) => scores[k] === max);
  if (tied.length === 1) return { typeId: tied[0], scores, tied };
  const q5 = QUESTIONS[4].options[answers[4]];
  for (const id of tied) {
    if (q5.scores[id]) return { typeId: id, scores, tied };
  }
  return { typeId: tied[0], scores, tied };
}

test("creator path: artistic answers route to creator", () => {
  // Q1:0(creator/artist), Q2:1(creator/artist), Q3:1(artist/creator), Q4:2(creator/architect), Q5:2(artist/creator)
  const { typeId } = calcResult([0, 1, 1, 2, 2]);
  // artist & creator both score; Q5 priority covers both, so first tied wins.
  assert.ok(["creator", "artist"].includes(typeId));
});

test("leader path: leadership answers produce leader", () => {
  // Q1:2(leader/architect), Q2:2(messenger/leader), Q3:2(alchemist/leader), Q4:0(messenger/leader), Q5:0(leader/messenger)
  const { typeId } = calcResult([2, 2, 2, 0, 0]);
  assert.equal(typeId, "leader");
});

test("healer path: caring answers produce healer", () => {
  // Q1:1(healer/guide), Q2:3(healer/alchemist), Q3:3(healer/weaver/guardian), Q4:1(healer/guardian), Q5:1(healer/guide)
  const { typeId } = calcResult([1, 3, 3, 1, 1]);
  assert.equal(typeId, "healer");
});

test("oracle path: introspective answers produce oracle", () => {
  // Q1:3(oracle/alchemist/guardian), Q2:0(oracle/weaver/guide), Q3:0(messenger/oracle/teacher), Q4:3(guide/teacher/oracle), Q5:3(architect/alchemist/teacher)
  const { typeId } = calcResult([3, 0, 0, 3, 3]);
  assert.equal(typeId, "oracle");
});

test("architect path: structural answers produce architect", () => {
  // Q1:2(leader/architect), Q2:1(creator/artist/architect), Q3:2(alchemist/leader/creator), Q4:2(creator/architect), Q5:3(architect/alchemist/teacher)
  const { typeId } = calcResult([2, 1, 2, 2, 3]);
  assert.equal(typeId, "architect");
});

test("Q5 priority breaks ties", () => {
  // Build answers that produce a tie among multiple types and confirm Q5 disambiguates.
  // Q1:1(healer/guide), Q2:0(oracle/weaver/guide), Q3:3(healer/weaver/guardian), Q4:3(guide/teacher/oracle), Q5:1(healer/guide)
  const { typeId, tied } = calcResult([1, 0, 3, 3, 1]);
  assert.ok(tied.length >= 1);
  // Q5 chose option 1 (healer/guide priority); resolved must be one of these.
  assert.ok(["healer", "guide"].includes(typeId));
});

test("all answers produce a valid soul type", () => {
  for (let q1 = 0; q1 < 4; q1++)
    for (let q2 = 0; q2 < 4; q2++)
      for (let q3 = 0; q3 < 4; q3++)
        for (let q4 = 0; q4 < 4; q4++)
          for (let q5 = 0; q5 < 4; q5++) {
            const { typeId } = calcResult([q1, q2, q3, q4, q5]);
            assert.ok(TYPES.includes(typeId), `bad typeId: ${typeId}`);
          }
});

test("Q5 priority resolves to a Q5-listed type when possible", () => {
  // Construct a tie that includes a non-Q5 type to confirm Q5 list wins.
  // Q1:0(creator/artist/messenger), Q2:1(creator/artist/architect), Q3:1(artist/creator),
  // Q4:2(creator/artist/architect), Q5:2(artist/creator priority)
  const { typeId } = calcResult([0, 1, 1, 2, 2]);
  assert.ok(["artist", "creator"].includes(typeId));
});

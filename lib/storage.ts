const ANSWERS_KEY = "soul-mission:answers";
const REGISTERED_KEY = "soul-mission:registered";
const RESULT_KEY = "soul-mission:result";

function safeWindow(): Window | null {
  if (typeof window === "undefined") return null;
  return window;
}

export function saveAnswer(qIndex: number, optionIndex: number) {
  const w = safeWindow();
  if (!w) return;
  const current = loadAnswers();
  current[qIndex] = optionIndex;
  w.localStorage.setItem(ANSWERS_KEY, JSON.stringify(current));
}

export function loadAnswers(): (number | undefined)[] {
  const w = safeWindow();
  if (!w) return [];
  try {
    const raw = w.localStorage.getItem(ANSWERS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

export function clearAnswers() {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.removeItem(ANSWERS_KEY);
  w.localStorage.removeItem(RESULT_KEY);
}

export function setRegistered(value: boolean) {
  const w = safeWindow();
  if (!w) return;
  if (value) {
    w.localStorage.setItem(REGISTERED_KEY, "true");
  } else {
    w.localStorage.removeItem(REGISTERED_KEY);
  }
}

export function isRegistered(): boolean {
  const w = safeWindow();
  if (!w) return false;
  return w.localStorage.getItem(REGISTERED_KEY) === "true";
}

export function saveResultTypeId(typeId: string) {
  const w = safeWindow();
  if (!w) return;
  w.localStorage.setItem(RESULT_KEY, typeId);
}

export function loadResultTypeId(): string | null {
  const w = safeWindow();
  if (!w) return null;
  return w.localStorage.getItem(RESULT_KEY);
}

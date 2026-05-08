"use client";

import { useMemo } from "react";

interface StarfieldProps {
  count?: number;
  className?: string;
}

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  duration: number;
  opacity: number;
}

// Deterministic pseudo-random so SSR and CSR markup match.
function seedRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Starfield({ count = 60, className = "" }: StarfieldProps) {
  const stars = useMemo<Star[]>(() => {
    const rand = seedRandom(count + 7);
    return Array.from({ length: count }, () => ({
      cx: rand() * 100,
      cy: rand() * 100,
      r: 0.4 + rand() * 1.2,
      delay: rand() * 4,
      duration: 2 + rand() * 4,
      opacity: 0.4 + rand() * 0.6,
    }));
  }, [count]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="#F5E9C8"
          opacity={s.opacity}
          style={{
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

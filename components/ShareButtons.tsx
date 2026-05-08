"use client";

import { useState } from "react";
import type { SoulType } from "@/data/soulTypes";

interface ShareButtonsProps {
  type: SoulType;
  shareUrl: string;
}

const HASHTAGS = "#ソウルミッション診断 #穴口恵子";

function buildShareText(type: SoulType) {
  return `私のソウルミッションは「${type.name}（${type.subtitle}）」でした。\n\n${type.essence}\n\n${HASHTAGS}`;
}

export default function ShareButtons({ type, shareUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const text = buildShareText(type);

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
  const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${text}\n${shareUrl}`)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const target = document.getElementById("share-card");
      if (!target) return;
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(target, {
        backgroundColor: "#0c0a2a",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `soul-mission-${type.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  const baseBtn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-white/[0.04] text-gold transition hover:bg-gold/10 hover:shadow-gold";

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs tracking-[0.3em] text-starlight/70">SHARE YOUR MISSION</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="Xでシェア" className={baseBtn}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2H21l-6.52 7.46L22 22h-6.86l-4.49-5.86L5.4 22H2.64l6.97-7.97L2 2h7l4.05 5.36L18.244 2zm-1.2 18h1.65L7.07 4H5.32L17.044 20z"/></svg>
        </a>
        <a href={threadsUrl} target="_blank" rel="noopener noreferrer" aria-label="Threadsでシェア" className={baseBtn}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21c5 0 8-3 8-7.5 0-3-2-4.7-5-4.7-2 0-3.5 1-3.7 2.5"/><path d="M9.5 14c.4 1.7 2 2.7 4 2.5 2.6-.3 3.6-1.6 3.4-3.3-.1-1.3-1.3-2.2-3.4-2.2-3.5 0-5.5 1.7-5.5 4.5 0 3.3 2.5 5 6 5"/></svg>
        </a>
        <a href={lineUrl} target="_blank" rel="noopener noreferrer" aria-label="LINEでシェア" className={baseBtn}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 3C6.5 3 2 6.5 2 11c0 2.7 1.7 5.1 4.3 6.6-.2.6-.7 2.3-.8 2.6 0 .2 0 .4.3.4.2 0 .4-.1.5-.2.3-.2 2.7-1.8 3.7-2.5.7.1 1.3.1 2 .1 5.5 0 10-3.5 10-8S17.5 3 12 3zm-3.5 7.7v3.6c0 .2-.2.4-.4.4H7c-.1 0-.2-.1-.3-.1L5 12.4v2c0 .2-.2.4-.4.4h-1c-.2 0-.4-.2-.4-.4v-3.6c0-.2.2-.4.4-.4h1.1c.1 0 .2 0 .3.1l1.7 2.2v-2c0-.2.2-.4.4-.4h1c.2.1.4.2.4.4zm2.4 3.6c0 .2-.2.4-.4.4h-1c-.2 0-.4-.2-.4-.4v-3.6c0-.2.2-.4.4-.4h1c.2 0 .4.2.4.4v3.6zm5.1 0c0 .2-.2.4-.4.4h-3c-.2 0-.4-.2-.4-.4v-3.6c0-.2.2-.4.4-.4h1c.2 0 .4.2.4.4v2.5h1.6c.2 0 .4.2.4.4v.7zm5.4-2.6c0 .2-.2.4-.4.4h-1.6v.4h1.6c.2 0 .4.2.4.4v.7c0 .2-.2.4-.4.4h-1.6v.4h1.6c.2 0 .4.2.4.4v.7c0 .2-.2.4-.4.4h-3c-.2 0-.4-.2-.4-.4v-3.6c0-.2.2-.4.4-.4h3c.2 0 .4.2.4.4v.7z"/></svg>
        </a>
        <button onClick={handleDownload} disabled={downloading} aria-label="結果画像をダウンロード" className={baseBtn}>
          {downloading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold/40 border-t-gold" />
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></svg>
          )}
        </button>
        <button onClick={handleCopy} aria-label="テキストをコピー" className={baseBtn}>
          {copied ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg>
          )}
        </button>
      </div>
      {copied && <p className="text-xs text-gold">コピーしました</p>}
    </div>
  );
}

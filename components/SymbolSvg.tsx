interface SymbolSvgProps {
  typeId: string;
  size?: number;
  className?: string;
  glow?: boolean;
}

// Each soul type gets a unique sacred-geometry / archetypal sigil.
// All symbols share the same canvas (200x200) and gold stroke palette.
const STROKE = "#D4AF37";
const STROKE_SOFT = "#F5E9C8";

function Frame({ glow }: { glow?: boolean }) {
  return (
    <>
      <defs>
        <radialGradient id="sigil-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a2566" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
        </radialGradient>
        {glow && (
          <filter id="sigil-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#sigil-bg)" />
      <circle cx="100" cy="100" r="96" fill="none" stroke={STROKE} strokeWidth="0.6" opacity="0.6" />
      <circle cx="100" cy="100" r="88" fill="none" stroke={STROKE_SOFT} strokeWidth="0.4" opacity="0.35" strokeDasharray="2 4" />
    </>
  );
}

const SYMBOLS: Record<string, JSX.Element> = {
  // 0→1の創造: 種から伸びる六芒
  creator: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round">
      <circle cx="100" cy="100" r="6" fill={STROKE} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * Math.PI) / 3;
        const x2 = 100 + Math.cos(a) * 70;
        const y2 = 100 + Math.sin(a) * 70;
        return <line key={i} x1="100" y1="100" x2={x2} y2={y2} />;
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * Math.PI) / 3;
        const x = 100 + Math.cos(a) * 70;
        const y = 100 + Math.sin(a) * 70;
        return <circle key={`d${i}`} cx={x} cy={y} r="3" fill={STROKE} />;
      })}
    </g>
  ),
  // リーダー: 王冠と中心の星
  leader: (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinejoin="round">
      <path d="M50 120 L70 70 L100 100 L130 70 L150 120 Z" />
      <line x1="50" y1="130" x2="150" y2="130" />
      <circle cx="70" cy="68" r="3" fill={STROKE} />
      <circle cx="100" cy="98" r="3" fill={STROKE} />
      <circle cx="130" cy="68" r="3" fill={STROKE} />
      <path d="M100 50 L103 60 L113 60 L105 66 L108 76 L100 70 L92 76 L95 66 L87 60 L97 60 Z" fill={STROKE} stroke="none" />
    </g>
  ),
  // メッセンジャー: 翼と中心の声紋
  messenger: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round">
      <path d="M40 100 Q70 70 100 100 Q70 90 40 100 Z" />
      <path d="M160 100 Q130 70 100 100 Q130 90 160 100 Z" />
      <circle cx="100" cy="100" r="6" fill={STROKE} />
      <circle cx="100" cy="100" r="14" />
      <circle cx="100" cy="100" r="22" opacity="0.6" />
      <circle cx="100" cy="100" r="30" opacity="0.3" />
    </g>
  ),
  // ヒーラー: 手のひらと癒やしの輪
  healer: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round">
      <circle cx="100" cy="100" r="50" />
      <path d="M85 80 L85 115 M95 75 L95 115 M105 75 L105 115 M115 80 L115 115" />
      <path d="M80 115 Q100 135 120 115" />
      <circle cx="100" cy="65" r="6" fill={STROKE} />
      <circle cx="100" cy="65" r="12" opacity="0.5" />
    </g>
  ),
  // ガイド: 北極星と方位
  guide: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinejoin="round">
      <path d="M100 40 L108 92 L160 100 L108 108 L100 160 L92 108 L40 100 L92 92 Z" fill={STROKE} fillOpacity="0.15" />
      <circle cx="100" cy="100" r="5" fill={STROKE} />
      <circle cx="100" cy="100" r="60" opacity="0.35" />
    </g>
  ),
  // アーティスト: 蓮と虹彩
  artist: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round">
      <path d="M100 60 Q120 90 100 130 Q80 90 100 60 Z" />
      <path d="M70 80 Q100 100 100 130 Q70 110 70 80 Z" />
      <path d="M130 80 Q100 100 100 130 Q130 110 130 80 Z" />
      <circle cx="100" cy="130" r="4" fill={STROKE} />
      <path d="M60 140 Q100 150 140 140" opacity="0.6" />
    </g>
  ),
  // ティーチャー: 開かれた書物と光
  teacher: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinejoin="round">
      <path d="M55 130 Q80 110 100 120 Q120 110 145 130 L145 75 Q120 60 100 70 Q80 60 55 75 Z" />
      <line x1="100" y1="70" x2="100" y2="120" />
      <path d="M100 60 L102 70 L112 70 L104 76 L107 86 L100 80 L93 86 L96 76 L88 70 L98 70 Z" fill={STROKE} />
    </g>
  ),
  // オラクル: 第三の眼
  oracle: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round">
      <path d="M50 100 Q100 60 150 100 Q100 140 50 100 Z" />
      <circle cx="100" cy="100" r="18" />
      <circle cx="100" cy="100" r="8" fill={STROKE} />
      <line x1="100" y1="55" x2="100" y2="40" />
      <line x1="100" y1="145" x2="100" y2="160" />
      <line x1="55" y1="100" x2="40" y2="100" />
      <line x1="145" y1="100" x2="160" y2="100" />
    </g>
  ),
  // ウィーバー: 結ぶ縁の三つ編み
  weaver: (
    <g stroke={STROKE} strokeWidth="1.2" fill="none">
      <path d="M60 60 Q100 100 60 140" />
      <path d="M100 60 Q60 100 100 140" />
      <path d="M140 60 Q100 100 140 140" />
      <path d="M100 60 Q140 100 100 140" />
      <circle cx="60" cy="60" r="3" fill={STROKE} />
      <circle cx="140" cy="60" r="3" fill={STROKE} />
      <circle cx="60" cy="140" r="3" fill={STROKE} />
      <circle cx="140" cy="140" r="3" fill={STROKE} />
    </g>
  ),
  // ガーディアン: 結界の三角形と盾
  guardian: (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinejoin="round">
      <path d="M100 50 L150 80 L150 130 Q100 160 100 160 Q50 130 50 130 L50 80 Z" />
      <path d="M100 50 L150 130 L50 130 Z" opacity="0.5" />
      <circle cx="100" cy="105" r="10" fill={STROKE} />
    </g>
  ),
  // アルケミスト: 蛇と変容の二重螺旋
  alchemist: (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round">
      <path d="M100 50 Q70 80 100 100 Q130 120 100 150" />
      <path d="M100 50 Q130 80 100 100 Q70 120 100 150" />
      <circle cx="100" cy="50" r="5" fill={STROKE} />
      <circle cx="100" cy="150" r="5" fill={STROKE} />
      <circle cx="100" cy="100" r="10" />
    </g>
  ),
  // アーキテクト: メタトロン的構造
  architect: (
    <g stroke={STROKE} strokeWidth="1" fill="none">
      <polygon points="100,50 145,80 145,130 100,160 55,130 55,80" />
      <line x1="100" y1="50" x2="100" y2="160" />
      <line x1="55" y1="80" x2="145" y2="130" />
      <line x1="145" y1="80" x2="55" y2="130" />
      <circle cx="100" cy="50" r="3" fill={STROKE} />
      <circle cx="145" cy="80" r="3" fill={STROKE} />
      <circle cx="145" cy="130" r="3" fill={STROKE} />
      <circle cx="100" cy="160" r="3" fill={STROKE} />
      <circle cx="55" cy="130" r="3" fill={STROKE} />
      <circle cx="55" cy="80" r="3" fill={STROKE} />
      <circle cx="100" cy="105" r="14" />
    </g>
  ),
};

export default function SymbolSvg({ typeId, size = 200, className = "", glow = true }: SymbolSvgProps) {
  const symbol = SYMBOLS[typeId] ?? SYMBOLS.oracle;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${typeId} symbol`}
    >
      <Frame glow={glow} />
      <g filter={glow ? "url(#sigil-glow)" : undefined}>{symbol}</g>
    </svg>
  );
}

/* Cartoon clip-art for every food item in the game — same style as StationArt:
   thick chocolate outlines, flat bright fills, 64x64 viewBox */

const INK = '#4a2912';
const SW = 3.5;

type ArtFn = () => React.JSX.Element;

const Steak: ArtFn = () => (
  <g>
    <path d="M8 30 C8 18 20 12 34 14 C48 16 58 24 56 36 C54 48 40 52 28 50 C16 48 8 42 8 30 Z"
      fill="#e2574c" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M8 30 C8 21 14 16 22 14 C18 22 18 32 24 40 C18 38 8 38 8 30 Z"
      fill="#fff1dc" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    <path d="M32 24 C38 24 44 28 46 33 M28 32 C32 34 36 37 38 41"
      stroke="#a83a31" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Potato: ArtFn = () => (
  <g>
    <path d="M12 34 C10 22 20 12 32 12 C46 12 54 22 52 34 C50 46 42 52 30 52 C18 52 14 44 12 34 Z"
      fill="#cfa15f" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <ellipse cx="24" cy="26" rx="2.5" ry="2" fill="#a87b3e" />
    <ellipse cx="40" cy="32" rx="2.5" ry="2" fill="#a87b3e" />
    <ellipse cx="30" cy="42" rx="2.5" ry="2" fill="#a87b3e" />
    <path d="M20 18 C24 16 28 15 33 15" stroke="#e8c489" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Pot: ArtFn = () => (
  <g>
    <path d="M14 8 C16 4 18 8 20 5 M30 9 C32 4 34 9 36 6" stroke="#9db4c0" strokeWidth={2.5} strokeLinecap="round" />
    <path d="M10 24 H54 V26 C54 42 48 50 32 50 C16 50 10 42 10 26 Z"
      fill="#ff8c42" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M10 24 H54 C54 20 48 17 32 17 C16 17 10 20 10 24 Z"
      fill="#ffc52f" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    <circle cx="24" cy="21" r="2" fill="#ff5b4d" stroke={INK} strokeWidth={1.5} />
    <circle cx="38" cy="20.5" r="2" fill="#58c95f" stroke={INK} strokeWidth={1.5} />
    <rect x="2" y="26" width="8" height="5" rx="2.5" fill="#6b4226" stroke={INK} strokeWidth={2.5} />
    <rect x="54" y="26" width="8" height="5" rx="2.5" fill="#6b4226" stroke={INK} strokeWidth={2.5} />
  </g>
);

const Bowl: ArtFn = () => (
  <g>
    <line x1="44" y1="8" x2="38" y2="24" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
    <ellipse cx="45.5" cy="7" rx="4" ry="3" fill="#cfd8de" stroke={INK} strokeWidth={2} transform="rotate(20 45.5 7)" />
    <path d="M8 28 H56 C56 44 48 54 32 54 C16 54 8 44 8 28 Z"
      fill="#45bdf0" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M8 28 H56 C56 31 48 34 42 32 C38 30.5 36 33 30 32 C24 31 22 33 16 32 C11 31 8 31 8 28 Z"
      fill="#fffdf4" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    <path d="M14 42 C20 47 26 49 32 49" stroke="#2a99cc" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Chicken: ArtFn = () => (
  <g>
    <path d="M14 46 L24 36 M10 50 L20 42" stroke="#fff" strokeWidth={0} />
    <circle cx="12" cy="50" r="4.5" fill="#fffdf4" stroke={INK} strokeWidth={2.5} />
    <circle cx="19" cy="55" r="4.5" fill="#fffdf4" stroke={INK} strokeWidth={2.5} />
    <rect x="13" y="42" width="12" height="7" rx="3.5" fill="#fffdf4" stroke={INK} strokeWidth={2.5} transform="rotate(-45 19 45)" />
    <path d="M24 40 C16 30 22 14 36 12 C50 10 58 20 56 32 C54 44 40 50 30 46 C27 45 25 42 24 40 Z"
      fill="#d98a3d" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M34 18 C40 16 48 19 51 26" stroke="#f2b56b" strokeWidth={3.5} strokeLinecap="round" />
  </g>
);

const Fondue: ArtFn = () => (
  <g>
    <path d="M20 10 C22 5 24 10 26 7 M38 11 C40 6 42 11 44 8" stroke="#9db4c0" strokeWidth={2.5} strokeLinecap="round" />
    <path d="M12 22 H52 V24 C52 38 46 46 32 46 C18 46 12 38 12 24 Z"
      fill="#ff5b4d" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M12 22 H52 C52 19 46 16 32 16 C18 16 12 19 12 22 Z"
      fill="#ffe08a" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    <circle cx="26" cy="19" r="1.8" fill="#58c95f" stroke={INK} strokeWidth={1.2} />
    <circle cx="38" cy="18.5" r="1.8" fill="#c178ff" stroke={INK} strokeWidth={1.2} />
    <rect x="22" y="46" width="20" height="4" rx="2" fill="#6b4226" stroke={INK} strokeWidth={2.5} />
    <rect x="18" y="50" width="28" height="5" rx="2.5" fill="#3e3a45" stroke={INK} strokeWidth={2.5} />
    <path d="M26 56 C26 59 28 60 32 60 C36 60 38 59 38 56" stroke="#ffc52f" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Veggies: ArtFn = () => (
  <g>
    {/* eggplant */}
    <path d="M40 16 C50 18 54 28 50 38 C46 46 38 46 34 40 C30 34 32 22 40 16 Z"
      fill="#9b4ee0" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M42 16 L46 8 M38 17 C40 13 44 12 47 13" stroke="#3da346" strokeWidth={3.5} strokeLinecap="round" />
    {/* tomato */}
    <circle cx="22" cy="40" r="13" fill="#ff5b4d" stroke={INK} strokeWidth={SW} />
    <path d="M22 27 C20 24 24 24 22 21 M17 29 C19 27 25 27 27 29" stroke="#3da346" strokeWidth={3} strokeLinecap="round" />
    <path d="M14 36 C15 32 18 30 21 29" stroke="#ffb3ac" strokeWidth={2.5} strokeLinecap="round" />
    {/* leaf */}
    <path d="M50 46 C56 42 60 46 58 52 C56 57 50 57 48 52 C47 49 48 47 50 46 Z"
      fill="#58c95f" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
  </g>
);

const Roast: ArtFn = () => (
  <g>
    <rect x="40" y="14" width="16" height="7" rx="3.5" fill="#fffdf4" stroke={INK} strokeWidth={2.5} transform="rotate(-35 48 17)" />
    <circle cx="55" cy="9" r="4" fill="#fffdf4" stroke={INK} strokeWidth={2.5} />
    <path d="M6 38 C6 26 16 18 30 20 C44 22 50 30 48 40 C46 50 34 56 20 52 C10 49 6 46 6 38 Z"
      fill="#b8623a" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M14 34 C16 28 22 25 28 25" stroke="#e09a6e" strokeWidth={3.5} strokeLinecap="round" />
    <path d="M24 44 C30 46 38 44 42 40" stroke="#8a4326" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Parcel: ArtFn = () => (
  <g>
    <path d="M10 30 C10 22 20 16 32 16 C44 16 54 22 54 30 V44 C54 50 44 54 32 54 C20 54 10 50 10 44 Z"
      fill="#e8b25c" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M32 16 C26 22 26 30 32 36 C38 30 38 22 32 16 Z" fill="#d99a3e" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    <path d="M16 24 C20 21 25 19 30 18 M34 38 C38 40 44 40 48 38" stroke="#f5d089" strokeWidth={3} strokeLinecap="round" />
    <circle cx="32" cy="38" r="3" fill="#b8784a" stroke={INK} strokeWidth={2} />
  </g>
);

const Bento: ArtFn = () => (
  <g>
    <rect x="6" y="16" width="52" height="34" rx="6" fill="#3e3a45" stroke={INK} strokeWidth={SW} />
    <line x1="32" y1="18" x2="32" y2="48" stroke={INK} strokeWidth={2.5} />
    <line x1="32" y1="33" x2="56" y2="33" stroke={INK} strokeWidth={2.5} />
    <ellipse cx="19" cy="33" rx="8" ry="9" fill="#fffdf4" stroke={INK} strokeWidth={2} />
    <circle cx="19" cy="33" r="3.5" fill="#ff5b4d" stroke={INK} strokeWidth={1.5} />
    <circle cx="40" cy="25" r="4" fill="#ff8c42" stroke={INK} strokeWidth={1.5} />
    <circle cx="49" cy="25" r="4" fill="#ff8c42" stroke={INK} strokeWidth={1.5} />
    <rect x="36" y="38" width="16" height="7" rx="3" fill="#58c95f" stroke={INK} strokeWidth={1.5} />
  </g>
);

const Rice: ArtFn = () => (
  <g>
    <path d="M8 32 H56 C56 46 48 54 32 54 C16 54 8 46 8 32 Z"
      fill="#ff5b4d" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M10 32 C10 28 14 20 22 17 C20 22 24 22 24 18 C28 14 34 14 38 17 C38 21 42 21 42 18 C50 20 54 27 54 32 Z"
      fill="#fffdf4" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <circle cx="24" cy="26" r="1.5" fill="#e3dccd" />
    <circle cx="34" cy="23" r="1.5" fill="#e3dccd" />
    <circle cx="43" cy="27" r="1.5" fill="#e3dccd" />
    <path d="M14 42 C20 47 26 49 32 49" stroke="#d93a2e" strokeWidth={3} strokeLinecap="round" />
  </g>
);

const Fish: ArtFn = () => (
  <g>
    <path d="M6 32 C14 20 26 14 38 16 C50 18 56 26 56 32 C56 38 50 46 38 48 C26 50 14 44 6 32 Z"
      fill="#f4926f" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M56 32 C60 26 62 22 62 18 C56 20 52 24 50 27 M62 46 C62 42 60 38 56 32 C52 40 56 44 62 46 Z"
      fill="#f4926f" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    <circle cx="18" cy="28" r="3" fill="#fff" stroke={INK} strokeWidth={2} />
    <circle cx="18.5" cy="28.5" r="1.3" fill={INK} />
    <path d="M30 22 C34 26 34 38 30 42 M40 22 C44 26 44 38 40 42" stroke="#d96f4e" strokeWidth={3} strokeLinecap="round" />
    <path d="M12 36 C14 38 17 39 20 39" stroke={INK} strokeWidth={2} strokeLinecap="round" />
  </g>
);

const SushiRoll: ArtFn = () => (
  <g>
    {/* nigiri */}
    <ellipse cx="20" cy="44" rx="14" ry="9" fill="#fffdf4" stroke={INK} strokeWidth={SW} />
    <path d="M7 38 C9 30 14 26 22 26 C30 26 34 31 33 38 C28 34 14 34 7 38 Z"
      fill="#f4926f" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M14 31 C18 29 24 29 28 31" stroke="#fbc4ad" strokeWidth={2.5} strokeLinecap="round" />
    {/* maki */}
    <circle cx="46" cy="36" r="14" fill="#3e3a45" stroke={INK} strokeWidth={SW} />
    <circle cx="46" cy="36" r="9" fill="#fffdf4" stroke={INK} strokeWidth={2.5} />
    <circle cx="46" cy="36" r="4" fill="#ff5b4d" stroke={INK} strokeWidth={2} />
    <path d="M41 30 C43 28.5 46 28 49 29" stroke="#e3dccd" strokeWidth={2} strokeLinecap="round" />
  </g>
);

const Plate: ArtFn = () => (
  <g>
    <ellipse cx="32" cy="36" rx="26" ry="14" fill="#fffdf4" stroke={INK} strokeWidth={SW} />
    <ellipse cx="32" cy="34" rx="16" ry="8" fill="#e8eef2" stroke={INK} strokeWidth={2} />
  </g>
);

const Trash: ArtFn = () => (
  <g>
    <rect x="14" y="20" width="36" height="36" rx="5" fill="#8d9aa5" stroke={INK} strokeWidth={SW} />
    <rect x="10" y="13" width="44" height="8" rx="4" fill="#6e7d89" stroke={INK} strokeWidth={SW} />
    <rect x="26" y="8" width="12" height="6" rx="3" fill="#6e7d89" stroke={INK} strokeWidth={2.5} />
    <path d="M24 28 V48 M32 28 V48 M40 28 V48" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
  </g>
);

const Flame: ArtFn = () => (
  <g>
    <path d="M32 6 C36 16 46 20 46 34 C46 46 40 54 32 54 C24 54 18 46 18 34 C18 26 24 20 26 14 C28 18 30 20 32 18 C33 14 32 10 32 6 Z"
      fill="#ff8c42" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M32 30 C35 36 38 38 38 44 C38 50 35 53 32 53 C29 53 26 50 26 44 C26 39 30 36 32 30 Z"
      fill="#ffc52f" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
  </g>
);

const Knife: ArtFn = () => (
  <g>
    <path d="M8 40 C16 24 30 12 46 10 C50 10 52 12 52 16 C50 30 36 44 20 48 C14 49 9 46 8 40 Z"
      fill="#cfd8de" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M16 36 C22 26 32 18 42 15" stroke="#f0f4f6" strokeWidth={3} strokeLinecap="round" />
    <rect x="40" y="38" width="20" height="9" rx="4.5" fill="#6b4226" stroke={INK} strokeWidth={SW} transform="rotate(45 50 42)" />
    <circle cx="49" cy="48" r="1.8" fill="#a87b3e" />
  </g>
);

const Clock: ArtFn = () => (
  <g>
    {/* bells */}
    <path d="M14 12 C10 8 14 4 18 6 M50 12 C54 8 50 4 46 6" stroke={INK} strokeWidth={3} strokeLinecap="round" fill="none" />
    <circle cx="16" cy="11" r="5" fill="#ff5b4d" stroke={INK} strokeWidth={2.5} />
    <circle cx="48" cy="11" r="5" fill="#ff5b4d" stroke={INK} strokeWidth={2.5} />
    {/* body */}
    <circle cx="32" cy="34" r="22" fill="#ffc52f" stroke={INK} strokeWidth={SW} />
    <circle cx="32" cy="34" r="16" fill="#fffdf4" stroke={INK} strokeWidth={2.5} />
    {/* hands */}
    <path d="M32 34 L32 24 M32 34 L40 38" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    <circle cx="32" cy="34" r="2.2" fill="#ff5b4d" stroke={INK} strokeWidth={1.5} />
    {/* feet */}
    <path d="M18 52 L14 58 M46 52 L50 58" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
  </g>
);

const Sleep: ArtFn = () => (
  <g>
    {/* pillow */}
    <rect x="8" y="34" width="48" height="20" rx="9" fill="#c178ff" stroke={INK} strokeWidth={SW} />
    <path d="M14 40 C20 44 44 44 50 40" stroke="#9b4ee0" strokeWidth={2.5} strokeLinecap="round" fill="none" />
    {/* Zzz */}
    <path d="M14 24 H26 L14 12 H26" stroke={INK} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M34 20 H43 L34 11 H43" stroke="#45bdf0" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M48 14 H54 L48 8 H54" stroke="#ffc52f" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const Box: ArtFn = () => (
  <g>
    <rect x="10" y="24" width="44" height="32" rx="4" fill="#e8b25c" stroke={INK} strokeWidth={SW} />
    <path d="M10 24 L6 14 H58 L54 24" fill="#f5cd87" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <line x1="32" y1="14" x2="32" y2="56" stroke={INK} strokeWidth={2.5} />
    <rect x="24" y="34" width="16" height="8" rx="3" fill="#fffdf4" stroke={INK} strokeWidth={2.5} />
  </g>
);

const Check: ArtFn = () => (
  <g>
    <circle cx="32" cy="32" r="25" fill="#58c95f" stroke={INK} strokeWidth={SW} />
    <path d="M19 33 L28 42 L45 23" stroke="#fffdf4" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

const ART_BY_EMOJI: Record<string, ArtFn> = {
  '🔪': Knife,
  '⏱️': Clock,
  '😴': Sleep,
  '📦': Box,
  '✅': Check,
  '🥩': Steak,
  '🥔': Potato,
  '🍲': Pot,
  '🥣': Bowl,
  '🍗': Chicken,
  '🫕': Fondue,
  '🥗': Veggies,
  '🍖': Roast,
  '🎁': Parcel,
  '🍱': Bento,
  '🍚': Rice,
  '🐟': Fish,
  '🍣': SushiRoll,
  '🍽️': Plate,
  '🗑️': Trash,
  '🔥': Flame,
};

interface FoodIconProps {
  emoji: string;
  size?: number;
  className?: string;
}

/* Renders cartoon clip art for known food emojis, falls back to the emoji itself */
export function FoodIcon({ emoji, size = 28, className = '' }: FoodIconProps) {
  const Art = ART_BY_EMOJI[emoji];
  if (!Art) {
    return <span className={`emoji-sticker ${className}`} style={{ fontSize: size * 0.85 }}>{emoji}</span>;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}
      style={{ filter: 'drop-shadow(0 2px 1px rgba(74,41,18,0.25))', flexShrink: 0 }}>
      <Art />
    </svg>
  );
}

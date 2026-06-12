import type { StationId } from '../../types/game';

/* Hand-drawn cartoon appliance illustrations — thick chocolate outlines, flat bright fills */

const INK = '#4a2912';
const SW = 3;

function Grill({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* legs */}
      <path d="M20 44 L14 60 M44 44 L50 60" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
      <circle cx="14" cy="60" r="3" fill="#6b4226" stroke={INK} strokeWidth={2} />
      <circle cx="50" cy="60" r="3" fill="#6b4226" stroke={INK} strokeWidth={2} />
      {/* bowl */}
      <path d="M10 34 H54 C54 46 44 50 32 50 C20 50 10 46 10 34 Z" fill="#3e3a45" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {/* lid */}
      <path d="M10 32 C10 18 20 10 32 10 C44 10 54 18 54 32 Z" fill="#ff5b4d" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {/* lid shine */}
      <path d="M17 26 C18 19 23 15 28 14" stroke="#ffb3ac" strokeWidth={3} strokeLinecap="round" />
      {/* lid handle */}
      <rect x="26" y="4" width="12" height="5" rx="2.5" fill="#ffc52f" stroke={INK} strokeWidth={2.5} />
      {/* grate line */}
      <line x1="10" y1="33" x2="54" y2="33" stroke={INK} strokeWidth={SW} />
      {/* vent + flames peeking */}
      <path d="M24 41 C24 38 26 38 26 36 C28 38 28 39 27 41 Z" fill="#ffc52f" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d="M36 42 C35 39 38 38 38 35 C41 38 40 40 39 42 Z" fill="#ff8c42" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}

function Oven({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* body */}
      <rect x="8" y="10" width="48" height="46" rx="7" fill="#45bdf0" stroke={INK} strokeWidth={SW} />
      {/* control panel */}
      <line x1="8" y1="22" x2="56" y2="22" stroke={INK} strokeWidth={SW} />
      <circle cx="17" cy="16" r="3" fill="#ffc52f" stroke={INK} strokeWidth={2} />
      <circle cx="27" cy="16" r="3" fill="#ff5b4d" stroke={INK} strokeWidth={2} />
      <rect x="38" y="13.5" width="12" height="5" rx="2.5" fill="#fff" stroke={INK} strokeWidth={2} />
      {/* door */}
      <rect x="13" y="27" width="38" height="24" rx="4" fill="#fff6e3" stroke={INK} strokeWidth={SW} />
      {/* door handle */}
      <rect x="16" y="29.5" width="32" height="3.5" rx="1.75" fill="#6b4226" stroke={INK} strokeWidth={1.5} />
      {/* window with pie baking inside */}
      <rect x="18" y="36" width="28" height="12" rx="3" fill="#5a3a22" stroke={INK} strokeWidth={2.5} />
      <path d="M24 46 C24 43 26 42 32 42 C38 42 40 43 40 46 Z" fill="#ffc52f" stroke="#e8a200" strokeWidth={1.5} />
      {/* feet */}
      <rect x="13" y="56" width="8" height="4" rx="2" fill="#6b4226" stroke={INK} strokeWidth={2} />
      <rect x="43" y="56" width="8" height="4" rx="2" fill="#6b4226" stroke={INK} strokeWidth={2} />
    </svg>
  );
}

function Stove({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* cooktop body */}
      <rect x="6" y="38" width="52" height="18" rx="5" fill="#8d9aa5" stroke={INK} strokeWidth={SW} />
      {/* knobs */}
      <circle cx="18" cy="47" r="3.5" fill="#fff" stroke={INK} strokeWidth={2} />
      <circle cx="32" cy="47" r="3.5" fill="#fff" stroke={INK} strokeWidth={2} />
      <circle cx="46" cy="47" r="3.5" fill="#fff" stroke={INK} strokeWidth={2} />
      {/* burner */}
      <rect x="16" y="34" width="32" height="5" rx="2.5" fill="#3e3a45" stroke={INK} strokeWidth={2.5} />
      {/* flames */}
      <path d="M22 33 C21 29 24 28 24 25 C27 28 26 31 25 33 Z" fill="#ff8c42" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d="M39 33 C38 29 41 28 41 25 C44 28 43 31 42 33 Z" fill="#ffc52f" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      {/* frying pan */}
      <ellipse cx="32" cy="22" rx="16" ry="6" fill="#3e3a45" stroke={INK} strokeWidth={SW} />
      <ellipse cx="32" cy="20.5" rx="12" ry="4" fill="#5c5666" />
      {/* egg in pan */}
      <ellipse cx="32" cy="20.5" rx="7" ry="2.8" fill="#fff" />
      <circle cx="32" cy="20" r="2.2" fill="#ffc52f" stroke="#e8a200" strokeWidth={1} />
      {/* pan handle */}
      <rect x="46" y="18" width="14" height="4.5" rx="2.25" fill="#6b4226" stroke={INK} strokeWidth={2.5} />
    </svg>
  );
}

function Prep({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* cutting board */}
      <rect x="6" y="30" width="52" height="22" rx="8" fill="#f0b35e" stroke={INK} strokeWidth={SW} />
      <circle cx="14" cy="41" r="2.5" fill="#d18f33" stroke={INK} strokeWidth={1.5} />
      {/* tomato slices */}
      <circle cx="40" cy="40" r="6.5" fill="#ff5b4d" stroke={INK} strokeWidth={2.5} />
      <circle cx="40" cy="40" r="3" fill="#ffb3ac" stroke="#d93a2e" strokeWidth={1} />
      <circle cx="50" cy="38" r="5" fill="#ff5b4d" stroke={INK} strokeWidth={2.5} />
      {/* cleaver */}
      <path d="M12 12 L34 12 L34 28 L18 28 C13 28 11 24 11 20 Z" fill="#cfd8de" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <rect x="34" y="14" width="18" height="6" rx="3" fill="#6b4226" stroke={INK} strokeWidth={2.5} />
      <circle cx="16" cy="17" r="1.8" fill="#8d9aa5" stroke={INK} strokeWidth={1.5} />
    </svg>
  );
}

function Mixing({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* whisk */}
      <line x1="42" y1="6" x2="34" y2="24" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M34 24 C28 30 28 36 33 38 C38 36 40 30 34 24 Z" fill="#cfd8de" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M34 24 C36 31 36 36 33 38" stroke={INK} strokeWidth={1.5} />
      {/* bowl */}
      <path d="M8 32 H56 C56 48 46 56 32 56 C18 56 8 48 8 32 Z" fill="#c178ff" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {/* batter */}
      <path d="M8 32 H56 C56 35 50 37 44 36 C40 35.5 38 38 32 37 C26 36 24 38 18 37 C13 36 8 35 8 32 Z" fill="#fff6e3" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      {/* bowl stripe */}
      <path d="M12 44 C18 49 26 51 32 51 C38 51 46 49 52 44" stroke="#9b4ee0" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

function Sushi({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* bamboo mat */}
      <rect x="6" y="40" width="52" height="14" rx="4" fill="#8ed081" stroke={INK} strokeWidth={SW} />
      {[14, 22, 30, 38, 46].map(x => (
        <line key={x} x1={x} y1="41.5" x2={x} y2="52.5" stroke="#3da346" strokeWidth={2} />
      ))}
      {/* sushi roll 1 */}
      <circle cx="22" cy="28" r="11" fill="#3e3a45" stroke={INK} strokeWidth={SW} />
      <circle cx="22" cy="28" r="7" fill="#fff" stroke={INK} strokeWidth={2} />
      <circle cx="22" cy="28" r="3" fill="#ff5b4d" stroke={INK} strokeWidth={1.5} />
      {/* sushi roll 2 */}
      <circle cx="44" cy="30" r="9" fill="#3e3a45" stroke={INK} strokeWidth={SW} />
      <circle cx="44" cy="30" r="5.5" fill="#fff" stroke={INK} strokeWidth={2} />
      <circle cx="44" cy="30" r="2.3" fill="#58c95f" stroke={INK} strokeWidth={1.5} />
    </svg>
  );
}

const ART: Record<StationId, (p: { size: number }) => React.JSX.Element> = {
  prep: Prep,
  grill: Grill,
  stove: Stove,
  oven: Oven,
  mixing: Mixing,
  sushi: Sushi,
};

export function StationArt({ id, size = 56 }: { id: StationId; size?: number }) {
  const Art = ART[id];
  return Art ? <Art size={size} /> : null;
}

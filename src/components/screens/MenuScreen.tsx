import { useGameStore } from '../../store/gameStore';
import { RECIPES } from '../../data/recipes';

const STEPS = [
  { icon: '📦', label: 'Add',   desc: 'Click an ingredient button to place it in your inventory' },
  { icon: '🔪', label: 'Cook',  desc: 'Drag it to the correct station — follow the recipe guide' },
  { icon: '⏱️', label: 'Watch', desc: 'Timed stations show a progress bar — drag off before it burns!' },
  { icon: '🍽️', label: 'Serve', desc: 'Once fully cooked, click SERVE on the matching order ticket' },
];

const EXAMPLE = [
  { emoji: '🥩', label: 'Add Ribeye',      station: null },
  { emoji: '🔪', label: 'Season → PREP',   station: 'PREP' },
  { emoji: '🔥', label: 'Grill 8s → GRILL',station: 'GRILL' },
  { emoji: '😴', label: 'Rest 3s → PREP',  station: 'PREP' },
  { emoji: '✅', label: 'SERVE ticket!',   station: null },
];

export function MenuScreen() {
  const startGame = useGameStore(s => s.startGame);

  return (
    <div
      className="h-screen overflow-y-auto flex flex-col items-center justify-start py-12 px-6"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #150828 0%, #07070f 60%)' }}
    >
      {/* Neon top bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50"
        style={{ background: 'linear-gradient(90deg, transparent, #9d4edd, #ff4d8d, #f5c842, #ff4d8d, #9d4edd, transparent)', boxShadow: '0 0 12px rgba(157,78,237,0.6)' }} />

      {/* ── HERO ── */}
      <div className="flex flex-col items-center text-center mb-10">
        <p className="text-[11px] font-semibold tracking-[0.45em] text-zinc-500 uppercase mb-3">
          ♠ Las Vegas · Fine Dining ♦
        </p>
        <h1 className="font-display leading-none mb-1"
          style={{ fontSize: 'clamp(56px, 8vw, 96px)', color: '#f5c842',
            textShadow: '0 0 30px rgba(245,200,66,0.65), 0 0 70px rgba(245,200,66,0.25)' }}>
          CHEF'S TABLE
        </h1>
        <h2 className="font-display leading-none mb-5"
          style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#ff4d8d',
            textShadow: '0 0 18px rgba(255,77,141,0.65)' }}>
          LAS VEGAS
        </h2>
        <p className="text-zinc-400 text-sm font-medium max-w-md leading-relaxed">
          A fast-paced cooking simulator. Drag ingredients through kitchen stations,
          complete recipes, and serve tables before their timers run out.
        </p>
      </div>

      {/* ── HOW TO PLAY ── */}
      <div className="w-full max-w-2xl mb-8">
        <h3 className="font-display text-xl tracking-widest text-center mb-5"
          style={{ color: '#c084fc', textShadow: '0 0 12px rgba(192,132,252,0.4)' }}>
          HOW TO PLAY
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 text-center">
              <span className="text-3xl">{s.icon}</span>
              <span className="font-display text-base tracking-widest text-white">{s.label}</span>
              <span className="text-[11px] text-zinc-400 leading-snug">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXAMPLE WALKTHROUGH ── */}
      <div className="w-full max-w-2xl mb-8">
        <h3 className="font-display text-xl tracking-widest text-center mb-4"
          style={{ color: '#f5c842', textShadow: '0 0 12px rgba(245,200,66,0.4)' }}>
          EXAMPLE — RIBEYE STEAK
        </h3>
        <div className="flex items-center gap-1 justify-center flex-wrap">
          {EXAMPLE.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/70">
                <span className="text-xl">{step.emoji}</span>
                <span className="text-[10px] font-semibold text-zinc-300 text-center leading-tight whitespace-nowrap">
                  {step.label}
                </span>
                {step.station && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">
                    {step.station}
                  </span>
                )}
              </div>
              {i < EXAMPLE.length - 1 && (
                <span className="text-zinc-600 text-lg font-bold">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-zinc-500 mt-3">
          Each recipe has different stations and timings — check the recipe guide at the bottom of the kitchen screen.
        </p>
      </div>

      {/* ── DISHES ── */}
      <div className="w-full max-w-2xl mb-10">
        <h3 className="font-display text-xl tracking-widest text-center mb-4"
          style={{ color: '#ff4d8d', textShadow: '0 0 12px rgba(255,77,141,0.4)' }}>
          ON THE MENU
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {RECIPES.map(r => (
            <div key={r.id}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-zinc-800/70 bg-zinc-900/50">
              <span className="text-3xl">{r.emoji}</span>
              <span className="text-[10px] font-bold text-zinc-300 text-center leading-tight">{r.name}</span>
              <span className="text-[10px] font-black text-yellow-400">+{r.points} pts</span>
              <span className="text-[9px] text-zinc-600">{r.steps.length} steps</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <button onClick={startGame}
        className="px-14 py-4 rounded-2xl font-black text-xl uppercase tracking-widest text-black
          active:scale-95 transition-transform mb-4 relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, #f5c842, #ff9500)',
          boxShadow: '0 0 36px rgba(245,200,66,0.55), 0 0 72px rgba(245,200,66,0.2)',
        }}>
        <span className="relative z-10">🍳 Start Cooking</span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(135deg, #ffe234, #ffaa00)' }} />
      </button>

      <p className="text-zinc-600 text-[11px] font-medium">
        3 minutes per session · Don't burn the food · Score as high as you can!
      </p>

      {/* Corner decor */}
      <div className="fixed bottom-5 left-6 text-2xl opacity-10 pointer-events-none">♣</div>
      <div className="fixed bottom-5 right-6 text-2xl opacity-10 pointer-events-none">♦</div>
    </div>
  );
}

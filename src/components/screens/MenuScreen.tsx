import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { RECIPES } from '../../data/recipes';
import { FoodIcon } from '../game/FoodArt';

const STEPS = [
  { icon: '📦', label: 'Buy',   desc: 'Spend cash to buy an ingredient — serving dishes earns it back with profit!', color: '#ffc52f' },
  { icon: '🔪', label: 'Cook',  desc: 'Drag it to the correct station — follow the recipe guide', color: '#ff5b4d' },
  { icon: '⏱️', label: 'Watch', desc: 'Timed stations show a progress bar — drag off before it burns!', color: '#45bdf0' },
  { icon: '🍽️', label: 'Serve', desc: 'Once fully cooked, click SERVE on the matching order ticket', color: '#58c95f' },
];

const EXAMPLE = [
  { emoji: '🥩', label: 'Add Ribeye',      station: null },
  { emoji: '🔪', label: 'Season → PREP',   station: 'PREP' },
  { emoji: '🔥', label: 'Grill 8s → GRILL',station: 'GRILL' },
  { emoji: '😴', label: 'Rest 3s → PREP',  station: 'PREP' },
  { emoji: '✅', label: 'SERVE ticket!',   station: null },
];

const CLOUDS = [
  { top: '6%',  left: '8%',  size: 90,  dur: '4s' },
  { top: '12%', left: '78%', size: 70,  dur: '5s' },
  { top: '40%', left: '90%', size: 60,  dur: '4.5s' },
  { top: '55%', left: '3%',  size: 80,  dur: '5.5s' },
];

const FLOATING_FOOD = [
  { emoji: '🥩', size: 56, top: '20%', left: '6%',  delay: '0s' },
  { emoji: '🍗', size: 50, top: '58%', left: '5%',  delay: '0.8s' },
  { emoji: '🍣', size: 54, top: '22%', left: '90%', delay: '0.4s' },
  { emoji: '🫕', size: 48, top: '58%', left: '91%', delay: '1.2s' },
  { emoji: '🥔', size: 42, top: '86%', left: '14%', delay: '0.6s' },
  { emoji: '🍖', size: 52, top: '85%', left: '82%', delay: '1.6s' },
];

function Cloud({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size * 0.45 }}>
      <div className="absolute bg-white rounded-full" style={{ width: size * 0.55, height: size * 0.55, left: size * 0.22, top: -size * 0.18 }} />
      <div className="absolute bg-white rounded-full" style={{ width: size * 0.4, height: size * 0.4, left: 0, top: -size * 0.02 }} />
      <div className="absolute bg-white rounded-full" style={{ width: size * 0.42, height: size * 0.42, right: 0, top: -size * 0.04 }} />
      <div className="absolute bg-white rounded-[40px]" style={{ width: size, height: size * 0.35, bottom: 0 }} />
    </div>
  );
}

function SkyBackdrop() {
  return (
    <>
      {CLOUDS.map((c, i) => (
        <div key={i} className="fixed pointer-events-none opacity-90 z-0" style={{ top: c.top, left: c.left, animation: `marquee-bob ${c.dur} ease-in-out infinite` }}>
          <Cloud size={c.size} />
        </div>
      ))}
      <div className="fixed top-8 right-10 pointer-events-none animate-flicker z-0">
        <div className="w-20 h-20 rounded-full"
          style={{ background: '#ffd84d', border: '3px solid var(--ink)', boxShadow: '0 0 0 10px rgba(255,216,77,0.35)' }} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-4 pointer-events-none z-0"
        style={{ background: 'var(--leaf)', borderTop: '3px solid var(--ink)' }} />
    </>
  );
}

/* ── SCREEN 1: HOME ── */
function HomeScreen({ onPlay }: { onPlay: () => void }) {
  const highScore = useGameStore(s => s.highScore);

  return (
    <div className="animate-slide-in min-h-full flex flex-col items-center justify-center relative z-10 px-6 py-12">
      {/* Floating food clip art — edges only, hidden on narrow screens so it never covers the title */}
      {FLOATING_FOOD.map((f, i) => (
        <div key={i} className="fixed pointer-events-none animate-float opacity-80 hidden md:block"
          style={{ top: f.top, left: f.left, animationDelay: f.delay }}>
          <FoodIcon emoji={f.emoji} size={f.size} />
        </div>
      ))}

      <div className="toon-panel animate-swing px-5 py-1.5 mb-6 font-display text-sm tracking-widest"
        style={{ background: 'var(--tomato)', color: '#fff', transform: 'rotate(-2deg)' }}>
        ⭐ LAS VEGAS · FINE DINING ⭐
      </div>

      <h1 className="font-display toon-text-lg leading-none mb-2 animate-bounce-y text-center"
        style={{ fontSize: 'clamp(64px, 10vw, 130px)', color: '#ffc52f',
          textShadow: '0 6px 0 var(--ink), 0 11px 0 rgba(74,41,18,0.25)' }}>
        CHEF'S TABLE
      </h1>
      <h2 className="font-display toon-text leading-none mb-8"
        style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', color: '#ff5b4d',
          textShadow: '0 4px 0 var(--ink)', transform: 'rotate(-1.5deg)' }}>
        LAS VEGAS
      </h2>

      <button onClick={onPlay}
        className="toon-btn font-display text-2xl px-10 py-1.5 rounded-2xl text-white mb-6 animate-glow-pulse"
        style={{
          background: 'linear-gradient(180deg, #ffce4d 0%, #ffb01f 100%)',
          boxShadow: '0 6px 0 var(--ink)',
          textShadow: '0 2px 0 var(--ink)', WebkitTextStroke: '1px var(--ink)', paintOrder: 'stroke fill',
        }}>
        ▶ PLAY!
      </button>

      {highScore > 0 && (
        <div className="toon-panel flex items-center gap-2 px-5 py-1.5 bg-white" style={{ borderRadius: 999 }}>
          <span className="text-lg">🏆</span>
          <span className="font-display text-sm" style={{ color: 'var(--ink-soft)' }}>BEST:</span>
          <span className="font-display text-xl" style={{ color: 'var(--berry-deep)' }}>{highScore.toLocaleString()}</span>
        </div>
      )}

      <p className="font-bold text-xs mt-12" style={{ color: 'var(--ink-soft)' }}>
        A fast-paced cooking game — serve tables before their timers run out! 👨‍🍳
      </p>
    </div>
  );
}

/* ── SCREEN 2: HOW TO PLAY ── */
function HowToPlayScreen({ onStart, onBack }: { onStart: () => void; onBack: () => void }) {
  return (
    <div className="animate-slide-in min-h-full flex flex-col items-center justify-start pt-20 pb-14 px-6 relative z-10">
      {/* Back button */}
      <button onClick={onBack}
        className="toon-btn fixed top-5 left-5 z-30 font-display text-base px-4 py-2 rounded-xl text-white"
        style={{ background: 'var(--ocean)', boxShadow: '0 4px 0 var(--ink)', textShadow: '0 1px 0 var(--ink)' }}>
        ◀ BACK
      </button>

      <h2 className="font-display toon-text text-5xl mb-8 animate-bounce-y text-center"
        style={{ color: '#fff', textShadow: '0 4px 0 var(--ink)' }}>
        HOW TO PLAY
      </h2>

      {/* Steps */}
      <div className="w-full max-w-2xl mb-9">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={i}
              className="toon-panel flex flex-col items-center gap-2 p-4 text-center bg-white"
              style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}>
              <span className="w-16 h-16 flex items-center justify-center rounded-full"
                style={{ background: s.color, border: '3px solid var(--ink)' }}>
                <FoodIcon emoji={s.icon} size={40} />
              </span>
              <span className="font-display text-xl" style={{ color: 'var(--ink)' }}>{s.label}</span>
              <span className="text-xs font-semibold leading-snug" style={{ color: 'var(--ink-soft)' }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Example walkthrough */}
      <div className="w-full max-w-2xl mb-9">
        <h3 className="font-display toon-text text-2xl text-center mb-4" style={{ color: '#ffc52f', textShadow: '0 3px 0 var(--ink)' }}>
          EXAMPLE — RIBEYE STEAK
        </h3>
        <div className="flex items-center gap-1.5 justify-center flex-wrap">
          {EXAMPLE.map((step, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="toon-panel flex flex-col items-center gap-1 px-3 py-2 bg-white"
                style={{ transform: `rotate(${(i % 3) - 1}deg)`, borderRadius: 14 }}>
                <FoodIcon emoji={step.emoji} size={30} />
                <span className="text-[10px] font-bold text-center leading-tight whitespace-nowrap" style={{ color: 'var(--ink)' }}>
                  {step.label}
                </span>
                {step.station && (
                  <span className="font-display text-[9px] px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--berry)', border: '2px solid var(--ink)' }}>
                    {step.station}
                  </span>
                )}
              </div>
              {i < EXAMPLE.length - 1 && (
                <span className="font-display text-2xl" style={{ color: 'var(--ink)' }}>➜</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-bold mt-3" style={{ color: 'var(--ink-soft)' }}>
          Each recipe has different stations and timings — check the recipe guide at the bottom of the kitchen!
        </p>
      </div>

      {/* Dishes */}
      <div className="w-full max-w-2xl mb-10">
        <h3 className="font-display toon-text text-2xl text-center mb-4" style={{ color: '#ff5b4d', textShadow: '0 3px 0 var(--ink)' }}>
          ON THE MENU
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {RECIPES.map((r, i) => (
            <div key={r.id}
              className="toon-panel flex flex-col items-center gap-1.5 p-3 bg-white"
              style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}>
              <FoodIcon emoji={r.emoji} size={40} />
              <span className="text-[10px] font-extrabold text-center leading-tight" style={{ color: 'var(--ink)' }}>{r.name}</span>
              <span className="font-display text-[11px] px-2 py-0.5 rounded-full text-white"
                style={{ background: 'var(--leaf)', border: '2px solid var(--ink)' }}>+{r.points}</span>
              <span className="text-[9px] font-bold" style={{ color: 'var(--ink-soft)' }}>{r.steps.length} steps</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button onClick={onStart}
        className="toon-btn font-display text-2xl px-10 py-1.5 rounded-2xl text-white mb-5 animate-glow-pulse"
        style={{
          background: 'linear-gradient(180deg, #6fd876 0%, #3da346 100%)',
          boxShadow: '0 6px 0 var(--ink)',
          textShadow: '0 2px 0 var(--ink)', WebkitTextStroke: '1px var(--ink)', paintOrder: 'stroke fill',
        }}>
        🍳 START COOKING!
      </button>

      <p className="font-bold text-xs mt-8 pb-4" style={{ color: 'var(--ink-soft)' }}>
        3 minutes per session · Don't burn the food · Score as high as you can!
      </p>
    </div>
  );
}

/* ── MENU FLOW: home → how to play → game ── */
export function MenuScreen() {
  const startGame = useGameStore(s => s.startGame);
  const [step, setStep] = useState<'home' | 'howto'>('home');

  return (
    <div
      className="h-screen overflow-y-auto relative"
      style={{ background: 'linear-gradient(180deg, #8edff5 0%, #aee9f7 45%, #fff0c9 100%)' }}
    >
      <SkyBackdrop />
      {step === 'home'
        ? <HomeScreen onPlay={() => setStep('howto')} />
        : <HowToPlayScreen onStart={startGame} onBack={() => setStep('home')} />
      }
    </div>
  );
}

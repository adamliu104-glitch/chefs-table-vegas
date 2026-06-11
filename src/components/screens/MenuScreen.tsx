import { SplineScene } from '../SplineScene';
import { useGameStore } from '../../store/gameStore';
import { RECIPES } from '../../data/recipes';

// Replace with your Spline chef scene URL from spline.design
const CHEF_SCENE_URL = 'https://prod.spline.design/your-scene-id/scene.splinecode';

export function MenuScreen() {
  const startGame = useGameStore(s => s.startGame);

  return (
    <div className="relative flex h-screen overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 40% 50%, #12032a 0%, #07070f 55%, #000 100%)' }}>

      {/* Left panel — title & CTA */}
      <div className="relative flex flex-col justify-center px-16 py-12 z-10 w-[48%] shrink-0">
        {/* Neon vertical accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px opacity-60"
          style={{ background: 'linear-gradient(180deg, transparent, #9d4edd, #ff4d8d, #f5c842, transparent)', boxShadow: '0 0 12px rgba(157,78,237,0.5)' }} />

        <div className="mb-2">
          <span className="text-[11px] font-semibold tracking-[0.4em] text-zinc-500 uppercase">
            ♠ Las Vegas · Fine Dining ♦
          </span>
        </div>

        <h1 className="font-display leading-none mb-1"
          style={{ fontSize: 'clamp(52px, 6vw, 82px)', color: '#f5c842',
            textShadow: '0 0 30px rgba(245,200,66,0.7), 0 0 60px rgba(245,200,66,0.3)' }}>
          CHEF'S TABLE
        </h1>
        <h2 className="font-display leading-none mb-8"
          style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#ff4d8d',
            textShadow: '0 0 20px rgba(255,77,141,0.7), 0 0 40px rgba(255,77,141,0.3)' }}>
          LAS VEGAS
        </h2>

        <p className="text-zinc-400 text-sm font-medium mb-10 max-w-sm leading-relaxed">
          Drag ingredients between stations to cook, grill, mix, and plate world-class dishes.
          Serve before the timer runs out to earn big points.
        </p>

        {/* Dish showcase */}
        <div className="grid grid-cols-3 gap-2 mb-10">
          {RECIPES.map(r => (
            <div key={r.id}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm">
              <span className="text-2xl">{r.emoji}</span>
              <span className="text-[10px] font-semibold text-zinc-400 text-center leading-tight">{r.name}</span>
              <span className="text-[10px] font-black text-yellow-400">+{r.points}</span>
            </div>
          ))}
        </div>

        <button onClick={startGame}
          className="relative w-fit px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-widest text-black
            active:scale-95 transition-transform overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #f5c842, #ff9500)',
            boxShadow: '0 0 32px rgba(245,200,66,0.5), 0 0 64px rgba(245,200,66,0.2)',
          }}>
          <span className="relative z-10">🍳 Start Cooking</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #ffe234, #ffaa00)' }} />
        </button>

        <p className="mt-4 text-zinc-600 text-xs font-medium">
          Drag & drop · 3 minutes per level · Don't burn the food!
        </p>
      </div>

      {/* Right panel — Spline chef */}
      <div className="flex-1 relative">
        {/* Gradient overlay left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(90deg, #07070f, transparent)' }} />

        <SplineScene
          scene={CHEF_SCENE_URL}
          className="w-full h-full"
        />

        {/* Fallback decorative chef if Spline doesn't load */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[180px] animate-float opacity-20 select-none">👨‍🍳</div>
        </div>
      </div>

      {/* Corner casino decorations */}
      <div className="absolute top-6 right-6 text-4xl opacity-10 animate-[spin_12s_linear_infinite]">🎰</div>
      <div className="absolute bottom-6 left-6 text-3xl opacity-10">♣</div>
    </div>
  );
}

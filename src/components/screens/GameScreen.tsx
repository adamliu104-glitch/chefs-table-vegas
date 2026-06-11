import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { HUD } from '../game/HUD';
import { Kitchen } from '../game/Kitchen';
import { TicketRail } from '../game/TicketRail';
import { RECIPE_MAP } from '../../data/recipes';

export function GameScreen() {
  const { phase, orders, workItems, tick, serveOrder } = useGameStore();
  const lastTime = useRef(performance.now());
  const rafRef = useRef(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (phase === 'playing') {
        tick(now - lastTime.current);
      } else {
        // Reset lastTime while paused so no huge delta on resume
        lastTime.current = now;
      }
      lastTime.current = now;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, phase]);

  const servableRecipeIds = new Set(
    workItems
      .filter(w => {
        const recipe = RECIPE_MAP[w.recipeId];
        return recipe && w.stepIndex >= recipe.steps.length && !w.isProcessing && !w.isBurnt;
      })
      .map(w => w.recipeId)
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#07070f' }}>
      <HUD />
      <TicketRail orders={orders} servableRecipeIds={servableRecipeIds} onServe={serveOrder} />

      {/* Pause overlay */}
      {phase === 'paused' && <PauseOverlay />}

      <Kitchen />
    </div>
  );
}

function PauseOverlay() {
  const { resumeGame, goToMenu } = useGameStore();
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(7,7,15,0.88)', backdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col items-center gap-6 animate-pop-in">
        <div className="text-6xl">⏸</div>
        <h2 className="font-display text-5xl tracking-widest"
          style={{ color: '#f5c842', textShadow: '0 0 24px rgba(245,200,66,0.6)' }}>
          PAUSED
        </h2>
        <p className="text-zinc-400 text-sm font-medium">Kitchen is on hold — your timers are frozen</p>
        <div className="flex gap-4 mt-2">
          <button onClick={resumeGame}
            className="px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest text-black active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg,#f5c842,#ff9500)', boxShadow: '0 0 24px rgba(245,200,66,0.4)' }}>
            ▶ Resume
          </button>
          <button onClick={goToMenu}
            className="px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest text-zinc-300 border border-zinc-700 bg-zinc-900 hover:border-zinc-500 active:scale-95 transition-all">
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}

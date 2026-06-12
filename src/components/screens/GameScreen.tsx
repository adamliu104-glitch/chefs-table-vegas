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
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--sky)' }}>
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
      style={{ background: 'rgba(74,41,18,0.55)', backdropFilter: 'blur(5px)' }}>
      <div className="toon-panel flex flex-col items-center gap-5 animate-pop-in px-12 py-10"
        style={{ background: 'var(--cream)', boxShadow: '0 8px 0 rgba(74,41,18,0.45)' }}>
        <div className="text-6xl animate-wobble">⏸️</div>
        <h2 className="font-display toon-text text-5xl"
          style={{ color: 'var(--sunny)', textShadow: '0 4px 0 var(--ink)' }}>
          PAUSED!
        </h2>
        <p className="font-bold text-sm" style={{ color: 'var(--ink-soft)' }}>
          Kitchen is on hold — your timers are frozen ❄️
        </p>
        <div className="flex gap-4 mt-2">
          <button onClick={resumeGame}
            className="toon-btn font-display text-xl px-10 py-3 rounded-2xl text-white"
            style={{ background: 'var(--leaf)', boxShadow: '0 5px 0 var(--ink)', textShadow: '0 2px 0 var(--ink)' }}>
            ▶ RESUME
          </button>
          <button onClick={goToMenu}
            className="toon-btn font-display text-xl px-10 py-3 rounded-2xl text-white"
            style={{ background: 'var(--ocean)', boxShadow: '0 5px 0 var(--ink)', textShadow: '0 2px 0 var(--ink)' }}>
            MENU
          </button>
        </div>
      </div>
    </div>
  );
}

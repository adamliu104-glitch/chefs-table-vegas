import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { HUD } from '../game/HUD';
import { Kitchen } from '../game/Kitchen';
import { TicketRail } from '../game/TicketRail';
import { RECIPE_MAP } from '../../data/recipes';

export function GameScreen() {
  const { score, gameTimeLeft, level, orders, workItems, tick, serveOrder } = useGameStore();
  const lastTime = useRef(performance.now());
  const rafRef = useRef(0);

  useEffect(() => {
    const loop = (now: number) => {
      tick(now - lastTime.current);
      lastTime.current = now;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const plateRecipeIds = [
    ...new Set(
      workItems
        .filter(w => w.onPlate && w.stepIndex >= (RECIPE_MAP[w.recipeId]?.steps.length ?? 999))
        .map(w => w.recipeId)
    ),
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#07070f' }}>
      <HUD score={score} gameTimeLeft={gameTimeLeft} level={level} />
      <TicketRail orders={orders} plateRecipeIds={plateRecipeIds} onServe={serveOrder} />
      <Kitchen />
    </div>
  );
}

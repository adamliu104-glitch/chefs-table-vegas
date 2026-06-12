import { useGameStore } from '../../store/gameStore';

export function HUD() {
  const { score, money, gameTimeLeft, level, levelUpNotif, phase, flash, pauseGame, resumeGame, endGame } = useGameStore();
  const moneyError = flash?.id === 'money' && flash.type === 'error';

  const mins = Math.floor(gameTimeLeft / 60);
  const secs = Math.floor(gameTimeLeft % 60);
  const isLow = gameTimeLeft < 30;
  const isPaused = phase === 'paused';

  const LEVEL_LABELS: Record<number, string> = { 1: 'PREP COOK', 2: 'SOUS CHEF', 3: 'HEAD CHEF' };

  return (
    <div className="relative flex items-center justify-between px-5 py-2 shrink-0"
      style={{
        background: 'linear-gradient(180deg, var(--wood) 0%, var(--wood-deep) 100%)',
        borderBottom: '3px solid var(--ink)',
      }}>

      {/* Level-up notification */}
      {levelUpNotif && (
        <div className="absolute inset-x-0 top-full mt-2 flex items-center justify-center pointer-events-none z-30">
          <div className="animate-pop-in toon-panel px-7 py-2.5 font-display text-2xl text-white"
            style={{ background: 'var(--berry)', textShadow: '0 2px 0 var(--ink)' }}>
            ⬆ LEVEL {level} — {LEVEL_LABELS[level] ?? 'MASTER'}!
          </div>
        </div>
      )}

      {/* Left: title */}
      <div className="flex items-center gap-2">
        <span className="font-display text-xl hidden sm:block toon-text"
          style={{ color: '#fff', textShadow: '0 2px 0 var(--ink)' }}>
          CHEF'S TABLE
        </span>
      </div>

      {/* Center: score | timer | level */}
      <div className="flex items-center gap-3">
        <div className="toon-panel flex flex-col items-center px-4 py-1 bg-white" style={{ transform: 'rotate(-1.5deg)', borderRadius: 14 }}>
          <span className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>Score</span>
          <span className="font-display text-xl leading-none" style={{ color: 'var(--sunny-deep)' }}>
            {score.toLocaleString()}
          </span>
        </div>

        <div className={`toon-panel flex flex-col items-center px-4 py-1 ${moneyError ? 'animate-shake' : ''}`}
          style={{ background: moneyError ? '#ffd9d4' : '#fff', borderRadius: 14 }}>
          <span className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>Cash</span>
          <span className="font-display text-xl leading-none" style={{ color: moneyError ? 'var(--tomato-deep)' : 'var(--leaf-deep)' }}>
            ${money.toLocaleString()}
          </span>
        </div>

        <div className={`toon-panel flex flex-col items-center px-4 py-1 ${isLow ? 'animate-urgent' : ''}`}
          style={{ background: isLow ? 'var(--tomato)' : '#fff', borderRadius: 14 }}>
          <span className="text-[9px] font-extrabold uppercase tracking-wider"
            style={{ color: isLow ? '#fff' : 'var(--ink-soft)' }}>Time</span>
          <span className="font-display text-2xl leading-none tabular-nums"
            style={{ color: isLow ? '#fff' : 'var(--ink)' }}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="toon-panel flex flex-col items-center px-4 py-1 bg-white" style={{ transform: 'rotate(1.5deg)', borderRadius: 14 }}>
          <span className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>Level {level}</span>
          <span className="font-display text-sm leading-tight" style={{ color: 'var(--berry-deep)' }}>
            {LEVEL_LABELS[level] ?? 'MASTER'}
          </span>
        </div>
      </div>

      {/* Right: pause + quit */}
      <div className="flex items-center gap-2">
        <button
          onClick={isPaused ? resumeGame : pauseGame}
          className="toon-btn font-display text-sm px-4 py-1.5 rounded-xl text-white"
          style={{
            background: isPaused ? 'var(--leaf)' : 'var(--ocean)',
            boxShadow: '0 4px 0 var(--ink)',
            textShadow: '0 1px 0 var(--ink)',
          }}>
          {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
        </button>

        <button
          onClick={endGame}
          className="toon-btn font-display text-sm px-4 py-1.5 rounded-xl text-white"
          style={{ background: 'var(--tomato)', boxShadow: '0 4px 0 var(--ink)', textShadow: '0 1px 0 var(--ink)' }}>
          QUIT
        </button>
      </div>
    </div>
  );
}

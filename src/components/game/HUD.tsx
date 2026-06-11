import { useGameStore } from '../../store/gameStore';

export function HUD() {
  const { score, gameTimeLeft, level, levelUpNotif, phase, pauseGame, resumeGame, endGame } = useGameStore();

  const mins = Math.floor(gameTimeLeft / 60);
  const secs = Math.floor(gameTimeLeft % 60);
  const isLow = gameTimeLeft < 30;
  const isPaused = phase === 'paused';

  const LEVEL_LABELS: Record<number, string> = { 1: 'PREP COOK', 2: 'SOUS CHEF', 3: 'HEAD CHEF' };

  return (
    <div className="relative flex items-center justify-between px-5 py-2.5 bg-black/80 border-b border-zinc-800/80 backdrop-blur-sm shrink-0">

      {/* Level-up notification */}
      {levelUpNotif && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="animate-pop-in px-6 py-2 rounded-2xl border font-display text-2xl tracking-widest"
            style={{ background: 'rgba(157,78,237,0.2)', borderColor: '#9d4edd', color: '#c084fc',
              boxShadow: '0 0 30px rgba(157,78,237,0.5)' }}>
            ⬆ LEVEL {level} — {LEVEL_LABELS[level] ?? 'MASTER'}
          </div>
        </div>
      )}

      {/* Left: title */}
      <div className="flex items-center gap-2">
        <span className="text-base">🍴</span>
        <span className="font-display text-lg tracking-widest hidden sm:block"
          style={{ color: '#f5c842', textShadow: '0 0 10px rgba(245,200,66,0.5)' }}>
          CHEF'S TABLE
        </span>
      </div>

      {/* Center: score | timer | level */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest">Score</span>
          <span className="font-display text-2xl leading-none"
            style={{ color: '#f5c842', textShadow: '0 0 8px rgba(245,200,66,0.5)' }}>
            {score.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest">Time</span>
          <span className={`font-display text-3xl leading-none tabular-nums ${isLow ? 'animate-urgent' : ''}`}
            style={{
              color: isLow ? '#f87171' : '#fff',
              textShadow: isLow ? '0 0 12px rgba(248,113,113,0.7)' : '0 0 6px rgba(255,255,255,0.2)',
            }}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest">Level</span>
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl leading-none"
              style={{ color: '#c084fc', textShadow: '0 0 8px rgba(192,132,252,0.5)' }}>
              {level}
            </span>
            <span className="text-[8px] font-bold text-purple-400 tracking-wide">{LEVEL_LABELS[level] ?? 'MASTER'}</span>
          </div>
        </div>
      </div>

      {/* Right: pause + quit */}
      <div className="flex items-center gap-2">
        <button
          onClick={isPaused ? resumeGame : pauseGame}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
          style={{
            borderColor: isPaused ? '#f5c842' : '#3f3f5a',
            color: isPaused ? '#f5c842' : '#a0a0c0',
            background: isPaused ? 'rgba(245,200,66,0.1)' : 'rgba(255,255,255,0.04)',
            boxShadow: isPaused ? '0 0 12px rgba(245,200,66,0.3)' : 'none',
          }}>
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>

        <button
          onClick={endGame}
          className="px-3 py-1.5 rounded-xl border border-zinc-700/60 text-zinc-500 font-bold text-xs uppercase tracking-wider hover:border-red-800 hover:text-red-400 transition-all active:scale-95">
          Quit
        </button>
      </div>
    </div>
  );
}

interface Props { score: number; gameTimeLeft: number; level: number; }

export function HUD({ score, gameTimeLeft, level }: Props) {
  const mins = Math.floor(gameTimeLeft / 60);
  const secs = Math.floor(gameTimeLeft % 60);
  const isLow = gameTimeLeft < 30;

  return (
    <div className="flex items-center justify-between px-6 py-2.5 bg-black/70 border-b border-zinc-800/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg">🍴</span>
        <span className="font-display text-xl tracking-widest"
          style={{ color: '#f5c842', textShadow: '0 0 12px rgba(245,200,66,0.6)' }}>
          CHEF'S TABLE
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest">Score</span>
          <span className="font-display text-2xl leading-none"
            style={{ color: '#f5c842', textShadow: '0 0 8px rgba(245,200,66,0.5)' }}>
            {score.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest">Time</span>
          <span className={`font-display text-3xl leading-none tabular-nums transition-colors ${
            isLow ? 'animate-urgent' : ''}`}
            style={{
              color: isLow ? '#f87171' : '#ffffff',
              textShadow: isLow ? '0 0 12px rgba(248,113,113,0.7)' : '0 0 6px rgba(255,255,255,0.2)',
            }}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-widest">Level</span>
          <span className="font-display text-2xl leading-none"
            style={{ color: '#c084fc', textShadow: '0 0 8px rgba(192,132,252,0.5)' }}>
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}

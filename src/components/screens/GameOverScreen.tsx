import { useGameStore } from '../../store/gameStore';

export function GameOverScreen() {
  const { score, highScore, startGame, goToMenu } = useGameStore();
  const isNewHigh = score > 0 && score >= highScore;

  return (
    <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a0010 0%, #07070f 55%, #000 100%)' }}>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.1), transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(157,78,237,0.1), transparent)' }} />

      {isNewHigh && (
        <div className="mb-6 flex flex-col items-center animate-pop-in">
          <span className="text-5xl mb-2">🏆</span>
          <p className="font-display text-xl tracking-widest"
            style={{ color: '#f5c842', textShadow: '0 0 20px rgba(245,200,66,0.7)' }}>
            NEW HIGH SCORE!
          </p>
        </div>
      )}

      <h1 className="font-display mb-1"
        style={{ fontSize: 'clamp(48px, 7vw, 80px)', color: '#ff4d8d',
          textShadow: '0 0 24px rgba(255,77,141,0.7), 0 0 48px rgba(255,77,141,0.3)' }}>
        KITCHEN CLOSED
      </h1>
      <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mb-10">
        Service Ended — Great Work, Chef
      </p>

      <div className="flex flex-col items-center mb-2">
        <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mb-1">Final Score</span>
        <span className="font-display leading-none"
          style={{ fontSize: 'clamp(64px, 9vw, 100px)', color: '#f5c842',
            textShadow: '0 0 32px rgba(245,200,66,0.7), 0 0 64px rgba(245,200,66,0.3)' }}>
          {score.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-12">
        <span className="text-zinc-600 text-xs font-semibold uppercase tracking-widest">Best:</span>
        <span className="text-zinc-300 font-black text-xl">{highScore.toLocaleString()}</span>
      </div>

      <div className="flex gap-4">
        <button onClick={startGame}
          className="px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest text-black
            active:scale-95 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #f5c842, #ff9500)',
            boxShadow: '0 0 24px rgba(245,200,66,0.4)',
          }}>
          🍳 Play Again
        </button>
        <button onClick={goToMenu}
          className="px-10 py-3.5 rounded-2xl font-black text-base uppercase tracking-widest text-zinc-300
            border border-zinc-700 bg-zinc-900 hover:border-zinc-500 active:scale-95 transition-all">
          Menu
        </button>
      </div>
    </div>
  );
}

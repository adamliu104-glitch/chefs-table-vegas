import { useGameStore } from '../../store/gameStore';

const CONFETTI = ['🎉', '⭐', '🍳', '🎊', '🏆', '🍔', '⭐', '🎉'];

export function GameOverScreen() {
  const { score, highScore, money, startGame, goToMenu } = useGameStore();
  const isNewHigh = score > 0 && score >= highScore;

  return (
    <div className="flex flex-col items-center h-screen relative overflow-y-auto py-10 px-6"
      style={{ background: 'linear-gradient(180deg, #8edff5 0%, #ffe9b3 100%)' }}>

      {/* Floating confetti */}
      {CONFETTI.map((c, i) => (
        <span key={i} className="absolute text-3xl animate-float pointer-events-none"
          style={{
            top: `${10 + (i * 11) % 70}%`,
            left: `${5 + (i * 13) % 90}%`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.7,
          }}>
          {c}
        </span>
      ))}

      <div className="toon-panel flex flex-col items-center px-14 py-10 my-auto animate-pop-in relative z-10"
        style={{ background: 'var(--cream)', boxShadow: '0 8px 0 rgba(74,41,18,0.4)' }}>

        {isNewHigh && (
          <div className="mb-5 flex flex-col items-center">
            <span className="text-6xl mb-2 animate-bounce-y">🏆</span>
            <p className="font-display toon-text text-2xl animate-urgent"
              style={{ color: 'var(--sunny)', textShadow: '0 3px 0 var(--ink)' }}>
              NEW HIGH SCORE!
            </p>
          </div>
        )}

        <h1 className="font-display toon-text-lg mb-1"
          style={{ fontSize: 'clamp(44px, 6vw, 72px)', color: 'var(--tomato)',
            textShadow: '0 5px 0 var(--ink)' }}>
          KITCHEN CLOSED!
        </h1>
        <p className="font-bold text-sm uppercase tracking-wider mb-8" style={{ color: 'var(--ink-soft)' }}>
          Service Ended — Great Work, Chef! 👨‍🍳
        </p>

        <div className="flex flex-col items-center mb-3">
          <span className="font-display text-sm uppercase mb-1" style={{ color: 'var(--ink-soft)' }}>Final Score</span>
          <span className="font-display toon-text-lg leading-none"
            style={{ fontSize: 'clamp(56px, 8vw, 90px)', color: 'var(--sunny)',
              textShadow: '0 5px 0 var(--ink)' }}>
            {score.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <div className="toon-panel flex items-center gap-2 px-4 py-1.5 bg-white" style={{ borderRadius: 999 }}>
            <span className="font-display text-xs uppercase" style={{ color: 'var(--ink-soft)' }}>Best:</span>
            <span className="font-display text-xl" style={{ color: 'var(--berry-deep)' }}>{highScore.toLocaleString()}</span>
          </div>
          <div className="toon-panel flex items-center gap-2 px-4 py-1.5 bg-white" style={{ borderRadius: 999 }}>
            <span className="font-display text-xs uppercase" style={{ color: 'var(--ink-soft)' }}>Cash:</span>
            <span className="font-display text-xl" style={{ color: 'var(--leaf-deep)' }}>${money.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={startGame}
            className="toon-btn font-display text-xl px-10 py-3 rounded-2xl text-white"
            style={{ background: 'var(--leaf)', boxShadow: '0 5px 0 var(--ink)', textShadow: '0 2px 0 var(--ink)' }}>
            🍳 PLAY AGAIN!
          </button>
          <button onClick={goToMenu}
            className="toon-btn font-display text-xl px-10 py-3 rounded-2xl text-white"
            style={{ background: 'var(--ocean)', boxShadow: '0 5px 0 var(--ink)', textShadow: '0 2px 0 var(--ink)' }}>
            MENU
          </button>
        </div>
      </div>

      {/* Grass strip */}
      <div className="fixed bottom-0 left-0 right-0 h-4 pointer-events-none z-0"
        style={{ background: 'var(--leaf)', borderTop: '3px solid var(--ink)' }} />
    </div>
  );
}

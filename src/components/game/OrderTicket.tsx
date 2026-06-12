import type { Order } from '../../types/game';
import { FoodIcon } from './FoodArt';

interface Props {
  order: Order;
  canServe: boolean;
  onServe: (id: string) => void;
}

export function OrderTicket({ order, canServe, onServe }: Props) {
  const pct = (order.timeRemaining / order.timeLimit) * 100;
  const urgent = pct < 35;
  const critical = pct < 15;
  const done = order.status === 'completed';

  let paperBg = 'var(--paper)';
  if (done) paperBg = '#d8f5d9';
  else if (critical) paperBg = '#ffd9d4';
  else if (urgent) paperBg = '#ffeccc';

  return (
    <div
      className={`relative flex flex-col gap-1.5 px-3 pt-3.5 pb-2.5 min-w-[132px] max-w-[150px] flex-shrink-0
        ${!done ? 'animate-swing' : ''} ${critical && !done ? 'animate-urgent' : ''}`}
      style={{
        background: paperBg,
        border: '3px solid var(--ink)',
        borderRadius: '6px 6px 16px 16px',
        boxShadow: '0 5px 0 rgba(74,41,18,0.3)',
        opacity: done ? 0.65 : 1,
        transition: 'background 0.3s',
      }}
    >
      {/* Clothespin clip */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-4 h-5 rounded-[4px] z-10"
        style={{ background: 'var(--wood)', border: '2.5px solid var(--ink)' }} />

      <div className="flex items-start gap-2">
        <FoodIcon emoji={order.emoji} size={30} />
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-extrabold leading-tight" style={{ color: 'var(--ink)' }}>{order.recipeName}</span>
          <span className="font-display text-[11px]" style={{ color: critical && !done ? 'var(--tomato-deep)' : 'var(--leaf-deep)' }}>
            +{order.points} pts
          </span>
        </div>
      </div>

      {/* Step chain */}
      <div className="flex flex-wrap gap-1">
        {order.steps.map((step, i) => (
          <span key={i}
            className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full"
            style={{ background: '#fff', border: '2px solid var(--ink-soft)', color: 'var(--ink-soft)' }}>
            {step.action}
          </span>
        ))}
        <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded-full text-white"
          style={{ background: 'var(--sunny-deep)', border: '2px solid var(--ink)' }}>
          Plate
        </span>
      </div>

      {/* Timer bar */}
      {!done && (
        <div className="w-full h-2.5 rounded-full overflow-hidden"
          style={{ background: '#fff', border: '2px solid var(--ink)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: critical ? 'var(--tomato)' : urgent ? 'var(--sunny)' : 'var(--leaf)',
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        {!done ? (
          <span className="font-display text-xs tabular-nums" style={{ color: critical ? 'var(--tomato-deep)' : 'var(--ink-soft)' }}>
            {Math.ceil(order.timeRemaining)}s
          </span>
        ) : (
          <span className="font-display text-xs" style={{ color: 'var(--leaf-deep)' }}>✓ SERVED!</span>
        )}
      </div>

      {canServe && !done && (
        <button
          onClick={() => onServe(order.id)}
          className="toon-btn animate-glow-pulse mt-0.5 w-full py-1 rounded-lg font-display text-[11px] text-white"
          style={{ background: 'var(--leaf)', boxShadow: '0 3px 0 var(--ink)', textShadow: '0 1px 0 var(--ink)' }}
        >
          SERVE NOW!
        </button>
      )}
    </div>
  );
}

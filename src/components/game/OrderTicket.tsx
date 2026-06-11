import type { Order } from '../../types/game';

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

  return (
    <div
      className={`
        relative flex flex-col gap-2 rounded-b-2xl border-2 border-t-0 px-3 pt-3 pb-2.5
        min-w-[130px] max-w-[148px] flex-shrink-0 transition-all duration-300
        ${done        ? 'border-emerald-500/70 bg-emerald-950/50 opacity-60' : ''}
        ${critical && !done ? 'border-red-500 bg-red-950/40 animate-urgent' : ''}
        ${urgent && !critical && !done ? 'border-orange-400/80 bg-orange-950/30' : ''}
        ${!urgent && !done ? 'border-purple-500/40 bg-zinc-900/80' : ''}
      `}
      style={critical && !done ? { boxShadow: '0 0 18px rgba(239,68,68,0.35)' } : undefined}
    >
      {/* Clip indicator */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-2.5 bg-zinc-500 rounded-t-full" />

      <div className="flex items-start gap-2">
        <span className="text-2xl leading-none">{order.emoji}</span>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-black text-white leading-tight">{order.recipeName}</span>
          <span className={`text-[10px] font-bold ${critical && !done ? 'text-red-400' : 'text-zinc-400'}`}>
            +{order.points} pts
          </span>
        </div>
      </div>

      {/* Step chain */}
      <div className="flex flex-wrap gap-1">
        {order.steps.map((step, i) => (
          <span key={i}
            className="text-[8px] font-semibold bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded-full border border-zinc-700/60">
            {step.action}
          </span>
        ))}
        <span className="text-[8px] font-bold bg-yellow-900/60 text-yellow-400 px-1.5 py-0.5 rounded-full border border-yellow-700/40">
          🍽 Plate
        </span>
      </div>

      {/* Timer bar */}
      {!done && (
        <div className="w-full h-1.5 rounded-full bg-zinc-700/60 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000
              ${critical ? 'bg-red-500' : urgent ? 'bg-orange-400' : 'bg-emerald-400'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        {!done ? (
          <span className={`text-[11px] font-black tabular-nums ${critical ? 'text-red-400' : 'text-zinc-400'}`}>
            {Math.ceil(order.timeRemaining)}s
          </span>
        ) : (
          <span className="text-[10px] font-black text-emerald-400">✓ SERVED!</span>
        )}
      </div>

      {canServe && !done && (
        <button
          onClick={() => onServe(order.id)}
          className="mt-0.5 w-full py-1 rounded-lg font-black text-[10px] uppercase tracking-widest
            text-black bg-yellow-400 hover:bg-yellow-300 active:scale-95 transition-all
            shadow-[0_0_12px_rgba(250,204,21,0.4)]"
        >
          🍽 SERVE NOW
        </button>
      )}
    </div>
  );
}

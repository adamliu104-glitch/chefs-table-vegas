import { useDroppable } from '@dnd-kit/core';
import type { StationId, WorkItem } from '../../types/game';
import { WorkItemCard } from './WorkItemCard';

interface Props {
  stationId: StationId;
  label: string;
  icon: string;
  color: string;       // tailwind border/glow color class
  glowColor: string;   // CSS color for box-shadow
  occupant: WorkItem | null;
  isFlashing: 'error' | 'success' | null;
}

export function StationZone({ stationId, label, icon, color, glowColor, occupant, isFlashing }: Props) {
  const isOccupied = occupant !== null;
  const { setNodeRef, isOver } = useDroppable({ id: stationId, disabled: isOccupied });

  const isBurning = occupant?.isProcessing && (occupant?.progress ?? 0) > 75;
  const isReady = occupant && !occupant.isProcessing && !occupant.isBurnt;
  const isBurnt = occupant?.isBurnt;

  let borderCls = `border-zinc-700/50`;
  let bgCls = 'bg-zinc-900/40';
  let flashStyle = {};

  if (isFlashing === 'error') {
    borderCls = 'border-red-500'; bgCls = 'bg-red-950/40';
    flashStyle = { boxShadow: '0 0 20px rgba(239,68,68,0.5)' };
  } else if (isFlashing === 'success') {
    borderCls = `border-emerald-400`; bgCls = 'bg-emerald-950/40';
    flashStyle = { boxShadow: '0 0 20px rgba(52,211,153,0.4)' };
  } else if (isOver && !isOccupied) {
    borderCls = 'border-white/50'; bgCls = 'bg-white/5';
    flashStyle = { boxShadow: '0 0 20px rgba(255,255,255,0.15)' };
  } else if (isReady) {
    borderCls = 'border-yellow-400/70';
    flashStyle = { boxShadow: `0 0 14px rgba(250,204,21,0.3)` };
  } else if (isBurning) {
    borderCls = 'border-orange-500/80';
    flashStyle = { boxShadow: '0 0 16px rgba(249,115,22,0.4)' };
  } else if (isOccupied) {
    borderCls = color;
    flashStyle = { boxShadow: `0 0 12px ${glowColor}` };
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={setNodeRef}
        style={flashStyle}
        className={`
          relative w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center
          transition-all duration-200 overflow-hidden
          ${borderCls} ${bgCls}
          ${isFlashing === 'error' ? 'animate-shake' : ''}
        `}
      >
        {/* Station background tint */}
        <div className="absolute inset-0 opacity-10 rounded-2xl"
          style={{ background: isOccupied ? glowColor : 'transparent' }} />

        {isBurning && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-base animate-bounce z-10">🔥</div>
        )}

        {occupant ? (
          <div className="flex flex-col items-center gap-1 w-full px-1 z-10">
            <WorkItemCard item={occupant} compact />
            {occupant.isProcessing && (
              <div className="w-full px-2">
                <div className="w-full h-1.5 rounded-full bg-zinc-700/80 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-200 ${occupant.progress > 75 ? 'bg-orange-400' : 'bg-purple-400'}`}
                    style={{ width: `${occupant.progress}%` }}
                  />
                </div>
              </div>
            )}
            {isReady && (
              <span className="text-[9px] font-black text-yellow-300 tracking-wide animate-urgent">
                ← DRAG OFF
              </span>
            )}
            {isBurnt && (
              <span className="text-[9px] font-black text-red-400 tracking-wide">BURNT → TRASH</span>
            )}
          </div>
        ) : (
          <span className="text-3xl opacity-25">{icon}</span>
        )}
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="font-display text-sm tracking-wider text-zinc-300">{label}</span>
      </div>
    </div>
  );
}

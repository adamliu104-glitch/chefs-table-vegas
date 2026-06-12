import { useDroppable } from '@dnd-kit/core';
import type { StationId, WorkItem } from '../../types/game';
import { WorkItemCard } from './WorkItemCard';
import { StationArt } from './StationArt';

interface Props {
  stationId: StationId;
  label: string;
  color: string;       // station accent color
  glowColor: string;   // pale tint for occupied background
  occupant: WorkItem | null;
  isFlashing: 'error' | 'success' | null;
}

export function StationZone({ stationId, label, color, glowColor, occupant, isFlashing }: Props) {
  const isOccupied = occupant !== null;
  const { setNodeRef, isOver } = useDroppable({ id: stationId, disabled: isOccupied });

  const isBurning = occupant?.isProcessing && (occupant?.progress ?? 0) > 75;
  const isReady = occupant && !occupant.isProcessing && !occupant.isBurnt;
  const isBurnt = occupant?.isBurnt;

  let bg = '#fff';
  let scale = 'scale(1)';
  if (isFlashing === 'error') bg = '#ffd9d4';
  else if (isFlashing === 'success') bg = '#d8f5d9';
  else if (isOver && !isOccupied) { bg = glowColor; scale = 'scale(1.08)'; }
  else if (isOccupied) bg = glowColor;

  return (
    <div className="flex flex-col items-center gap-0">
      <div
        ref={setNodeRef}
        className={`
          relative w-24 h-24 flex flex-col items-center justify-center
          transition-all duration-200
          ${isFlashing === 'error' ? 'animate-shake' : ''}
          ${isReady ? 'animate-bounce-y' : ''}
        `}
        style={{
          background: bg,
          border: '3px solid var(--ink)',
          borderRadius: '16px 16px 4px 4px',
          boxShadow: `inset 0 -6px 0 ${color}`,
          transform: scale,
        }}
      >
        {/* Steam puffs while cooking */}
        {occupant?.isProcessing && !isBurning && (
          <>
            <span className="absolute -top-5 left-1/3 text-sm animate-steam">💨</span>
            <span className="absolute -top-5 left-2/3 text-xs animate-steam" style={{ animationDelay: '0.7s' }}>💨</span>
          </>
        )}

        {isBurning && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl animate-bounce z-10">🔥</div>
        )}

        {occupant ? (
          <div className="flex flex-col items-center gap-1 w-full px-1 z-10">
            <WorkItemCard item={occupant} compact />
            {occupant.isProcessing && (
              <div className="w-full px-2">
                <div className="w-full h-2.5 rounded-full overflow-hidden"
                  style={{ background: '#fff', border: '2px solid var(--ink)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${occupant.progress}%`,
                      background: occupant.progress > 75 ? 'var(--tomato)' : 'var(--leaf)',
                    }}
                  />
                </div>
              </div>
            )}
            {isReady && (
              <span className="font-display text-[9px] animate-urgent" style={{ color: 'var(--leaf-deep)' }}>
                ← DRAG OFF!
              </span>
            )}
            {isBurnt && (
              <span className="font-display text-[9px]" style={{ color: 'var(--tomato-deep)' }}>BURNT → TRASH</span>
            )}
          </div>
        ) : (
          <div style={{ opacity: isOver ? 1 : 0.85, transition: 'opacity 0.2s' }}>
            <StationArt id={stationId} size={60} />
          </div>
        )}
      </div>

      {/* Station name plate */}
      <div className="font-display text-xs px-3 py-0.5 rounded-b-xl text-white -mt-px"
        style={{ background: color, border: '3px solid var(--ink)', borderTop: 'none', textShadow: '0 1.5px 0 var(--ink)' }}>
        {label}
      </div>
    </div>
  );
}

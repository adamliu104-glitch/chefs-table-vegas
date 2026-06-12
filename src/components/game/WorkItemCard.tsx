import { useDraggable } from '@dnd-kit/core';
import type { WorkItem } from '../../types/game';
import { RECIPE_MAP } from '../../data/recipes';
import { FoodIcon } from './FoodArt';

interface Props {
  item: WorkItem;
  overlay?: boolean;
  compact?: boolean;
}

export function WorkItemCard({ item, overlay = false, compact = false }: Props) {
  const recipe = RECIPE_MAP[item.recipeId];
  const allDone = item.stepIndex >= (recipe?.steps.length ?? 0);
  const isDraggable = !item.isProcessing && !item.onPlate && !overlay;

  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: item.id,
    data: { item },
    disabled: !isDraggable,
  });

  const dragStyle = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)`, zIndex: 9999 }
    : undefined;

  const base = compact ? 'px-2 py-1 gap-0.5 min-w-[64px]' : 'px-3 py-1.5 gap-1 min-w-[80px]';

  let bg = '#fff';
  if (item.isBurnt) bg = '#cfc4ba';
  else if (allDone) bg = '#d8f5d9';
  else if (item.atStation && !item.isProcessing) bg = '#fff3cf';

  return (
    <div
      ref={isDraggable ? setNodeRef : undefined}
      style={{
        ...dragStyle,
        background: bg,
        border: '3px solid var(--ink)',
        boxShadow: overlay ? '0 8px 0 rgba(74,41,18,0.35)' : '0 3px 0 rgba(74,41,18,0.3)',
      }}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
      className={`
        relative flex flex-col items-center rounded-2xl
        select-none transition-colors duration-150
        ${base}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing hover:brightness-105' : 'cursor-default'}
        ${isDragging ? 'opacity-40 scale-95' : ''}
        ${overlay ? 'rotate-6 scale-110' : ''}
      `}
    >
      <FoodIcon emoji={item.isBurnt ? '🔥' : item.emoji} size={compact ? 26 : 32} />
      <span className="font-extrabold text-center leading-tight"
        style={{ fontSize: compact ? 9 : 11, color: item.isBurnt ? '#7a6a5c' : 'var(--ink)' }}>
        {item.isBurnt ? 'BURNT!' : item.name}
      </span>
      {!compact && !item.isBurnt && (
        <span className="font-display text-[9px] px-2 py-0.5 rounded-full mt-0.5 text-white"
          style={{
            background: allDone ? 'var(--leaf)' : 'var(--ink-soft)',
            border: '2px solid var(--ink)',
          }}>
          {allDone ? '✓ READY!' : `STEP ${item.stepIndex + 1}/${recipe?.steps.length ?? '?'}`}
        </span>
      )}
    </div>
  );
}

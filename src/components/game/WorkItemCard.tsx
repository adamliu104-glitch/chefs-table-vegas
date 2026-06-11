import { useDraggable } from '@dnd-kit/core';
import type { WorkItem } from '../../types/game';
import { RECIPE_MAP } from '../../data/recipes';

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

  const style = transform
    ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)`, zIndex: 9999 }
    : undefined;

  const base = compact ? 'px-2 py-1.5 gap-1 min-w-[64px]' : 'px-3 py-2 gap-1.5 min-w-[80px]';

  let borderColor = 'border-zinc-600/60';
  let bgColor = 'bg-zinc-800/80';
  let shadow = '';

  if (item.isBurnt) {
    borderColor = 'border-zinc-700'; bgColor = 'bg-zinc-900/80';
  } else if (allDone) {
    borderColor = 'border-emerald-400/70'; bgColor = 'bg-emerald-950/60';
    shadow = 'shadow-[0_0_10px_rgba(52,211,153,0.25)]';
  } else if (item.atStation && !item.isProcessing) {
    borderColor = 'border-yellow-400/70'; bgColor = 'bg-yellow-950/60';
    shadow = 'shadow-[0_0_10px_rgba(250,204,21,0.25)]';
  }

  return (
    <div
      ref={isDraggable ? setNodeRef : undefined}
      style={style}
      {...(isDraggable ? { ...attributes, ...listeners } : {})}
      className={`
        relative flex flex-col items-center rounded-xl border-2
        select-none transition-all duration-150
        ${base} ${borderColor} ${bgColor} ${shadow}
        ${isDraggable ? 'cursor-grab active:cursor-grabbing hover:brightness-110' : 'cursor-default'}
        ${isDragging ? 'opacity-40 scale-95' : ''}
        ${overlay ? 'rotate-3 scale-105 shadow-xl' : ''}
      `}
    >
      <span className={compact ? 'text-xl' : 'text-2xl'}>{item.isBurnt ? '🔥' : item.emoji}</span>
      <span className={`font-bold text-center leading-tight ${compact ? 'text-[9px]' : 'text-[11px]'} ${item.isBurnt ? 'text-zinc-500' : 'text-white'}`}>
        {item.isBurnt ? 'BURNT' : item.name}
      </span>
      {!compact && !item.isBurnt && (
        <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full mt-0.5
          ${allDone ? 'bg-emerald-500/30 text-emerald-300' : 'bg-zinc-700/60 text-zinc-400'}`}>
          {allDone ? '✓ ready to plate' : `step ${item.stepIndex + 1}/${recipe?.steps.length ?? '?'}`}
        </span>
      )}
    </div>
  );
}

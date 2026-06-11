import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { RECIPES } from '../../data/recipes';
import { useGameStore } from '../../store/gameStore';
import type { StationId, WorkItem } from '../../types/game';
import { StationZone } from './StationZone';
import { WorkItemCard } from './WorkItemCard';

const STATIONS: { id: StationId; label: string; icon: string; color: string; glow: string }[] = [
  { id: 'prep',   label: 'PREP',   icon: '🔪', color: 'border-amber-400/60',  glow: 'rgba(251,191,36,0.3)' },
  { id: 'grill',  label: 'GRILL',  icon: '🔥', color: 'border-red-500/60',    glow: 'rgba(239,68,68,0.3)' },
  { id: 'stove',  label: 'STOVE',  icon: '🍳', color: 'border-blue-400/60',   glow: 'rgba(96,165,250,0.3)' },
  { id: 'oven',   label: 'OVEN',   icon: '♨️', color: 'border-rose-600/60',   glow: 'rgba(225,29,72,0.3)' },
  { id: 'mixing', label: 'MIX',    icon: '🥣', color: 'border-purple-400/60', glow: 'rgba(167,139,250,0.3)' },
  { id: 'sushi',  label: 'SUSHI',  icon: '🍱', color: 'border-teal-400/60',   glow: 'rgba(45,212,191,0.3)' },
];

function PlateZone({ items }: { items: WorkItem[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'plate' });
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div ref={setNodeRef}
        className={`w-28 min-h-[72px] rounded-2xl border-2 flex flex-wrap gap-1 items-center justify-center p-2 transition-all duration-200
          ${isOver ? 'border-yellow-300 bg-yellow-950/50 shadow-[0_0_16px_rgba(250,204,21,0.35)]' : 'border-yellow-500/40 bg-yellow-950/20'}`}>
        {items.length === 0
          ? <span className="text-3xl opacity-30">🍽️</span>
          : items.map(w => <WorkItemCard key={w.id} item={w} compact />)
        }
      </div>
      <span className="font-display text-sm tracking-wider text-zinc-300">PLATE</span>
    </div>
  );
}

function TrashZone() {
  const { setNodeRef, isOver } = useDroppable({ id: 'trash' });
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div ref={setNodeRef}
        className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-200
          ${isOver ? 'border-red-400 bg-red-950/60 shadow-[0_0_14px_rgba(239,68,68,0.45)]' : 'border-zinc-700/50 bg-zinc-900/40'}`}>
        <span className="text-2xl">🗑️</span>
      </div>
      <span className="font-display text-sm tracking-wider text-zinc-500">TRASH</span>
    </div>
  );
}

export function Kitchen() {
  const { workItems, flash, addIngredient, dropToStation, dropToPlate, dropToTrash } = useGameStore();
  const [dragging, setDragging] = useState<WorkItem | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragStart(e: DragStartEvent) {
    const item = e.active.data.current?.item as WorkItem | undefined;
    if (item) setDragging(item);
  }

  function handleDragEnd(e: DragEndEvent) {
    setDragging(null);
    const item = e.active.data.current?.item as WorkItem | undefined;
    const target = e.over?.id as string | undefined;
    if (!item || !target) return;

    if (target === 'plate') dropToPlate(item.id);
    else if (target === 'trash') dropToTrash(item.id);
    else dropToStation(item.id, target as StationId);
  }

  const occupants = Object.fromEntries(
    STATIONS.map(s => [s.id, workItems.find(w => w.atStation === s.id) ?? null])
  ) as Record<StationId, WorkItem | null>;

  const inventoryItems = workItems.filter(w => w.atStation === null && !w.onPlate);
  const plateItems = workItems.filter(w => w.onPlate);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Kitchen side-view */}
        <div className="flex-1 flex flex-col relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #080812 0%, #0e0a1c 35%, #110c10 70%, #0a0a0a 100%)' }}>

          {/* Neon ceiling strip */}
          <div className="absolute top-0 left-0 right-0 h-px opacity-70"
            style={{ background: 'linear-gradient(90deg, transparent, #9d4edd, #ff4d8d, #f5c842, #ff4d8d, #9d4edd, transparent)', boxShadow: '0 0 8px rgba(157,78,237,0.5)' }} />

          {/* Vegas bg decor */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            {['♠','♦','♣','♥'].map((suit, i) => (
              <span key={i}
                className="absolute text-5xl opacity-[0.03]"
                style={{ top: `${15 + i * 18}%`, left: `${8 + i * 24}%`, transform: `rotate(${i * 15 - 20}deg)` }}>
                {suit}
              </span>
            ))}
          </div>

          {/* Stations area */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="flex items-end gap-4 flex-wrap justify-center">
              {STATIONS.map(s => (
                <StationZone
                  key={s.id}
                  stationId={s.id}
                  label={s.label}
                  icon={s.icon}
                  color={s.color}
                  glowColor={s.glow}
                  occupant={occupants[s.id]}
                  isFlashing={flash?.id === s.id ? flash.type : null}
                />
              ))}
            </div>
          </div>

          {/* Counter edge */}
          <div className="h-3 bg-gradient-to-b from-zinc-600 to-zinc-700 border-t border-zinc-500/60 shadow-[0_-4px_16px_rgba(0,0,0,0.6)]" />
        </div>

        {/* Bottom bar: spawn + plate + trash */}
        <div className="bg-zinc-950 border-t border-zinc-800/80 px-6 py-3 flex items-center gap-6">
          {/* Ingredient spawn buttons */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest">
              Add Ingredient →
            </span>
            <div className="flex gap-2 flex-wrap">
              {RECIPES.map(r => (
                <button key={r.id} onClick={() => addIngredient(r.id)}
                  title={`Add ${r.startName} for ${r.name}`}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-zinc-700/60 bg-zinc-800/50
                    hover:border-purple-500/60 hover:bg-purple-900/20 active:scale-95 transition-all group">
                  <span className="text-base">{r.startEmoji}</span>
                  <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-purple-300">{r.startName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Plate */}
          <PlateZone items={plateItems} />

          {/* Trash */}
          <TrashZone />
        </div>

        {/* Inventory tray */}
        {inventoryItems.length > 0 && (
          <div className="bg-zinc-900/80 border-t border-zinc-800/60 px-6 py-2.5 flex items-center gap-3 overflow-x-auto">
            <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest shrink-0">Inventory</span>
            {inventoryItems.map(item => (
              <WorkItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Recipe guide strip */}
        <div className="bg-black/80 border-t border-zinc-900 px-6 py-1.5 flex items-center gap-5 overflow-x-auto">
          <span className="text-[9px] font-semibold text-zinc-600 uppercase tracking-widest shrink-0">Recipes</span>
          {RECIPES.map(r => (
            <div key={r.id} className="flex items-center gap-1.5 shrink-0">
              <span className="text-sm">{r.emoji}</span>
              <span className="text-[9px] font-bold text-zinc-400">{r.name}</span>
              <span className="text-zinc-700 text-[9px]">→</span>
              {r.steps.map((step, i) => (
                <span key={i}
                  className="text-[8px] font-semibold text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded-full">
                  {step.station.toUpperCase()} · {step.action}
                </span>
              ))}
              <span className="text-[9px] font-black text-yellow-500 ml-0.5">+{r.points}</span>
            </div>
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {dragging && <WorkItemCard item={dragging} overlay />}
      </DragOverlay>
    </DndContext>
  );
}

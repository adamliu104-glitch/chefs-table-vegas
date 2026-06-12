import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { RECIPES } from '../../data/recipes';
import { useGameStore } from '../../store/gameStore';
import type { StationId, WorkItem } from '../../types/game';
import { StationZone } from './StationZone';
import { WorkItemCard } from './WorkItemCard';
import { FoodIcon } from './FoodArt';

const STATIONS: { id: StationId; label: string; color: string; glow: string }[] = [
  { id: 'prep',   label: 'PREP',   color: '#ffc52f', glow: '#fff3cf' },
  { id: 'grill',  label: 'GRILL',  color: '#ff5b4d', glow: '#ffe0dc' },
  { id: 'stove',  label: 'STOVE',  color: '#45bdf0', glow: '#dcf2fc' },
  { id: 'oven',   label: 'OVEN',   color: '#ff8c42', glow: '#ffe8d6' },
  { id: 'mixing', label: 'MIX',    color: '#c178ff', glow: '#f1e0ff' },
  { id: 'sushi',  label: 'SUSHI',  color: '#58c95f', glow: '#dff5e0' },
];

function PlateZone({ items }: { items: WorkItem[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'plate' });
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div ref={setNodeRef}
        className="w-28 min-h-[72px] rounded-2xl flex flex-wrap gap-1 items-center justify-center p-2 transition-all duration-200"
        style={{
          background: isOver ? '#fff3cf' : '#fff',
          border: '3px dashed var(--ink)',
          boxShadow: isOver ? '0 5px 0 var(--sunny-deep)' : '0 5px 0 rgba(74,41,18,0.3)',
          transform: isOver ? 'scale(1.06)' : 'scale(1)',
        }}>
        {items.length === 0
          ? <div className="opacity-50"><FoodIcon emoji="🍽️" size={44} /></div>
          : items.map(w => <WorkItemCard key={w.id} item={w} compact />)
        }
      </div>
      <span className="font-display text-sm text-white" style={{ textShadow: '0 2px 0 var(--ink)' }}>PLATE</span>
    </div>
  );
}

function TrashZone() {
  const { setNodeRef, isOver } = useDroppable({ id: 'trash' });
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div ref={setNodeRef}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 ${isOver ? 'animate-wobble' : ''}`}
        style={{
          background: isOver ? 'var(--tomato)' : '#8d9aa5',
          border: '3px solid var(--ink)',
          boxShadow: '0 5px 0 rgba(74,41,18,0.3)',
          transform: isOver ? 'scale(1.1)' : 'scale(1)',
        }}>
        <FoodIcon emoji="🗑️" size={36} />
      </div>
      <span className="font-display text-sm text-white" style={{ textShadow: '0 2px 0 var(--ink)' }}>TRASH</span>
    </div>
  );
}

export function Kitchen() {
  const { workItems, flash, money, addIngredient, dropToStation, dropToPlate, dropToTrash } = useGameStore();
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

        {/* Kitchen side-view: checkered tile wall */}
        <div className="flex-1 flex flex-col relative overflow-hidden"
          style={{
            background: `
              repeating-conic-gradient(#cfeef9 0% 25%, #b8e6f5 0% 50%) 0 0 / 56px 56px,
              #cfeef9
            `,
          }}>

          {/* Hanging pots decor */}
          <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none select-none">
            {['🍲', '🥘', '🫕', '🍳'].map((pot, i) => (
              <div key={i} className="flex flex-col items-center animate-swing" style={{ animationDelay: `${i * 0.5}s` }}>
                <div className="w-0.5 h-6" style={{ background: 'var(--ink)' }} />
                <span className="text-2xl opacity-70">{pot}</span>
              </div>
            ))}
          </div>

          {/* Stations area */}
          <div className="flex-1 flex items-end justify-center px-6 pb-0 pt-10">
            <div className="flex items-end gap-4 flex-wrap justify-center">
              {STATIONS.map(s => (
                <StationZone
                  key={s.id}
                  stationId={s.id}
                  label={s.label}
                  color={s.color}
                  glowColor={s.glow}
                  occupant={occupants[s.id]}
                  isFlashing={flash?.id === s.id ? flash.type : null}
                />
              ))}
            </div>
          </div>

          {/* Wooden counter edge */}
          <div className="h-5 shrink-0"
            style={{
              background: 'repeating-linear-gradient(90deg, var(--wood) 0px, var(--wood) 70px, var(--wood-deep) 70px, var(--wood-deep) 74px)',
              borderTop: '3px solid var(--ink)',
            }} />
        </div>

        {/* Bottom bar: spawn + plate + trash */}
        <div className="px-6 py-3 flex items-center gap-6"
          style={{ background: 'var(--wood-deep)', borderTop: '3px solid var(--ink)' }}>
          {/* Ingredient spawn buttons */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <span className="font-display text-xs text-white" style={{ textShadow: '0 2px 0 var(--ink)' }}>
              🛒 BUY INGREDIENT ➜
            </span>
            <div className="flex gap-2 flex-wrap">
              {RECIPES.map(r => {
                const affordable = money >= r.cost;
                return (
                  <button key={r.id} onClick={() => addIngredient(r.id)}
                    title={affordable ? `Buy ${r.startName} for $${r.cost}` : `Need $${r.cost} — not enough cash!`}
                    className={`toon-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${affordable ? 'bg-white hover:brightness-105' : 'cursor-not-allowed'}`}
                    style={{
                      boxShadow: '0 3px 0 var(--ink)',
                      background: affordable ? undefined : '#cfc4ba',
                      opacity: affordable ? 1 : 0.6,
                    }}>
                    <FoodIcon emoji={r.startEmoji} size={22} />
                    <span className="text-[10px] font-extrabold" style={{ color: 'var(--ink)' }}>{r.startName}</span>
                    <span className="font-display text-[10px] px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: affordable ? 'var(--leaf)' : 'var(--tomato)', border: '2px solid var(--ink)' }}>
                      ${r.cost}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plate */}
          <PlateZone items={plateItems} />

          {/* Trash */}
          <TrashZone />
        </div>

        {/* Inventory tray */}
        {inventoryItems.length > 0 && (
          <div className="px-6 py-2.5 flex items-center gap-3 overflow-x-auto"
            style={{ background: 'var(--cream)', borderTop: '3px solid var(--ink)' }}>
            <span className="font-display text-xs shrink-0" style={{ color: 'var(--ink)' }}>INVENTORY ➜</span>
            {inventoryItems.map(item => (
              <WorkItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Recipe guide strip */}
        <div className="px-6 py-1.5 flex items-center gap-5 overflow-x-auto"
          style={{ background: 'var(--ink)', borderTop: '3px solid var(--ink)' }}>
          <span className="font-display text-[11px] shrink-0" style={{ color: 'var(--sunny)' }}>RECIPES</span>
          {RECIPES.map(r => (
            <div key={r.id} className="flex items-center gap-1.5 shrink-0">
              <FoodIcon emoji={r.emoji} size={18} />
              <span className="text-[9px] font-extrabold text-white">{r.name}</span>
              <span className="text-[9px]" style={{ color: 'var(--wood)' }}>➜</span>
              {r.steps.map((step, i) => (
                <span key={i}
                  className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#f5e3cd', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                  {step.station.toUpperCase()} · {step.action}
                </span>
              ))}
              <span className="font-display text-[10px] ml-0.5" style={{ color: 'var(--sunny)' }}>+{r.points}</span>
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

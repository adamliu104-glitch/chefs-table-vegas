import { create } from 'zustand';
import { RECIPES, RECIPE_MAP } from '../data/recipes';
import type { GamePhase, Order, StationId, WorkItem } from '../types/game';

let uid = 0;
const nextId = (prefix: string) => `${prefix}_${++uid}_${Date.now()}`;

interface Flash { id: string; type: 'error' | 'success'; }

interface GameStore {
  phase: GamePhase;
  score: number;
  highScore: number;
  gameTimeLeft: number;
  level: number;
  orders: Order[];
  workItems: WorkItem[];
  flash: Flash | null;

  startGame: () => void;
  endGame: () => void;
  goToMenu: () => void;
  tick: (deltaMs: number) => void;
  spawnOrder: () => void;
  addIngredient: (recipeId: string) => void;
  dropToStation: (itemId: string, stationId: StationId) => void;
  dropToPlate: (itemId: string) => void;
  dropToTrash: (itemId: string) => void;
  serveOrder: (orderId: string) => void;
  clearFlash: () => void;
}

let orderSpawnTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleOrder(spawnFn: () => void, delayMs: number) {
  if (orderSpawnTimer) clearTimeout(orderSpawnTimer);
  orderSpawnTimer = setTimeout(spawnFn, delayMs);
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: 'menu',
  score: 0,
  highScore: 0,
  gameTimeLeft: 180,
  level: 1,
  orders: [],
  workItems: [],
  flash: null,

  startGame: () => {
    uid = 0;
    if (orderSpawnTimer) clearTimeout(orderSpawnTimer);
    set({ phase: 'playing', score: 0, gameTimeLeft: 180, level: 1, orders: [], workItems: [], flash: null });
    scheduleOrder(() => get().spawnOrder(), 800);
  },

  endGame: () => {
    if (orderSpawnTimer) clearTimeout(orderSpawnTimer);
    const { score, highScore } = get();
    set({ phase: 'gameOver', highScore: Math.max(score, highScore) });
  },

  goToMenu: () => set({ phase: 'menu' }),

  tick: (deltaMs) => {
    const state = get();
    if (state.phase !== 'playing') return;

    const newGameTime = state.gameTimeLeft - deltaMs / 1000;
    if (newGameTime <= 0) { get().endGame(); return; }

    // Tick orders
    let scoreDelta = 0;
    const updatedOrders: Order[] = [];
    for (const order of state.orders) {
      if (order.status !== 'active') { updatedOrders.push(order); continue; }
      const newTime = order.timeRemaining - deltaMs / 1000;
      if (newTime <= 0) {
        scoreDelta -= 50;
        updatedOrders.push({ ...order, timeRemaining: 0, status: 'failed' });
      } else {
        updatedOrders.push({ ...order, timeRemaining: newTime });
      }
    }

    // Tick work items on stations
    const updatedItems = state.workItems.map(item => {
      if (!item.isProcessing || item.atStation === null) return item;

      const recipe = RECIPE_MAP[item.recipeId];
      // KEY FIX: use item.stepIndex directly — never search by station name
      const step = recipe?.steps[item.stepIndex];
      if (!step?.cookTime) return item;

      const newElapsed = item.elapsed + deltaMs;
      const progress = Math.min(100, (newElapsed / step.cookTime) * 100);

      if (step.burnTime && newElapsed >= step.burnTime) {
        return { ...item, elapsed: newElapsed, progress: 100, isProcessing: false, isBurnt: true };
      }
      if (newElapsed >= step.cookTime) {
        const nextStepIndex = item.stepIndex + 1;
        return {
          ...item,
          elapsed: newElapsed,
          progress: 100,
          isProcessing: false,
          stepIndex: nextStepIndex,
          name: step.outputName,
          emoji: step.outputEmoji,
          atStation: item.atStation, // stays on station — player must drag off
        };
      }
      return { ...item, elapsed: newElapsed, progress };
    });

    // Remove failed orders after a short display
    const visibleOrders = updatedOrders.filter(o => o.status !== 'failed');

    set({
      gameTimeLeft: newGameTime,
      score: Math.max(0, state.score + scoreDelta),
      orders: visibleOrders,
      workItems: updatedItems,
    });
  },

  spawnOrder: () => {
    const state = get();
    if (state.phase !== 'playing') return;
    const activeCount = state.orders.filter(o => o.status === 'active').length;
    if (activeCount >= 3) {
      scheduleOrder(() => get().spawnOrder(), 5000);
      return;
    }

    const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
    const order: Order = {
      id: nextId('ord'),
      recipeId: recipe.id,
      recipeName: recipe.name,
      emoji: recipe.emoji,
      points: recipe.points,
      steps: recipe.steps,
      timeLimit: recipe.timeLimit,
      timeRemaining: recipe.timeLimit,
      status: 'active',
    };
    set(s => ({ orders: [...s.orders, order] }));

    const delay = 18000 + Math.random() * 12000;
    scheduleOrder(() => get().spawnOrder(), delay);
  },

  addIngredient: (recipeId) => {
    const recipe = RECIPE_MAP[recipeId];
    if (!recipe) return;
    const item: WorkItem = {
      id: nextId('item'),
      recipeId,
      stepIndex: 0,
      name: recipe.startName,
      emoji: recipe.startEmoji,
      isProcessing: false,
      progress: 0,
      isBurnt: false,
      elapsed: 0,
      atStation: null,
      onPlate: false,
    };
    set(s => ({ workItems: [...s.workItems, item] }));
  },

  dropToStation: (itemId, stationId) => {
    const state = get();
    const item = state.workItems.find(w => w.id === itemId);
    if (!item || item.isBurnt || item.onPlate || item.isProcessing) return;

    const recipe = RECIPE_MAP[item.recipeId];
    if (!recipe) return;

    // All steps done? Can only go to plate
    const allDone = item.stepIndex >= recipe.steps.length;
    if (allDone) {
      set({ flash: { id: stationId, type: 'error' } });
      setTimeout(() => get().clearFlash(), 500);
      return;
    }

    const nextStep = recipe.steps[item.stepIndex];
    if (nextStep.station !== stationId) {
      set({ flash: { id: stationId, type: 'error' } });
      setTimeout(() => get().clearFlash(), 500);
      return;
    }

    // Check station isn't already occupied
    const occupied = state.workItems.some(w => w.atStation === stationId && w.id !== itemId);
    if (occupied) {
      set({ flash: { id: stationId, type: 'error' } });
      setTimeout(() => get().clearFlash(), 500);
      return;
    }

    if (!nextStep.cookTime) {
      // Instant action — transform immediately, item stays in inventory
      const nextIdx = item.stepIndex + 1;
      set(s => ({
        workItems: s.workItems.map(w => w.id !== itemId ? w : {
          ...w,
          stepIndex: nextIdx,
          name: nextStep.outputName,
          emoji: nextStep.outputEmoji,
          atStation: null,
        }),
        flash: { id: stationId, type: 'success' },
      }));
      setTimeout(() => get().clearFlash(), 400);
    } else {
      // Timed action — move item to station, start processing
      set(s => ({
        workItems: s.workItems.map(w => w.id !== itemId ? w : {
          ...w,
          atStation: stationId,
          isProcessing: true,
          progress: 0,
          elapsed: 0,
          isBurnt: false,
        }),
      }));
    }
  },

  dropToPlate: (itemId) => {
    const state = get();
    const item = state.workItems.find(w => w.id === itemId);
    if (!item || item.isProcessing || item.isBurnt || item.onPlate) return;

    const recipe = RECIPE_MAP[item.recipeId];
    const allDone = item.stepIndex >= recipe.steps.length;
    if (!allDone) return; // not fully cooked yet

    set(s => ({
      workItems: s.workItems.map(w => w.id !== itemId ? w : {
        ...w, atStation: null, onPlate: true,
      }),
    }));
  },

  dropToTrash: (itemId) => {
    set(s => ({ workItems: s.workItems.filter(w => w.id !== itemId) }));
  },

  serveOrder: (orderId) => {
    const state = get();
    const order = state.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'active') return;

    const plateItem = state.workItems.find(
      w => w.onPlate && w.recipeId === order.recipeId && w.stepIndex >= RECIPE_MAP[order.recipeId].steps.length
    );
    if (!plateItem) return;

    const timeBonus = Math.round((order.timeRemaining / order.timeLimit) * 80);
    const earned = order.points + timeBonus;

    set(s => ({
      score: s.score + earned,
      orders: s.orders.map(o => o.id === orderId ? { ...o, status: 'completed' } : o),
      workItems: s.workItems.filter(w => w.id !== plateItem.id),
    }));

    setTimeout(() => {
      set(s => ({ orders: s.orders.filter(o => o.id !== orderId) }));
    }, 1800);
  },

  clearFlash: () => set({ flash: null }),
}));

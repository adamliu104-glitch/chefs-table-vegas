export type StationId = 'prep' | 'grill' | 'stove' | 'oven' | 'mixing' | 'sushi';

export interface RecipeStep {
  station: StationId;
  action: string;       // e.g. "Season", "Grill 8s"
  cookTime?: number;    // ms — undefined means instant
  burnTime?: number;    // total ms from start when item burns (only for timed steps)
  outputName: string;
  outputEmoji: string;
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  points: number;
  cost: number;         // $ to buy the starting ingredient
  timeLimit: number;    // seconds
  startName: string;
  startEmoji: string;
  steps: RecipeStep[];
}

export interface WorkItem {
  id: string;
  recipeId: string;
  stepIndex: number;    // index of NEXT step to perform; steps.length = fully cooked
  name: string;
  emoji: string;
  isProcessing: boolean;
  progress: number;     // 0–100
  isBurnt: boolean;
  elapsed: number;      // ms elapsed on current timed step
  atStation: StationId | null;  // null ⟹ in inventory
  onPlate: boolean;
}

export interface Order {
  id: string;
  recipeId: string;
  recipeName: string;
  emoji: string;
  points: number;
  steps: RecipeStep[];
  timeLimit: number;
  timeRemaining: number;
  status: 'active' | 'completed' | 'failed';
}

export type GamePhase = 'menu' | 'playing' | 'paused' | 'gameOver';

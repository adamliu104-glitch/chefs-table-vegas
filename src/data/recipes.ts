import type { Recipe } from '../types/game';

export const RECIPES: Recipe[] = [
  {
    id: 'ribeye',
    name: 'Ribeye Steak',
    emoji: '🥩',
    points: 300,
    timeLimit: 90,
    startName: 'Ribeye',
    startEmoji: '🥩',
    steps: [
      { station: 'prep',  action: 'Season',  outputName: 'Seasoned Ribeye', outputEmoji: '🥩' },
      { station: 'grill', action: 'Grill',   cookTime: 8000,  burnTime: 13000, outputName: 'Grilled Ribeye',  outputEmoji: '🥩' },
      { station: 'prep',  action: 'Rest',    cookTime: 3000,                   outputName: 'Rested Ribeye',   outputEmoji: '🥩' },
    ],
  },
  {
    id: 'mashed_potatoes',
    name: 'Mashed Potatoes',
    emoji: '🥔',
    points: 200,
    timeLimit: 80,
    startName: 'Potatoes',
    startEmoji: '🥔',
    steps: [
      { station: 'prep',   action: 'Cut',  cookTime: 2500,                   outputName: 'Chopped Potatoes', outputEmoji: '🥔' },
      { station: 'stove',  action: 'Boil', cookTime: 10000, burnTime: 16000, outputName: 'Boiled Potatoes',  outputEmoji: '🍲' },
      { station: 'mixing', action: 'Mash', cookTime: 3000,                   outputName: 'Mashed Potatoes',  outputEmoji: '🥣' },
    ],
  },
  {
    id: 'grilled_chicken',
    name: 'Grilled Chicken',
    emoji: '🍗',
    points: 250,
    timeLimit: 75,
    startName: 'Chicken',
    startEmoji: '🍗',
    steps: [
      { station: 'prep',  action: 'Season', outputName: 'Seasoned Chicken', outputEmoji: '🍗' },
      { station: 'grill', action: 'Grill',  cookTime: 6000, burnTime: 10000, outputName: 'Grilled Chicken',  outputEmoji: '🍗' },
    ],
  },
  {
    id: 'ratatouille',
    name: 'Ratatouille',
    emoji: '🫕',
    points: 280,
    timeLimit: 100,
    startName: 'Vegetables',
    startEmoji: '🥗',
    steps: [
      { station: 'prep',   action: 'Chop',  cookTime: 2500,                   outputName: 'Chopped Veggies', outputEmoji: '🥗' },
      { station: 'stove',  action: 'Sauté', cookTime: 8000,  burnTime: 13000, outputName: 'Sautéed Veggies', outputEmoji: '🍲' },
      { station: 'mixing', action: 'Mix',   cookTime: 2000,                   outputName: 'Ratatouille',      outputEmoji: '🫕' },
    ],
  },
  {
    id: 'beef_wellington',
    name: 'Beef Wellington',
    emoji: '🍖',
    points: 500,
    timeLimit: 130,
    startName: 'Wellington Kit',
    startEmoji: '🥩',
    steps: [
      { station: 'prep',  action: 'Prep',  cookTime: 3000,                    outputName: 'Prepped Beef',       outputEmoji: '🥩' },
      { station: 'grill', action: 'Sear',  cookTime: 4000,  burnTime: 8000,   outputName: 'Seared Beef',        outputEmoji: '🥩' },
      { station: 'prep',  action: 'Wrap',  cookTime: 3000,                    outputName: 'Wrapped Wellington', outputEmoji: '🎁' },
      { station: 'oven',  action: 'Bake',  cookTime: 15000, burnTime: 22000,  outputName: 'Beef Wellington',    outputEmoji: '🍖' },
    ],
  },
  {
    id: 'sushi',
    name: 'Sushi Roll',
    emoji: '🍣',
    points: 350,
    timeLimit: 95,
    startName: 'Sushi Kit',
    startEmoji: '🍱',
    steps: [
      { station: 'stove', action: 'Cook Rice', cookTime: 8000, burnTime: 13000, outputName: 'Cooked Rice',   outputEmoji: '🍚' },
      { station: 'prep',  action: 'Cut Fish',  cookTime: 2500,                  outputName: 'Prepped Sushi', outputEmoji: '🐟' },
      { station: 'sushi', action: 'Roll',      cookTime: 4000,                  outputName: 'Sushi Roll',    outputEmoji: '🍣' },
    ],
  },
];

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(RECIPES.map(r => [r.id, r]));

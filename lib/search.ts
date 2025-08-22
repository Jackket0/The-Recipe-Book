import Fuse from 'fuse.js';
import type { FuseResultMatch, IFuseOptions } from 'fuse.js';
import { Recipe, MainCategory, RecipeTag } from '@/types/recipe';
import { normalizeFractions } from './fractions';

export interface SearchOptions {
  category?: MainCategory;
  tags?: RecipeTag[];
  difficulty?: string;
  searchTerm?: string;
  includeIngredients?: boolean;
  fuzzyThreshold?: number;
}

export interface SearchResult {
  recipe: Recipe;
  score?: number;
  matches?: readonly FuseResultMatch[];
}

export interface IngredientSuggestion {
  ingredient: string;
  count: number;
  recipes: Recipe[];
}

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<Recipe> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'ingredients', weight: 0.2 },
    { name: 'tags', weight: 0.1 }
  ],
  threshold: 0.4, // 0 = perfect match, 1 = match anything
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true
};

/**
 * Enhanced search with fuzzy matching
 */
export function searchRecipesEnhanced(
  recipes: Recipe[], 
  options: SearchOptions = {}
): SearchResult[] {
  let filteredRecipes = [...recipes];
  
  // Apply category filter
  if (options.category) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.category === options.category
    );
  }
  
  // Apply tags filter (any of the specified tags)
  if (options.tags && options.tags.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      options.tags!.some(tag => recipe.tags.includes(tag))
    );
  }
  
  // Apply difficulty filter
  if (options.difficulty) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.difficulty === options.difficulty
    );
  }
  
  // If no search term, return filtered results
  if (!options.searchTerm || options.searchTerm.trim() === '') {
    return filteredRecipes.map(recipe => ({ recipe }));
  }
  
  // Normalize fractions in search term
  const normalizedSearchTerm = normalizeFractions(options.searchTerm);
  
  // Configure Fuse with custom threshold if provided
  const searchOptions = { ...fuseOptions };
  if (options.fuzzyThreshold !== undefined) {
    searchOptions.threshold = options.fuzzyThreshold;
  }
  
  // Create Fuse instance and search
  const fuse = new Fuse(filteredRecipes, searchOptions);
  const searchResults = fuse.search(normalizedSearchTerm);
  
  // Transform Fuse results to our SearchResult format
  return searchResults.map(result => ({
    recipe: result.item,
    score: result.score,
    matches: result.matches
  }));
}

/**
 * Get ingredient-based search suggestions
 */
export function getIngredientSuggestions(
  recipes: Recipe[],
  searchTerm: string,
  limit: number = 10
): IngredientSuggestion[] {
  const ingredientMap = new Map<string, { count: number; recipes: Recipe[] }>();
  const searchLower = searchTerm.toLowerCase();
  const normalizedSearchTerm = normalizeFractions(searchTerm).toLowerCase();
  
  // Build ingredient frequency map
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const ingredientLower = ingredient.toLowerCase();
      const normalizedIngredient = normalizeFractions(ingredient).toLowerCase();
      
      // Check if ingredient contains the search term (both original and normalized)
      if (ingredientLower.includes(searchLower) || normalizedIngredient.includes(normalizedSearchTerm)) {
        // Extract the main ingredient name (before comma or parentheses)
        const mainIngredient = ingredient.split(',')[0].split('(')[0].trim();
        const key = mainIngredient.toLowerCase();
        
        if (!ingredientMap.has(key)) {
          ingredientMap.set(key, { count: 0, recipes: [] });
        }
        
        const entry = ingredientMap.get(key)!;
        entry.count++;
        if (!entry.recipes.find(r => r.slug === recipe.slug)) {
          entry.recipes.push(recipe);
        }
      }
    });
  });
  
  // Convert to array and sort by frequency
  return Array.from(ingredientMap.entries())
    .map(([ingredient, data]) => ({
      ingredient,
      count: data.count,
      recipes: data.recipes
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get related recipes based on common ingredients
 */
export function getRelatedRecipes(
  targetRecipe: Recipe,
  allRecipes: Recipe[],
  limit: number = 5
): Recipe[] {
  const targetIngredients = targetRecipe.ingredients.map(i => 
    i.toLowerCase().split(',')[0].split('(')[0].trim()
  );
  
  // Calculate similarity scores
  const similarities = allRecipes
    .filter(recipe => recipe.slug !== targetRecipe.slug)
    .map(recipe => {
      const recipeIngredients = recipe.ingredients.map(i => 
        i.toLowerCase().split(',')[0].split('(')[0].trim()
      );
      
      // Count common ingredients
      const commonIngredients = targetIngredients.filter(ingredient =>
        recipeIngredients.some(ri => ri.includes(ingredient) || ingredient.includes(ri))
      ).length;
      
      // Calculate similarity score (common ingredients / total unique ingredients)
      const totalIngredients = new Set([...targetIngredients, ...recipeIngredients]).size;
      const similarity = commonIngredients / totalIngredients;
      
      return { recipe, similarity };
    })
    .filter(item => item.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
  
  return similarities.map(item => item.recipe);
}

/**
 * Get search suggestions based on partial input
 */
export function getSearchSuggestions(
  recipes: Recipe[],
  partialTerm: string,
  limit: number = 8
): string[] {
  if (!partialTerm || partialTerm.length < 2) {
    return [];
  }
  
  const suggestions = new Set<string>();
  const termLower = partialTerm.toLowerCase();
  
  // Add recipe titles that start with or contain the term
  recipes.forEach(recipe => {
    const title = recipe.title.toLowerCase();
    if (title.includes(termLower)) {
      suggestions.add(recipe.title);
    }
  });
  
  // Add ingredient suggestions
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const ingredientLower = ingredient.toLowerCase();
      if (ingredientLower.includes(termLower)) {
        // Extract main ingredient name
        const mainIngredient = ingredient.split(',')[0].split('(')[0].trim();
        if (mainIngredient.length > 1) {
          suggestions.add(mainIngredient);
        }
      }
    });
  });
  
  // Add tag suggestions
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (tag.toLowerCase().includes(termLower)) {
        suggestions.add(tag);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, limit);
}

/**
 * Advanced multi-criteria search with scoring
 */
export function searchRecipesAdvanced(
  recipes: Recipe[],
  criteria: {
    searchTerm?: string;
    category?: MainCategory;
    tags?: RecipeTag[];
    difficulty?: string;
    maxPrepTime?: number; // in minutes
    maxCookTime?: number; // in minutes
    minServings?: number;
    maxServings?: number;
    hasImage?: boolean;
  }
): SearchResult[] {
  let results = recipes.map(recipe => ({ recipe, score: 0 }));
  
  // Apply hard filters first
  results = results.filter(({ recipe }) => {
    // Category filter
    if (criteria.category && recipe.category !== criteria.category) {
      return false;
    }
    
    // Tags filter
    if (criteria.tags && criteria.tags.length > 0) {
      if (!criteria.tags.some(tag => recipe.tags.includes(tag))) {
        return false;
      }
    }
    
    // Difficulty filter
    if (criteria.difficulty && recipe.difficulty !== criteria.difficulty) {
      return false;
    }
    
    // Servings filters
    if (criteria.minServings && recipe.servings && recipe.servings < criteria.minServings) {
      return false;
    }
    if (criteria.maxServings && recipe.servings && recipe.servings > criteria.maxServings) {
      return false;
    }
    
    // Image filter
    if (criteria.hasImage !== undefined && Boolean(recipe.image) !== criteria.hasImage) {
      return false;
    }
    
    return true;
  });
  
  // Apply fuzzy search if search term provided
  if (criteria.searchTerm) {
    const fuse = new Fuse(results.map(r => r.recipe), fuseOptions);
    const searchResults = fuse.search(criteria.searchTerm);
    
    return searchResults.map(result => ({
      recipe: result.item,
      score: result.score,
      matches: result.matches
    }));
  }
  
  // Sort by date created (newest first) if no search term
  return results.sort((a, b) => {
    if (a.recipe.dateCreated && b.recipe.dateCreated) {
      return new Date(b.recipe.dateCreated).getTime() - new Date(a.recipe.dateCreated).getTime();
    }
    return a.recipe.title.localeCompare(b.recipe.title);
  });
}

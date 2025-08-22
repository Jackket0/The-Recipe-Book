import { Recipe } from '@/types/recipe';
import { normalizeFractions, parseFraction, decimalToReadableFraction } from './fractions';

export interface ScaledRecipe extends Omit<Recipe, 'ingredients'> {
  ingredients: string[];
  originalServings: number;
  scaledServings: number;
  scalingFactor: number;
}

/**
 * Convert decimal to nearest common fraction
 */
function decimalToFraction(decimal: number): string {
  return decimalToReadableFraction(decimal);
}

/**
 * Parse ingredient string to extract quantity and unit
 */
function parseIngredient(ingredient: string): {
  quantity: number | null;
  unit: string | null;
  description: string;
  originalText: string;
} {
  const original = ingredient.trim();
  
  // Normalize fractions in the ingredient string
  const normalized = normalizeFractions(original);
  
  // Common patterns for quantities (after normalization)
  const patterns = [
    // Mixed numbers like "1.5 cups" (after normalization)
    /^(\d+\.\d+)\s*(\w+)?\s*(.*)/,
    // Decimals like "2.5 cups" or "0.5 tsp"
    /^(\d*\.?\d+)\s*(\w+)?\s*(.*)/,
    // Whole numbers like "2 cups"
    /^(\d+)\s*(\w+)?\s*(.*)/
  ];
  
  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) {
      const [, quantityStr, unit, description] = match;
      
      // Parse quantity (now all decimals after normalization)
      const quantity = parseFloat(quantityStr);
      
      if (!isNaN(quantity)) {
        return {
          quantity,
          unit: unit || null,
          description: description.trim(),
          originalText: original
        };
      }
    }
  }
  
  // If no quantity found, return the whole thing as description
  return {
    quantity: null,
    unit: null,
    description: original,
    originalText: original
  };
}

/**
 * Scale an individual ingredient
 */
function scaleIngredient(ingredient: string, factor: number): string {
  const parsed = parseIngredient(ingredient);
  
  if (parsed.quantity === null) {
    // No quantity found, return as-is with a note
    return `${parsed.description} (adjust to taste)`;
  }
  
  const scaledQuantity = parsed.quantity * factor;
  const scaledQuantityStr = decimalToFraction(scaledQuantity);
  
  if (parsed.unit) {
    return `${scaledQuantityStr} ${parsed.unit} ${parsed.description}`.trim();
  } else {
    return `${scaledQuantityStr} ${parsed.description}`.trim();
  }
}

/**
 * Scale a recipe to a new number of servings
 */
export function scaleRecipe(recipe: Recipe, newServings: number): ScaledRecipe {
  const originalServings = recipe.servings || 4; // Default to 4 if not specified
  const scalingFactor = newServings / originalServings;
  
  // Scale ingredients
  const scaledIngredients = recipe.ingredients.map(ingredient => 
    scaleIngredient(ingredient, scalingFactor)
  );
  
  return {
    ...recipe,
    ingredients: scaledIngredients,
    servings: newServings,
    originalServings,
    scaledServings: newServings,
    scalingFactor
  };
}

/**
 * Get common serving size options for a recipe
 */
export function getServingSizeOptions(originalServings: number): number[] {
  const baseOptions = [1, 2, 4, 6, 8, 12, 16, 24];
  
  // Add the original serving size if it's not in the base options
  if (!baseOptions.includes(originalServings)) {
    baseOptions.push(originalServings);
  }
  
  // Add some multiples of the original
  const multiples = [0.5, 1.5, 2, 3].map(mult => Math.round(originalServings * mult));
  multiples.forEach(mult => {
    if (mult > 0 && mult <= 50 && !baseOptions.includes(mult)) {
      baseOptions.push(mult);
    }
  });
  
  return baseOptions.sort((a, b) => a - b);
}

/**
 * Calculate cooking time adjustments for scaled recipes
 */
export function adjustCookingTime(
  originalTime: string | null, 
  scalingFactor: number
): string | null {
  if (!originalTime) return null;
  
  // Extract minutes from time string
  const timeMatch = originalTime.match(/(\d+)(?:-(\d+))?\s*(minutes?|mins?|hours?|hrs?)/i);
  if (!timeMatch) return originalTime;
  
  const [, minTime, maxTime, unit] = timeMatch;
  const isHours = unit.toLowerCase().includes('hour') || unit.toLowerCase().includes('hr');
  
  let adjustedMin = parseInt(minTime);
  let adjustedMax = maxTime ? parseInt(maxTime) : null;
  
  // Cooking time adjustments are not linear
  // For larger quantities, increase time but not proportionally
  if (scalingFactor > 1) {
    const timeMultiplier = 1 + (scalingFactor - 1) * 0.3; // 30% of the scaling factor
    adjustedMin = Math.round(adjustedMin * timeMultiplier);
    if (adjustedMax) {
      adjustedMax = Math.round(adjustedMax * timeMultiplier);
    }
  } else if (scalingFactor < 1) {
    const timeMultiplier = 0.7 + (scalingFactor * 0.3); // Reduce time but not too much
    adjustedMin = Math.round(adjustedMin * timeMultiplier);
    if (adjustedMax) {
      adjustedMax = Math.round(adjustedMax * timeMultiplier);
    }
  }
  
  // Format the result
  const unitName = isHours ? (adjustedMin === 1 ? 'hour' : 'hours') : 'minutes';
  
  if (adjustedMax && adjustedMax !== adjustedMin) {
    return `${adjustedMin}-${adjustedMax} ${unitName}`;
  } else {
    return `${adjustedMin} ${unitName}`;
  }
}

/**
 * Validate scaling factor
 */
export function validateScalingFactor(factor: number): {
  isValid: boolean;
  warning?: string;
} {
  if (factor <= 0) {
    return { isValid: false, warning: 'Scaling factor must be positive' };
  }
  
  if (factor < 0.25) {
    return { 
      isValid: true, 
      warning: 'Very small portions may be difficult to measure accurately' 
    };
  }
  
  if (factor > 10) {
    return { 
      isValid: true, 
      warning: 'Large batches may require cooking time and equipment adjustments' 
    };
  }
  
  return { isValid: true };
}

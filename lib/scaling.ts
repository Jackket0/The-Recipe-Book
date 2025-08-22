import { Recipe } from '@/types/recipe';

export interface ScaledRecipe extends Omit<Recipe, 'ingredients'> {
  ingredients: string[];
  originalServings: number;
  scaledServings: number;
  scalingFactor: number;
}

/**
 * Common fractions and their decimal equivalents
 */
const FRACTION_MAP: Record<string, number> = {
  '1/8': 0.125,
  '1/4': 0.25,
  '1/3': 0.333,
  '3/8': 0.375,
  '1/2': 0.5,
  '5/8': 0.625,
  '2/3': 0.667,
  '3/4': 0.75,
  '7/8': 0.875,
  '1 1/4': 1.25,
  '1 1/3': 1.333,
  '1 1/2': 1.5,
  '1 2/3': 1.667,
  '1 3/4': 1.75,
  '2 1/4': 2.25,
  '2 1/3': 2.333,
  '2 1/2': 2.5,
  '2 2/3': 2.667,
  '2 3/4': 2.75,
  '3 1/4': 3.25,
  '3 1/3': 3.333,
  '3 1/2': 3.5,
  '3 2/3': 3.667,
  '3 3/4': 3.75
};

/**
 * Convert decimal to nearest common fraction
 */
function decimalToFraction(decimal: number): string {
  // Find the closest fraction
  let closestFraction = decimal.toString();
  let minDifference = Infinity;
  
  for (const [fraction, value] of Object.entries(FRACTION_MAP)) {
    const difference = Math.abs(decimal - value);
    if (difference < minDifference) {
      minDifference = difference;
      closestFraction = fraction;
    }
  }
  
  // If the difference is small enough, use the fraction
  if (minDifference < 0.05) {
    return closestFraction;
  }
  
  // Otherwise, return rounded decimal
  if (decimal < 1) {
    return decimal.toFixed(2).replace(/\.?0+$/, '');
  } else {
    return decimal.toFixed(1).replace(/\.0$/, '');
  }
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
  
  // Common patterns for quantities
  const patterns = [
    // Fractions like "1/2 cup"
    /^(\d+\/\d+|\d+\s+\d+\/\d+)\s*(\w+)?\s*(.*)/,
    // Mixed numbers like "1 1/2 cups"
    /^(\d+\s+\d+\/\d+)\s*(\w+)?\s*(.*)/,
    // Decimals like "2.5 cups" or "0.5 tsp"
    /^(\d*\.?\d+)\s*(\w+)?\s*(.*)/,
    // Whole numbers like "2 cups"
    /^(\d+)\s*(\w+)?\s*(.*)/
  ];
  
  for (const pattern of patterns) {
    const match = original.match(pattern);
    if (match) {
      const [, quantityStr, unit, description] = match;
      
      // Parse quantity (handle fractions)
      let quantity: number;
      if (quantityStr.includes('/')) {
        // Handle fractions
        if (quantityStr.includes(' ')) {
          // Mixed fraction like "1 1/2"
          const [whole, fraction] = quantityStr.split(' ');
          const [num, den] = fraction.split('/');
          quantity = parseInt(whole) + parseInt(num) / parseInt(den);
        } else {
          // Simple fraction like "1/2"
          const [num, den] = quantityStr.split('/');
          quantity = parseInt(num) / parseInt(den);
        }
      } else {
        quantity = parseFloat(quantityStr);
      }
      
      return {
        quantity,
        unit: unit || null,
        description: description.trim(),
        originalText: original
      };
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

// Utility types
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

// Main category types - updated to match requirements
export type MainCategory = 
  // Food categories
  | 'Mains' 
  | 'Sides' 
  | 'Snacks'
  | 'Breakfast & Brunch'
  | 'Lunch'
  | 'Dinner'
  | 'Desserts'
  | 'Baking'
  // Drink categories
  | 'Mocktails'
  | 'Cocktails'
  | 'Smoothies & Juices'
  | 'Shakes';

// Dietary subcategories - updated to match requirements
export type DietaryTag = 
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Keto / Low Carb'
  | 'High Protein'
  | 'Low Calorie'
  | 'Low Fat';

// Cuisine subcategories - updated to match requirements
export type CuisineTag = 
  | 'Italian'
  | 'Indian'
  | 'Chinese'
  | 'Japanese'
  | 'Mediterranean'
  | 'Middle Eastern'
  | 'Mexican'
  | 'British'
  | 'American';

// Occasion subcategories - updated to match requirements
export type OccasionTag = 
  | 'Quick Meals'
  | 'Meal Prep'
  | 'Comfort Food'
  | 'Party Food'
  | 'Kids Friendly'
  | 'Seasonal';

// Union type for all possible tags
export type RecipeTag = DietaryTag | CuisineTag | OccasionTag;

// Category structure - simplified to match new requirements
export interface CategoryStructure {
  category: MainCategory;
  tags: RecipeTag[];
}

export interface Recipe {
  slug: string;
  title: string;
  description: string | null;
  category: MainCategory; // Main category (required)
  tags: RecipeTag[]; // Array of tags (subcategories)
  image: string | null;
  prepTime: string | null;
  cookTime: string | null;
  servings: number | null;
  difficulty: RecipeDifficulty | null;
  ingredients: string[];
  instructions: string[];
  dateCreated: string | null;
  dateModified: string | null;
  content: string;
}

export interface RecipeFrontMatter {
  title: string;
  description?: string;
  category: MainCategory; // Required main category
  tags?: RecipeTag[]; // Optional array of tags
  image?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: RecipeDifficulty;
  ingredients: string[];
  instructions: string[];
  dateCreated?: string;
  dateModified?: string;
}

export interface RecipeMetadata {
  prepTime: string | null;
  cookTime: string | null;
  servings: number | null;
  difficulty: RecipeDifficulty | null;
}

export interface RecipeFilter {
  category?: MainCategory;
  difficulty?: RecipeDifficulty;
  tags?: RecipeTag[];
  searchTerm?: string;
}

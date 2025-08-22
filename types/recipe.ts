// Utility types
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

// Main category types
export type MainCategory = 
  | 'Mains' 
  | 'Sides' 
  | 'Drinks' 
  | 'Desserts' 
  | 'Appetizers' 
  | 'Breakfast' 
  | 'Lunch' 
  | 'Dinner';

// Dietary and style subcategories
export type DietaryCategory = 
  | 'High Protein' 
  | 'Low Calorie' 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Gluten-Free' 
  | 'Keto' 
  | 'Paleo';

// Cuisine subcategories
export type CuisineCategory = 
  | 'Italian' 
  | 'Mexican' 
  | 'Asian' 
  | 'Indian' 
  | 'Mediterranean' 
  | 'American' 
  | 'French' 
  | 'Thai' 
  | 'Chinese' 
  | 'Japanese';

// Drink subcategories
export type DrinkCategory = 
  | 'Cocktail' 
  | 'Mocktail' 
  | 'Smoothie' 
  | 'Hot Drinks' 
  | 'Cold Drinks' 
  | 'Juices';

// Category structure
export interface CategoryStructure {
  main: MainCategory;
  dietary?: DietaryCategory[];
  cuisine?: CuisineCategory;
  drinkType?: DrinkCategory;
  subcategories?: string[];
}

export interface Recipe {
  slug: string;
  title: string;
  description: string | null;
  category: string; // Keep backward compatibility
  mainCategory: MainCategory | null;
  categoryStructure: CategoryStructure | null;
  image: string | null;
  prepTime: string | null;
  cookTime: string | null;
  servings: number | null;
  difficulty: RecipeDifficulty | null;
  ingredients: string[];
  instructions: string[];
  tags: string[] | null;
  dateCreated: string | null;
  dateModified: string | null;
  content: string;
}

export interface RecipeFrontMatter {
  title: string;
  description?: string;
  category: string; // Keep backward compatibility
  mainCategory?: MainCategory;
  categoryStructure?: CategoryStructure;
  image?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: RecipeDifficulty;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
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
  category?: string;
  difficulty?: RecipeDifficulty;
  tags?: string[];
  searchTerm?: string;
}

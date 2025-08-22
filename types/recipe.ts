// Utility types
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Recipe {
  slug: string;
  title: string;
  description: string | null;
  category: string;
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
  category: string;
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

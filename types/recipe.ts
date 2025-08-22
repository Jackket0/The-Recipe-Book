export interface Recipe {
  slug: string;
  title: string;
  description: string | null;
  category: string;
  image: string | null;
  prepTime: string | null;
  cookTime: string | null;
  servings: number | null;
  difficulty: 'Easy' | 'Medium' | 'Hard' | null;
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
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  dateCreated?: string;
  dateModified?: string;
}

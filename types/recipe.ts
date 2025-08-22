export interface Recipe {
  slug: string;
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

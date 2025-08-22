import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Recipe, RecipeFrontMatter, MainCategory, RecipeTag } from '@/types/recipe';
import { MAIN_CATEGORIES, getAllTags, getTagInfo } from './categories';

const recipesDirectory = path.join(process.cwd(), 'content/recipes');

export function getRecipeSlugs(): string[] {
  if (!fs.existsSync(recipesDirectory)) {
    return [];
  }
  
  return fs.readdirSync(recipesDirectory)
    .filter((name: string): boolean => name.endsWith('.md'))
    .map((name: string): string => name.replace(/\.md$/, ''));
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown content
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    
    const frontMatter = data as RecipeFrontMatter;
    
    // Validate category
    if (!frontMatter.category || !(frontMatter.category in MAIN_CATEGORIES)) {
      console.warn(`Invalid category "${frontMatter.category}" in recipe ${slug}`);
      return null;
    }
    
    // Validate and filter tags
    const validTags: RecipeTag[] = [];
    const allValidTags = getAllTags();
    
    if (frontMatter.tags) {
      frontMatter.tags.forEach(tag => {
        if (allValidTags.includes(tag as RecipeTag)) {
          validTags.push(tag as RecipeTag);
        } else {
          console.warn(`Invalid tag "${tag}" in recipe ${slug}`);
        }
      });
    }
    
    return {
      slug,
      title: frontMatter.title,
      description: frontMatter.description || null,
      category: frontMatter.category as MainCategory,
      tags: validTags,
      image: frontMatter.image || null,
      prepTime: frontMatter.prepTime || null,
      cookTime: frontMatter.cookTime || null,
      servings: frontMatter.servings || null,
      difficulty: frontMatter.difficulty || null,
      ingredients: frontMatter.ingredients || [],
      instructions: frontMatter.instructions || [],
      dateCreated: frontMatter.dateCreated || null,
      dateModified: frontMatter.dateModified || null,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading recipe ${slug}:`, error);
    return null;
  }
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const slugs: string[] = getRecipeSlugs();
  const recipes: (Recipe | null)[] = await Promise.all(
    slugs.map((slug: string) => getRecipeBySlug(slug))
  );
  
  // Filter out null values and sort by date created (newest first)
  return recipes
    .filter((recipe): recipe is Recipe => recipe !== null)
    .sort((a, b) => {
      if (a.dateCreated && b.dateCreated) {
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      }
      return a.title.localeCompare(b.title);
    });
}

export async function getRecipesByCategory(category: MainCategory): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.category === category
  );
}

export async function getRecipesByTag(tag: RecipeTag): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.tags.includes(tag)
  );
}

export async function getRecipesByTags(tags: RecipeTag[]): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    tags.some(tag => recipe.tags.includes(tag))
  );
}

export async function getCategories(): Promise<MainCategory[]> {
  const recipes: Recipe[] = await getAllRecipes();
  const categories: MainCategory[] = Array.from(
    new Set(recipes.map((recipe: Recipe): MainCategory => recipe.category))
  );
  return categories.sort();
}

export async function getTags(): Promise<RecipeTag[]> {
  const recipes: Recipe[] = await getAllRecipes();
  const allTags: RecipeTag[] = [];
  
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  
  return allTags.sort();
}

export async function getTagsWithCount(): Promise<{ tag: RecipeTag; count: number }[]> {
  const recipes: Recipe[] = await getAllRecipes();
  const tagCounts: Map<RecipeTag, number> = new Map();
  
  recipes.forEach(recipe => {
    recipe.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Search recipes by multiple criteria
export async function searchRecipes(filters: {
  category?: MainCategory;
  tags?: RecipeTag[];
  difficulty?: string;
  searchTerm?: string;
}): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  
  return recipes.filter(recipe => {
    // Filter by category
    if (filters.category && recipe.category !== filters.category) {
      return false;
    }
    
    // Filter by tags (any of the specified tags)
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => recipe.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    // Filter by difficulty
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesTitle = recipe.title.toLowerCase().includes(searchLower);
      const matchesDescription = recipe.description?.toLowerCase().includes(searchLower) || false;
      const matchesIngredients = recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchLower)
      );
      
      if (!matchesTitle && !matchesDescription && !matchesIngredients) {
        return false;
      }
    }
    
    return true;
  });
}

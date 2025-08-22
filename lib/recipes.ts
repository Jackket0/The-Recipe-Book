import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Recipe, RecipeFrontMatter, MainCategory, CategoryStructure } from '@/types/recipe';
import { MAIN_CATEGORIES, DIETARY_CATEGORIES, CUISINE_CATEGORIES, DRINK_CATEGORIES } from './categories';

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
    
    return {
      slug,
      title: frontMatter.title,
      description: frontMatter.description || null,
      category: frontMatter.category,
      mainCategory: frontMatter.mainCategory || null,
      categoryStructure: frontMatter.categoryStructure || null,
      image: frontMatter.image || null,
      prepTime: frontMatter.prepTime || null,
      cookTime: frontMatter.cookTime || null,
      servings: frontMatter.servings || null,
      difficulty: frontMatter.difficulty || null,
      ingredients: frontMatter.ingredients || [],
      instructions: frontMatter.instructions || [],
      tags: frontMatter.tags || null,
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

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getCategories(): Promise<string[]> {
  const recipes: Recipe[] = await getAllRecipes();
  const categories: string[] = Array.from(
    new Set(recipes.map((recipe: Recipe): string => recipe.category))
  );
  return categories.sort();
}

// New category-specific functions
export async function getRecipesByMainCategory(mainCategory: MainCategory): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.mainCategory === mainCategory ||
    // Fallback for backward compatibility
    recipe.category.toLowerCase() === mainCategory.toLowerCase()
  );
}

export async function getRecipesByDietaryCategory(dietaryCategory: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.categoryStructure?.dietary?.some(dietary => dietary === dietaryCategory) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(dietaryCategory.toLowerCase())) ||
    recipe.category.toLowerCase().includes(dietaryCategory.toLowerCase())
  );
}

export async function getRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.categoryStructure?.cuisine === cuisine ||
    recipe.tags?.some((tag: string): boolean => tag.toLowerCase().includes(cuisine.toLowerCase())) ||
    recipe.category.toLowerCase().includes(cuisine.toLowerCase())
  );
}

export async function getRecipesByDrinkType(drinkType: string): Promise<Recipe[]> {
  const recipes = await getAllRecipes();
  return recipes.filter((recipe: Recipe): boolean => 
    recipe.categoryStructure?.drinkType === drinkType ||
    recipe.tags?.some((tag: string): boolean => tag.toLowerCase().includes(drinkType.toLowerCase())) ||
    recipe.category.toLowerCase().includes(drinkType.toLowerCase()) ||
    recipe.title.toLowerCase().includes(drinkType.toLowerCase())
  );
}

export async function getMainCategories(): Promise<MainCategory[]> {
  const recipes = await getAllRecipes();
  const mainCategories = new Set<MainCategory>();
  
  recipes.forEach(recipe => {
    if (recipe.mainCategory) {
      mainCategories.add(recipe.mainCategory);
    }
    // Map existing categories to main categories
    const category = recipe.category.toLowerCase();
    if (category.includes('main') || category.includes('dinner') || category.includes('entree')) {
      mainCategories.add('Mains');
    } else if (category.includes('side')) {
      mainCategories.add('Sides');
    } else if (category.includes('drink') || category.includes('beverage')) {
      mainCategories.add('Drinks');
    } else if (category.includes('dessert') || category.includes('sweet')) {
      mainCategories.add('Desserts');
    } else if (category.includes('appetizer') || category.includes('starter')) {
      mainCategories.add('Appetizers');
    } else if (category.includes('breakfast')) {
      mainCategories.add('Breakfast');
    } else if (category.includes('lunch')) {
      mainCategories.add('Lunch');
    }
  });
  
  return Array.from(mainCategories).sort();
}

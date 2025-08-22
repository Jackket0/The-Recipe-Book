import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Recipe, RecipeFrontMatter } from '@/types/recipe';

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

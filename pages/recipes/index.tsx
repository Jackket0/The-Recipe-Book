import { GetStaticProps } from 'next';
import { useState } from 'react';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getAllRecipes, getCategories } from '@/lib/recipes';

interface RecipesProps {
  recipes: Recipe[];
  categories: string[];
}

export default function Recipes({ recipes, categories }: RecipesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <Layout
      title="All Recipes - The Recipe Book"
      description="Browse our complete collection of delicious recipes. Filter by category or search for your favorite dishes."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of {recipes.length} delicious recipes
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({recipes.length})
            </button>
            {categories.map((category) => {
              const count = recipes.filter(
                (r) => r.category.toLowerCase() === category.toLowerCase()
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 6.5a7.5 7.5 0 11-6 0 7.5 7.5 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search terms or category filter.'
                : 'Add your first recipe by creating a markdown file in the content/recipes/ directory.'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getAllRecipes();
  const categories = await getCategories();

  return {
    props: {
      recipes,
      categories,
    },
    revalidate: 60, // Revalidate every minute
  };
};

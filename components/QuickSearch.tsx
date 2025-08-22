import { useState, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/RecipeCard';

interface QuickSearchProps {
  recipes: Recipe[];
  maxResults?: number;
}

export default function QuickSearch({ recipes, maxResults = 6 }: QuickSearchProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredRecipes: Recipe[] = useMemo((): Recipe[] => {
    if (!searchTerm.trim()) {
      return [];
    }

    const term: string = searchTerm.toLowerCase().trim();
    
    return recipes.filter((recipe: Recipe): boolean => {
      // Search in title
      if (recipe.title.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in description
      if (recipe.description?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in category
      if (recipe.category.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in tags
      if (recipe.tags?.some((tag: string): boolean => tag.toLowerCase().includes(term))) {
        return true;
      }
      
      // Search in ingredients
      if (recipe.ingredients.some((ingredient: string): boolean => ingredient.toLowerCase().includes(term))) {
        return true;
      }
      
      return false;
    }).slice(0, maxResults);
  }, [recipes, searchTerm, maxResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Auto-expand if there's a search term and results
    if (value.trim() && filteredRecipes.length > 0) {
      setIsExpanded(true);
    } else if (!value.trim()) {
      setIsExpanded(false);
    }
  };

  const clearSearch = (): void => {
    setSearchTerm('');
    setIsExpanded(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
        <input
          type="text"
          placeholder="Search recipes by name, ingredient, category, or tag..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="mt-6">
          {filteredRecipes.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
                  {filteredRecipes.length === maxResults && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      (showing first {maxResults})
                    </span>
                  )}
                </h3>
                {filteredRecipes.length === maxResults && (
                  <a
                    href={`/recipes?search=${encodeURIComponent(searchTerm)}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View all results →
                  </a>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.slug} recipe={recipe} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-600">
                Try searching for different ingredients, categories, or recipe names.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

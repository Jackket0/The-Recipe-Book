import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getAllRecipes } from '@/lib/recipes';
import { getFavorites } from '@/lib/favorites';

interface FavoritesProps {
  recipes: Recipe[];
}

export default function Favorites({ recipes }: FavoritesProps): JSX.Element {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Get favorite recipe slugs from localStorage
    const favorites = getFavorites();
    const favoriteSlugs = favorites.map(fav => fav.slug);
    
    // Filter recipes to only show favorites
    const filteredRecipes = recipes.filter(recipe => 
      favoriteSlugs.includes(recipe.slug)
    );
    
    setFavoriteRecipes(filteredRecipes);
  }, [recipes]);

  // Listen for favorites changes
  useEffect(() => {
    const handleFavoritesChange = () => {
      const favorites = getFavorites();
      const favoriteSlugs = favorites.map(fav => fav.slug);
      const filteredRecipes = recipes.filter(recipe => 
        favoriteSlugs.includes(recipe.slug)
      );
      setFavoriteRecipes(filteredRecipes);
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, [recipes]);

  return (
    <Layout
      title="Favorites - The Recipe Book"
      description="Your favorite recipes from The Recipe Book collection."
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your <span className="text-orange-600">Favorite Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A curated collection of your most loved recipes. Save your favorites to quickly find them later.
            </p>
          </div>

          {/* Favorites Grid */}
          {!isClient ? (
            // Loading state while client-side hydration happens
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your favorites...</p>
            </div>
          ) : favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No favorites found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start exploring our recipes and add your favorites to see them here.
              </p>
              <a
                href="/recipes"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
              >
                Browse Recipes
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<FavoritesProps> = async () => {
  const recipes = await getAllRecipes();

  return {
    props: {
      recipes,
    },
    revalidate: 60,
  };
};

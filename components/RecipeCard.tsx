import React from 'react';
import { useRouter } from 'next/router';
import { Recipe } from '@/types/recipe';
import { CategoryBadge, TagBadgeSmall } from './CategoryBadge';
import FavoriteButton from './FavoriteButton';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();

  const handleClick = () => {
    if (recipe?.slug) {
      router.push(`/recipes/${recipe.slug}`);
    }
  };

  // Return null if recipe is not provided
  if (!recipe) {
    return null;
  }

  return (
    <div 
      onClick={handleClick}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
    >
        {/* Image */}
        <div className="relative h-48 w-full">
          {/* Favorite button overlay */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton 
              recipeSlug={recipe.slug} 
              recipeTitle={recipe.title}
              size="md"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            />
          </div>
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          )}
          {recipe.difficulty && (
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full text-white ${
                  recipe.difficulty === 'Easy'
                    ? 'bg-green-500'
                    : recipe.difficulty === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                {recipe.difficulty}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="mb-3">
            <CategoryBadge 
              category={recipe.category} 
              isClickable={true}
              className="text-xs"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
            {recipe.title}
          </h3>

          {recipe.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {recipe.description}
            </p>
          )}

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {recipe.tags.slice(0, 3).map((tag, index) => (
                <TagBadgeSmall 
                  key={index} 
                  tag={tag} 
                  isClickable={true}
                />
              ))}
              {recipe.tags.length > 3 && (
                <span className="text-xs text-gray-500 px-1.5 py-0.5">
                  +{recipe.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Recipe meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              {recipe.prepTime && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {recipe.prepTime}
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.servings} servings
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default RecipeCard;

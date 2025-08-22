import React, { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

interface FavoriteButtonProps {
  recipeSlug: string;
  recipeTitle: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  recipeSlug,
  recipeTitle,
  className = '',
  showText = false,
  size = 'md'
}) => {
  const [isFav, setIsFav] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setIsFav(isFavorite(recipeSlug));
  }, [recipeSlug]);

  // Listen for favorites changes
  useEffect(() => {
    const handleFavoritesChange = (event: CustomEvent) => {
      const { action, slug } = event.detail;
      if (slug === recipeSlug || action === 'clear' || action === 'import') {
        setIsFav(isFavorite(recipeSlug));
      }
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange as EventListener);
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange as EventListener);
    };
  }, [recipeSlug]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const success = toggleFavorite(recipeSlug, recipeTitle);
    if (success) {
      setIsFav(!isFav);
    }
  };

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const buttonClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${buttonClasses[size]}
        rounded-full
        transition-all
        duration-200
        hover:scale-110
        focus:outline-none
        focus:ring-2
        focus:ring-orange-500
        focus:ring-offset-2
        ${isFav 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
        }
        ${className}
      `}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={sizeClasses[size]}
        fill={isFav ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={isFav ? 0 : 2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {showText && (
        <span className="ml-2 text-sm font-medium">
          {isFav ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;

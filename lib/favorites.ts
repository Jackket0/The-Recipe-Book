/**
 * Favorites management using localStorage
 */

const FAVORITES_KEY = 'recipe-book-favorites';

export interface FavoriteRecipe {
  slug: string;
  title: string;
  addedAt: string;
}

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all favorite recipe slugs
 */
export function getFavorites(): FavoriteRecipe[] {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];
    
    const favorites = JSON.parse(stored);
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
}

/**
 * Add a recipe to favorites
 */
export function addToFavorites(slug: string, title: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const favorites = getFavorites();
    
    // Check if already in favorites
    if (favorites.some(fav => fav.slug === slug)) {
      return true; // Already added
    }
    
    const newFavorite: FavoriteRecipe = {
      slug,
      title,
      addedAt: new Date().toISOString()
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('favoritesChanged', {
      detail: { action: 'add', slug, title }
    }));
    
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

/**
 * Remove a recipe from favorites
 */
export function removeFromFavorites(slug: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.slug !== slug);
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('favoritesChanged', {
      detail: { action: 'remove', slug }
    }));
    
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

/**
 * Check if a recipe is in favorites
 */
export function isFavorite(slug: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  const favorites = getFavorites();
  return favorites.some(fav => fav.slug === slug);
}

/**
 * Toggle favorite status of a recipe
 */
export function toggleFavorite(slug: string, title: string): boolean {
  if (isFavorite(slug)) {
    return removeFromFavorites(slug);
  } else {
    return addToFavorites(slug, title);
  }
}

/**
 * Get favorite count
 */
export function getFavoriteCount(): number {
  return getFavorites().length;
}

/**
 * Clear all favorites
 */
export function clearAllFavorites(): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(FAVORITES_KEY);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('favoritesChanged', {
      detail: { action: 'clear' }
    }));
    
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}

/**
 * Export favorites as JSON
 */
export function exportFavorites(): string | null {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const favorites = getFavorites();
    return JSON.stringify(favorites, null, 2);
  } catch (error) {
    console.error('Error exporting favorites:', error);
    return null;
  }
}

/**
 * Import favorites from JSON
 */
export function importFavorites(jsonData: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const favorites = JSON.parse(jsonData);
    
    if (!Array.isArray(favorites)) {
      throw new Error('Invalid favorites format');
    }
    
    // Validate structure
    const validFavorites = favorites.filter((fav: unknown) => {
      if (!fav || typeof fav !== 'object') return false;
      const favorite = fav as Record<string, unknown>;
      return (
        typeof favorite.slug === 'string' && 
        typeof favorite.title === 'string' &&
        typeof favorite.addedAt === 'string'
      );
    });
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(validFavorites));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('favoritesChanged', {
      detail: { action: 'import', count: validFavorites.length }
    }));
    
    return true;
  } catch (error) {
    console.error('Error importing favorites:', error);
    return false;
  }
}

/**
 * Hook for React components to use favorites
 */
export function useFavorites() {
  if (typeof window === 'undefined') {
    return {
      favorites: [],
      addToFavorites: () => false,
      removeFromFavorites: () => false,
      isFavorite: () => false,
      toggleFavorite: () => false,
      getFavoriteCount: () => 0,
      clearAllFavorites: () => false
    };
  }
  
  return {
    favorites: getFavorites(),
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    getFavoriteCount,
    clearAllFavorites,
    exportFavorites,
    importFavorites
  };
}

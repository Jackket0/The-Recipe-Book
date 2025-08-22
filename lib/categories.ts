import { MainCategory, DietaryCategory, CuisineCategory, DrinkCategory } from '@/types/recipe';

// Category definitions with descriptions and icons
export interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  slug: string;
}

// Main categories
export const MAIN_CATEGORIES: Record<MainCategory, CategoryInfo> = {
  'Mains': {
    name: 'Mains',
    description: 'Hearty main dishes and entrees',
    icon: '🍽️',
    slug: 'mains'
  },
  'Sides': {
    name: 'Sides',
    description: 'Delicious side dishes and accompaniments',
    icon: '🥗',
    slug: 'sides'
  },
  'Drinks': {
    name: 'Drinks',
    description: 'Refreshing beverages and cocktails',
    icon: '🥤',
    slug: 'drinks'
  },
  'Desserts': {
    name: 'Desserts',
    description: 'Sweet treats and desserts',
    icon: '🍰',
    slug: 'desserts'
  },
  'Appetizers': {
    name: 'Appetizers',
    description: 'Starters and appetizers',
    icon: '🍤',
    slug: 'appetizers'
  },
  'Breakfast': {
    name: 'Breakfast',
    description: 'Morning meals and breakfast dishes',
    icon: '🥞',
    slug: 'breakfast'
  },
  'Lunch': {
    name: 'Lunch',
    description: 'Light meals and lunch options',
    icon: '🥪',
    slug: 'lunch'
  },
  'Dinner': {
    name: 'Dinner',
    description: 'Evening meals and dinner recipes',
    icon: '🍖',
    slug: 'dinner'
  }
};

// Dietary categories
export const DIETARY_CATEGORIES: Record<DietaryCategory, CategoryInfo> = {
  'High Protein': {
    name: 'High Protein',
    description: 'Protein-rich recipes for fitness and health',
    icon: '💪',
    slug: 'high-protein'
  },
  'Low Calorie': {
    name: 'Low Calorie',
    description: 'Light, healthy, low-calorie options',
    icon: '🌱',
    slug: 'low-calorie'
  },
  'Vegetarian': {
    name: 'Vegetarian',
    description: 'Meat-free vegetarian recipes',
    icon: '🥬',
    slug: 'vegetarian'
  },
  'Vegan': {
    name: 'Vegan',
    description: 'Plant-based vegan recipes',
    icon: '🌿',
    slug: 'vegan'
  },
  'Gluten-Free': {
    name: 'Gluten-Free',
    description: 'Gluten-free recipes and alternatives',
    icon: '🌾',
    slug: 'gluten-free'
  },
  'Keto': {
    name: 'Keto',
    description: 'Low-carb ketogenic diet recipes',
    icon: '🥑',
    slug: 'keto'
  },
  'Paleo': {
    name: 'Paleo',
    description: 'Paleo-friendly whole food recipes',
    icon: '🦴',
    slug: 'paleo'
  }
};

// Cuisine categories
export const CUISINE_CATEGORIES: Record<CuisineCategory, CategoryInfo> = {
  'Italian': {
    name: 'Italian',
    description: 'Traditional and modern Italian cuisine',
    icon: '🍝',
    slug: 'italian'
  },
  'Mexican': {
    name: 'Mexican',
    description: 'Authentic Mexican flavors and dishes',
    icon: '🌮',
    slug: 'mexican'
  },
  'Asian': {
    name: 'Asian',
    description: 'Various Asian cuisine styles',
    icon: '🥢',
    slug: 'asian'
  },
  'Indian': {
    name: 'Indian',
    description: 'Spicy and aromatic Indian dishes',
    icon: '🍛',
    slug: 'indian'
  },
  'Mediterranean': {
    name: 'Mediterranean',
    description: 'Fresh Mediterranean flavors',
    icon: '🫒',
    slug: 'mediterranean'
  },
  'American': {
    name: 'American',
    description: 'Classic American comfort food',
    icon: '🍔',
    slug: 'american'
  },
  'French': {
    name: 'French',
    description: 'Elegant French cooking techniques',
    icon: '🥖',
    slug: 'french'
  },
  'Thai': {
    name: 'Thai',
    description: 'Bold and flavorful Thai cuisine',
    icon: '🍜',
    slug: 'thai'
  },
  'Chinese': {
    name: 'Chinese',
    description: 'Traditional Chinese cooking',
    icon: '🥟',
    slug: 'chinese'
  },
  'Japanese': {
    name: 'Japanese',
    description: 'Authentic Japanese dishes',
    icon: '🍣',
    slug: 'japanese'
  }
};

// Drink categories
export const DRINK_CATEGORIES: Record<DrinkCategory, CategoryInfo> = {
  'Cocktail': {
    name: 'Cocktail',
    description: 'Alcoholic cocktails and mixed drinks',
    icon: '🍸',
    slug: 'cocktail'
  },
  'Mocktail': {
    name: 'Mocktail',
    description: 'Non-alcoholic cocktails and virgin drinks',
    icon: '🍹',
    slug: 'mocktail'
  },
  'Smoothie': {
    name: 'Smoothie',
    description: 'Healthy fruit and vegetable smoothies',
    icon: '🥤',
    slug: 'smoothie'
  },
  'Hot Drinks': {
    name: 'Hot Drinks',
    description: 'Warm beverages and hot drinks',
    icon: '☕',
    slug: 'hot-drinks'
  },
  'Cold Drinks': {
    name: 'Cold Drinks',
    description: 'Refreshing cold beverages',
    icon: '🧊',
    slug: 'cold-drinks'
  },
  'Juices': {
    name: 'Juices',
    description: 'Fresh fruit and vegetable juices',
    icon: '🧃',
    slug: 'juices'
  }
};

// Helper functions
export function getCategoryInfo(categoryType: 'main' | 'dietary' | 'cuisine' | 'drink', categoryName: string): CategoryInfo | null {
  // Convert slug back to proper name format
  const properName = categoryName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  switch (categoryType) {
    case 'main':
      return MAIN_CATEGORIES[properName as MainCategory] || null;
    case 'dietary':
      return DIETARY_CATEGORIES[properName as DietaryCategory] || null;
    case 'cuisine':
      return CUISINE_CATEGORIES[properName as CuisineCategory] || null;
    case 'drink':
      return DRINK_CATEGORIES[properName as DrinkCategory] || null;
    default:
      return null;
  }
}

export function getAllCategories(): {
  main: CategoryInfo[];
  dietary: CategoryInfo[];
  cuisine: CategoryInfo[];
  drink: CategoryInfo[];
} {
  return {
    main: Object.values(MAIN_CATEGORIES),
    dietary: Object.values(DIETARY_CATEGORIES),
    cuisine: Object.values(CUISINE_CATEGORIES),
    drink: Object.values(DRINK_CATEGORIES)
  };
}

export function getCategoryBySlug(slug: string): CategoryInfo | null {
  const allCategories = [
    ...Object.values(MAIN_CATEGORIES),
    ...Object.values(DIETARY_CATEGORIES),
    ...Object.values(CUISINE_CATEGORIES),
    ...Object.values(DRINK_CATEGORIES)
  ];
  
  return allCategories.find(cat => cat.slug === slug) || null;
}

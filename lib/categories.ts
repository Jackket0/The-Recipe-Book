import { MainCategory, DietaryTag, CuisineTag, OccasionTag, RecipeTag } from '@/types/recipe';

// Re-export types for convenience
export type { MainCategory, DietaryTag, CuisineTag, OccasionTag, RecipeTag };

// Category definitions with descriptions and icons
export interface CategoryInfo {
  name: string;
  description: string;
  icon: string;
  slug: string;
}

// Main categories - updated to match requirements
export const MAIN_CATEGORIES: Record<MainCategory, CategoryInfo> = {
  // Food categories
  'Mains': {
    name: 'Mains',
    description: 'Meat, fish, vegetarian mains',
    icon: '🍽️',
    slug: 'mains'
  },
  'Sides': {
    name: 'Sides',
    description: 'Vegetables, breads, accompaniments',
    icon: '🥗',
    slug: 'sides'
  },
  'Snacks': {
    name: 'Snacks',
    description: 'Finger foods, light bites',
    icon: '🍿',
    slug: 'snacks'
  },
  'Breakfast & Brunch': {
    name: 'Breakfast & Brunch',
    description: 'Pancakes, eggs, cereals',
    icon: '🥞',
    slug: 'breakfast-brunch'
  },
  'Lunch': {
    name: 'Lunch',
    description: 'Quick meals, salads, sandwiches',
    icon: '🥪',
    slug: 'lunch'
  },
  'Dinner': {
    name: 'Dinner',
    description: 'Heavier meals, multi-course',
    icon: '🍖',
    slug: 'dinner'
  },
  'Desserts': {
    name: 'Desserts',
    description: 'Cakes, puddings, ice creams',
    icon: '🍰',
    slug: 'desserts'
  },
  'Baking': {
    name: 'Baking',
    description: 'Bread, pastries, baked treats',
    icon: '🥖',
    slug: 'baking'
  },
  // Drink categories
  'Mocktails': {
    name: 'Mocktails',
    description: 'Non-alcoholic mixes',
    icon: '🍹',
    slug: 'mocktails'
  },
  'Cocktails': {
    name: 'Cocktails',
    description: 'Alcoholic mixes',
    icon: '🍸',
    slug: 'cocktails'
  },
  'Smoothies & Juices': {
    name: 'Smoothies & Juices',
    description: 'Fruit, veg-based',
    icon: '🥤',
    slug: 'smoothies-juices'
  },
  'Shakes': {
    name: 'Shakes',
    description: 'Milkshakes, protein shakes',
    icon: '🥛',
    slug: 'shakes'
  }
};

// Dietary tags - updated to match requirements
export const DIETARY_TAGS: Record<DietaryTag, CategoryInfo> = {
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
  'Dairy-Free': {
    name: 'Dairy-Free',
    description: 'Dairy-free recipes and alternatives',
    icon: '🥛',
    slug: 'dairy-free'
  },
  'Keto / Low Carb': {
    name: 'Keto / Low Carb',
    description: 'Low-carb ketogenic diet recipes',
    icon: '🥑',
    slug: 'keto-low-carb'
  },
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
  'Low Fat': {
    name: 'Low Fat',
    description: 'Low-fat healthy recipes',
    icon: '🥗',
    slug: 'low-fat'
  }
};

// Cuisine tags - updated to match requirements
export const CUISINE_TAGS: Record<CuisineTag, CategoryInfo> = {
  'Italian': {
    name: 'Italian',
    description: 'Traditional and modern Italian cuisine',
    icon: '🍝',
    slug: 'italian'
  },
  'Indian': {
    name: 'Indian',
    description: 'Spicy and aromatic Indian dishes',
    icon: '🍛',
    slug: 'indian'
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
  },
  'Mediterranean': {
    name: 'Mediterranean',
    description: 'Fresh Mediterranean flavors',
    icon: '🫒',
    slug: 'mediterranean'
  },
  'Middle Eastern': {
    name: 'Middle Eastern',
    description: 'Rich Middle Eastern cuisine',
    icon: '🥙',
    slug: 'middle-eastern'
  },
  'Mexican': {
    name: 'Mexican',
    description: 'Authentic Mexican flavors and dishes',
    icon: '🌮',
    slug: 'mexican'
  },
  'British': {
    name: 'British',
    description: 'Classic British comfort food',
    icon: '🍽️',
    slug: 'british'
  },
  'American': {
    name: 'American',
    description: 'Classic American comfort food',
    icon: '🍔',
    slug: 'american'
  }
};

// Occasion tags - updated to match requirements
export const OCCASION_TAGS: Record<OccasionTag, CategoryInfo> = {
  'Quick Meals': {
    name: 'Quick Meals',
    description: 'Under 30 minutes',
    icon: '⚡',
    slug: 'quick-meals'
  },
  'Meal Prep': {
    name: 'Meal Prep',
    description: 'Perfect for meal preparation',
    icon: '📦',
    slug: 'meal-prep'
  },
  'Comfort Food': {
    name: 'Comfort Food',
    description: 'Cozy and comforting dishes',
    icon: '🏠',
    slug: 'comfort-food'
  },
  'Party Food': {
    name: 'Party Food',
    description: 'Perfect for gatherings and parties',
    icon: '🎉',
    slug: 'party-food'
  },
  'Kids Friendly': {
    name: 'Kids Friendly',
    description: 'Kid-approved recipes',
    icon: '👶',
    slug: 'kids-friendly'
  },
  'Seasonal': {
    name: 'Seasonal',
    description: 'Christmas, Summer BBQ, etc.',
    icon: '🌤️',
    slug: 'seasonal'
  }
};

// Helper functions
export function getCategoryInfo(categoryType: 'main' | 'dietary' | 'cuisine' | 'occasion', categoryName: string): CategoryInfo | null {
  // Convert slug back to proper name format
  const properName: string = categoryName.split('-').map((word: string): string => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  switch (categoryType) {
    case 'main':
      return MAIN_CATEGORIES[properName as MainCategory] || null;
    case 'dietary':
      return DIETARY_TAGS[properName as DietaryTag] || null;
    case 'cuisine':
      return CUISINE_TAGS[properName as CuisineTag] || null;
    case 'occasion':
      return OCCASION_TAGS[properName as OccasionTag] || null;
    default:
      return null;
  }
}

export function getAllCategories(): {
  main: CategoryInfo[];
  dietary: CategoryInfo[];
  cuisine: CategoryInfo[];
  occasion: CategoryInfo[];
} {
  return {
    main: Object.values(MAIN_CATEGORIES),
    dietary: Object.values(DIETARY_TAGS),
    cuisine: Object.values(CUISINE_TAGS),
    occasion: Object.values(OCCASION_TAGS)
  };
}

export function getCategoryBySlug(slug: string): CategoryInfo | null {
  const allCategories: CategoryInfo[] = [
    ...Object.values(MAIN_CATEGORIES),
    ...Object.values(DIETARY_TAGS),
    ...Object.values(CUISINE_TAGS),
    ...Object.values(OCCASION_TAGS)
  ];
  
  return allCategories.find((cat: CategoryInfo): boolean => cat.slug === slug) || null;
}

// Get all available tags
export function getAllTags(): RecipeTag[] {
  return [
    ...Object.keys(DIETARY_TAGS),
    ...Object.keys(CUISINE_TAGS),
    ...Object.keys(OCCASION_TAGS)
  ] as RecipeTag[];
}

// Get tag info by tag name
export function getTagInfo(tag: RecipeTag): CategoryInfo | null {
  if (tag in DIETARY_TAGS) {
    return DIETARY_TAGS[tag as DietaryTag];
  }
  if (tag in CUISINE_TAGS) {
    return CUISINE_TAGS[tag as CuisineTag];
  }
  if (tag in OCCASION_TAGS) {
    return OCCASION_TAGS[tag as OccasionTag];
  }
  return null;
}

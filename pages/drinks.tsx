import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getAllRecipes } from '@/lib/recipes';
import { DRINK_CATEGORIES } from '@/lib/categories';

interface DrinksProps {
  recipes: Recipe[];
}

export default function Drinks({ recipes }: DrinksProps): JSX.Element {
  // Filter recipes to show only drinks (you can adjust this logic based on your recipe structure)
  const drinkRecipes = recipes.filter(recipe => 
    recipe.category?.toLowerCase().includes('drink') || 
    recipe.tags?.some(tag => tag.toLowerCase().includes('drink')) ||
    recipe.title.toLowerCase().includes('drink') ||
    recipe.title.toLowerCase().includes('cocktail') ||
    recipe.title.toLowerCase().includes('smoothie') ||
    recipe.title.toLowerCase().includes('juice')
  );

  return (
    <Layout
      title="Drink Recipes - The Recipe Book"
      description="Refreshing drink recipes including cocktails, smoothies, juices, and more from The Recipe Book."
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-orange-600">Drink Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quench your thirst with our collection of refreshing drinks. From energizing smoothies to relaxing cocktails.
            </p>
          </div>

          {/* Drinks Grid */}
          {drinkRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {drinkRecipes.map((recipe) => (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a8.949 8.949 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No drink recipes yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're working on adding some refreshing drink recipes. Check back soon!
              </p>
              <a
                href="/recipes"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
              >
                Browse All Recipes
              </a>
            </div>
          )}

          {/* Categories Section */}
          <section className="mt-16 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Drink Categories
              </h2>
              <p className="text-lg text-gray-600">
                Explore different types of drinks
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {Object.values(DRINK_CATEGORIES).map((category) => (
                <Link
                  key={category.slug}
                  href={`/recipes/drinks/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<DrinksProps> = async () => {
  const recipes = await getAllRecipes();

  return {
    props: {
      recipes,
    },
    revalidate: 60,
  };
};

import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getAllRecipes } from '@/lib/recipes';

interface HomeProps {
  recipes: Recipe[];
}

export default function Home({ recipes }: HomeProps) {
  const featuredRecipes = recipes.slice(0, 6);

  return (
    <Layout
      title="The Recipe Book - Delicious Recipes for Every Occasion"
      description="Discover a collection of mouth-watering recipes from around the world. From quick weeknight dinners to special occasion treats."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="text-primary-600">The Recipe Book</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover delicious recipes from around the world. From quick weeknight
            dinners to special occasion treats, find your next favorite dish here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/recipes"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Browse All Recipes
            </a>
            <a
              href="/about"
              className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Recipes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {recipes.length > 0
                ? 'Check out some of our most popular and delicious recipes'
                : 'No recipes available yet. Add some recipes to get started!'}
            </p>
          </div>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No recipes yet
              </h3>
              <p className="text-gray-600 mb-4">
                Add your first recipe by creating a markdown file in the{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  content/recipes/
                </code>{' '}
                directory.
              </p>
            </div>
          )}

          {recipes.length > 6 && (
            <div className="text-center mt-12">
              <a
                href="/recipes"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
              >
                View All Recipes ({recipes.length})
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getAllRecipes();

  return {
    props: {
      recipes,
    },
    revalidate: 60, // Revalidate every minute
  };
};

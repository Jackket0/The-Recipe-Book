import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getRecipesByDrinkType } from '@/lib/recipes';
import { DRINK_CATEGORIES, getCategoryInfo, CategoryInfo } from '@/lib/categories';

interface DrinkCategoryPageProps {
  recipes: Recipe[];
  category: string;
  categoryInfo: CategoryInfo;
}

export default function DrinkCategoryPage({ recipes, category, categoryInfo }: DrinkCategoryPageProps): JSX.Element {
  return (
    <Layout
      title={`${categoryInfo.name} Recipes - The Recipe Book`}
      description={`Discover refreshing ${categoryInfo.name.toLowerCase()} recipes. ${categoryInfo.description}`}
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="flex items-center justify-center mb-4">
              <span className="text-6xl mr-4">{categoryInfo.icon}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span className="text-orange-600">{categoryInfo.name}</span> Recipes
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {categoryInfo.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Recipes Grid */}
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">{categoryInfo.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No {categoryInfo.name.toLowerCase()} recipes yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're working on adding delicious {categoryInfo.name.toLowerCase()} recipes. Check back soon!
              </p>
              <a
                href="/recipes"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
              >
                Browse All Recipes
              </a>
            </div>
          )}

          {/* Tips Section */}
          {recipes.length > 0 && (
            <section className="mt-16 py-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">{categoryInfo.icon}</span>
                  {categoryInfo.name} Tips
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                  {(categoryInfo.name === 'Cocktail' || categoryInfo.name === 'Mocktail') && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Balance is Key</h3>
                        <p>Perfect drinks balance sweet, sour, bitter, and strong elements for complexity.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Fresh Ingredients</h3>
                        <p>Use fresh citrus juices and quality ingredients for the best flavor profiles.</p>
                      </div>
                    </>
                  )}
                  {categoryInfo.name === 'Smoothie' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Texture Tips</h3>
                        <p>Freeze fruits beforehand for thicker consistency without diluting flavors.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Nutrition Boost</h3>
                        <p>Add protein powder, chia seeds, or spinach for extra nutritional value.</p>
                      </div>
                    </>
                  )}
                  {categoryInfo.name === 'Hot Drinks' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Temperature Control</h3>
                        <p>Don't boil delicate ingredients; steep at appropriate temperatures for best results.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Flavor Enhancement</h3>
                        <p>Warm spices and aromatics before adding to enhance their flavor compounds.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(DRINK_CATEGORIES).map((category) => ({
    params: { drink: category.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<DrinkCategoryPageProps> = async ({ params }) => {
  const drinkParam = params?.drink as string;
  
  if (!drinkParam) {
    return {
      notFound: true,
    };
  }

  const categoryInfo = getCategoryInfo('drink', drinkParam.replace(/-/g, ' '));
  
  if (!categoryInfo) {
    return {
      notFound: true,
    };
  }

  const recipes = await getRecipesByDrinkType(categoryInfo.name);

  return {
    props: {
      recipes,
      category: drinkParam,
      categoryInfo,
    },
    revalidate: 60,
  };
};

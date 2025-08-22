import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getRecipesByCuisine } from '@/lib/recipes';
import { CUISINE_CATEGORIES, getCategoryInfo, CategoryInfo } from '@/lib/categories';

interface CuisineCategoryPageProps {
  recipes: Recipe[];
  category: string;
  categoryInfo: CategoryInfo;
}

export default function CuisineCategoryPage({ recipes, category, categoryInfo }: CuisineCategoryPageProps): JSX.Element {
  return (
    <Layout
      title={`${categoryInfo.name} Recipes - The Recipe Book`}
      description={`Explore authentic ${categoryInfo.name.toLowerCase()} cuisine. ${categoryInfo.description}`}
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="flex items-center justify-center mb-4">
              <span className="text-6xl mr-4">{categoryInfo.icon}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span className="text-orange-600">{categoryInfo.name}</span> Cuisine
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
                We're working on adding authentic {categoryInfo.name.toLowerCase()} recipes. Check back soon!
              </p>
              <a
                href="/recipes"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors inline-block"
              >
                Browse All Recipes
              </a>
            </div>
          )}

          {/* Cultural Info Section */}
          {recipes.length > 0 && (
            <section className="mt-16 py-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">{categoryInfo.icon}</span>
                  About {categoryInfo.name} Cuisine
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                  {categoryInfo.name === 'Italian' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Key Ingredients</h3>
                        <p>Fresh basil, tomatoes, olive oil, garlic, and high-quality cheeses like Parmigiano-Reggiano.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Cooking Philosophy</h3>
                        <p>Simple preparations that highlight the natural flavors of fresh, seasonal ingredients.</p>
                      </div>
                    </>
                  )}
                  {categoryInfo.name === 'Mexican' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Essential Spices</h3>
                        <p>Cumin, chili powder, paprika, and fresh cilantro create the vibrant flavor profiles.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Traditional Methods</h3>
                        <p>Many dishes benefit from slow cooking and the use of traditional techniques like nixtamalization.</p>
                      </div>
                    </>
                  )}
                  {categoryInfo.name === 'Asian' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Balance Principles</h3>
                        <p>Focus on balancing sweet, sour, salty, bitter, and umami flavors in each dish.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Cooking Techniques</h3>
                        <p>Stir-frying, steaming, and braising are common methods that preserve nutrients and texture.</p>
                      </div>
                    </>
                  )}
                  {categoryInfo.name === 'Indian' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Spice Mastery</h3>
                        <p>Complex spice blends (masalas) are often freshly ground for maximum flavor impact.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Regional Variety</h3>
                        <p>Each region has distinct flavors, from coconut-based South Indian to dairy-rich North Indian dishes.</p>
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
  const paths = Object.values(CUISINE_CATEGORIES).map((category) => ({
    params: { cuisine: category.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<CuisineCategoryPageProps> = async ({ params }) => {
  const cuisineParam = params?.cuisine as string;
  
  if (!cuisineParam) {
    return {
      notFound: true,
    };
  }

  const categoryInfo = getCategoryInfo('cuisine', cuisineParam.replace(/-/g, ' '));
  
  if (!categoryInfo) {
    return {
      notFound: true,
    };
  }

  const recipes = await getRecipesByCuisine(categoryInfo.name);

  return {
    props: {
      recipes,
      category: cuisineParam,
      categoryInfo,
    },
    revalidate: 60,
  };
};

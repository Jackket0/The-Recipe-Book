import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, DietaryTag } from '@/types/recipe';
import { getRecipesByTag } from '@/lib/recipes';
import { DIETARY_TAGS, getTagInfo } from '@/lib/categories';

interface DietaryCategoryPageProps {
  recipes: Recipe[];
  tag: DietaryTag;
  tagInfo: {
    name: string;
    description: string;
    icon: string;
  } | null;
}

export default function DietaryCategoryPage({ recipes, tag, tagInfo }: DietaryCategoryPageProps): JSX.Element {
  return (
    <Layout
      title={`${tagInfo?.name || tag} Recipes - The Recipe Book`}
      description={`Discover delicious ${tagInfo?.name.toLowerCase() || tag.toLowerCase()} recipes. ${tagInfo?.description || ''}`}
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="flex items-center justify-center mb-4">
              {tagInfo?.icon && <span className="text-6xl mr-4">{tagInfo.icon}</span>}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span className="text-orange-600">{tagInfo?.name || tag}</span> Recipes
              </h1>
            </div>
            {tagInfo?.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {tagInfo.description}
              </p>
            )}
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
                {tagInfo?.icon && <span className="text-4xl">{tagInfo.icon}</span>}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No {tagInfo?.name.toLowerCase() || tag.toLowerCase()} recipes yet
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're working on adding more {tagInfo?.name.toLowerCase() || tag.toLowerCase()} recipes. Check back soon!
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
          {recipes.length > 0 && tagInfo && (
            <section className="mt-16 py-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">{tagInfo.icon}</span>
                  {tagInfo.name} Tips
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                  {tagInfo.name === 'High Protein' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Protein Sources</h3>
                        <p>Include lean meats, fish, eggs, legumes, and dairy for complete protein profiles.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Timing</h3>
                        <p>Consume protein within 30 minutes after workouts for optimal muscle recovery.</p>
                      </div>
                    </>
                  )}
                  {tagInfo.name === 'Low Calorie' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Volume Foods</h3>
                        <p>Focus on vegetables and fruits that provide volume with fewer calories.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Cooking Methods</h3>
                        <p>Use steaming, grilling, or baking instead of frying to reduce calorie content.</p>
                      </div>
                    </>
                  )}
                  {(tagInfo.name === 'Vegetarian' || tagInfo.name === 'Vegan') && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Protein Balance</h3>
                        <p>Combine different plant proteins throughout the day for complete amino acid profiles.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Nutrient Focus</h3>
                        <p>Pay attention to B12, iron, and omega-3 fatty acids in your meal planning.</p>
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
  const paths = Object.values(DIETARY_TAGS).map((tag) => ({
    params: { dietary: tag.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<DietaryCategoryPageProps> = async ({ params }) => {
  const dietarySlug = params?.dietary as string;
  
  if (!dietarySlug) {
    return {
      notFound: true,
    };
  }

  // Find the tag by slug
  const tag = Object.keys(DIETARY_TAGS).find(tagName => {
    const tagInfo = DIETARY_TAGS[tagName as DietaryTag];
    return tagInfo.slug === dietarySlug;
  }) as DietaryTag | undefined;
  
  if (!tag) {
    return {
      notFound: true,
    };
  }

  const recipes = await getRecipesByTag(tag);
  const tagInfo = getTagInfo(tag);

  return {
    props: {
      recipes,
      tag,
      tagInfo: tagInfo ? {
        name: tagInfo.name,
        description: tagInfo.description,
        icon: tagInfo.icon,
      } : null,
    },
    revalidate: 60,
  };
};

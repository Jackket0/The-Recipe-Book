import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, CuisineTag } from '@/types/recipe';
import { getRecipesByTag } from '@/lib/recipes';
import { CUISINE_TAGS, getTagInfo } from '@/lib/categories';

interface CuisineCategoryPageProps {
  recipes: Recipe[];
  tag: CuisineTag;
  tagInfo: {
    name: string;
    description: string;
    icon: string;
  } | null;
}

export default function CuisineCategoryPage({ recipes, tag, tagInfo }: CuisineCategoryPageProps): JSX.Element {
  return (
    <Layout
      title={`${tagInfo?.name || tag} Recipes - The Recipe Book`}
      description={`Explore authentic ${tagInfo?.name.toLowerCase() || tag.toLowerCase()} cuisine. ${tagInfo?.description || ''}`}
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-10">
            <div className="flex items-center justify-center mb-4">
              {tagInfo?.icon && <span className="text-6xl mr-4">{tagInfo.icon}</span>}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                <span className="text-orange-600">{tagInfo?.name || tag}</span> Cuisine
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
                We're working on adding authentic {tagInfo?.name.toLowerCase() || tag.toLowerCase()} recipes. Check back soon!
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
          {recipes.length > 0 && tagInfo && (
            <section className="mt-16 py-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">{tagInfo.icon}</span>
                  About {tagInfo.name} Cuisine
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                  {tagInfo.name === 'Italian' && (
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
                  {tagInfo.name === 'Mexican' && (
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
                  {tagInfo.name === 'Chinese' && (
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
                  {tagInfo.name === 'Indian' && (
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
  const paths = Object.values(CUISINE_TAGS).map((tag) => ({
    params: { cuisine: tag.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CuisineCategoryPageProps> = async ({ params }) => {
  const cuisineSlug = params?.cuisine as string;
  
  if (!cuisineSlug) {
    return {
      notFound: true,
    };
  }

  // Find the tag by slug
  const tag = Object.keys(CUISINE_TAGS).find(tagName => {
    const tagInfo = CUISINE_TAGS[tagName as CuisineTag];
    return tagInfo.slug === cuisineSlug;
  }) as CuisineTag | undefined;
  
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

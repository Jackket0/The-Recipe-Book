import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, RecipeTag } from '@/types/recipe';
import { getAllRecipes, getRecipesByTag, getTagsWithCount } from '@/lib/recipes';
import { getTagInfo } from '@/lib/categories';

interface TagPageProps {
  recipes: Recipe[];
  tag: RecipeTag;
  tagInfo: {
    name: string;
    description: string;
    icon: string;
  } | null;
}

export default function TagPage({ recipes, tag, tagInfo }: TagPageProps): JSX.Element {
  return (
    <Layout
      title={`${tagInfo?.name || tag} Recipes - The Recipe Book`}
      description={`Discover delicious ${tagInfo?.name.toLowerCase() || tag.toLowerCase()} recipes`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-primary-600">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/recipes" className="hover:text-primary-600">
                  Recipes
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-900">{tagInfo?.name || tag}</li>
            </ol>
          </nav>

          <div className="flex items-center mb-4">
            {tagInfo?.icon && (
              <span className="text-3xl mr-3">{tagInfo.icon}</span>
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {tagInfo?.name || tag} Recipes
            </h1>
          </div>

          {tagInfo?.description && (
            <p className="text-lg text-gray-600 mb-6">
              {tagInfo.description}
            </p>
          )}

          <p className="text-gray-600">
            Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} with this tag.
          </p>
        </div>

        {/* Recipes Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any recipes with the "{tagInfo?.name || tag}" tag.
            </p>
            <a
              href="/recipes"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse all recipes
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tagsWithCount = await getTagsWithCount();
  const paths = tagsWithCount.map(({ tag }) => ({
    params: { tag: getTagInfo(tag)?.slug || tag.toLowerCase().replace(/\s+/g, '-') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
  const tagSlug = params?.tag as string;
  
  // Find the tag by slug
  const allTags = await getTagsWithCount();
  const tag = allTags.find(({ tag }) => {
    const tagInfo = getTagInfo(tag);
    return tagInfo?.slug === tagSlug;
  })?.tag;

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

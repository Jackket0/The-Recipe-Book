import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Recipe } from '@/types/recipe';
import { getAllRecipes, getRecipeBySlug } from '@/lib/recipes';

interface RecipePageProps {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: RecipePageProps) {
  return (
    <Layout
      title={`${recipe.title} - The Recipe Book`}
      description={recipe.description || `Learn how to make ${recipe.title}`}
    >
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/recipes" className="hover:text-primary-600">
                Recipes
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{recipe.title}</li>
          </ol>
        </nav>

        {/* Recipe Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
              {recipe.category}
            </span>
            {recipe.difficulty && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                  recipe.difficulty === 'Easy'
                    ? 'bg-green-500'
                    : recipe.difficulty === 'Medium'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              >
                {recipe.difficulty}
              </span>
            )}
            {recipe.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>

          {recipe.description && (
            <p className="text-xl text-gray-600 mb-6">{recipe.description}</p>
          )}

          {/* Recipe Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            {recipe.prepTime && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Prep: {recipe.prepTime}</span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span>Cook: {recipe.cookTime}</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>Serves: {recipe.servings}</span>
              </div>
            )}
          </div>
        </header>

        {/* Recipe Image */}
        {recipe.image && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ingredients
              </h2>
              {recipe.ingredients.length > 0 ? (
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No ingredients listed.</p>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Instructions
            </h2>
            {recipe.instructions.length > 0 ? (
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="recipe-content" dangerouslySetInnerHTML={{ __html: recipe.content }} />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/recipes"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all recipes
          </Link>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getAllRecipes();
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
    revalidate: 60, // Revalidate every minute
  };
};

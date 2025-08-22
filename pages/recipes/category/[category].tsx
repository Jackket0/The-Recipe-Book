import { GetStaticPaths, GetStaticProps } from 'next';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import RecipeCard from '@/components/RecipeCard';
import { Recipe, MainCategory } from '@/types/recipe';
import { getAllRecipes, getCategories, getRecipesByCategory } from '@/lib/recipes';
import { MAIN_CATEGORIES, getCategoryInfo } from '@/lib/categories';

interface CategoryPageProps {
  recipes: Recipe[];
  category: MainCategory;
  allCategories: MainCategory[];
  categoryInfo: {
    name: string;
    description: string;
    icon: string;
  } | null;
}

export default function CategoryPage({ recipes, category, allCategories, categoryInfo }: CategoryPageProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes: Recipe[] = recipes.filter((recipe: Recipe): boolean => {
    return (
      searchTerm === '' ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      recipe.tags.some((tag: string): boolean =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <Layout
      title={`${categoryInfo?.name || category} Recipes - The Recipe Book`}
      description={`Discover delicious ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} recipes. Browse our collection of ${recipes.length} ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} recipes.`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link href="/recipes" className="hover:text-primary-600 transition-colors">
                Recipes
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">
              {categoryInfo?.name || category}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {categoryInfo?.icon && (
              <span className="text-4xl mr-3">{categoryInfo.icon}</span>
            )}
            <h1 className="text-4xl font-bold text-gray-900">
              {categoryInfo?.name || category} Recipes
            </h1>
          </div>
          {categoryInfo?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              {categoryInfo.description}
            </p>
          )}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of {recipes.length} delicious {categoryInfo?.name.toLowerCase() || category.toLowerCase()} recipes
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Browse Other Categories:</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/recipes"
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              All Recipes
            </Link>
            {allCategories.map((cat) => {
              const catInfo = MAIN_CATEGORIES[cat];
              return (
                <Link
                  key={cat}
                  href={`/recipes/category/${catInfo?.slug || cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {catInfo?.name || cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={`Search ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} recipes...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Results */}
        {filteredRecipes.length > 0 ? (
          <>
            {searchTerm && (
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Showing {filteredRecipes.length} of {recipes.length} {categoryInfo?.name.toLowerCase() || category.toLowerCase()} recipes
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} />
              ))}
            </div>
          </>
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
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 6.5a7.5 7.5 0 11-6 0 7.5 7.5 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? `No ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} recipes match "${searchTerm}". Try a different search term.`
                : `No recipes found in the ${categoryInfo?.name.toLowerCase() || category.toLowerCase()} category.`}
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Browse All Recipes
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  
  const paths = categories.map((category) => {
    const categoryInfo = MAIN_CATEGORIES[category];
    return {
      params: { 
        category: categoryInfo?.slug || category.toLowerCase().replace(/\s+/g, '-') 
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const categorySlug = params?.category as string;
  
  if (!categorySlug) {
    return {
      notFound: true,
    };
  }

  // Find the category by slug
  const allCategories = await getCategories();
  const category = allCategories.find((cat) => {
    const categoryInfo = MAIN_CATEGORIES[cat];
    return categoryInfo?.slug === categorySlug;
  });

  if (!category) {
    return {
      notFound: true,
    };
  }

  const recipes = await getRecipesByCategory(category);
  const categoryInfo = MAIN_CATEGORIES[category];

  return {
    props: {
      recipes,
      category,
      allCategories,
      categoryInfo: categoryInfo ? {
        name: categoryInfo.name,
        description: categoryInfo.description,
        icon: categoryInfo.icon,
      } : null,
    },
    revalidate: 60,
  };
};

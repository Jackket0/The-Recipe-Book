import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getAllCategories, CategoryInfo } from '@/lib/categories';

interface CategoriesPageProps {
  categories: {
    main: CategoryInfo[];
    dietary: CategoryInfo[];
    cuisine: CategoryInfo[];
    drink: CategoryInfo[];
  };
}

export default function CategoriesPage({ categories }: CategoriesPageProps): JSX.Element {
  return (
    <Layout
      title="Recipe Categories - The Recipe Book"
      description="Explore our comprehensive collection of recipe categories including main dishes, dietary preferences, cuisines, and drinks."
    >
      <div className="bg-gray-50 min-h-screen pt-4 lg:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recipe <span className="text-orange-600">Categories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover recipes organized by type, dietary preferences, cuisine, and drink categories to find exactly what you're looking for.
            </p>
          </div>

          {/* Main Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Main Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.main.map((category) => (
                <Link
                  key={category.slug}
                  href={`/recipes/category/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Dietary Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Dietary Preferences</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.dietary.map((category) => (
                <Link
                  key={category.slug}
                  href={`/recipes/dietary/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Cuisine Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">World Cuisines</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.cuisine.map((category) => (
                <Link
                  key={category.slug}
                  href={`/recipes/cuisine/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Drink Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Beverages</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {categories.drink.map((category) => (
                <Link
                  key={category.slug}
                  href={`/recipes/drinks/${category.slug}`}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Tips */}
          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse Tips</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold text-gray-800 mb-2">Search Within</h3>
                <p className="text-sm text-gray-600">Use the search function on each category page to find specific recipes.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🏷️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Filter by Tags</h3>
                <p className="text-sm text-gray-600">Look for additional tags on recipes for more specific filtering.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-semibold text-gray-800 mb-2">Save Favorites</h3>
                <p className="text-sm text-gray-600">Mark recipes as favorites to easily find them later.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">All categories work perfectly on mobile devices for cooking.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<CategoriesPageProps> = async () => {
  const categories = getAllCategories();

  return {
    props: {
      categories,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

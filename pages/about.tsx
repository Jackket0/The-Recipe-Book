import Link from 'next/link';
import Layout from '@/components/Layout';

export default function About(): JSX.Element {
  return (
    <Layout
      title="About - The Recipe Book"
      description="Learn more about The Recipe Book and our mission to share delicious recipes with food lovers everywhere."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About The Recipe Book
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passion project dedicated to collecting and sharing delicious
            recipes from around the world.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Recipe Book was created to be a simple, beautiful, and
              accessible collection of recipes for home cooks of all skill
              levels. Whether you're looking for a quick weeknight dinner or
              planning a special occasion meal, we believe that good food brings
              people together and creates lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🍳 Easy to Follow
              </h3>
              <p className="text-gray-600">
                Our recipes are written with clear, step-by-step instructions
                that make cooking accessible to everyone, from beginners to
                experienced chefs.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                🌍 Global Flavors
              </h3>
              <p className="text-gray-600">
                Explore cuisines from around the world and discover new flavors,
                techniques, and ingredients to expand your culinary horizons.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ⏰ Time-Friendly
              </h3>
              <p className="text-gray-600">
                Find recipes that fit your schedule, from quick 15-minute meals
                to elaborate weekend projects that are worth the extra time.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                📱 Modern & Clean
              </h3>
              <p className="text-gray-600">
                Built with modern web technologies for a fast, responsive
                experience that works beautifully on all your devices.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Browse & Discover
                  </h4>
                  <p className="text-gray-600">
                    Explore our collection of recipes, filter by category, or
                    search for specific dishes.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Get Organized
                  </h4>
                  <p className="text-gray-600">
                    Each recipe includes prep time, cooking time, difficulty
                    level, and serving size to help you plan.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-4 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">Cook & Enjoy</h4>
                  <p className="text-gray-600">
                    Follow the clear instructions and ingredient list to create
                    delicious meals for yourself and your loved ones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse our collection of recipes and find your next favorite dish.
            </p>
            <Link
              href="/recipes"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
            >
              Explore All Recipes
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

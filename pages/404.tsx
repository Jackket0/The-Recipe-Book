import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Custom404() {
  return (
    <Layout title="Page Not Found">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-500 mb-8">
              The page you're looking for doesn't exist.
            </p>
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Go back home
              </Link>
              <div className="text-sm text-gray-500">
                <p>Or try one of these pages:</p>
                <div className="mt-2 space-x-4">
                  <Link href="/recipes" className="text-orange-600 hover:text-orange-500">
                    All Recipes
                  </Link>
                  <Link href="/categories" className="text-orange-600 hover:text-orange-500">
                    Categories
                  </Link>
                  <Link href="/about" className="text-orange-600 hover:text-orange-500">
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

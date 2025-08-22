import { NextPageContext } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <Layout title={`Error ${statusCode || 'Unknown'}`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              {statusCode || '?'}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {statusCode === 404
                ? 'Page Not Found'
                : 'Something went wrong'}
            </h2>
            <p className="text-gray-500 mb-8">
              {statusCode === 404
                ? "The page you're looking for doesn't exist."
                : 'An unexpected error occurred.'}
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Footer from './Footer';

// Dynamically import Header to prevent hydration issues
const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          <div className="flex items-center">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2 lg:mr-3">
              <span className="text-white text-lg lg:text-xl font-bold">🍳</span>
            </div>
            <div>
              <div className="text-xl lg:text-2xl font-bold leading-tight">
                <span className="text-orange-600">the</span>
                <span className="text-red-600">recipe</span>
                <span className="text-orange-500">book</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  ),
});

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'The Recipe Book',
  description = 'A collection of delicious recipes for every occasion',
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

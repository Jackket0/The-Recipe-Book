import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold text-primary-600 font-serif">
              The Recipe Book
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              A collection of delicious recipes for every occasion. Cook with
              love, share with joy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-sm text-gray-600 hover:text-primary-600">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Connect
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Share your favorite recipes and cooking tips with our community.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} The Recipe Book. Made with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

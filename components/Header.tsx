import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Recipe } from '@/types/recipe';

interface DropdownItem {
  href: string;
  label: string;
  isHeader?: boolean;
  isSeparator?: boolean;
}

interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const Header: React.FC = () => {
  const router = useRouter();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Temporarily disable client-side recipe loading to fix runtime error
  useEffect(() => {
    if (!isClient) return;
    
    // Try to get recipes from window.__NEXT_DATA__ if available
    if (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.props?.recipes) {
      setAllRecipes((window as any).__NEXT_DATA__.props.recipes);
    }
  }, [isClient]);

  // Search functionality (only on client)
  useEffect(() => {
    if (!isClient) return;
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearchDropdownOpen(false);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = allRecipes.filter((recipe: Recipe): boolean => {
      if (!recipe) return false;
      
      // Search in title
      if (recipe.title?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in description
      if (recipe.description?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in category
      if (recipe.category?.toLowerCase().includes(term)) {
        return true;
      }
      
      // Search in tags
      if (recipe.tags?.some((tag: string): boolean => tag?.toLowerCase().includes(term))) {
        return true;
      }
      
      // Search in ingredients
      if (recipe.ingredients?.some((ingredient: string): boolean => ingredient?.toLowerCase().includes(term))) {
        return true;
      }
      
      return false;
    }).slice(0, 6); // Limit to 6 results

    setSearchResults(filtered);
    setIsSearchDropdownOpen(filtered.length > 0);
  }, [searchTerm, allRecipes, isClient]);

  // Close dropdowns when clicking outside (only on client)
  useEffect(() => {
    if (!isClient) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsSearchDropdownOpen(false);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    router.push(`/recipes/${recipe.slug}`);
    setSearchTerm('');
    setIsSearchDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchDropdownOpen(false);
  };

  // Keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search Recipes..."]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const categories: DropdownItem[] = [
    // Actual recipe categories based on content
    { href: '/recipes/category/breakfast', label: 'Breakfast', isHeader: true },
    { href: '/recipes/category/lunch', label: 'Lunch' },
    { href: '/recipes/category/dinner', label: 'Dinner' },
    { href: '/recipes/category/main-dishes', label: 'Main Dishes' },
    
    // Separator
    { href: '#', label: '---', isSeparator: true },
    
    // Other Categories
    { href: '/recipes/category/desserts', label: 'Desserts', isHeader: true },
    { href: '/recipes/category/baked-goods', label: 'Baked Goods' },
    { href: '/recipes/category/salads', label: 'Salads' },
    { href: '/recipes/category/soup', label: 'Soup' },
  ];

  const navItems: NavItem[] = [
    { href: '/', label: 'HOME' },
    { href: '/favorites', label: 'FAVORITES' },
    { href: '/recipes', label: 'FOOD RECIPES' },
    { href: '/drinks', label: 'DRINK RECIPES' },
    { 
      href: '/categories', 
      label: 'BY CATEGORY',
      hasDropdown: true,
      dropdownItems: [
        { href: '/categories', label: 'All Categories', isHeader: true },
        { href: '#', label: '---', isSeparator: true },
        ...categories
      ]
    },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo, search, and social icons */}
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8">
            <div ref={searchRef} className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search Recipes... (Ctrl+K)"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-700"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </form>
              
              {/* Search Results Dropdown */}
              {isClient && isSearchDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="py-2">
                    {isLoadingRecipes ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        Loading recipes...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-100">
                          Found {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''}
                        </div>
                        {searchResults.map((recipe) => (
                          <button
                            key={recipe.slug}
                            onClick={() => handleRecipeClick(recipe)}
                            className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors flex items-center space-x-3"
                          >
                            {recipe.image && (
                              <img 
                                src={recipe.image} 
                                alt={recipe.title}
                                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{recipe.title}</div>
                              <div className="text-sm text-gray-500 truncate">{recipe.category}</div>
                            </div>
                          </button>
                        ))}
                        {searchResults.length >= 6 && (
                          <div className="px-4 py-2 border-t border-gray-100">
                            <button
                              onClick={handleSearchSubmit}
                              className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium"
                            >
                              View all results →
                            </button>
                          </div>
                        )}
                      </>
                    ) : searchTerm.trim() && !isLoadingRecipes ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        No recipes found. Try a different search term.
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6 xl:space-x-8 py-3 border-t border-gray-100 overflow-visible">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              {item.hasDropdown ? (
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="text-xs lg:text-sm font-bold tracking-wide transition-colors duration-200 hover:text-orange-600 text-gray-700 flex items-center whitespace-nowrap"
                  >
                    {item.label}
                    <svg
                      className={`ml-1 w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isClient && isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                      <div className="py-2">
                        {item.dropdownItems?.map((dropdownItem, index) => {
                          if (dropdownItem.isSeparator) {
                            return (
                              <div key={index} className="border-t border-gray-100 my-1"></div>
                            );
                          }
                          
                          if (dropdownItem.isHeader) {
                            return (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                                onClick={() => setIsCategoryDropdownOpen(false)}
                              >
                                {dropdownItem.label}
                              </Link>
                            );
                          }
                          
                          return (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors pl-6"
                              onClick={() => setIsCategoryDropdownOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`text-xs lg:text-sm font-bold tracking-wide transition-colors duration-200 hover:text-orange-600 whitespace-nowrap ${
                    router.pathname === item.href
                      ? 'text-orange-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isClient && isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      placeholder="Search Recipes... (Ctrl+K)"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </form>
                  
                  {/* Mobile Search Results */}
                  {isClient && isSearchDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                      <div className="py-2">
                        {isLoadingRecipes ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            Loading recipes...
                          </div>
                        ) : searchResults.length > 0 ? (
                          <>
                            <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-100">
                              Found {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''}
                            </div>
                            {searchResults.map((recipe) => (
                              <button
                                key={recipe.slug}
                                onClick={() => handleRecipeClick(recipe)}
                                className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors flex items-center space-x-3"
                              >
                                {recipe.image && (
                                  <img 
                                    src={recipe.image} 
                                    alt={recipe.title}
                                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">{recipe.title}</div>
                                  <div className="text-sm text-gray-500 truncate">{recipe.category}</div>
                                </div>
                              </button>
                            ))}
                            {searchResults.length >= 6 && (
                              <div className="px-4 py-2 border-t border-gray-100">
                                <button
                                  onClick={handleSearchSubmit}
                                  className="w-full text-center text-sm text-orange-600 hover:text-orange-700 font-medium"
                                >
                                  View all results →
                                </button>
                              </div>
                            )}
                          </>
                        ) : searchTerm.trim() && !isLoadingRecipes ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            No recipes found. Try a different search term.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-bold transition-colors duration-200 ${
                      router.pathname === item.href
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

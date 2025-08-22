import Link from 'next/link';
import { MainCategory, RecipeTag } from '@/types/recipe';
import { MAIN_CATEGORIES, getTagInfo } from '@/lib/categories';

interface CategoryBadgeProps {
  category: MainCategory;
  className?: string;
  isClickable?: boolean;
}

interface TagBadgeProps {
  tag: RecipeTag;
  className?: string;
  isClickable?: boolean;
}

export function CategoryBadge({ category, className = '', isClickable = true }: CategoryBadgeProps) {
  const categoryInfo = MAIN_CATEGORIES[category];
  
  if (!categoryInfo) {
    return null;
  }

  const badgeContent = (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors ${className}`}>
      <span className="mr-1">{categoryInfo.icon}</span>
      {categoryInfo.name}
    </span>
  );

  if (isClickable) {
    return (
      <Link href={`/recipes/category/${categoryInfo.slug}`}>
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}

export function TagBadge({ tag, className = '', isClickable = true }: TagBadgeProps) {
  const tagInfo = getTagInfo(tag);
  
  if (!tagInfo) {
    return null;
  }

  const badgeContent = (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors ${className}`}>
      <span className="mr-1">{tagInfo.icon}</span>
      {tagInfo.name}
    </span>
  );

  if (isClickable) {
    return (
      <Link href={`/recipes/tag/${tagInfo.slug}`}>
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}

export function TagBadgeSmall({ tag, className = '', isClickable = true }: TagBadgeProps) {
  const tagInfo = getTagInfo(tag);
  
  if (!tagInfo) {
    return null;
  }

  const badgeContent = (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors ${className}`}>
      {tagInfo.name}
    </span>
  );

  if (isClickable) {
    return (
      <Link href={`/recipes/tag/${tagInfo.slug}`}>
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}

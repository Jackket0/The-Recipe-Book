# The Recipe Book 🍳

A beautiful, modern recipe website built with Next.js, TypeScript, and Tailwind CSS. Share and discover delicious recipes with a clean, responsive interface and advanced categorization system.

![Recipe Book Screenshot](https://via.placeholder.com/800x400/f97316/ffffff?text=The+Recipe+Book)

## ✨ Features

### Core Features
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Markdown-Based Recipes**: Easy-to-write recipe files with comprehensive frontmatter metadata
- **Responsive Design**: Beautiful on desktop, tablet, and mobile devices
- **Advanced Categorization**: 
  - Main categories: Mains, Sides, Snacks, Breakfast & Brunch, Lunch, Dinner, Desserts, Baking, Mocktails, Cocktails, Smoothies & Juices, Shakes
  - Dietary tags: Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto/Low Carb, High Protein, Low Calorie, Low Fat
  - Cuisine tags: Italian, Indian, Chinese, Japanese, Mediterranean, Middle Eastern, Mexican, British, American
  - Occasion tags: Quick Meals, Meal Prep, Comfort Food, Party Food, Kids Friendly, Seasonal
- **Powerful Search & Filter**: Real-time search across titles, descriptions, ingredients, and tags
- **Favorites System**: Save and manage your favorite recipes with localStorage persistence
- **Recipe Scaling**: Dynamically adjust serving sizes with automatic ingredient calculations
- **Print-Friendly**: Optimized print layouts for recipe cards
- **SEO Optimized**: Static generation for fast loading and great SEO
- **Easy Deployment**: Ready for Vercel, Netlify, or any static hosting

### User Experience
- **Quick Search**: Keyboard shortcut (Ctrl+K) for instant search access
- **Category Navigation**: Organized browsing by categories and tags
- **Recipe Cards**: Beautiful preview cards with images, difficulty, and timing
- **Detailed Recipe Pages**: Step-by-step instructions with metadata
- **Favorites Management**: Heart button to save favorites, dedicated favorites page
- **Recipe Scaling**: Interactive scaling tool to adjust serving sizes
- **Print Functionality**: One-click recipe printing with optimized layouts
- **Mobile-First Design**: Optimized for all screen sizes

### Type Safety & Code Quality
- **Full TypeScript Coverage**: All components and utilities are fully typed
- **Strict Type Checking**: Comprehensive type definitions for recipes, categories, and components
- **JSON Schema Validation**: Recipe frontmatter validation with detailed error reporting
- **Component Props Interfaces**: All React components have typed props interfaces
- **Utility Function Types**: All utility functions have explicit return types and parameter types
- **ESLint & Prettier**: Consistent code formatting and linting rules

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd The-Recipe-Book
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your recipe website!

## 📁 Project Structure

```
The-Recipe-Book/
├── components/              # Reusable React components
│   ├── Layout.tsx          # Main layout wrapper with header/footer
│   ├── Header.tsx          # Navigation with search and dropdowns
│   ├── Footer.tsx          # Site footer
│   ├── RecipeCard.tsx      # Recipe preview cards
│   ├── CategoryBadge.tsx   # Category and tag badges
│   └── QuickSearch.tsx     # Search functionality
├── content/
│   └── recipes/            # Recipe markdown files
│       ├── banana-bread.md
│       ├── beef-stir-fry.md
│       └── ...
├── lib/                    # Utility functions and data processing
│   ├── recipes.ts          # Recipe parsing and filtering utilities
│   └── categories.ts       # Category definitions and helpers
├── pages/                  # Next.js pages (routes)
│   ├── _app.tsx           # App wrapper
│   ├── index.tsx          # Homepage
│   ├── about.tsx          # About page
│   ├── categories.tsx     # Category overview
│   ├── favorites.tsx      # Favorites page
│   ├── api/
│   │   └── recipes.ts     # API endpoints
│   └── recipes/           # Recipe-related pages
│       ├── index.tsx      # All recipes
│       ├── [slug].tsx     # Individual recipe pages
│       ├── category/
│       │   └── [category].tsx  # Recipes by category
│       ├── cuisine/
│       │   └── [cuisine].tsx   # Recipes by cuisine
│       ├── dietary/
│       │   └── [dietary].tsx   # Recipes by dietary tags
│       └── tag/
│           └── [tag].tsx       # Recipes by tag
├── styles/
│   └── globals.css        # Global styles and Tailwind imports
├── types/
│   └── recipe.ts          # TypeScript type definitions
├── public/                # Static assets
│   └── images/            # Recipe images
└── markdown/              # Documentation and templates
    ├── recipe-template.md # Template for new recipes
    └── To-Do.md          # Development roadmap
```

## 📝 Adding a New Recipe

Adding a recipe is as simple as creating a new markdown file! Here's how:

1. **Create a new file** in the `content/recipes/` directory with a descriptive filename:
   ```
   content/recipes/my-amazing-pasta.md
   ```

2. **Add frontmatter** at the top of the file with recipe metadata:
   ```markdown
   ---
   title: "My Amazing Pasta"
   description: "A delicious and easy pasta recipe perfect for weeknight dinners."
   category: "Mains"  # Required: Main category
   tags:              # Optional: Array of tags
     - "Italian"
     - "Quick Meals"
     - "Vegetarian"
   image: "/images/pasta.jpg"  # Optional: Recipe image
   prepTime: "10 minutes"
   cookTime: "20 minutes"
   servings: 4
   difficulty: "Easy"
   ingredients:
     - "1 lb pasta"
     - "2 cups tomato sauce"
     - "1 cup parmesan cheese"
   instructions:
     - "Boil water and cook pasta according to package directions"
     - "Heat tomato sauce in a large pan"
     - "Combine pasta and sauce, top with cheese"
   dateCreated: "2024-01-15"
   ---
   
   Your recipe content goes here! You can write additional details,
   tips, variations, or any other information in regular markdown.
   ```

3. **Save the file** and your recipe will automatically appear on the website!

### Recipe Frontmatter Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `title` | ✅ | string | Recipe name |
| `description` | ❌ | string | Brief description for cards and SEO |
| `category` | ✅ | MainCategory | Main recipe category (see categories below) |
| `tags` | ❌ | RecipeTag[] | Array of dietary, cuisine, or occasion tags |
| `image` | ❌ | string | URL or path to recipe image |
| `prepTime` | ❌ | string | Preparation time (e.g., "15 minutes") |
| `cookTime` | ❌ | string | Cooking time (e.g., "30 minutes") |
| `servings` | ❌ | number | Number of servings |
| `difficulty` | ❌ | "Easy" \| "Medium" \| "Hard" | Recipe difficulty |
| `ingredients` | ✅ | string[] | Array of ingredients |
| `instructions` | ✅ | string[] | Array of step-by-step instructions |
| `dateCreated` | ❌ | string | Creation date (YYYY-MM-DD) |
| `dateModified` | ❌ | string | Last modified date (YYYY-MM-DD) |

### Available Categories and Tags

#### Main Categories (Required)
- **Food**: Mains, Sides, Snacks, Breakfast & Brunch, Lunch, Dinner, Desserts, Baking
- **Drinks**: Mocktails, Cocktails, Smoothies & Juices, Shakes

#### Tags (Optional)

**Dietary Tags:**
- Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto / Low Carb, High Protein, Low Calorie, Low Fat

**Cuisine Tags:**
- Italian, Indian, Chinese, Japanese, Mediterranean, Middle Eastern, Mexican, British, American

**Occasion Tags:**
- Quick Meals, Meal Prep, Comfort Food, Party Food, Kids Friendly, Seasonal

## 🎨 Customization

### Colors and Styling

The site uses a custom orange color palette defined in `tailwind.config.js`. The primary color can be customized:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef7ee',
        // ... customize these colors
        600: '#ed7519',
        // ...
      },
    },
  },
},
```

### Adding New Pages

Create new pages by adding files to the `pages/` directory. Next.js automatically creates routes based on the file structure.

### Modifying Components

All components are in the `components/` directory and can be customized to match your design preferences. Key components:

- **Header.tsx**: Navigation with search functionality and category dropdowns
- **RecipeCard.tsx**: Recipe preview cards with metadata display
- **CategoryBadge.tsx**: Styled badges for categories and tags
- **Layout.tsx**: Main layout wrapper with SEO optimization

## 🔍 Search and Filtering

The application includes powerful search and filtering capabilities:

### Search Features
- **Real-time search**: Instant results as you type
- **Multi-field search**: Searches across titles, descriptions, ingredients, and tags
- **Keyboard shortcuts**: Press Ctrl+K (Cmd+K on Mac) to open search
- **Search dropdown**: Shows matching recipes with previews

### Filtering Options
- **By category**: Filter recipes by main categories
- **By tags**: Filter by dietary restrictions, cuisine type, or occasion
- **By difficulty**: Easy, Medium, or Hard recipes
- **Combined filters**: Use multiple filters simultaneously

### Implementation
The search functionality is implemented in:
- `components/Header.tsx`: Search UI and logic
- `components/QuickSearch.tsx`: Dedicated search component
- `lib/recipes.ts`: Search and filtering utilities

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click!

The site is optimized for Vercel with:
- Static generation for fast loading
- Image optimization
- Automatic revalidation

### Deploy to Netlify

1. Build the site: `npm run build`
2. Upload the `out/` folder to [Netlify](https://netlify.com)
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`

### Other Hosting Options

The site generates static files that can be hosted anywhere:
- GitHub Pages
- AWS S3 + CloudFront
- DigitalOcean App Platform
- Any static hosting service

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Style

The project uses ESLint and Prettier for consistent code formatting:
- TypeScript for type safety
- Tailwind CSS for styling
- React best practices
- Next.js conventions

### Key Technologies

- **Next.js 15**: React framework with SSG/SSR
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Gray-matter**: Frontmatter parsing
- **Remark**: Markdown processing
- **React 18**: Latest React features

## 📚 Future Roadmap & Ideas

### 🔍 Search & Discovery
- [x] Full-text search functionality with real-time results
- [x] Search across recipe titles, descriptions, ingredients, and tags
- [x] Keyboard shortcut (Ctrl+K) for quick search access
- [x] Advanced categorization system with main categories and tags
- [ ] Advanced filtering UI (multi-select, sliders for time/difficulty)
- [ ] Recipe recommendations based on ingredients
- [ ] Popular/trending recipes section
- [ ] Recipe similarity matching

### 👥 User Features
- [ ] User-submitted recipes
- [ ] Recipe ratings and reviews
- [ ] Personal recipe collections/favorites (with local storage)
- [ ] Shopping list generation from recipes
- [ ] Recipe sharing functionality
- [ ] User profiles and recipe collections

### 🎯 Content Management
- [ ] Admin panel for managing recipes
- [ ] Bulk recipe import from other formats (JSON, CSV)
- [ ] Recipe versioning and editing history
- [ ] Automated recipe validation
- [ ] Recipe schema enforcement
- [ ] Image upload and management

### 🌟 Enhanced Experience
- [ ] Recipe scaling (adjust serving sizes)
- [ ] Cooking timers and step-by-step mode
- [ ] Nutritional information calculation
- [ ] Print-friendly recipe cards
- [ ] Recipe export (PDF, etc.)
- [ ] Meal planning features

### 🔧 Technical Improvements
- [ ] Database integration (SQLite with Prisma as mentioned in memory)
- [ ] Image optimization and CDN
- [ ] Progressive Web App (PWA) features
- [ ] Analytics and usage tracking
- [ ] Performance monitoring
- [ ] API for external integrations
- [ ] Recipe schema validation with JSON Schema

### 🌐 Integration & Import
- [ ] Import from popular recipe formats
- [ ] Export to meal planning apps
- [ ] Social media sharing optimization
- [ ] Recipe microdata for SEO
- [ ] Integration with grocery delivery services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Git Workflow Best Practices

- Use descriptive commit messages
- Keep commits focused and atomic
- Create feature branches for new functionality
- Use Pull Requests for code review
- Tag releases with semantic versioning (v1.0.0, v1.1.0, etc.)

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful component names
- Add proper error handling
- Test on multiple screen sizes
- Optimize for performance

## 📊 Current Status

### Recipe Collection
The project currently includes sample recipes covering various categories:
- Baking: Banana Bread, Classic Chocolate Chip Cookies, Lemon Bars
- Mains: Beef Stir Fry, Chicken Tikka Masala
- Sides: Caesar Salad, Mediterranean Quinoa Salad
- Breakfast: Fluffy Pancakes
- Soups: Creamy Tomato Soup

### Features Implemented
- ✅ Responsive design
- ✅ Advanced categorization system
- ✅ Real-time search functionality
- ✅ Static site generation
- ✅ TypeScript type safety
- ✅ SEO optimization
- ✅ Recipe card components
- ✅ Category-based navigation
- ✅ Markdown-based content management

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Markdown processing with [Remark](https://remark.js.org/)
- Frontmatter parsing with [Gray-matter](https://github.com/jonschlinkert/gray-matter)

---

**Happy Cooking! 🍽️**

Made with ❤️ for food lovers everywhere.

*Last updated: January 2024*
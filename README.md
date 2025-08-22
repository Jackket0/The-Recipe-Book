# The Recipe Book 🍳

A beautiful, modern recipe website built with Next.js, TypeScript, and Tailwind CSS. Share and discover delicious recipes with a clean, responsive interface.

![Recipe Book Screenshot](https://via.placeholder.com/800x400/f97316/ffffff?text=The+Recipe+Book)

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Markdown-Based Recipes**: Easy-to-write recipe files with frontmatter metadata
- **Responsive Design**: Beautiful on desktop, tablet, and mobile devices
- **Recipe Categories**: Organize recipes by type (Desserts, Main Dishes, Salads, etc.)
- **Search & Filter**: Find recipes by name, description, or tags
- **SEO Optimized**: Static generation for fast loading and great SEO
- **Easy Deployment**: Ready for Vercel, Netlify, or any static hosting

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
├── components/          # Reusable React components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Site header and navigation
│   ├── Footer.tsx      # Site footer
│   └── RecipeCard.tsx  # Recipe preview cards
├── content/
│   └── recipes/        # Recipe markdown files
├── lib/
│   └── recipes.ts      # Recipe parsing utilities
├── pages/              # Next.js pages (routes)
│   ├── _app.tsx       # App wrapper
│   ├── index.tsx      # Homepage
│   ├── about.tsx      # About page
│   └── recipes/       # Recipe-related pages
├── styles/
│   └── globals.css    # Global styles and Tailwind imports
├── types/
│   └── recipe.ts      # TypeScript type definitions
└── public/            # Static assets
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
   category: "Main Dishes"
   image: "https://example.com/pasta-image.jpg"
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
   tags:
     - "pasta"
     - "italian"
     - "easy"
   dateCreated: "2024-01-15"
   ---
   
   Your recipe content goes here! You can write additional details,
   tips, variations, or any other information in regular markdown.
   ```

3. **Save the file** and your recipe will automatically appear on the website!

### Recipe Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Recipe name |
| `description` | ❌ | Brief description for cards and SEO |
| `category` | ✅ | Recipe category (e.g., "Desserts", "Main Dishes") |
| `image` | ❌ | URL to recipe image |
| `prepTime` | ❌ | Preparation time (e.g., "15 minutes") |
| `cookTime` | ❌ | Cooking time (e.g., "30 minutes") |
| `servings` | ❌ | Number of servings |
| `difficulty` | ❌ | "Easy", "Medium", or "Hard" |
| `ingredients` | ❌ | Array of ingredients |
| `instructions` | ❌ | Array of step-by-step instructions |
| `tags` | ❌ | Array of tags for filtering |
| `dateCreated` | ❌ | Creation date (YYYY-MM-DD) |

## 🎨 Customization

### Colors and Styling

The site uses a custom color palette defined in `tailwind.config.js`. The primary color is a warm orange that you can customize:

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

All components are in the `components/` directory and can be customized to match your design preferences.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click!

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

The project uses ESLint and Prettier for consistent code formatting. Configuration files:
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting options

## 📚 Next Steps & Ideas

Here are some ideas for extending your recipe website:

### 🔍 Search & Discovery
- [ ] Full-text search functionality
- [ ] Advanced filtering (dietary restrictions, cooking time, etc.)
- [ ] Recipe recommendations based on ingredients
- [ ] Popular/trending recipes section

### 👥 User Features
- [ ] User-submitted recipes
- [ ] Recipe ratings and reviews
- [ ] Personal recipe collections/favorites
- [ ] Shopping list generation

### 🎯 Content Management
- [ ] Admin panel for managing recipes
- [ ] Bulk recipe import from other formats
- [ ] Recipe versioning and editing history
- [ ] Automated recipe testing and validation

### 🌟 Enhanced Experience
- [ ] Recipe scaling (adjust serving sizes)
- [ ] Cooking timers and step-by-step mode
- [ ] Nutritional information
- [ ] Recipe sharing on social media
- [ ] Print-friendly recipe cards

### 🔧 Technical Improvements
- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] Image optimization and CDN
- [ ] Progressive Web App (PWA) features
- [ ] Analytics and usage tracking
- [ ] Performance monitoring

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Images from [Unsplash](https://unsplash.com/)

---

**Happy Cooking! 🍽️**

Made with ❤️ for food lovers everywhere.

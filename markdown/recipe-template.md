---
title: "Recipe Title Here"
description: "Brief description of the dish - what makes it special, key flavors, or why someone would want to make it"
category: "Main Dishes" # Options: Main Dishes, Appetizers, Desserts, Baked Goods, Beverages, Salads, Soups, Side Dishes, Snacks
image: "/images/recipe-name.jpg" # Image filename should match the recipe slug
prepTime: "X minutes" # Time to prepare ingredients (e.g., "15 minutes", "30 minutes", "1 hour")
cookTime: "X minutes" # Active cooking time (e.g., "25 minutes", "1 hour 30 minutes")
servings: X # Number as integer (e.g., 4, 6, 8)
difficulty: "Easy" # Options: Easy, Medium, Hard
ingredients:
  - "Ingredient 1 with measurements (e.g., '2 cups all-purpose flour')"
  - "Ingredient 2 with measurements"
  - "Ingredient 3 with measurements"
  - "Continue for all ingredients..."
  # Group related ingredients with comments if helpful:
  # For the marinade:
  # For the sauce:
  # For garnish:
instructions:
  - "Step 1: Clear, actionable instruction with specific details"
  - "Step 2: Next instruction in logical order"
  - "Step 3: Include temperatures, times, and visual cues"
  - "Step 4: Continue with all steps needed to complete the recipe"
  - "Final step: Include serving suggestions and storage instructions"
tags:
  - "tag1" # Use lowercase, descriptive tags
  - "tag2" # Examples: "vegetarian", "gluten-free", "spicy", "comfort food"
  - "tag3" # Include main ingredients, cooking method, or meal type
dateCreated: "YYYY-MM-DD" # Use ISO date format (e.g., "2024-01-15")
---

Write a brief introduction paragraph here that expands on the description. Explain what makes this recipe special, any personal story behind it, or what occasions it's perfect for.

## Tips for Success

- **Tip 1**: Important technique or ingredient note
- **Tip 2**: Common mistakes to avoid or key success factors
- **Tip 3**: Visual cues or doneness indicators
- **Additional tips**: Any other helpful advice for best results

## Variations

- **Variation 1**: How to modify the recipe (e.g., different proteins, spice levels)
- **Variation 2**: Seasonal or dietary substitutions
- **Variation 3**: Different flavor profiles or cooking methods
- **Make it [dietary restriction]**: Specific modifications for dietary needs

## Storage

- **Room temperature**: How long and storage method
- **Refrigerator**: Duration and best practices
- **Freezer**: Freezing instructions and duration
- **Reheating**: Best methods to reheat if applicable

## Serving Suggestions

- List complementary dishes, sides, or beverages
- Include garnish ideas or presentation tips
- Mention any traditional accompaniments

---

## Template Usage Notes:

### Required Fields (must be filled):
- `title`: Descriptive recipe name
- `category`: Choose from the predefined categories
- `ingredients`: Complete list with measurements
- `instructions`: Step-by-step directions
- `dateCreated`: Date you created the recipe

### Optional but Recommended:
- `description`: Helps with SEO and recipe discovery
- `image`: Add corresponding image to `/public/images/`
- `prepTime` & `cookTime`: Helps users plan
- `servings`: Important for scaling
- `difficulty`: Helps users choose appropriate recipes
- `tags`: Improves searchability

### Content Sections:
- Main content paragraph is required
- Tips, Variations, Storage, and Serving Suggestions are optional but encouraged
- Remove any sections you don't use

### File Naming:
- Save as: `recipe-name-slug.md` (lowercase, hyphens for spaces)
- Image should be: `recipe-name-slug.jpg` in `/public/images/`

### Categories Available:
- Main Dishes
- Appetizers  
- Desserts
- Baked Goods
- Beverages
- Salads
- Soups
- Side Dishes
- Snacks

### Difficulty Levels:
- **Easy**: Basic techniques, common ingredients, hard to mess up
- **Medium**: Some skill required, multiple steps or techniques
- **Hard**: Advanced techniques, precise timing, or complex processes

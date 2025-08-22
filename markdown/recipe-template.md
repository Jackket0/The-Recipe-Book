---
title: "Recipe Title"
description: "A brief description of the recipe (1-2 sentences)"
category: "Main Category"
tags:
  - "Tag 1"
  - "Tag 2"
  - "Tag 3"
image: "/images/recipe-name.jpg"
prepTime: "X minutes"
cookTime: "X minutes"
servings: X
difficulty: "Easy|Medium|Hard"
ingredients:
  - "Ingredient 1"
  - "Ingredient 2"
  - "Ingredient 3"
instructions:
  - "Step 1"
  - "Step 2"
  - "Step 3"
dateCreated: "YYYY-MM-DD"
---

## Main Categories (Required - choose one)

### Food Categories
- **Mains** - Meat, fish, vegetarian mains
- **Sides** - Vegetables, breads, accompaniments
- **Snacks** - Finger foods, light bites
- **Breakfast & Brunch** - Pancakes, eggs, cereals
- **Lunch** - Quick meals, salads, sandwiches
- **Dinner** - Heavier meals, multi-course
- **Desserts** - Cakes, puddings, ice creams
- **Baking** - Bread, pastries, baked treats

### Drink Categories
- **Mocktails** - Non-alcoholic mixes
- **Cocktails** - Alcoholic mixes
- **Smoothies & Juices** - Fruit, veg-based
- **Shakes** - Milkshakes, protein shakes

## Tags (Optional - choose multiple)

### Dietary Needs
- Vegetarian
- Vegan
- Gluten-Free
- Dairy-Free
- Keto / Low Carb
- High Protein
- Low Calorie
- Low Fat

### Cuisine
- Italian
- Indian
- Chinese
- Japanese
- Mediterranean
- Middle Eastern
- Mexican
- British
- American

### Occasions
- Quick Meals (under 30 mins)
- Meal Prep
- Comfort Food
- Party Food
- Kids Friendly
- Seasonal (Christmas, Summer BBQ, etc.)

## Example Recipe

```yaml
---
title: "Spaghetti Carbonara"
description: "Classic Italian pasta dish with eggs, cheese, and pancetta. Simple ingredients create a rich, creamy sauce."
category: "Mains"
tags:
  - "High Protein"
  - "Italian"
  - "Quick Meals"
  - "Comfort Food"
image: "/images/spaghetti-carbonara.jpg"
prepTime: "10 minutes"
cookTime: "15 minutes"
servings: 4
difficulty: "Medium"
ingredients:
  - "1 lb spaghetti"
  - "4 large eggs"
  - "1 cup grated Pecorino Romano cheese"
  - "4 oz pancetta, diced"
  - "4 cloves garlic, minced"
  - "Black pepper to taste"
  - "Salt for pasta water"
instructions:
  - "Bring a large pot of salted water to boil and cook spaghetti according to package directions."
  - "In a large skillet, cook pancetta over medium heat until crispy."
  - "In a bowl, whisk together eggs, cheese, and black pepper."
  - "Drain pasta, reserving 1 cup of pasta water."
  - "Add hot pasta to skillet with pancetta, remove from heat."
  - "Quickly stir in egg mixture, adding pasta water as needed for creaminess."
  - "Serve immediately with extra cheese and black pepper."
dateCreated: "2024-01-20"
---

Recipe content goes here...
```

## Important Notes

1. **Category is required** and must be one of the defined main categories
2. **Tags are optional** but recommended for better discoverability
3. **Tags should match the predefined list** for consistency
4. **Image path** should point to a file in `/public/images/`
5. **Date format** should be YYYY-MM-DD
6. **Difficulty** must be one of: Easy, Medium, or Hard
7. **Ingredients and instructions** should be clear and concise

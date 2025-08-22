# Fraction Normalization Feature

## Overview

The fraction normalization feature provides consistent handling of fractions across the recipe book application. It converts various fraction formats (unicode fractions, common fractions, mixed numbers) to decimal equivalents for consistent processing, scaling, and search functionality.

## Features

### 1. Unicode Fraction Support
Converts unicode fractions to decimal equivalents:
- ½ → 0.5
- ⅓ → 0.333
- ⅔ → 0.667
- ¼ → 0.25
- ¾ → 0.75
- ⅕ → 0.2
- ⅖ → 0.4
- ⅗ → 0.6
- ⅘ → 0.8
- ⅙ → 0.167
- ⅚ → 0.833
- ⅐ → 0.143
- ⅛ → 0.125
- ⅜ → 0.375
- ⅝ → 0.625
- ⅞ → 0.875
- ⅑ → 0.111
- ⅒ → 0.1

### 2. Common Fraction Support
Converts common fraction strings to decimal equivalents:
- 1/2 → 0.5
- 1/3 → 0.333
- 2/3 → 0.667
- 1/4 → 0.25
- 3/4 → 0.75
- 1/5 → 0.2
- 2/5 → 0.4
- 3/5 → 0.6
- 4/5 → 0.8
- 1/6 → 0.167
- 5/6 → 0.833
- 1/8 → 0.125
- 3/8 → 0.375
- 5/8 → 0.625
- 7/8 → 0.875
- 1/10 → 0.1
- 3/10 → 0.3
- 7/10 → 0.7
- 9/10 → 0.9

### 3. Mixed Number Support
Converts mixed numbers to decimal equivalents:
- 1 1/2 → 1.5
- 2 3/4 → 2.75
- 1 1/3 → 1.333
- 1 1/4 → 1.25
- 1½ → 1.5 (unicode mixed numbers)

### 4. Bidirectional Conversion
Converts decimals back to the most readable fraction representation:
- 0.5 → 1/2
- 0.25 → 1/4
- 0.75 → 3/4
- 1.5 → 1 1/2
- 2.75 → 2 3/4
- 0.123 → 0.12 (non-standard values remain as decimals)

## Implementation

### Core Files

1. **`lib/fractions.ts`** - Main fraction normalization utilities
2. **`lib/scaling.ts`** - Updated to use fraction normalization
3. **`lib/search.ts`** - Updated to handle fraction normalization in search
4. **`__tests__/fractions.test.ts`** - Comprehensive test suite

### Key Functions

#### `normalizeFractions(text: string): string`
Normalizes all fractions in a text string to decimal equivalents.

```typescript
import { normalizeFractions } from './lib/fractions';

const ingredient = "Add 1½ cups flour and ⅓ cup sugar";
const normalized = normalizeFractions(ingredient);
// Result: "Add 1.5 cups flour and 0.333 cup sugar"
```

#### `parseFraction(fractionStr: string): ParsedFraction | null`
Parses a single fraction string and returns its decimal value.

```typescript
import { parseFraction } from './lib/fractions';

const result = parseFraction("1 1/2");
// Result: { value: 1.5, original: "1 1/2", normalized: "1.5" }
```

#### `extractFractions(text: string): ParsedFraction[]`
Extracts all fractions from a text string.

```typescript
import { extractFractions } from './lib/fractions';

const fractions = extractFractions("Add 1½ cups flour and ⅓ cup sugar");
// Result: Array of ParsedFraction objects
```

#### `decimalToReadableFraction(decimal: number): string`
Converts a decimal back to the most readable fraction representation.

```typescript
import { decimalToReadableFraction } from './lib/fractions';

const fraction = decimalToReadableFraction(1.5);
// Result: "1 1/2"
```

## Integration Points

### 1. Recipe Scaling
The scaling system now properly handles all fraction formats:

```typescript
// Before: "1½ cups flour" might not scale correctly
// After: "1.5 cups flour" scales to "3 cups flour" for 2x servings
```

### 2. Search Functionality
Search now works with all fraction formats:

```typescript
// Users can search for "1/2 cup" and find recipes with "½ cup" or "0.5 cup"
// Search terms are normalized before matching
```

### 3. Recipe Validation
All recipes are validated against the schema, and fraction normalization ensures consistent ingredient formats.

## Testing

### Running Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

### Test Coverage
The test suite covers:
- Unicode fraction parsing
- Common fraction parsing
- Mixed number parsing
- Text normalization
- Fraction extraction
- Decimal to fraction conversion
- Integration scenarios
- Edge cases

### Test Recipe
A test recipe (`content/recipes/fraction-test-recipe.md`) demonstrates all fraction formats and expected normalizations.

## Usage Examples

### Recipe Ingredient Processing
```typescript
import { normalizeFractions } from './lib/fractions';

const ingredients = [
  "1½ cups all-purpose flour",
  "⅓ cup granulated sugar",
  "1 1/2 teaspoons vanilla extract",
  "2 3/4 cups chocolate chips"
];

const normalizedIngredients = ingredients.map(normalizeFractions);
// Result: [
//   "1.5 cups all-purpose flour",
//   "0.333 cup granulated sugar",
//   "1.5 teaspoons vanilla extract",
//   "2.75 cups chocolate chips"
// ]
```

### Search Enhancement
```typescript
import { normalizeFractions } from './lib/fractions';

const searchTerm = "1/2 cup flour";
const normalizedSearch = normalizeFractions(searchTerm);
// Result: "0.5 cup flour"
// This will match recipes with "½ cup flour" or "0.5 cup flour"
```

### Scaling with Fractions
```typescript
import { scaleRecipe } from './lib/scaling';

const recipe = {
  // ... recipe data
  ingredients: ["1½ cups flour", "⅓ cup sugar"]
};

const scaledRecipe = scaleRecipe(recipe, 16); // Double the servings
// Result: ingredients will be ["3 cups flour", "0.667 cup sugar"]
```

## Benefits

1. **Consistency**: All fraction formats are normalized to decimals for processing
2. **Accuracy**: Precise decimal calculations for scaling
3. **Searchability**: Users can search with any fraction format
4. **Maintainability**: Centralized fraction handling logic
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **Testability**: Comprehensive test coverage ensures reliability

## Future Enhancements

1. **Additional Fraction Support**: Support for more complex fractions
2. **Unit Conversion**: Integration with unit conversion system
3. **Localization**: Support for different fraction formats by locale
4. **Performance Optimization**: Caching for frequently used fractions

## Migration Notes

- Existing recipes continue to work without modification
- Fraction normalization is applied transparently
- No breaking changes to existing APIs
- Backward compatibility maintained

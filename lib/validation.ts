import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import recipeSchema from '@/schema/recipe-schema.json';
import { RecipeFrontMatter } from '@/types/recipe';

// Initialize AJV with formats
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Compile the recipe schema
const validateRecipe = ajv.compile(recipeSchema);

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Validates recipe frontmatter against the JSON schema
 */
export function validateRecipeFrontmatter(data: any): ValidationResult {
  const result: ValidationResult = {
    isValid: false,
    errors: [],
    warnings: []
  };

  // Basic schema validation
  const isValid = validateRecipe(data);
  
  if (!isValid && validateRecipe.errors) {
    result.errors = validateRecipe.errors.map(error => ({
      field: error.instancePath || error.schemaPath,
      message: `${error.instancePath} ${error.message}`,
      value: error.data
    }));
  }

  // Additional custom validations and warnings
  if (data) {
    // Warning if no description provided
    if (!data.description || data.description.trim().length === 0) {
      result.warnings.push({
        field: 'description',
        message: 'Description is recommended for better SEO and user experience'
      });
    }

    // Warning if no image provided
    if (!data.image) {
      result.warnings.push({
        field: 'image',
        message: 'Image is recommended for better visual appeal'
      });
    }

    // Warning if no timing information
    if (!data.prepTime && !data.cookTime) {
      result.warnings.push({
        field: 'timing',
        message: 'Preparation or cooking time is recommended for user planning'
      });
    }

    // Warning if no servings specified
    if (!data.servings) {
      result.warnings.push({
        field: 'servings',
        message: 'Number of servings is recommended for meal planning'
      });
    }

    // Warning if no difficulty specified
    if (!data.difficulty) {
      result.warnings.push({
        field: 'difficulty',
        message: 'Difficulty level helps users choose appropriate recipes'
      });
    }

    // Warning if no tags provided
    if (!data.tags || data.tags.length === 0) {
      result.warnings.push({
        field: 'tags',
        message: 'Tags help with recipe discovery and filtering'
      });
    }

    // Warning if too few ingredients
    if (data.ingredients && data.ingredients.length < 2) {
      result.warnings.push({
        field: 'ingredients',
        message: 'Most recipes have at least 2 ingredients'
      });
    }

    // Warning if too few instructions
    if (data.instructions && data.instructions.length < 2) {
      result.warnings.push({
        field: 'instructions',
        message: 'Most recipes have at least 2 instruction steps'
      });
    }

    // Check for common ingredient format issues
    if (data.ingredients) {
      data.ingredients.forEach((ingredient: string, index: number) => {
        if (ingredient && !ingredient.match(/^\d+|^[a-zA-Z]/)) {
          result.warnings.push({
            field: `ingredients[${index}]`,
            message: 'Ingredient should start with quantity or name',
            value: ingredient
          });
        }
      });
    }
  }

  result.isValid = result.errors.length === 0;
  return result;
}

/**
 * Type guard to check if data matches RecipeFrontMatter interface
 */
export function isValidRecipeFrontMatter(data: any): data is RecipeFrontMatter {
  const validation = validateRecipeFrontmatter(data);
  return validation.isValid;
}

/**
 * Formats validation errors for display
 */
export function formatValidationErrors(errors: ValidationError[]): string {
  return errors.map(error => `${error.field}: ${error.message}`).join('\n');
}

/**
 * Formats validation warnings for display
 */
export function formatValidationWarnings(warnings: ValidationError[]): string {
  return warnings.map(warning => `${warning.field}: ${warning.message}`).join('\n');
}

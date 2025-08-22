import React, { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import { scaleRecipe, getServingSizeOptions, adjustCookingTime, validateScalingFactor } from '@/lib/scaling';

interface RecipeScalerProps {
  recipe: Recipe;
  onScaleChange: (scaledRecipe: Recipe, scalingFactor: number) => void;
  className?: string;
}

const RecipeScaler: React.FC<RecipeScalerProps> = ({
  recipe,
  onScaleChange,
  className = ''
}) => {
  const originalServings = recipe.servings || 4;
  const [targetServings, setTargetServings] = useState(originalServings);
  const [customServings, setCustomServings] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  const servingOptions = getServingSizeOptions(originalServings);

  useEffect(() => {
    const scalingFactor = targetServings / originalServings;
    const validation = validateScalingFactor(scalingFactor);
    
    setWarning(validation.warning || null);
    
    if (validation.isValid) {
      const scaledRecipe = scaleRecipe(recipe, targetServings);
      onScaleChange(scaledRecipe, scalingFactor);
    }
  }, [targetServings, recipe, originalServings, onScaleChange]);

  const handleServingChange = (servings: number) => {
    setTargetServings(servings);
    setIsCustom(false);
    setCustomServings('');
  };

  const handleCustomServingChange = (value: string) => {
    setCustomServings(value);
    const num = parseInt(value);
    
    if (!isNaN(num) && num > 0 && num <= 100) {
      setTargetServings(num);
      setIsCustom(true);
    }
  };

  const resetToOriginal = () => {
    setTargetServings(originalServings);
    setIsCustom(false);
    setCustomServings('');
  };

  const scalingFactor = targetServings / originalServings;
  const adjustedPrepTime = adjustCookingTime(recipe.prepTime, scalingFactor);
  const adjustedCookTime = adjustCookingTime(recipe.cookTime, scalingFactor);

  return (
    <div className={`bg-orange-50 border border-orange-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recipe Scaling</h3>
        <button
          onClick={resetToOriginal}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          disabled={targetServings === originalServings}
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {/* Serving size selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of servings:
          </label>
          
          {/* Quick options */}
          <div className="flex flex-wrap gap-2 mb-3">
            {servingOptions.map((servings) => (
              <button
                key={servings}
                onClick={() => handleServingChange(servings)}
                className={`
                  px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${targetServings === servings && !isCustom
                    ? 'bg-orange-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {servings}
              </button>
            ))}
          </div>

          {/* Custom input */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Custom:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={customServings}
              onChange={(e) => handleCustomServingChange(e.target.value)}
              placeholder={originalServings.toString()}
              className={`
                w-20 px-2 py-1 border rounded text-sm
                ${isCustom
                  ? 'border-orange-500 ring-1 ring-orange-500'
                  : 'border-gray-300'
                }
              `}
            />
            <span className="text-sm text-gray-500">servings</span>
          </div>
        </div>

        {/* Scaling information */}
        <div className="bg-white rounded-md p-3 border border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Original:</span>
              <span className="ml-2 font-medium">{originalServings} servings</span>
            </div>
            <div>
              <span className="text-gray-600">Scaled:</span>
              <span className="ml-2 font-medium">{targetServings} servings</span>
            </div>
            
            {scalingFactor !== 1 && (
              <>
                <div>
                  <span className="text-gray-600">Scale factor:</span>
                  <span className="ml-2 font-medium">
                    {scalingFactor.toFixed(2)}x
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Recipe size:</span>
                  <span className="ml-2 font-medium">
                    {scalingFactor > 1 ? 'Larger' : 'Smaller'}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Time adjustments */}
          {(adjustedPrepTime || adjustedCookTime) && scalingFactor !== 1 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Estimated time adjustments:</p>
              <div className="space-y-1 text-sm">
                {adjustedPrepTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prep time:</span>
                    <span className="font-medium">{adjustedPrepTime}</span>
                  </div>
                )}
                {adjustedCookTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cook time:</span>
                    <span className="font-medium">{adjustedCookTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Warning message */}
        {warning && (
          <div className="flex items-start space-x-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{warning}</span>
          </div>
        )}

        {/* Help text */}
        <div className="text-xs text-gray-500">
          <p>
            Ingredient quantities are scaled proportionally. Cooking times are adjusted 
            but may need fine-tuning based on your equipment and preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeScaler;

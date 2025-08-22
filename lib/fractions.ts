/**
 * Fraction normalization utilities for recipe ingredients
 * Handles unicode fractions, common fraction strings, and converts to decimals
 */

export interface ParsedFraction {
  value: number;
  original: string;
  normalized: string;
}

/**
 * Unicode fraction to decimal mapping
 */
const UNICODE_FRACTIONS: Record<string, number> = {
  '½': 0.5,
  '⅓': 0.333,
  '⅔': 0.667,
  '¼': 0.25,
  '¾': 0.75,
  '⅕': 0.2,
  '⅖': 0.4,
  '⅗': 0.6,
  '⅘': 0.8,
  '⅙': 0.167,
  '⅚': 0.833,
  '⅐': 0.143,
  '⅛': 0.125,
  '⅜': 0.375,
  '⅝': 0.625,
  '⅞': 0.875,
  '⅑': 0.111,
  '⅒': 0.1
};

/**
 * Mixed unicode number patterns (e.g., "1½", "2¾")
 */
const MIXED_UNICODE_PATTERN = /(\d+)([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅐⅛⅜⅝⅞⅑⅒])/g;

/**
 * Common fraction strings to decimal mapping
 */
const FRACTION_STRINGS: Record<string, number> = {
  '1/2': 0.5,
  '1/3': 0.333,
  '2/3': 0.667,
  '1/4': 0.25,
  '3/4': 0.75,
  '1/5': 0.2,
  '2/5': 0.4,
  '3/5': 0.6,
  '4/5': 0.8,
  '1/6': 0.167,
  '5/6': 0.833,
  '1/8': 0.125,
  '3/8': 0.375,
  '5/8': 0.625,
  '7/8': 0.875,
  '1/10': 0.1,
  '3/10': 0.3,
  '7/10': 0.7,
  '9/10': 0.9
};

/**
 * Mixed number patterns (e.g., "1 1/2", "2 3/4")
 */
const MIXED_NUMBER_PATTERN = /(\d+)\s+(\d+\/\d+)/g;

/**
 * Parse a fraction string and return its decimal value
 */
export function parseFraction(fractionStr: string): ParsedFraction | null {
  const trimmed = fractionStr.trim();
  
  // Check for unicode fractions
  if (UNICODE_FRACTIONS[trimmed]) {
    const value = UNICODE_FRACTIONS[trimmed];
    return {
      value,
      original: trimmed,
      normalized: value.toString()
    };
  }
  
  // Check for common fraction strings
  if (FRACTION_STRINGS[trimmed]) {
    const value = FRACTION_STRINGS[trimmed];
    return {
      value,
      original: trimmed,
      normalized: value.toString()
    };
  }
  
  // Check for mixed numbers (e.g., "1 1/2")
  const mixedMatch = trimmed.match(/^(\d+)\s+(\d+\/\d+)$/);
  if (mixedMatch) {
    const [, whole, fraction] = mixedMatch;
    const wholeNum = parseInt(whole);
    const fractionValue = FRACTION_STRINGS[fraction];
    
    if (fractionValue !== undefined) {
      const totalValue = wholeNum + fractionValue;
      return {
        value: totalValue,
        original: trimmed,
        normalized: totalValue.toString()
      };
    }
  }
  
  // Check for simple fraction pattern (e.g., "1/2")
  const fractionMatch = trimmed.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const [, numerator, denominator] = fractionMatch;
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    
    if (den !== 0) {
      const value = num / den;
      return {
        value,
        original: trimmed,
        normalized: value.toString()
      };
    }
  }
  
  return null;
}

/**
 * Normalize fractions in a text string
 * Replaces unicode fractions and common fraction strings with their decimal equivalents
 */
export function normalizeFractions(text: string): string {
  let normalized = text;
  
  // Handle mixed unicode numbers first (e.g., "1½", "2¾")
  normalized = normalized.replace(MIXED_UNICODE_PATTERN, (match, whole, unicode) => {
    const wholeNum = parseInt(whole);
    const fractionValue = UNICODE_FRACTIONS[unicode];
    
    if (fractionValue !== undefined) {
      return (wholeNum + fractionValue).toString();
    }
    
    return match; // Return original if fraction not recognized
  });
  
  // Handle mixed numbers (e.g., "1 1/2", "2 3/4")
  normalized = normalized.replace(MIXED_NUMBER_PATTERN, (match, whole, fraction) => {
    const wholeNum = parseInt(whole);
    const fractionValue = FRACTION_STRINGS[fraction];
    
    if (fractionValue !== undefined) {
      return (wholeNum + fractionValue).toString();
    }
    
    return match; // Return original if fraction not recognized
  });
  
  // Replace standalone unicode fractions
  for (const [unicode, decimal] of Object.entries(UNICODE_FRACTIONS)) {
    normalized = normalized.replace(new RegExp(unicode, 'g'), decimal.toString());
  }
  
  // Replace common fraction strings (but be careful not to replace in mixed numbers)
  for (const [fraction, decimal] of Object.entries(FRACTION_STRINGS)) {
    // Use word boundaries to avoid partial matches
    const regex = new RegExp(`\\b${fraction.replace('/', '\\/')}\\b`, 'g');
    normalized = normalized.replace(regex, decimal.toString());
  }
  
  return normalized;
}

/**
 * Extract and parse all fractions from a text string
 */
export function extractFractions(text: string): ParsedFraction[] {
  const fractions: ParsedFraction[] = [];
  
  // Find mixed unicode numbers first (e.g., "1½", "2¾")
  const mixedUnicodeRegex = new RegExp(MIXED_UNICODE_PATTERN, 'g');
  let mixedUnicodeMatch;
  while ((mixedUnicodeMatch = mixedUnicodeRegex.exec(text)) !== null) {
    const [, whole, unicode] = mixedUnicodeMatch;
    const wholeNum = parseInt(whole);
    const fractionValue = UNICODE_FRACTIONS[unicode];
    
    if (fractionValue !== undefined) {
      const totalValue = wholeNum + fractionValue;
      fractions.push({
        value: totalValue,
        original: mixedUnicodeMatch[0],
        normalized: totalValue.toString()
      });
    }
  }
  
  // Find mixed numbers (e.g., "1 1/2", "2 3/4")
  const mixedRegex = new RegExp(MIXED_NUMBER_PATTERN, 'g');
  let mixedMatch;
  while ((mixedMatch = mixedRegex.exec(text)) !== null) {
    const [, whole, fraction] = mixedMatch;
    const wholeNum = parseInt(whole);
    const fractionValue = FRACTION_STRINGS[fraction];
    
    if (fractionValue !== undefined) {
      const totalValue = wholeNum + fractionValue;
      fractions.push({
        value: totalValue,
        original: mixedMatch[0],
        normalized: totalValue.toString()
      });
    }
  }
  
  // Find standalone unicode fractions (but skip if they're part of mixed numbers)
  for (const [unicode, decimal] of Object.entries(UNICODE_FRACTIONS)) {
    const regex = new RegExp(unicode, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Check if this unicode fraction is part of a mixed unicode number
      const beforeMatch = text.substring(0, match.index);
      const beforeNumber = beforeMatch.match(/\d+$/);
      if (beforeNumber) {
        continue;
      }
      
      fractions.push({
        value: decimal,
        original: unicode,
        normalized: decimal.toString()
      });
    }
  }
  
  // Find standalone fraction strings (but skip if they're part of mixed numbers)
  for (const [fraction, decimal] of Object.entries(FRACTION_STRINGS)) {
    const regex = new RegExp(`\\b${fraction.replace('/', '\\/')}\\b`, 'g');
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Check if this fraction is part of a mixed number
      const beforeMatch = text.substring(0, match.index);
      const beforeNumber = beforeMatch.match(/\d+\s*$/);
      if (beforeNumber) {
        continue;
      }
      
      fractions.push({
        value: decimal,
        original: fraction,
        normalized: decimal.toString()
      });
    }
  }
  
  // Remove duplicates and sort by position in text
  return fractions.filter((fraction, index, self) => 
    index === self.findIndex(f => f.original === fraction.original)
  );
}

/**
 * Check if a string contains any fractions
 */
export function containsFractions(text: string): boolean {
  // Check for unicode fractions
  for (const unicode of Object.keys(UNICODE_FRACTIONS)) {
    if (text.includes(unicode)) {
      return true;
    }
  }
  
  // Check for fraction strings
  for (const fraction of Object.keys(FRACTION_STRINGS)) {
    const regex = new RegExp(`\\b${fraction.replace('/', '\\/')}\\b`);
    if (regex.test(text)) {
      return true;
    }
  }
  
  // Check for mixed numbers
  return MIXED_NUMBER_PATTERN.test(text);
}

/**
 * Convert decimal back to the most readable fraction representation
 */
export function decimalToReadableFraction(decimal: number): string {
  // Check if it's a whole number
  if (Math.abs(decimal - Math.round(decimal)) < 0.001) {
    return Math.round(decimal).toString();
  }
  
  // Check if it matches any common fractions (but be more strict for non-standard values)
  for (const [fraction, value] of Object.entries(FRACTION_STRINGS)) {
    if (Math.abs(decimal - value) < 0.001) {
      return fraction;
    }
  }
  
  // Check if it matches any unicode fractions (but be more strict for non-standard values)
  for (const [unicode, value] of Object.entries(UNICODE_FRACTIONS)) {
    if (Math.abs(decimal - value) < 0.001) {
      return unicode;
    }
  }
  
  // Check for mixed numbers
  const wholePart = Math.floor(decimal);
  const fractionalPart = decimal - wholePart;
  
  for (const [fraction, value] of Object.entries(FRACTION_STRINGS)) {
    if (Math.abs(fractionalPart - value) < 0.001) {
      return `${wholePart} ${fraction}`;
    }
  }
  
  // Return rounded decimal if no good fraction match
  if (decimal < 1) {
    const rounded = decimal.toFixed(2).replace(/\.?0+$/, '');
    // For values like 0.123, prefer decimal over fraction
    if (decimal > 0.1 && decimal < 0.9) {
      const roundedValue = parseFloat(rounded);
      if (Math.abs(decimal - roundedValue) < 0.01) {
        return rounded;
      }
    }
    return rounded;
  } else {
    return decimal.toFixed(2).replace(/\.?0+$/, '');
  }
}

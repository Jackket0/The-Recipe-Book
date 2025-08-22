import {
  parseFraction,
  normalizeFractions,
  extractFractions,
  containsFractions,
  decimalToReadableFraction,
  ParsedFraction
} from '../lib/fractions';

describe('Fraction Utilities', () => {
  describe('parseFraction', () => {
    it('should parse unicode fractions', () => {
      expect(parseFraction('½')).toEqual({
        value: 0.5,
        original: '½',
        normalized: '0.5'
      });
      
      expect(parseFraction('⅓')).toEqual({
        value: 0.333,
        original: '⅓',
        normalized: '0.333'
      });
      
      expect(parseFraction('¾')).toEqual({
        value: 0.75,
        original: '¾',
        normalized: '0.75'
      });
    });

    it('should parse common fraction strings', () => {
      expect(parseFraction('1/2')).toEqual({
        value: 0.5,
        original: '1/2',
        normalized: '0.5'
      });
      
      expect(parseFraction('2/3')).toEqual({
        value: 0.667,
        original: '2/3',
        normalized: '0.667'
      });
    });

    it('should parse mixed numbers', () => {
      expect(parseFraction('1 1/2')).toEqual({
        value: 1.5,
        original: '1 1/2',
        normalized: '1.5'
      });
      
      expect(parseFraction('2 3/4')).toEqual({
        value: 2.75,
        original: '2 3/4',
        normalized: '2.75'
      });
    });

    it('should parse simple fractions', () => {
      expect(parseFraction('3/8')).toEqual({
        value: 0.375,
        original: '3/8',
        normalized: '0.375'
      });
    });

    it('should return null for invalid fractions', () => {
      expect(parseFraction('invalid')).toBeNull();
      expect(parseFraction('1/0')).toBeNull();
      expect(parseFraction('')).toBeNull();
    });
  });

  describe('normalizeFractions', () => {
    it('should normalize unicode fractions in text', () => {
      expect(normalizeFractions('Add ½ cup flour')).toBe('Add 0.5 cup flour');
      expect(normalizeFractions('Mix ⅓ cup sugar')).toBe('Mix 0.333 cup sugar');
      expect(normalizeFractions('Use ¾ cup milk')).toBe('Use 0.75 cup milk');
    });

    it('should normalize fraction strings in text', () => {
      expect(normalizeFractions('Add 1/2 cup flour')).toBe('Add 0.5 cup flour');
      expect(normalizeFractions('Mix 2/3 cup sugar')).toBe('Mix 0.667 cup sugar');
    });

    it('should normalize mixed numbers in text', () => {
      expect(normalizeFractions('Add 1 1/2 cups flour')).toBe('Add 1.5 cups flour');
      expect(normalizeFractions('Mix 2 3/4 cups sugar')).toBe('Mix 2.75 cups sugar');
    });

    it('should handle multiple fractions in one string', () => {
      expect(normalizeFractions('Add ½ cup flour and ⅓ cup sugar')).toBe('Add 0.5 cup flour and 0.333 cup sugar');
      expect(normalizeFractions('Mix 1/2 cup flour with 1/4 cup butter')).toBe('Mix 0.5 cup flour with 0.25 cup butter');
    });

    it('should preserve text without fractions', () => {
      expect(normalizeFractions('Add salt to taste')).toBe('Add salt to taste');
      expect(normalizeFractions('Mix well')).toBe('Mix well');
    });

    it('should handle edge cases', () => {
      expect(normalizeFractions('')).toBe('');
      expect(normalizeFractions('1/2')).toBe('0.5');
      expect(normalizeFractions('½')).toBe('0.5');
    });
  });

  describe('extractFractions', () => {
    it('should extract all fractions from text', () => {
      const result = extractFractions('Add ½ cup flour and ⅓ cup sugar');
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        value: 0.5,
        original: '½',
        normalized: '0.5'
      });
      expect(result[1]).toEqual({
        value: 0.333,
        original: '⅓',
        normalized: '0.333'
      });
    });

    it('should extract mixed numbers', () => {
      const result = extractFractions('Add 1 1/2 cups flour');
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        value: 1.5,
        original: '1 1/2',
        normalized: '1.5'
      });
    });

    it('should return empty array for text without fractions', () => {
      expect(extractFractions('Add salt to taste')).toEqual([]);
      expect(extractFractions('')).toEqual([]);
    });
  });

  describe('containsFractions', () => {
    it('should detect unicode fractions', () => {
      expect(containsFractions('Add ½ cup flour')).toBe(true);
      expect(containsFractions('Mix ⅓ cup sugar')).toBe(true);
    });

    it('should detect fraction strings', () => {
      expect(containsFractions('Add 1/2 cup flour')).toBe(true);
      expect(containsFractions('Mix 2/3 cup sugar')).toBe(true);
    });

    it('should detect mixed numbers', () => {
      expect(containsFractions('Add 1 1/2 cups flour')).toBe(true);
      expect(containsFractions('Mix 2 3/4 cups sugar')).toBe(true);
    });

    it('should return false for text without fractions', () => {
      expect(containsFractions('Add salt to taste')).toBe(false);
      expect(containsFractions('')).toBe(false);
    });
  });

  describe('decimalToReadableFraction', () => {
    it('should convert whole numbers', () => {
      expect(decimalToReadableFraction(1)).toBe('1');
      expect(decimalToReadableFraction(2)).toBe('2');
      expect(decimalToReadableFraction(0)).toBe('0');
    });

    it('should convert to common fractions', () => {
      expect(decimalToReadableFraction(0.5)).toBe('1/2');
      expect(decimalToReadableFraction(0.25)).toBe('1/4');
      expect(decimalToReadableFraction(0.75)).toBe('3/4');
      expect(decimalToReadableFraction(0.333)).toBe('1/3');
    });

    it('should convert to unicode fractions when appropriate', () => {
      expect(decimalToReadableFraction(0.5)).toBe('1/2'); // Prefers string over unicode
      expect(decimalToReadableFraction(0.333)).toBe('1/3');
    });

    it('should convert to mixed numbers', () => {
      expect(decimalToReadableFraction(1.5)).toBe('1 1/2');
      expect(decimalToReadableFraction(2.75)).toBe('2 3/4');
    });

    it('should return rounded decimals for non-standard values', () => {
      expect(decimalToReadableFraction(0.123)).toBe('0.12');
      expect(decimalToReadableFraction(1.234)).toBe('1.23');
    });
  });

  describe('Integration tests', () => {
    it('should handle complex recipe ingredients', () => {
      const ingredient = 'Add 1½ cups all-purpose flour and ⅓ cup melted butter';
      const normalized = normalizeFractions(ingredient);
      expect(normalized).toBe('Add 1.5 cups all-purpose flour and 0.333 cup melted butter');
      
      const fractions = extractFractions(ingredient);
      expect(fractions).toHaveLength(2);
      expect(fractions[0].value).toBe(1.5);
      expect(fractions[1].value).toBe(0.333);
    });

    it('should work with scaling scenarios', () => {
      const original = '1½ cups flour';
      const normalized = normalizeFractions(original);
      expect(normalized).toBe('1.5 cups flour');
      
      // Simulate scaling by 2
      const scaledValue = 1.5 * 2;
      const readable = decimalToReadableFraction(scaledValue);
      expect(readable).toBe('3');
    });
  });
});

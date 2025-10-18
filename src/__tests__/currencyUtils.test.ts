import { formatCurrency } from '../utils/currencyUtils';

describe('currencyUtils', () => {
  describe('formatCurrency', () => {
    it('should format currency with default USD', () => {
      const result = formatCurrency(14.99);
      expect(result).toBe('$14.99');
    });

    it('should format whole numbers with decimals', () => {
      expect(formatCurrency(100)).toBe('$100.00');
    });

    it('should format zero', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format large amounts with commas', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should format negative amounts', () => {
      expect(formatCurrency(-50.25)).toBe('-$50.25');
    });

    it('should round to 2 decimal places', () => {
      expect(formatCurrency(10.999)).toBe('$11.00');
      expect(formatCurrency(10.995)).toBe('$11.00');
    });

    it('should handle different currency codes', () => {
      const result = formatCurrency(100, 'EUR');
      expect(result).toContain('100.00');
      // Note: Symbol may vary by environment (€ or EUR)
    });

    it('should handle different locales', () => {
      // Test with en-US (default)
      expect(formatCurrency(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
    });

    it('should format small decimal amounts', () => {
      expect(formatCurrency(0.99)).toBe('$0.99');
      expect(formatCurrency(0.01)).toBe('$0.01');
    });
  });
});

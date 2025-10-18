/**
 * Currency formatting utilities
 */

/**
 * Format a number as currency (USD by default)
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number as compact currency (e.g., $1.2K, $1.5M)
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted compact currency string
 */
export const formatCompactCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  if (amount < 1000) {
    return formatCurrency(amount, currency, locale);
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Parse a currency string to a number
 * @param currencyString - Currency string to parse (e.g., "$14.99")
 * @returns Parsed number
 */
export const parseCurrency = (currencyString: string): number => {
  // Remove all non-numeric characters except decimal point and minus sign
  const cleanedString = currencyString.replace(/[^0-9.-]/g, '');

  return parseFloat(cleanedString);
};

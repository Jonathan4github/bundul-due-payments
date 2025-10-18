/**
 * Date utility functions for payment due dates
 */

/**
 * Format a date string to a readable format (e.g., "Oct 19, 2025")
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Calculate the number of days until a given date
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Number of days until the date (negative if past)
 */
export const getDaysUntilDate = (dateString: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight for accurate day comparison

  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Check if a payment is due soon (within 3 days)
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns True if due within 3 days
 */
export const isDueSoon = (dateString: string): boolean => {
  const daysUntil = getDaysUntilDate(dateString);

  return daysUntil >= 0 && daysUntil <= 3;
};

/**
 * Check if a payment is overdue
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns True if past due date
 */
export const isOverdue = (dateString: string): boolean => {

  return getDaysUntilDate(dateString) < 0;
};

/**
 * Get a human-readable relative date string
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Relative date string (e.g., "Due today", "Due in 3 days", "Overdue by 2 days")
 */
export const getRelativeDateString = (dateString: string): string => {
  const days = getDaysUntilDate(dateString);

  if (days < 0) {
    return `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'}`;
  } else if (days === 0) {
    return 'Due today';
  } else if (days === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${days} days`;
  }
};

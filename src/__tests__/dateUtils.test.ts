import {
  formatDate,
  getDaysUntilDate,
  isDueSoon,
  isOverdue,
} from '../utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const result = formatDate('2025-10-19');
      expect(result).toBe('Oct 19, 2025');
    });

    it('should handle different months', () => {
      expect(formatDate('2025-01-01')).toBe('Jan 1, 2025');
      expect(formatDate('2025-12-31')).toBe('Dec 31, 2025');
    });
  });

  describe('getDaysUntilDate', () => {
    beforeEach(() => {
      // Mock current date to Oct 18, 2025
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-10-18T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return 0 for today', () => {
      const result = getDaysUntilDate('2025-10-18');
      expect(result).toBe(0);
    });

    it('should return 1 for tomorrow', () => {
      const result = getDaysUntilDate('2025-10-19');
      expect(result).toBe(1);
    });

    it('should return 2 for day after tomorrow', () => {
      const result = getDaysUntilDate('2025-10-20');
      expect(result).toBe(2);
    });

    it('should return 3 for 3 days from now', () => {
      const result = getDaysUntilDate('2025-10-21');
      expect(result).toBe(3);
    });

    it('should return negative for past dates', () => {
      const result = getDaysUntilDate('2025-10-17');
      expect(result).toBe(-1);
    });

    it('should return negative for dates further in the past', () => {
      const result = getDaysUntilDate('2025-10-15');
      expect(result).toBe(-3);
    });
  });

  describe('isDueSoon', () => {
    beforeEach(() => {
      // Mock current date to Oct 18, 2025
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-10-18T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return true for today', () => {
      expect(isDueSoon('2025-10-18')).toBe(true);
    });

    it('should return true for tomorrow', () => {
      expect(isDueSoon('2025-10-19')).toBe(true);
    });

    it('should return true for day after tomorrow', () => {
      expect(isDueSoon('2025-10-20')).toBe(true);
    });

    it('should return false for 3 days from now', () => {
      expect(isDueSoon('2025-10-21')).toBe(false);
    });

    it('should return false for dates further in future', () => {
      expect(isDueSoon('2025-10-25')).toBe(false);
    });

    it('should return false for past dates', () => {
      expect(isDueSoon('2025-10-17')).toBe(false);
    });
  });

  describe('isOverdue', () => {
    beforeEach(() => {
      // Mock current date to Oct 18, 2025
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-10-18T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return false for today', () => {
      expect(isOverdue('2025-10-18')).toBe(false);
    });

    it('should return false for future dates', () => {
      expect(isOverdue('2025-10-19')).toBe(false);
      expect(isOverdue('2025-10-25')).toBe(false);
    });

    it('should return true for past dates', () => {
      expect(isOverdue('2025-10-17')).toBe(true);
    });

    it('should return true for dates further in the past', () => {
      expect(isOverdue('2025-10-15')).toBe(true);
    });
  });
});

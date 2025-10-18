import {
  getPaymentStatus,
  sortPaymentsByDueDate,
  calculateTotalDue,
  getUrgentPayments,
} from '../utils/paymentUtils';
import { Payment, PaymentStatus } from '../types/payment.types';

describe('paymentUtils', () => {
  const mockPayments: Payment[] = [
    {
      id: 1,
      service: 'Netflix',
      amount: 14.99,
      dueDate: '2025-10-19',
    },
    {
      id: 2,
      service: 'Spotify',
      amount: 9.99,
      dueDate: '2025-10-18',
    },
    {
      id: 3,
      service: 'Apple One',
      amount: 29.99,
      dueDate: '2025-11-01',
    },
    {
      id: 4,
      service: 'Amazon Prime',
      amount: 12.99,
      dueDate: '2025-10-20',
    },
  ];

  describe('getPaymentStatus', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-10-18T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return DUE_SOON for dates within 3 days', () => {
      expect(getPaymentStatus('2025-10-18')).toBe(PaymentStatus.DUE_SOON);
      expect(getPaymentStatus('2025-10-19')).toBe(PaymentStatus.DUE_SOON);
      expect(getPaymentStatus('2025-10-20')).toBe(PaymentStatus.DUE_SOON);
    });

    it('should return UPCOMING for dates 3+ days away', () => {
      expect(getPaymentStatus('2025-10-21')).toBe(PaymentStatus.UPCOMING);
      expect(getPaymentStatus('2025-11-01')).toBe(PaymentStatus.UPCOMING);
    });

    it('should return OVERDUE for past dates', () => {
      expect(getPaymentStatus('2025-10-17')).toBe(PaymentStatus.OVERDUE);
      expect(getPaymentStatus('2025-10-15')).toBe(PaymentStatus.OVERDUE);
    });
  });

  describe('sortPaymentsByDueDate', () => {
    it('should sort payments by due date (soonest first)', () => {
      const sorted = sortPaymentsByDueDate(mockPayments);

      expect(sorted[0].service).toBe('Spotify'); // Oct 18
      expect(sorted[1].service).toBe('Netflix'); // Oct 19
      expect(sorted[2].service).toBe('Amazon Prime'); // Oct 20
      expect(sorted[3].service).toBe('Apple One'); // Nov 1
    });

    it('should not mutate original array', () => {
      const original = [...mockPayments];
      sortPaymentsByDueDate(mockPayments);

      expect(mockPayments).toEqual(original);
    });

    it('should handle empty array', () => {
      const sorted = sortPaymentsByDueDate([]);
      expect(sorted).toEqual([]);
    });

    it('should handle single payment', () => {
      const single = [mockPayments[0]];
      const sorted = sortPaymentsByDueDate(single);

      expect(sorted).toEqual(single);
    });
  });

  describe('calculateTotalDue', () => {
    it('should calculate total amount correctly', () => {
      const total = calculateTotalDue(mockPayments);
      expect(total).toBe(67.96); // 14.99 + 9.99 + 29.99 + 12.99
    });

    it('should return 0 for empty array', () => {
      const total = calculateTotalDue([]);
      expect(total).toBe(0);
    });

    it('should handle single payment', () => {
      const total = calculateTotalDue([mockPayments[0]]);
      expect(total).toBe(14.99);
    });

    it('should handle decimal precision', () => {
      const payments: Payment[] = [
        { id: 1, service: 'Test', amount: 10.99, dueDate: '2025-10-20' },
        { id: 2, service: 'Test2', amount: 20.01, dueDate: '2025-10-21' },
      ];
      const total = calculateTotalDue(payments);
      expect(total).toBe(31);
    });
  });

  describe('getUrgentPayments', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-10-18T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return only urgent payments (due soon or overdue)', () => {
      const urgent = getUrgentPayments(mockPayments);

      expect(urgent.length).toBe(3);
      expect(urgent.some(p => p.service === 'Spotify')).toBe(true); // Oct 18
      expect(urgent.some(p => p.service === 'Netflix')).toBe(true); // Oct 19
      expect(urgent.some(p => p.service === 'Amazon Prime')).toBe(true); // Oct 20
    });

    it('should return empty array when no urgent payments', () => {
      const futurePayments: Payment[] = [
        {
          id: 1,
          service: 'Test',
          amount: 10,
          dueDate: '2025-11-01',
        },
        {
          id: 2,
          service: 'Test2',
          amount: 20,
          dueDate: '2025-12-01',
        },
      ];

      const urgent = getUrgentPayments(futurePayments);
      expect(urgent).toEqual([]);
    });

    it('should include overdue payments', () => {
      const paymentsWithOverdue: Payment[] = [
        ...mockPayments,
        {
          id: 5,
          service: 'Overdue Service',
          amount: 50,
          dueDate: '2025-10-15',
        },
      ];

      const urgent = getUrgentPayments(paymentsWithOverdue);
      expect(urgent.some(p => p.service === 'Overdue Service')).toBe(true);
    });
  });
});

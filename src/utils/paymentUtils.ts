import { Payment, PaymentStatus } from '../types/payment.types';
import { isOverdue, isDueSoon } from './dateUtils';

/**
 * Payment processing and sorting utilities
 */

/**
 * Determine the payment status based on due date
 * @param dueDate - ISO date string
 * @returns Payment status
 */
export const getPaymentStatus = (dueDate: string): PaymentStatus => {
  if (isOverdue(dueDate)) {
    return PaymentStatus.OVERDUE;
  }

  if (isDueSoon(dueDate)) {
    return PaymentStatus.DUE_SOON;
  }

  return PaymentStatus.UPCOMING;
};

/**
 * Sort payments by due date (overdue first, then soonest to latest)
 * Priority: Overdue (oldest first) → Due Soon → Upcoming
 * @param payments - Array of payments
 * @returns Sorted array of payments
 */
export const sortPaymentsByDueDate = (payments: Payment[]): Payment[] => {
  return [...payments].sort((a, b) => {
    const statusA = getPaymentStatus(a.dueDate);
    const statusB = getPaymentStatus(b.dueDate);

    // Priority order: OVERDUE > DUE_SOON > UPCOMING
    const priorityMap = {
      [PaymentStatus.OVERDUE]: 0,
      [PaymentStatus.DUE_SOON]: 1,
      [PaymentStatus.UPCOMING]: 2,
    };

    const priorityDiff = priorityMap[statusA] - priorityMap[statusB];

    // If same priority, sort by date (earliest first)
    if (priorityDiff === 0) {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    }

    return priorityDiff;
  });
};

/**
 * Calculate the total amount due from a list of payments
 * @param payments - Array of payments
 * @returns Total amount
 */
export const calculateTotalDue = (payments: Payment[]): number => {

  return payments.reduce((total, payment) => total + payment.amount, 0);
};

/**
 * Get urgent payments (due soon or overdue)
 * @param payments - Array of payments
 * @returns Array of urgent payments
 */
export const getUrgentPayments = (payments: Payment[]): Payment[] => {

  return payments.filter(
    payment =>
      getPaymentStatus(payment.dueDate) === PaymentStatus.DUE_SOON ||
      getPaymentStatus(payment.dueDate) === PaymentStatus.OVERDUE
  );
};

/**
 * Get overdue payments only
 * @param payments - Array of payments
 * @returns Array of overdue payments
 */
export const getOverduePayments = (payments: Payment[]): Payment[] => {
  return payments.filter(
    payment => getPaymentStatus(payment.dueDate) === PaymentStatus.OVERDUE
  );
};

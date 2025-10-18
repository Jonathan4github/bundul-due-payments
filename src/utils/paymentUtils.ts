import { Payment, PaymentStatus, PaymentWithStatus } from '../types/payment.types';
import { getDaysUntilDate, isOverdue, isDueSoon } from './dateUtils';

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
 * Add status information to a payment
 * @param payment - Payment object
 * @returns Payment with status
 */
export const addPaymentStatus = (payment: Payment): PaymentWithStatus => {

  return {
    ...payment,
    status: getPaymentStatus(payment.dueDate),
    daysUntilDue: getDaysUntilDate(payment.dueDate),
  };
};

/**
 * Sort payments by due date (soonest first)
 * @param payments - Array of payments
 * @returns Sorted array of payments
 */
export const sortPaymentsByDueDate = (payments: Payment[]): Payment[] => {

  return [...payments].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();

    return dateA - dateB;
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
 * Filter payments by status
 * @param payments - Array of payments
 * @param status - Payment status to filter by
 * @returns Filtered array of payments
 */
export const filterPaymentsByStatus = (
  payments: Payment[],
  status: PaymentStatus
): Payment[] => {

  return payments.filter(payment => getPaymentStatus(payment.dueDate) === status);
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

/**
 * Payment data structure for subscription payments
 */
export interface Payment {
  id: number;
  service: string;
  amount: number;
  dueDate: string;
  icon?: string;
  category?: string;
  color?: string;
}

/**
 * Payment status classification
 */
export enum PaymentStatus {
  DUE_SOON = 'DUE_SOON', // Due within 3 days
  UPCOMING = 'UPCOMING', // Due after 3 days
  OVERDUE = 'OVERDUE', // Past due date
}

/**
 * Extended payment with computed status
 */
export interface PaymentWithStatus extends Payment {
  status: PaymentStatus;
  daysUntilDue: number;
}

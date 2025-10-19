import { useState, useEffect, useCallback, useMemo } from 'react';
import { Payment } from '../types/payment.types';
import { MOCK_PAYMENTS } from '../constants/mockData';
import {
  sortPaymentsByDueDate,
  calculateTotalDue,
  getUrgentPayments,
  getOverduePayments,
} from '../utils/paymentUtils';

/**
 * Custom hook for managing payment data
 * Handles fetching, sorting, and refreshing payment data
 */
export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch payments (simulated API call)
   */
  const fetchPayments = useCallback(async () => {
    try {
      setError(null);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Sort payments by due date
      const sortedPayments = sortPaymentsByDueDate(MOCK_PAYMENTS);
      setPayments(sortedPayments);
    } catch (err) {
      setError('Failed to load payments');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPayments();
  }, [fetchPayments]);

  /**
   * Calculate total due amount
   */
  const totalDue = useMemo(() => calculateTotalDue(payments), [payments]);

  /**
   * Get urgent payments and calculate urgent amount
   */
  const urgentPayments = useMemo(() => getUrgentPayments(payments), [payments]);
  const urgentDue = useMemo(
    () => calculateTotalDue(urgentPayments),
    [urgentPayments]
  );
  const urgentCount = urgentPayments.length;

  /**
   * Get overdue payments and calculate overdue amount
   */
  const overduePayments = useMemo(() => getOverduePayments(payments), [payments]);
  const overdueDue = useMemo(
    () => calculateTotalDue(overduePayments),
    [overduePayments]
  );
  const overdueCount = overduePayments.length;

  // Initial fetch
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    loading,
    refreshing,
    error,
    totalDue,
    urgentDue,
    urgentCount,
    overdueDue,
    overdueCount,
    onRefresh,
  };
};

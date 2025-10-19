import { renderHook, act, waitFor } from '@testing-library/react-native';
import { usePayments } from '../hooks/usePayments';

describe('usePayments', () => {
  /**
   * Test: Initial state is correct
   */
  it('should initialize with loading state', () => {
    const { result } = renderHook(() => usePayments());

    expect(result.current.loading).toBe(true);
    expect(result.current.refreshing).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.payments).toEqual([]);
    expect(result.current.totalDue).toBe(0);
  });

  /**
   * Test: Fetches and loads payments after mount
   */
  it('should load payments after initial mount', async () => {
    const { result } = renderHook(() => usePayments());

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for payments to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Payments should be loaded
    expect(result.current.payments.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  /**
   * Test: Payments are sorted by due date
   */
  it('should sort payments by due date (soonest first)', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { payments } = result.current;

    // Check that each payment's due date is before or equal to the next
    for (let i = 0; i < payments.length - 1; i++) {
      const currentDate = new Date(payments[i].dueDate);
      const nextDate = new Date(payments[i + 1].dueDate);
      expect(currentDate.getTime()).toBeLessThanOrEqual(nextDate.getTime());
    }
  });

  /**
   * Test: Calculates total due correctly
   */
  it('should calculate totalDue correctly', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { payments, totalDue } = result.current;

    // Calculate expected total manually
    const expectedTotal = payments.reduce((sum, p) => sum + p.amount, 0);

    expect(totalDue).toBe(expectedTotal);
    expect(totalDue).toBeGreaterThan(0);
  });

  /**
   * Test: Calculates urgent payments correctly
   */
  it('should calculate urgentDue and urgentCount correctly', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { urgentDue, urgentCount } = result.current;

    // urgentDue should be a non-negative number
    expect(urgentDue).toBeGreaterThanOrEqual(0);
    expect(urgentCount).toBeGreaterThanOrEqual(0);

    // If there are urgent payments, urgentDue should be > 0
    if (urgentCount > 0) {
      expect(urgentDue).toBeGreaterThan(0);
    }
  });

  /**
   * Test: onRefresh sets refreshing state and reloads
   */
  it('should handle refresh correctly', async () => {
    const { result } = renderHook(() => usePayments());

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Trigger refresh
    act(() => {
      result.current.onRefresh();
    });

    // Should be refreshing
    expect(result.current.refreshing).toBe(true);

    // Wait for refresh to complete
    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });

    // Payments should still be loaded
    expect(result.current.payments.length).toBeGreaterThan(0);
  });

  /**
   * Test: Returns stable onRefresh function reference
   */
  it('should return stable onRefresh callback', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const firstOnRefresh = result.current.onRefresh;

    // Trigger a re-render by calling refresh
    act(() => {
      result.current.onRefresh();
    });

    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });

    const secondOnRefresh = result.current.onRefresh;

    // Should be the same function reference (useCallback)
    expect(firstOnRefresh).toBe(secondOnRefresh);
  });

  /**
   * Test: Loading state transitions correctly
   */
  it('should transition from loading to loaded state', async () => {
    const { result } = renderHook(() => usePayments());

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.payments).toEqual([]);

    // After loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.payments.length).toBeGreaterThan(0);
  });

  /**
   * Test: Urgent count is non-negative
   */
  it('should have valid urgentCount', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { urgentCount } = result.current;

    // urgentCount should be a non-negative integer
    expect(urgentCount).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(urgentCount)).toBe(true);
  });

  /**
   * Test: All payments have required fields
   */
  it('should return payments with all required fields', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { payments } = result.current;

    payments.forEach(payment => {
      expect(payment).toHaveProperty('id');
      expect(payment).toHaveProperty('service');
      expect(payment).toHaveProperty('amount');
      expect(payment).toHaveProperty('dueDate');
      expect(typeof payment.id).toBe('number');
      expect(typeof payment.service).toBe('string');
      expect(typeof payment.amount).toBe('number');
      expect(typeof payment.dueDate).toBe('string');
    });
  });

  /**
   * Test: Error is null when loading succeeds
   */
  it('should have null error when loading succeeds', async () => {
    const { result } = renderHook(() => usePayments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
  });
});

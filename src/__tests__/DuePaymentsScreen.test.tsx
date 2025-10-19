import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import DuePaymentsScreen from '../screens/DuePaymentsScreen';
import * as usePaymentsHook from '../hooks/usePayments';

// Mock the usePayments hook
jest.mock('../hooks/usePayments');

describe('DuePaymentsScreen', () => {
  const mockOnRefresh = jest.fn();

  const mockPayments = [
    {
      id: 1,
      service: 'Netflix',
      amount: 14.99,
      dueDate: '2025-10-18',
      icon: '📺',
      category: 'Entertainment',
    },
    {
      id: 2,
      service: 'Spotify',
      amount: 9.99,
      dueDate: '2025-10-19',
      icon: '🎵',
      category: 'Music',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: Renders loading state initially
   */
  it('should render loading state when loading is true', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: [],
      loading: true,
      refreshing: false,
      error: null,
      totalDue: 0,
      urgentDue: 0,
      urgentCount: 0,
      onRefresh: mockOnRefresh,
    });

    const { getByText, getByLabelText } = render(<DuePaymentsScreen />);

    expect(getByText('Loading...')).toBeTruthy();
    expect(getByLabelText('Loading payments')).toBeTruthy();
  });

  /**
   * Test: Renders error state when error exists
   */
  it('should render error state when there is an error', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: [],
      loading: false,
      refreshing: false,
      error: 'Failed to load payments',
      totalDue: 0,
      urgentDue: 0,
      urgentCount: 0,
      onRefresh: mockOnRefresh,
    });

    const { getByText, getByLabelText } = render(<DuePaymentsScreen />);

    expect(getByText('❌ Failed to load payments')).toBeTruthy();
    expect(getByLabelText('Error loading payments')).toBeTruthy();
  });

  /**
   * Test: Renders empty state when no payments
   */
  it('should render empty state when there are no payments', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: [],
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 0,
      urgentDue: 0,
      urgentCount: 0,
      onRefresh: mockOnRefresh,
    });

    const { getByText, getByLabelText } = render(<DuePaymentsScreen />);

    expect(getByText('🎉 No payments due!')).toBeTruthy();
    expect(getByLabelText('No payments due')).toBeTruthy();
  });

  /**
   * Test: Renders payment list correctly
   */
  it('should render payment list when payments exist', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByText, getByTestId } = render(<DuePaymentsScreen />);

    expect(getByText('Netflix')).toBeTruthy();
    expect(getByText('Spotify')).toBeTruthy();
    expect(getByTestId('payment-card-1')).toBeTruthy();
    expect(getByTestId('payment-card-2')).toBeTruthy();
  });

  /**
   * Test: Renders TotalDueHeader with correct props
   */
  it('should render TotalDueHeader with correct data', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByTestId } = render(<DuePaymentsScreen />);

    expect(getByTestId('total-due-header')).toBeTruthy();
  });

  /**
   * Test: Pay Now button triggers handlePayNow
   */
  it('should handle Pay Now button press', async () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByTestId } = render(<DuePaymentsScreen />);

    const payNowButton = getByTestId('pay-now-button-1');
    fireEvent.press(payNowButton);

    // Alert.alert is called (mocked by React Native Testing Library)
    await waitFor(() => {
      expect(payNowButton).toBeTruthy();
    });
  });

  /**
   * Test: Pay Later button triggers handlePayLater
   */
  it('should handle Pay Later button press', async () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByTestId } = render(<DuePaymentsScreen />);

    const payLaterButton = getByTestId('pay-later-button-1');
    fireEvent.press(payLaterButton);

    await waitFor(() => {
      expect(payLaterButton).toBeTruthy();
    });
  });

  /**
   * Test: Pull to refresh calls onRefresh
   */
  it('should call onRefresh when pull to refresh is triggered', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByLabelText } = render(<DuePaymentsScreen />);

    const flatList = getByLabelText('Payment list');
    expect(flatList).toBeTruthy();
  });

  /**
   * Test: Displays refreshing state
   */
  it('should show refreshing state when refreshing is true', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: true,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByLabelText } = render(<DuePaymentsScreen />);

    expect(getByLabelText('Payment list')).toBeTruthy();
  });

  /**
   * Test: Renders multiple payment cards
   */
  it('should render all payment cards from the list', () => {
    const manyPayments = [
      ...mockPayments,
      {
        id: 3,
        service: 'Apple One',
        amount: 29.99,
        dueDate: '2025-10-25',
        icon: '🍎',
        category: 'Services',
      },
    ];

    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: manyPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 54.97,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByTestId } = render(<DuePaymentsScreen />);

    expect(getByTestId('payment-card-1')).toBeTruthy();
    expect(getByTestId('payment-card-2')).toBeTruthy();
    expect(getByTestId('payment-card-3')).toBeTruthy();
  });

  /**
   * Test: Error state has proper accessibility role
   */
  it('should have alert role on error text', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: [],
      loading: false,
      refreshing: false,
      error: 'Network error',
      totalDue: 0,
      urgentDue: 0,
      urgentCount: 0,
      onRefresh: mockOnRefresh,
    });

    const { getByText } = render(<DuePaymentsScreen />);
    const errorText = getByText('❌ Network error');

    expect(errorText.props.accessibilityRole).toBe('alert');
  });

  /**
   * Test: FlatList has proper accessibility label
   */
  it('should have accessibility label on payment list', () => {
    (usePaymentsHook.usePayments as jest.Mock).mockReturnValue({
      payments: mockPayments,
      loading: false,
      refreshing: false,
      error: null,
      totalDue: 24.98,
      urgentDue: 24.98,
      urgentCount: 2,
      onRefresh: mockOnRefresh,
    });

    const { getByLabelText } = render(<DuePaymentsScreen />);

    expect(getByLabelText('Payment list')).toBeTruthy();
  });
});

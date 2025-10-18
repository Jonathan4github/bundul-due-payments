import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PaymentCard from '../components/PaymentCard';
import { Payment } from '../types/payment.types';

describe('PaymentCard', () => {
  const mockOnPayNow = jest.fn();
  const mockOnPayLater = jest.fn();

  const mockPayment: Payment = {
    id: 1,
    service: 'Netflix',
    amount: 14.99,
    dueDate: '2025-10-19',
    icon: '🎬',
    category: 'Entertainment',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-10-18T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render payment information correctly', () => {
    const { getByText } = render(
      <PaymentCard payment={mockPayment} onPayNow={mockOnPayNow} />
    );

    expect(getByText('Netflix')).toBeTruthy();
    expect(getByText('Entertainment')).toBeTruthy();
    expect(getByText('$14.99')).toBeTruthy();
    expect(getByText('Oct 19, 2025')).toBeTruthy();
  });

  it('should render icon if provided', () => {
    const { getByText } = render(
      <PaymentCard payment={mockPayment} onPayNow={mockOnPayNow} />
    );

    expect(getByText('🎬')).toBeTruthy();
  });

  it('should show Due Soon badge for urgent payments', () => {
    const { getByTestId } = render(
      <PaymentCard payment={mockPayment} onPayNow={mockOnPayNow} />
    );

    expect(getByTestId('due-soon-badge')).toBeTruthy();
  });

  it('should not show Due Soon badge for non-urgent payments', () => {
    const futurePayment: Payment = {
      ...mockPayment,
      dueDate: '2025-11-01',
    };

    const { queryByTestId } = render(
      <PaymentCard payment={futurePayment} onPayNow={mockOnPayNow} />
    );

    expect(queryByTestId('due-soon-badge')).toBeNull();
  });

  it('should apply urgent styling for due-soon payments', () => {
    const { getByTestId } = render(
      <PaymentCard payment={mockPayment} onPayNow={mockOnPayNow} />
    );

    const card = getByTestId('payment-card-1');
    expect(card.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#FFF5F5',
        }),
      ])
    );
  });

  it('should call onPayNow when Pay Now button is pressed', () => {
    const { getByTestId } = render(
      <PaymentCard payment={mockPayment} onPayNow={mockOnPayNow} />
    );

    const payNowButton = getByTestId('pay-now-button-1');
    fireEvent.press(payNowButton);

    expect(mockOnPayNow).toHaveBeenCalledTimes(1);
    expect(mockOnPayNow).toHaveBeenCalledWith(mockPayment);
  });

  it('should call onPayLater when Pay Later button is pressed', () => {
    const { getByTestId } = render(
      <PaymentCard
        payment={mockPayment}
        onPayNow={mockOnPayNow}
        onPayLater={mockOnPayLater}
      />
    );

    const payLaterButton = getByTestId('pay-later-button-1');
    fireEvent.press(payLaterButton);

    expect(mockOnPayLater).toHaveBeenCalledTimes(1);
    expect(mockOnPayLater).toHaveBeenCalledWith(mockPayment);
  });

  it('should not render Pay Later button if onPayLater is not provided', () => {
    const { queryByTestId } = render(
      <PaymentCard payment={mockPayment} onPayNow={mockOnPayNow} />
    );

    expect(queryByTestId('pay-later-button-1')).toBeNull();
  });

  it('should render without category', () => {
    const paymentWithoutCategory: Payment = {
      ...mockPayment,
      category: undefined,
    };

    const { queryByText } = render(
      <PaymentCard payment={paymentWithoutCategory} onPayNow={mockOnPayNow} />
    );

    expect(queryByText('Entertainment')).toBeNull();
  });

  it('should render without icon', () => {
    const paymentWithoutIcon: Payment = {
      ...mockPayment,
      icon: undefined,
    };

    const { queryByText } = render(
      <PaymentCard payment={paymentWithoutIcon} onPayNow={mockOnPayNow} />
    );

    expect(queryByText('🎬')).toBeNull();
  });
});

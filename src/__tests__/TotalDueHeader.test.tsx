import React from 'react';
import { render } from '@testing-library/react-native';
import TotalDueHeader from '../components/TotalDueHeader';

describe('TotalDueHeader', () => {
  const mockProps = {
    totalAmount: 147.93,
    urgentAmount: 24.98,
    paymentCount: 8,
    urgentCount: 2,
  };

  /**
   * Test: Component renders correctly
   */
  it('should render the total due header', () => {
    const { getByTestId } = render(<TotalDueHeader {...mockProps} />);
    expect(getByTestId('total-due-header')).toBeTruthy();
  });

  /**
   * Test: Displays total amount correctly
   */
  it('should display the total amount formatted as currency', () => {
    const { getByText } = render(<TotalDueHeader {...mockProps} />);
    expect(getByText('$147.93')).toBeTruthy();
  });

  /**
   * Test: Displays payment count with correct pluralization
   */
  it('should display payment count with plural form', () => {
    const { getByText } = render(<TotalDueHeader {...mockProps} />);
    expect(getByText('8 payments')).toBeTruthy();
  });

  /**
   * Test: Displays payment count with singular form
   */
  it('should display payment count with singular form when count is 1', () => {
    const { getByText } = render(
      <TotalDueHeader
        totalAmount={14.99}
        urgentAmount={0}
        paymentCount={1}
        urgentCount={0}
      />
    );
    expect(getByText('1 payment')).toBeTruthy();
  });

  /**
   * Test: Shows urgent badge when urgentCount > 0
   */
  it('should show urgent badge when there are urgent payments', () => {
    const { getByText } = render(<TotalDueHeader {...mockProps} />);
    expect(getByText('Due Soon')).toBeTruthy();
    expect(getByText('$24.98')).toBeTruthy();
    expect(getByText('2 payments')).toBeTruthy();
  });

  /**
   * Test: Hides urgent badge when urgentCount is 0
   */
  it('should not show urgent badge when urgentCount is 0', () => {
    const { queryByText } = render(
      <TotalDueHeader
        totalAmount={147.93}
        urgentAmount={0}
        paymentCount={8}
        urgentCount={0}
      />
    );
    expect(queryByText('Due Soon')).toBeNull();
  });

  /**
   * Test: Urgent count displays singular form
   */
  it('should display urgent count with singular form when count is 1', () => {
    const { getAllByText } = render(
      <TotalDueHeader
        totalAmount={147.93}
        urgentAmount={14.99}
        paymentCount={8}
        urgentCount={1}
      />
    );
    const singlePayment = getAllByText('1 payment');
    expect(singlePayment.length).toBeGreaterThan(0);
  });

  /**
   * Test: Displays all required text elements
   */
  it('should display "Total Due" label', () => {
    const { getByText } = render(<TotalDueHeader {...mockProps} />);
    expect(getByText('Total Due')).toBeTruthy();
  });

  /**
   * Test: Accessibility label includes all information
   */
  it('should have comprehensive accessibility label', () => {
    const { getByTestId } = render(<TotalDueHeader {...mockProps} />);
    const header = getByTestId('total-due-header');
    expect(header.props.accessibilityLabel).toContain('Total due: $147.93');
    expect(header.props.accessibilityLabel).toContain('8 payments');
    expect(header.props.accessibilityLabel).toContain('2 urgent');
  });

  /**
   * Test: Accessibility label without urgent payments
   */
  it('should have accessibility label without urgent info when urgentCount is 0', () => {
    const { getByTestId } = render(
      <TotalDueHeader
        totalAmount={147.93}
        urgentAmount={0}
        paymentCount={8}
        urgentCount={0}
      />
    );
    const header = getByTestId('total-due-header');
    expect(header.props.accessibilityLabel).toContain('Total due: $147.93');
    expect(header.props.accessibilityLabel).not.toContain('urgent');
  });

  /**
   * Test: Handles zero total amount
   */
  it('should handle zero total amount', () => {
    const { getByText } = render(
      <TotalDueHeader
        totalAmount={0}
        urgentAmount={0}
        paymentCount={0}
        urgentCount={0}
      />
    );
    expect(getByText('$0.00')).toBeTruthy();
  });

  /**
   * Test: Handles large amounts correctly
   */
  it('should format large amounts correctly', () => {
    const { getByText } = render(
      <TotalDueHeader
        totalAmount={1234.56}
        urgentAmount={999.99}
        paymentCount={10}
        urgentCount={3}
      />
    );
    expect(getByText('$1,234.56')).toBeTruthy();
    expect(getByText('$999.99')).toBeTruthy();
  });

  /**
   * Test: Warning emoji has accessibility label
   */
  it('should have accessibility label for warning icon', () => {
    const { getByLabelText } = render(<TotalDueHeader {...mockProps} />);
    expect(getByLabelText('Warning')).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../constants/colors';

describe('StatusBadge', () => {
  const mockOverdueStyle = {
    backgroundColor: colors.error,
    borderColor: colors.error,
  };

  const mockUrgentStyle = {
    backgroundColor: colors.background.urgentBadge,
    borderColor: colors.border.urgentBadge,
  };

  const mockLabelStyle = {
    color: colors.text.white,
  };

  const mockAmountStyle = {
    color: colors.text.white,
  };

  const mockCountStyle = {
    color: colors.text.white,
  };

  describe('Rendering', () => {
    it('should render with overdue props', () => {
      const { getByText, getByLabelText } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={14.99}
          count={1}
          badgeStyle={mockOverdueStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByLabelText('Overdue')).toBeTruthy();
      expect(getByText('Overdue')).toBeTruthy();
      expect(getByText('$14.99')).toBeTruthy();
      expect(getByText('1 payment')).toBeTruthy();
    });

    it('should render with urgent props', () => {
      const { getByText, getByLabelText } = render(
        <StatusBadge
          icon="⚠️"
          iconLabel="Warning"
          label="Due Soon"
          amount={24.98}
          count={2}
          badgeStyle={mockUrgentStyle}
          labelStyle={{ color: colors.text.lightRed }}
          amountStyle={mockAmountStyle}
          countStyle={{ color: colors.text.lightRed }}
        />
      );

      expect(getByLabelText('Warning')).toBeTruthy();
      expect(getByText('Due Soon')).toBeTruthy();
      expect(getByText('$24.98')).toBeTruthy();
      expect(getByText('2 payments')).toBeTruthy();
    });

    it('should render correct singular/plural text for count', () => {
      const { getByText } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={100}
          count={1}
          badgeStyle={mockOverdueStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByText('1 payment')).toBeTruthy();
    });

    it('should render plural payments text when count > 1', () => {
      const { getByText } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={100}
          count={5}
          badgeStyle={mockOverdueStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByText('5 payments')).toBeTruthy();
    });
  });

  describe('Currency Formatting', () => {
    it('should format currency correctly', () => {
      const { getByText } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={1234.56}
          count={1}
          badgeStyle={mockOverdueStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByText('$1,234.56')).toBeTruthy();
    });

    it('should format whole numbers correctly', () => {
      const { getByText } = render(
        <StatusBadge
          icon="⚠️"
          iconLabel="Warning"
          label="Due Soon"
          amount={100}
          count={1}
          badgeStyle={mockUrgentStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByText('$100.00')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('should apply custom badge style', () => {
      const customStyle = {
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
      };

      const { getByText } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={50}
          count={1}
          badgeStyle={customStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      // Just verify it renders with custom styles without errors
      expect(getByText('Overdue')).toBeTruthy();
      expect(getByText('$50.00')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility label for icon', () => {
      const { getByLabelText } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={50}
          count={1}
          badgeStyle={mockOverdueStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByLabelText('Overdue')).toBeTruthy();
    });

    it('should render different icons based on status', () => {
      const { getByText: getByTextOverdue } = render(
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={50}
          count={1}
          badgeStyle={mockOverdueStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      const { getByText: getByTextUrgent } = render(
        <StatusBadge
          icon="⚠️"
          iconLabel="Warning"
          label="Due Soon"
          amount={50}
          count={1}
          badgeStyle={mockUrgentStyle}
          labelStyle={mockLabelStyle}
          amountStyle={mockAmountStyle}
          countStyle={mockCountStyle}
        />
      );

      expect(getByTextOverdue('🔴')).toBeTruthy();
      expect(getByTextUrgent('⚠️')).toBeTruthy();
    });
  });
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/currencyUtils';
import { colors } from '../constants/colors';
import StatusBadge from './StatusBadge';

interface TotalDueHeaderProps {
  totalAmount: number;
  urgentAmount: number;
  paymentCount: number;
  urgentCount: number;
  overdueAmount: number;
  overdueCount: number;
}

const TotalDueHeader: React.FC<TotalDueHeaderProps> = ({
  totalAmount,
  urgentAmount,
  paymentCount,
  urgentCount,
  overdueAmount,
  overdueCount,
}) => {
  return (
    <View
      style={styles.container}
      testID="total-due-header"
      accessibilityLabel={`Total due: ${formatCurrency(totalAmount)} for ${paymentCount} ${paymentCount === 1 ? 'payment' : 'payments'}${urgentCount > 0 ? `. ${urgentCount} urgent ${urgentCount === 1 ? 'payment' : 'payments'} due soon` : ''}`}
    >
      <Text style={styles.label}>Total Due</Text>
      <Text style={styles.amount}>{formatCurrency(totalAmount)}</Text>
      <Text style={styles.count}>
        {paymentCount} {paymentCount === 1 ? 'payment' : 'payments'}
      </Text>

      {overdueCount > 0 && (
        <StatusBadge
          icon="🔴"
          iconLabel="Overdue"
          label="Overdue"
          amount={overdueAmount}
          count={overdueCount}
          badgeStyle={styles.overdueBadge}
          labelStyle={styles.overdueLabel}
          amountStyle={styles.overdueAmount}
          countStyle={styles.overdueCount}
        />
      )}

      {urgentCount > 0 && (
        <StatusBadge
          icon="⚠️"
          iconLabel="Warning"
          label="Due Soon"
          amount={urgentAmount}
          count={urgentCount}
          badgeStyle={styles.urgentBadge}
          labelStyle={styles.urgentLabel}
          amountStyle={styles.urgentAmount}
          countStyle={styles.urgentCount}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.header.background,
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: colors.header.subtext,
    marginBottom: 8,
  },
  amount: {
    fontSize: 42,
    fontWeight: '700',
    color: colors.header.text,
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: colors.header.subtext,
  },
  urgentBadge: {
    backgroundColor: colors.background.urgentBadge,
    borderColor: colors.border.urgentBadge,
  },
  urgentLabel: {
    color: colors.text.lightRed,
  },
  urgentAmount: {
    color: colors.text.white,
  },
  urgentCount: {
    color: colors.text.lightRed,
  },
  overdueBadge: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  overdueLabel: {
    color: colors.text.white,
  },
  overdueAmount: {
    color: colors.text.white,
  },
  overdueCount: {
    color: colors.text.white,
  },
});

export default TotalDueHeader;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/currencyUtils';
import { colors } from '../constants/colors';

interface TotalDueHeaderProps {
  totalAmount: number;
  urgentAmount: number;
  paymentCount: number;
  urgentCount: number;
}

const TotalDueHeader: React.FC<TotalDueHeaderProps> = ({
  totalAmount,
  urgentAmount,
  paymentCount,
  urgentCount,
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

      {urgentCount > 0 && (
        <View style={styles.urgentContainer}>
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentIcon} accessibilityLabel="Warning">⚠️</Text>
            <View>
              <Text style={styles.urgentLabel}>Due Soon</Text>
              <Text style={styles.urgentAmount}>
                {formatCurrency(urgentAmount)}
              </Text>
            </View>
            <Text style={styles.urgentCount}>
              {urgentCount} {urgentCount === 1 ? 'payment' : 'payments'}
            </Text>
          </View>
        </View>
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
  urgentContainer: {
    marginTop: 16,
    width: '100%',
  },
  urgentBadge: {
    backgroundColor: colors.background.urgentBadge,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border.urgentBadge,
  },
  urgentIcon: {
    fontSize: 24,
  },
  urgentLabel: {
    fontSize: 12,
    color: colors.text.lightRed,
    fontWeight: '600',
  },
  urgentAmount: {
    fontSize: 18,
    color: colors.text.white,
    fontWeight: '700',
  },
  urgentCount: {
    fontSize: 12,
    color: colors.text.lightRed,
    marginLeft: 'auto',
  },
});

export default TotalDueHeader;

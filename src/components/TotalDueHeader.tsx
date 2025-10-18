import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../utils/currencyUtils';

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
    <View style={styles.container} testID="total-due-header">
      <Text style={styles.label}>Total Due</Text>
      <Text style={styles.amount}>{formatCurrency(totalAmount)}</Text>
      <Text style={styles.count}>
        {paymentCount} {paymentCount === 1 ? 'payment' : 'payments'}
      </Text>

      {urgentCount > 0 && (
        <View style={styles.urgentContainer}>
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentIcon}>⚠️</Text>
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
    backgroundColor: '#3B82F6',
    padding: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: '#BFDBFE',
    marginBottom: 8,
  },
  amount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#BFDBFE',
  },
  urgentContainer: {
    marginTop: 16,
    width: '100%',
  },
  urgentBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  urgentIcon: {
    fontSize: 24,
  },
  urgentLabel: {
    fontSize: 12,
    color: '#FEE2E2',
    fontWeight: '600',
  },
  urgentAmount: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
  },
  urgentCount: {
    fontSize: 12,
    color: '#FEE2E2',
    marginLeft: 'auto',
  },
});

export default TotalDueHeader;

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { formatCurrency } from '../utils/currencyUtils';

interface StatusBadgeProps {
  icon: string;
  iconLabel: string;
  label: string;
  amount: number;
  count: number;
  badgeStyle: ViewStyle;
  labelStyle: TextStyle;
  amountStyle: TextStyle;
  countStyle: TextStyle;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  icon,
  iconLabel,
  label,
  amount,
  count,
  badgeStyle,
  labelStyle,
  amountStyle,
  countStyle,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.badge, badgeStyle]}>
        <Text style={styles.icon} accessibilityLabel={iconLabel}>
          {icon}
        </Text>
        <View>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <Text style={[styles.amount, amountStyle]}>
            {formatCurrency(amount)}
          </Text>
        </View>
        <Text style={[styles.count, countStyle]}>
          {count} {count === 1 ? 'payment' : 'payments'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },
  badge: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
  },
  count: {
    fontSize: 12,
    marginLeft: 'auto',
  },
});

export default StatusBadge;

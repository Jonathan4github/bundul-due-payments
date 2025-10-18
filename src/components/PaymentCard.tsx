import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Payment } from '../types/payment.types';
import { formatDate, isDueSoon } from '../utils/dateUtils';
import { formatCurrency } from '../utils/currencyUtils';
import DueSoonBadge from './DueSoonBadge';

interface PaymentCardProps {
  payment: Payment;
  onPayNow: (payment: Payment) => void;
  onPayLater?: (payment: Payment) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onPayNow,
  onPayLater,
}) => {
  const isUrgent = isDueSoon(payment.dueDate);

  return (
    <View
      style={[styles.card, isUrgent && styles.urgentCard]}
      testID={`payment-card-${payment.id}`}
    >
      <View style={styles.header}>
        <View style={styles.serviceInfo}>
          {payment.icon && <Text style={styles.icon}>{payment.icon}</Text>}
          <View style={styles.textContainer}>
            <Text style={styles.serviceName}>{payment.service}</Text>
            {payment.category && (
              <Text style={styles.category}>{payment.category}</Text>
            )}
          </View>
        </View>
        {isUrgent && <DueSoonBadge />}
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.amount}>{formatCurrency(payment.amount)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Due Date:</Text>
          <Text style={styles.dueDate}>{formatDate(payment.dueDate)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.payNowButton}
          onPress={() => onPayNow(payment)}
          testID={`pay-now-button-${payment.id}`}
        >
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
        {onPayLater && (
          <TouchableOpacity
            style={styles.payLaterButton}
            onPress={() => onPayLater(payment)}
            testID={`pay-later-button-${payment.id}`}
          >
            <Text style={styles.payLaterButtonText}>Pay Later</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  urgentCard: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  dueDate: {
    fontSize: 14,
    color: '#1F2937',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  payNowButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payNowButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  payLaterButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payLaterButtonText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PaymentCard;

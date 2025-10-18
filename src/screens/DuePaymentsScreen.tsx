import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Payment } from '../types/payment.types';
import { usePayments } from '../hooks/usePayments';
import PaymentCard from '../components/PaymentCard';
import TotalDueHeader from '../components/TotalDueHeader';

const DuePaymentsScreen: React.FC = () => {
  const {
    payments,
    loading,
    refreshing,
    error,
    totalDue,
    urgentDue,
    urgentCount,
    onRefresh,
  } = usePayments();
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  /**
   * Handle Pay Now action
   */
  const handlePayNow = (payment: Payment) => {
    setSelectedPayment(payment);
    Alert.alert(
      'Payment Confirmation',
      `Do you want to pay ${payment.service} now?\n\nAmount: $${payment.amount.toFixed(2)}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Pay Now',
          onPress: () => {
            // Simulate payment processing
            Alert.alert(
              'Success',
              `Payment of $${payment.amount.toFixed(2)} to ${payment.service} has been processed successfully!`,
              [{ text: 'OK' }]
            );
            setSelectedPayment(null);
          },
        },
      ]
    );
  };

  /**
   * Handle Pay Later action (Bonus feature)
   */
  const handlePayLater = (payment: Payment) => {
    Alert.alert(
      'Payment Reminder',
      `Set a reminder to pay ${payment.service} later?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remind Me',
          onPress: () => {
            Alert.alert('Reminder Set', `You'll be reminded to pay ${payment.service} later.`);
          },
        },
      ]
    );
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  /**
   * Render empty state
   */
  if (payments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>🎉 No payments due!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={payments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PaymentCard
            payment={item}
            onPayNow={handlePayNow}
            onPayLater={handlePayLater}
          />
        )}
        ListHeaderComponent={
          <TotalDueHeader
            totalAmount={totalDue}
            urgentAmount={urgentDue}
            paymentCount={payments.length}
            urgentCount={urgentCount}
          />
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  listContent: {
    paddingBottom: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
  },
});

export default DuePaymentsScreen;

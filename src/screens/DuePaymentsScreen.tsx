import React, { useState, useCallback } from 'react';
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
import { colors } from '../constants/colors';
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
  const handlePayNow = useCallback((payment: Payment) => {
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
  }, []);

  /**
   * Handle Pay Later action (Bonus feature)
   */
  const handlePayLater = useCallback((payment: Payment) => {
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
  }, []);

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <View style={styles.centerContainer} accessibilityLabel="Loading payments">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <View style={styles.centerContainer} accessibilityLabel="Error loading payments">
        <Text style={styles.errorText} accessibilityRole="alert">❌ {error}</Text>
      </View>
    );
  }

  /**
   * Render empty state
   */
  if (payments.length === 0) {
    return (
      <View style={styles.centerContainer} accessibilityLabel="No payments due">
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
            colors={[colors.primary]}
            tintColor={colors.primary}
            accessibilityLabel="Pull to refresh payments"
          />
        }
        accessibilityLabel="Payment list"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.main,
  },
  listContent: {
    paddingBottom: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text.secondary,
  },
});

export default DuePaymentsScreen;

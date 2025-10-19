import React from 'react';
import { View, StyleSheet } from 'react-native';
import DuePaymentsScreen from './src/screens/DuePaymentsScreen';
import ErrorBoundary from './src/components/ErrorBoundary';
import { colors } from './src/constants/colors';

export default function App() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <DuePaymentsScreen />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});

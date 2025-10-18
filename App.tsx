import React from 'react';
import { View, StyleSheet } from 'react-native';
import DuePaymentsScreen from './src/screens/DuePaymentsScreen';
import { colors } from './src/constants/colors';

export default function App() {
  return (
    <View style={styles.container}>
      <DuePaymentsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});

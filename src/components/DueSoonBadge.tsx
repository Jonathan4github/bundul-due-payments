import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../constants/colors';

interface DueSoonBadgeProps {
  animated?: boolean;
  text?: string;
}

const DueSoonBadge: React.FC<DueSoonBadgeProps> = ({
  animated = true,
  text = 'Due Soon'
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      // Create a subtle pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated, pulseAnim]);

  const accessibilityText = text === 'Overdue'
    ? 'Payment is overdue'
    : 'Payment due soon';

  return (
    <Animated.View
      style={[
        styles.badge,
        animated && { transform: [{ scale: pulseAnim }] },
      ]}
      testID="due-soon-badge"
      accessibilityLabel={accessibilityText}
      accessibilityRole="text"
    >
      <Text style={styles.badgeText}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.badge.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.badge.text,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DueSoonBadge;

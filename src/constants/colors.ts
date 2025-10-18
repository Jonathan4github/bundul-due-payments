/**
 * Color palette for the application
 * Centralized color management for consistency and easy theming
 */

export const colors = {
  primary: '#3B82F6',
  white: '#ffffff',
  black: '#000',


  error: '#EF4444',
  success: '#059669',

  gray: {
    50: '#F3F4F6',
    100: '#FEE2E2',
    200: '#BFDBFE',
    300: '#6B7280',
    400: '#4B5563',
    900: '#1F2937',
  },

  background: {
    main: '#F3F4F6',
    card: '#ffffff',
    urgent: '#FFF5F5',
    urgentBadge: 'rgba(239, 68, 68, 0.15)',
  },

  border: {
    urgent: '#EF4444',
    urgentBadge: 'rgba(239, 68, 68, 0.3)',
  },

  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    white: '#ffffff',
    light: '#BFDBFE',
    lightRed: '#FEE2E2',
  },

  badge: {
    background: '#EF4444',
    text: '#ffffff',
  },

  button: {
    primary: '#3B82F6',
    primaryText: '#ffffff',
    secondary: '#F3F4F6',
    secondaryText: '#4B5563',
  },

  header: {
    background: '#3B82F6',
    text: '#ffffff',
    subtext: '#BFDBFE',
  },

  amount: {
    text: '#059669',
  },

  shadow: {
    color: '#000',
  },
} as const;

export const {
  primary,
  white,
  black,
  error,
  success,
  gray,
  background,
  border,
  text,
  badge,
  button,
  header,
  amount,
  shadow
} = colors;

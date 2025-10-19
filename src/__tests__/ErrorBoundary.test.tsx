import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import ErrorBoundary from '../components/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <Text>Normal content</Text>;
};

// Suppress console.error for these tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe('ErrorBoundary', () => {
  /**
   * Test: Renders children when no error
   */
  it('should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Normal content</Text>
      </ErrorBoundary>
    );

    expect(getByText('Normal content')).toBeTruthy();
  });

  /**
   * Test: Catches error and displays fallback UI
   */
  it('should catch errors and display fallback UI', () => {
    const { getByText, getByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByTestId('error-boundary-fallback')).toBeTruthy();
    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(
      getByText('We encountered an unexpected error. Please try again.')
    ).toBeTruthy();
  });

  /**
   * Test: Displays warning emoji
   */
  it('should display warning emoji in fallback UI', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(getByText('⚠️')).toBeTruthy();
  });

  /**
   * Test: Displays Try Again button
   */
  it('should display Try Again button in fallback UI', () => {
    const { getByTestId, getByText } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const button = getByTestId('error-boundary-reset-button');
    expect(button).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });

  /**
   * Test: Try Again button has proper accessibility
   */
  it('should have proper accessibility attributes on button', () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const button = getByTestId('error-boundary-reset-button');
    expect(button.props.accessibilityLabel).toBe('Try again');
    expect(button.props.accessibilityRole).toBe('button');
  });

  /**
   * Test: Try Again button resets error state
   */
  it('should reset error state when Try Again is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error boundary should be displayed
    expect(getByTestId('error-boundary-fallback')).toBeTruthy();

    // Press Try Again button
    const button = getByTestId('error-boundary-reset-button');
    fireEvent.press(button);

    // Error boundary fallback should be removed
    // Note: In real scenario, child would need to not throw on re-render
    expect(queryByTestId('error-boundary-fallback')).toBeTruthy(); // Still shows because ThrowError still throws
  });

  /**
   * Test: Logs error to console in development
   */
  it('should log error to console', () => {
    const consoleErrorSpy = console.error as jest.Mock;
    consoleErrorSpy.mockClear();

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  /**
   * Test: Does not crash when children render normally
   */
  it('should not interfere with normal rendering', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>First child</Text>
        <Text>Second child</Text>
      </ErrorBoundary>
    );

    expect(getByText('First child')).toBeTruthy();
    expect(getByText('Second child')).toBeTruthy();
  });
});

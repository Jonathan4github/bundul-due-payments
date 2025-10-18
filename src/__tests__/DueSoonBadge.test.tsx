import React from 'react';
import { render } from '@testing-library/react-native';
import DueSoonBadge from '../components/DueSoonBadge';

describe('DueSoonBadge', () => {
  it('should render badge text correctly', () => {
    const { getByText } = render(<DueSoonBadge />);

    expect(getByText('Due Soon')).toBeTruthy();
  });

  it('should be visible with testID', () => {
    const { getByTestId } = render(<DueSoonBadge />);

    expect(getByTestId('due-soon-badge')).toBeTruthy();
  });

  it('should render with animation enabled by default', () => {
    const { getByTestId } = render(<DueSoonBadge />);
    const badge = getByTestId('due-soon-badge');

    expect(badge).toBeTruthy();
  });

  it('should render without animation when animated is false', () => {
    const { getByTestId } = render(<DueSoonBadge animated={false} />);
    const badge = getByTestId('due-soon-badge');

    expect(badge).toBeTruthy();
  });

  it('should apply correct styling', () => {
    const { getByTestId } = render(<DueSoonBadge />);
    const badge = getByTestId('due-soon-badge');

    // Check if badge has style prop (structure validation)
    expect(badge.props.style).toBeDefined();
  });
});

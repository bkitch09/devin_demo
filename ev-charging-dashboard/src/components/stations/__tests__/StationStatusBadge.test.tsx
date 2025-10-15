import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StationStatusBadge } from '../StationStatusBadge';
import { StationStatus } from '../../../types/station';

describe('StationStatusBadge', () => {
  it('renders available status', () => {
    render(<StationStatusBadge status={StationStatus.AVAILABLE} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('renders in use status', () => {
    render(<StationStatusBadge status={StationStatus.IN_USE} />);
    expect(screen.getByText('In Use')).toBeInTheDocument();
  });

  it('renders error status', () => {
    render(<StationStatusBadge status={StationStatus.ERROR} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

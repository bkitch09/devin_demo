import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders spinner', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
});

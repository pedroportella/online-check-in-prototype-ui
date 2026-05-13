import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the check-in delivery cockpit', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Online check-in delivery cockpit' })).toBeTruthy();
    expect(screen.getByRole('region', { name: 'Online check-in journey board' })).toBeTruthy();
    expect(screen.getByText('AI review coverage')).toBeTruthy();
  });
});

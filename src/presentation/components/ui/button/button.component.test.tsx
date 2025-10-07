import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button.component';

describe('UI/Button', () => {
  it('renders with title', () => {
    render(<Button variant="primary" title="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button variant="primary" title="Go" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button variant="primary" title="No" onClick={onClick} disabled />);
    const btn = screen.getByRole('button', { name: 'No' });
    // no custom matcher, check attribute directly
    expect(btn.getAttribute('disabled') !== null).toBe(true);
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});

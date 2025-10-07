import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomAlert } from './CustomAlert';

describe('UI/Alert', () => {
  it('renders success alert text', () => {
    render(<CustomAlert />);
    expect(screen.getByText('This is a success Alert.')).toBeTruthy();
  });
});


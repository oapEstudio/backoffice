import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './spinner.component';

describe('UI/Spinner', () => {
  it('renders a progressbar', () => {
    render(<Spinner />);
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});


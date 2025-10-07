import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CustomToast } from './CustomToast';
import { Toast, eToast } from './CustomToastService';

describe('UI/Toast', () => {
  it('renders toast container and shows a toast', async () => {
    render(<CustomToast />);
    Toast({ message: 'Hello toast', type: eToast.Success });
    await waitFor(() => {
      expect(screen.getByText('Hello toast')).toBeTruthy();
    });
  });
});


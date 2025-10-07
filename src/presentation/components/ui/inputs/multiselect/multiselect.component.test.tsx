import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CustomMultiselect from './multiselect.component';

describe('UI/Inputs/Multiselect', () => {
  it('renders label and selects an option', async () => {
    const onChange = vi.fn();
    const options = [
      { id: '1', name: 'Option A' },
      { id: '2', name: 'Option B' },
    ];
    render(
      <CustomMultiselect
        label="Opciones"
        options={options}
        value={[]}
        onChange={onChange as any}
      />
    );

    const input = screen.getByLabelText('Opciones');
    await waitFor(() => {
      fireEvent.mouseDown(input);
      expect(screen.getByRole('listbox')).toBeTruthy();
    });
    fireEvent.click(screen.getByText('Option A'));
    expect(onChange).toHaveBeenCalled();
  });

  it('respects disabled prop', () => {
    render(
      <CustomMultiselect label="Opciones" options={[]} value={[]} onChange={() => {}} disabled />
    );
    const input = screen.getByLabelText('Opciones');
    expect(input.getAttribute('aria-disabled') === 'true' || input.hasAttribute('disabled')).toBe(true);
  });
});

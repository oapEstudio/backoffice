import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomSelect from './select.component';

describe('UI/Inputs/Select', () => {
  const options = [
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
  ];

  it('renders label and placeholder, selects an option', () => {
    const onChange = vi.fn();
    render(
      <CustomSelect
        label="Choose"
        placeholder="Select..."
        options={options}
        value={''}
        onChange={onChange as any}
      />
    );

    expect(screen.getByText('Choose')).toBeTruthy();

    const combo = screen.getByRole('combobox');
    fireEvent.mouseDown(combo);

    fireEvent.click(screen.getByRole('option', { name: 'Two' }));
    expect(onChange).toHaveBeenCalled();
  });
});

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomTextInput from './text-input.component';

describe('UI/Inputs/TextInput', () => {
  it('renders label and counts characters', () => {
    render(
      <CustomTextInput
        label="Name"
        value="abc"
        maxLength={10}
        showCounter={true}
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('3/10')).toBeTruthy();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<CustomTextInput value="" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(onChange).toHaveBeenCalled();
  });
});


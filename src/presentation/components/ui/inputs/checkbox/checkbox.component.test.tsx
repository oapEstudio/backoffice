import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { CustomCheckboxInput } from './checkbox.component';

function Wrapper() {
  const { control } = useForm({ defaultValues: { accept: false } });
  return (
    <CustomCheckboxInput label="Accept" control={control} name="accept" disable={false} />
  );
}

describe('UI/Inputs/Checkbox', () => {
  it('toggles when clicked', () => {
    render(<Wrapper />);
    const checkbox = screen.getByRole('checkbox');
    expect((checkbox as HTMLInputElement).checked).toBe(false);
    fireEvent.click(checkbox);
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });
});

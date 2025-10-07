import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomRadioButton from './radio-button.component';

describe('UI/Inputs/RadioButton', () => {
  it('calls onChange with selected value (uncontrolled)', () => {
    const onChange = vi.fn();
    render(
      <CustomRadioButton
        options={[{ label: 'Yes', value: 'Y' }, { label: 'No', value: 'N' }]}
        value={'Y'}
        onChange={onChange as any}
        direction="row"
      />
    );
    fireEvent.click(screen.getByLabelText('No'));
    expect(onChange).toHaveBeenCalledWith('N');
  });
});

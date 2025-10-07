import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { CustomSwitchContainer } from './switch.component';

function Wrapper() {
  const { control } = useForm({ defaultValues: { active: false } });
  return (
    <CustomSwitchContainer control={control} name="active" description="Status" label={''} />
  );
}

describe('UI/Inputs/Switch', () => {
  it('toggles label from Inactiva to Activa', () => {
    render(<Wrapper />);
    expect(screen.getByText('Inactiva')).toBeTruthy();
    // Toggle by clicking the label associated to the switch
    const label = screen.getByText('Inactiva');
    fireEvent.click(label);
    expect(screen.getByText('Activa')).toBeTruthy();
  });
});

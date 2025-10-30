import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import StepOneNewAlert from './StepOneNewAlert';

function renderWithProviders(ui: React.ReactNode) {
  const depsMock = {
    getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([]) },
  } as any;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({
      mode: 'onChange',
      defaultValues: { name: '', profiles: [] },
    });
    return (
      <DependencyContext.Provider value={depsMock}>
        <FormProvider {...methods}>{children}</FormProvider>
      </DependencyContext.Provider>
    );
  };

  return render(<Wrapper>{ui}</Wrapper>);
}

describe('StepOneNewAlert', () => {
  test('renders name and profiles selectors', () => {
    renderWithProviders(<StepOneNewAlert />);

    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(
      screen.getByText(/Seleccione los perfiles que podr/i)
    ).toBeTruthy();
    // Dual list search placeholder
    expect(screen.getByPlaceholderText('Buscar perfil')).toBeTruthy();
  });
});

import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { StepOneProfile } from './StepOneProfile';

function renderWithProviders(ui: React.ReactNode, depsMock: any) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({
      mode: 'onChange',
      defaultValues: { name: '', description: '', statusId: 0, groups: [] },
    });
    return (
      <DependencyContext.Provider value={depsMock}>
        <FormProvider {...methods}>{children}</FormProvider>
      </DependencyContext.Provider>
    );
  };
  return render(<Wrapper>{ui}</Wrapper>);
}

describe('StepOneProfile', () => {
  test('renders title and subtitle', () => {
    const depsMock = { getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) } } as any;
    renderWithProviders(<StepOneProfile />, depsMock);

    expect(screen.getByText('Crear un perfil')).toBeTruthy();
    // Subtitle contains these words; avoid accents issues by partial match
    expect(screen.getByText(/perfil que incluya/i)).toBeTruthy();
  });

  test('mounts ProfileForm in create mode and fetches statuses', async () => {
    const execute = vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]);
    const depsMock = { getProfileStatuses: { execute } } as any;

    renderWithProviders(<StepOneProfile />, depsMock);

    // Loading indicator appears
    expect(screen.getByRole('progressbar')).toBeTruthy();

    // After load, fields from ProfileForm should be present
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(execute).toHaveBeenCalledWith({ filters: { ForCreate: true } });
  });
});

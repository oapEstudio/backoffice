import React from 'react';
import { describe, test, vi, expect } from 'vitest';
import { ProfileForm } from './ProfileFormValues';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { FormProvider, useForm } from 'react-hook-form';

function renderWithProviders(ui: React.ReactNode, { depsMock }: { depsMock: any }) {
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

describe('ProfileForm', () => {
  test('shows loading and then renders fields with fetched statuses', async () => {
    const execute = vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]);
    const depsMock = { getProfileStatuses: { execute } } as any;

    renderWithProviders(<ProfileForm isCreate={true} />, { depsMock });

    // Loading indicator appears
    expect(screen.getByRole('progressbar')).toBeTruthy();

    // Wait until fetch completes and loading disappears
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // Labels present
    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(screen.getByText('Estado')).toBeTruthy();
    expect(screen.getByText(/Descrip/i)).toBeTruthy();

    // Called with create filter
    expect(execute).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith({ filters: { ForCreate: true } });
  });

  test('requests update statuses when isCreate is false', async () => {
    const execute = vi.fn().mockResolvedValue([{ id: 2, description: 'Inactivo' }]);
    const depsMock = { getProfileStatuses: { execute } } as any;

    renderWithProviders(<ProfileForm isCreate={false} />, { depsMock });

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    expect(execute).toHaveBeenCalledWith({ filters: { ForUpdate: true } });
  });

  test('validates name pattern (forbidden special characters)', async () => {
    const execute = vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]);
    const depsMock = { getProfileStatuses: { execute } } as any;

    renderWithProviders(<ProfileForm isCreate={true} />, { depsMock });

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    const textboxes = screen.getAllByRole('textbox');
    const nameInput = textboxes[0] as HTMLInputElement; // first input is "name"

    fireEvent.change(nameInput, { target: { value: 'aaaaaaaaaa+' } }); // length > 10 with '+'
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(screen.getByText(/No se permiten caracteres especiales/i)).toBeTruthy();
    });
  });
});

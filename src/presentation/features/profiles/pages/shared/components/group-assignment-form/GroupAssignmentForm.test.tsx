import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { GroupAssignmentForm } from './GroupAssignmentForm';

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

describe('GroupAssignmentForm', () => {
  test('renders lists after loading groups', async () => {
    const execute = vi.fn().mockResolvedValue({
      data: [
        { id: 1, name: 'Admins' },
        { id: 2, name: 'Users' },
      ],
    });
    const depsMock = { getGroups: { execute } } as any;

    renderWithProviders(<GroupAssignmentForm />, depsMock);

    // shows spinner first
    expect(screen.getByRole('progressbar')).toBeTruthy();

    // wait for fetch completion
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // list titles
    expect(screen.getByText('Grupos AD disponibles')).toBeTruthy();
    expect(screen.getByText('Grupos AD asignados')).toBeTruthy();

    // left items rendered
    expect(screen.getByText('Admins')).toBeTruthy();
    expect(screen.getByText('Users')).toBeTruthy();
  });

  test('shows validation error when no groups assigned', async () => {
    const execute = vi.fn().mockResolvedValue({
      data: [
        { id: 1, name: 'Admins' },
        { id: 2, name: 'Users' },
      ],
    });
    const depsMock = { getGroups: { execute } } as any;

    renderWithProviders(<GroupAssignmentForm />, depsMock);

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // initially, no error message
    expect(screen.queryByText('Debes asignar al menos un grupo')).toBeNull();

    // select one from left and move to right
    fireEvent.click(screen.getByText('Admins'));
    fireEvent.click(screen.getByRole('button', { name: '>' }));

    // error should not be present when one assigned
    expect(screen.queryByText('Debes asignar al menos un grupo')).toBeNull();

    // select from right and move back to left -> assigned becomes []
    fireEvent.click(screen.getByText('Admins'));
    fireEvent.click(screen.getByRole('button', { name: '<' }));

    // error should appear on change
    await waitFor(() => {
      expect(screen.getByText('Debes asignar al menos un grupo')).toBeTruthy();
    });
  });
});

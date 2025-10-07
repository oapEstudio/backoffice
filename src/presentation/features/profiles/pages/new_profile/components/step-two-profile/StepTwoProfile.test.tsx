import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { StepTwoProfile } from './StepTwoProfile';

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

describe('StepTwoProfile', () => {
  test('renders title and subtitle', () => {
    const depsMock = { getGroups: { execute: vi.fn().mockResolvedValue({ data: [] }) } } as any;
    renderWithProviders(<StepTwoProfile />, depsMock);

    expect(screen.getByText(/Asignaci/i)).toBeTruthy();
    expect(screen.getByText(/grupos AD/i)).toBeTruthy();
  });

  test('loads groups and shows dual list with items', async () => {
    const execute = vi.fn().mockResolvedValue({
      data: [
        { id: 1, name: 'Admins' },
        { id: 2, name: 'Users' },
      ],
    });
    const depsMock = { getGroups: { execute } } as any;

    renderWithProviders(<StepTwoProfile />, depsMock);

    // spinner while fetching
    expect(screen.getByRole('progressbar')).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // titles from DualGroupADFetch
    expect(screen.getByText('Grupos AD disponibles')).toBeTruthy();
    expect(screen.getByText('Grupos AD asignados')).toBeTruthy();

    // search input placeholder
    expect(screen.getByPlaceholderText('Buscar grupo AD')).toBeTruthy();

    // items from API visible on left
    expect(screen.getByText('Admins')).toBeTruthy();
    expect(screen.getByText('Users')).toBeTruthy();

    expect(execute).toHaveBeenCalled();
  });
});


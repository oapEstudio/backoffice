import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { EditProfile } from './EditProfile';

function renderWithDeps(ui: React.ReactNode, depsMock: any) {
  return render(
    <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
  );
}

const validInitial = {
  id: 'p1',
  name: 'Nombre Valido',
  description: 'Descripcion valida',
  statusId: 1,
  groups: [],
};

describe('EditProfile', () => {
  test('renders modal title/subtitle and loads statuses for update', async () => {
    const depsMock = {
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]) },
      updateProfile: { execute: vi.fn().mockResolvedValue({}) },
    } as any;

    renderWithDeps(
      <EditProfile open={true} onClose={() => {}} onSaved={() => {}} initialData={validInitial as any} />,
      depsMock
    );

    expect(screen.getByText('Editar Perfil')).toBeTruthy();
    expect(screen.getByText(/Modific/i)).toBeTruthy();

    // loading from ProfileForm
    expect(screen.getByRole('progressbar')).toBeTruthy();

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // fields present
    expect(screen.getByText('Nombre')).toBeTruthy();

    // called with update filter
    expect(depsMock.getProfileStatuses.execute).toHaveBeenCalledWith({ filters: { ForUpdate: true } });
  });

  test('Cancelar llama onClose y resetea', async () => {
    const depsMock = {
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]) },
      updateProfile: { execute: vi.fn().mockResolvedValue({}) },
    } as any;
    const onClose = vi.fn();

    renderWithDeps(
      <EditProfile open={true} onClose={onClose} onSaved={() => {}} initialData={validInitial as any} />,
      depsMock
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    const cancelBtn = screen.getByRole('button', { name: 'Cancelar' });
    fireEvent.click(cancelBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('Aplicar ejecuta update y llama onSaved + onClose cuando el formulario es válido', async () => {
    const executeUpdate = vi.fn().mockResolvedValue({});
    const depsMock = {
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]) },
      updateProfile: { execute: executeUpdate },
    } as any;
    const onClose = vi.fn();
    const onSaved = vi.fn();

    renderWithDeps(
      <EditProfile open={true} onClose={onClose} onSaved={onSaved} initialData={validInitial as any} />,
      depsMock
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // aseguramos validación disparada con un pequeño cambio
    const textboxes = screen.getAllByRole('textbox');
    const nameInput = textboxes[0] as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Nombre Valido 2' } });

    const applyBtn = screen.getByRole('button', { name: 'Aplicar' }) as HTMLButtonElement;
    // puede estar deshabilitado hasta que RHF actualice el estado; esperar a que se habilite
    await waitFor(() => {
      expect(applyBtn.disabled).toBe(false);
    });

    fireEvent.click(applyBtn);

    await waitFor(() => {
      expect(executeUpdate).toHaveBeenCalled();
      expect(onSaved).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});


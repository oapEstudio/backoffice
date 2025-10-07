import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { EditGroups } from './EditGroups';

function renderWithDeps(ui: React.ReactNode, depsMock: any) {
  return render(
    <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
  );
}

describe('EditGroups', () => {
  test('renders modal title with profile name and loads groups list', async () => {
    const depsMock = {
      getGroups: { execute: vi.fn().mockResolvedValue({ data: [{ id: 1, name: 'Admins' }] }) },
      updateProfileGroup: { execute: vi.fn().mockResolvedValue({}) },
    } as any;

    renderWithDeps(
      <EditGroups
        open={true}
        onClose={() => {}}
        onSaved={() => {}}
        profile={{ id: 'p1', name: 'Perfil X' } as any}
        initialGroups={[]}
      />,
      depsMock
    );

    // Dialog title and subtitle content
    expect(screen.getByText('Grupos de Perfil X')).toBeTruthy();

    // Spinner while fetching
    expect(screen.getByRole('progressbar')).toBeTruthy();

    // After load, dual list titles and item
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });
    expect(screen.getByText('Grupos AD disponibles')).toBeTruthy();
    expect(screen.getByText('Grupos AD asignados')).toBeTruthy();
    expect(screen.getByText('Admins')).toBeTruthy();
  });

  test('Cancelar cierra el modal y resetea', async () => {
    const depsMock = {
      getGroups: { execute: vi.fn().mockResolvedValue({ data: [] }) },
      updateProfileGroup: { execute: vi.fn().mockResolvedValue({}) },
    } as any;

    const onClose = vi.fn();

    renderWithDeps(
      <EditGroups
        open={true}
        onClose={onClose}
        onSaved={() => {}}
        profile={{ id: 'p1', name: 'Perfil Y' } as any}
        initialGroups={[]}
      />,
      depsMock
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    const cancelBtn = screen.getByRole('button', { name: 'Cancelar' });
    fireEvent.click(cancelBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('Aplicar permanece deshabilitado cuando no hay grupos asignados', async () => {
    const depsMock = {
      getGroups: { execute: vi.fn().mockResolvedValue({ data: [{ id: 1, name: 'Admins' }] }) },
      updateProfileGroup: { execute: vi.fn().mockResolvedValue({}) },
    } as any;

    renderWithDeps(
      <EditGroups
        open={true}
        onClose={() => {}}
        onSaved={() => {}}
        profile={{ id: 'p1', name: 'Perfil Z' } as any}
        initialGroups={[]}
      />,
      depsMock
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    const okBtn = screen.getByRole('button', { name: 'Aplicar' }) as HTMLButtonElement;
    expect(okBtn.disabled).toBe(true);
  });
});

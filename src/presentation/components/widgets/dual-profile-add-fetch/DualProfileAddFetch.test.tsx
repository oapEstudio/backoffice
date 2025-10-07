import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import { DualProfileFetch } from './DualProfileAddFetch';

function renderWithDeps(ui: React.ReactNode, depsMock: any) {
  return render(
    <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
  );
}

describe('DualProfileFetch', () => {
  test('fetch mode: shows spinner, lists and allows moving to right', async () => {
    const execute = vi.fn().mockResolvedValue([
      { id: 1, description: 'Perfil A' },
      { id: 2, description: 'Perfil B' },
    ]);
    const depsMock = { getProfilesFilterProfiles: { execute } } as any;
    const onChange = vi.fn();

    renderWithDeps(
      <DualProfileFetch onChange={onChange} />, 
      depsMock
    );

    // Loading appears
    expect(screen.getByRole('progressbar')).toBeTruthy();

    // After load
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // Titles and placeholder
    expect(screen.getByText('Perfiles disponibles')).toBeTruthy();
    expect(screen.getByText('Perfiles asignados')).toBeTruthy();
    expect(screen.getByPlaceholderText('Buscar perfil')).toBeTruthy();

    // API items on left
    expect(screen.getByText('Perfil A')).toBeTruthy();
    expect(screen.getByText('Perfil B')).toBeTruthy();

    // Load-more section exists in fetch mode; label likely "No hay más"
    expect(screen.getByRole('button', { name: /No hay m/i })).toBeTruthy();

    // Move Perfil A to right
    fireEvent.click(screen.getByText('Perfil A'));
    fireEvent.click(screen.getByRole('button', { name: '>' }));

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['1']);
    });
  });

  test('restrict mode: builds lists from initialLeftProfiles and selectedProfiles, no load-more', async () => {
    const depsMock = { getProfilesFilterProfiles: { execute: vi.fn() } } as any;
    const onChange = vi.fn();

    renderWithDeps(
      <DualProfileFetch 
        onChange={onChange}
        initialLeftProfiles={[{ id: '10', name: 'Juan' }, { id: '11', name: 'Ana' }]} 
        selectedProfiles={[{ id: '11', name: 'Ana' }]} 
      />, 
      depsMock
    );

    // No spinner expected in restrict mode
    expect(screen.queryByRole('progressbar')).toBeNull();

    // Titles
    expect(screen.getByText('Perfiles disponibles')).toBeTruthy();
    expect(screen.getByText('Perfiles asignados')).toBeTruthy();

    // Left should contain Juan (not selected), right contains Ana (selected)
    expect(screen.getByText('Juan')).toBeTruthy();
    expect(screen.getByText('Ana')).toBeTruthy();

    // Load more section not rendered when restricted
    expect(screen.queryByRole('button', { name: /Cargar m/i })).toBeNull();
  });

  test('selectedFilters without names shows id as label on right', async () => {
    const execute = vi.fn().mockResolvedValue([]);
    const depsMock = { getProfilesFilterProfiles: { execute } } as any;
    const onChange = vi.fn();

    renderWithDeps(
      <DualProfileFetch onChange={onChange} selectedFilters={['55']} />, 
      depsMock
    );

    // Loading appears then disappears (even with empty results)
    expect(screen.getByRole('progressbar')).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // Right list shows the id as value
    expect(screen.getByText('55')).toBeTruthy();
  });
});

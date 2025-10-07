import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import ProfileMultiSelect from './MultiSelectProfile';

function renderWithDeps(ui: React.ReactNode, depsMock: any) {
  return render(
    <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
  );
}

describe('MultiSelectProfile', () => {
  test('renders label and loads options then shows them on open', async () => {
    const depsMock = {
      getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([
        { id: 'a1', description: 'Perfil A' },
        { id: 'b2', description: 'Perfil B' },
      ]) },
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) },
    } as any;

    renderWithDeps(
      <ProfileMultiSelect valueIds={[]} onChange={() => {}} />, 
      depsMock
    );

    // Label present
    const input = screen.getByLabelText('Perfil');
    expect(input).toBeTruthy();

    // Wait for options to be loaded (no spinner here, just wait then open)
    await waitFor(() => {
      // open autocomplete
      fireEvent.mouseDown(input);
      expect(screen.getByRole('listbox')).toBeTruthy();
    });

    expect(screen.getByText('Perfil A')).toBeTruthy();
    expect(screen.getByText('Perfil B')).toBeTruthy();
  });

  test('disabled prop disables the input', async () => {
    const depsMock = {
      getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([]) },
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) },
    } as any;

    renderWithDeps(
      <ProfileMultiSelect valueIds={[]} onChange={() => {}} disabled />, 
      depsMock
    );

    const input = screen.getByLabelText('Perfil') as HTMLInputElement;
    expect(input.hasAttribute('disabled') || input.getAttribute('aria-disabled') === 'true').toBe(true);
  });

  test('selecting an option calls onChange with selected names as ids', async () => {
    const depsMock = {
      getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([
        { id: 'a1', description: 'Perfil A' },
      ]) },
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) },
    } as any;

    const onChange = vi.fn();

    renderWithDeps(
      <ProfileMultiSelect valueIds={[]} onChange={onChange} />, 
      depsMock
    );

    const input = screen.getByLabelText('Perfil');

    await waitFor(() => {
      fireEvent.mouseDown(input);
      expect(screen.getByRole('listbox')).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Perfil A'));

    await waitFor(() => {
      expect(onChange).toHaveBeenLastCalledWith(['Perfil A'], expect.arrayContaining([expect.objectContaining({ name: 'Perfil A' })]));
    });
  });

  test('valueIds preselects values by name', async () => {
    const depsMock = {
      getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([
        { id: 'b2', description: 'Perfil B' },
      ]) },
      getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) },
    } as any;

    renderWithDeps(
      <ProfileMultiSelect valueIds={['Perfil B']} onChange={() => {}} />, 
      depsMock
    );

    // The selected chip/value should render text "Perfil B" without opening
    await waitFor(() => {
      expect(screen.getByText('Perfil B')).toBeTruthy();
    });
  });
});

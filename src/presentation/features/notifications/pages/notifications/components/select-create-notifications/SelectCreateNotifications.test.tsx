import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { SelectCreateNotifications } from './SelectCreateNotifications';

function renderWithDeps(ui: React.ReactNode) {
  const depsMock = {
    getNotificationTypes: { execute: vi.fn().mockResolvedValue([
      { id: 'carousel', description: 'Carrusel' },
      { id: 'alert', description: 'Alerta' },
      { id: 'bell', description: 'Campana' },
    ]) },
  } as any;
  return render(
    <MemoryRouter>
      <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
    </MemoryRouter>
  );
}

describe('SelectCreateNotifications', () => {
  test('renders select control', () => {
    renderWithDeps(<SelectCreateNotifications />);
    // Expect a combobox to be present
    expect(screen.getByRole('combobox')).toBeTruthy();
  });
});

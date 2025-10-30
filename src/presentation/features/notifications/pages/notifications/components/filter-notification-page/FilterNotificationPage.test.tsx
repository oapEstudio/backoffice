import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { FilterNotificationPage } from './FilterNotificationPage';

function renderWithDeps(ui: React.ReactNode) {
  const depsMock = {
    getNotificationStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]) },
    getNotificationTypes: { execute: vi.fn().mockResolvedValue([{ id: 10, description: 'Tipo A' }]) },
    getNotificationCommon: { execute: vi.fn().mockResolvedValue([]) },
    getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([{ id: 'p1', description: 'Perfil 1' }]) },
    getProfileStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Status' }]) },
  } as any;
  return render(
    <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
  );
}

describe('FilterNotificationPage', () => {
  test('renders modal', () => {
    renderWithDeps(
      <FilterNotificationPage
        open
        initialFilters={{ profileIds: [], status: [], notificationsType: [] }}
        onOk={() => {}}
        onCancel={() => {}}
      />
    );
    expect(screen.getByText('Filtrar notificaciones')).toBeTruthy();
  });
});

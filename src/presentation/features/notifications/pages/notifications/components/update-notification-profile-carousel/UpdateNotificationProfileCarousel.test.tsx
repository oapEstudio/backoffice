import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import UpdateNotificationProfileCarousel from './UpdateNotificationProfileCarousel';

function renderWithDeps(ui: React.ReactNode) {
  const depsMock = {
    updateNotificationProfiles: { execute: vi.fn().mockResolvedValue({}) },
    getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([]) },
  } as any;
  return render(
    <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
  );
}

describe('UpdateNotificationProfileCarousel', () => {
  test('renders dual list within modal', () => {
    renderWithDeps(
      <UpdateNotificationProfileCarousel
        open
        notificationId="1"
        selectedProfiles={[{ id: '1', name: 'Juan' }]}
        leftSeedProfiles={[{ id: '2', name: 'Ana' }]}
        onClose={() => {}}
        onSaved={() => {}}
      />
    );
    expect(screen.getByText('Perfiles disponibles')).toBeTruthy();
    expect(screen.getByText('Perfiles asignados')).toBeTruthy();
  });
});

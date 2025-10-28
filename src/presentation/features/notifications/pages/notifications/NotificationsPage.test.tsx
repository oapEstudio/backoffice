import React from 'react';
import { describe, test, expect, vi } from 'vitest';
vi.mock('react-lottie', () => ({ default: () => null }));
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../../contexts/AuthContext';
import type { IAuthRepository } from '../../../../../application/interfaces/IAuthRepository';
import { DependencyContext } from '../../../../contexts/DependencyContext';
import { NotificationsPage } from './NotificationsPage';

function renderWithProviders(ui: React.ReactNode) {
  const authRepo: IAuthRepository = {
    getClaims: async () => ({ name: 'Tester' }),
    login: () => {},
    logout: () => {},
  };

  const depsMock = {
    getNotifications: {
      execute: vi.fn().mockResolvedValue({
        data: [],
        count: 0,
        parameters: { sortBy: null, page: 1, pageSize: 10, sortDescending: false },
      }),
    },
    cancellationNotification: { execute: vi.fn().mockResolvedValue({}) },
    getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([]) },
    getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationTypes: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationStatuses: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationCommon: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationById: { execute: vi.fn().mockResolvedValue({}) },
    updateNotification: { execute: vi.fn().mockResolvedValue({}) },
  } as any;

  return render(
    <MemoryRouter>
      <AuthProvider repo={authRepo} mode="mock">
        <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('NotificationsPage', () => {
  test('renders page title', async () => {
    renderWithProviders(<NotificationsPage />);
    expect(screen.getByText('Notificaciones')).toBeTruthy();
  });
});

import React from 'react';
import { describe, test, expect, vi } from 'vitest';
vi.mock('react-lottie', () => ({ default: () => null }));
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../../contexts/AuthContext';
import type { IAuthRepository } from '../../../../../application/interfaces/IAuthRepository';
import { DependencyContext } from '../../../../contexts/DependencyContext';
import { NewBellPage } from './NewBellPage';

function renderWithProviders(ui: React.ReactNode) {
  const authRepo: IAuthRepository = {
    getClaims: async () => ({ name: 'Tester' }),
    login: () => {},
    logout: () => {},
  };

  const depsMock = {
    getProfilesFilterProfiles: { execute: vi.fn().mockResolvedValue([]) },
    getProfileStatuses: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationStatuses: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationTypes: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationCommon: { execute: vi.fn().mockResolvedValue([]) },
  } as any;

  return render(
    <MemoryRouter>
      <AuthProvider repo={authRepo} mode="mock">
        <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('NewBellPage', () => {
  test('renders page and first step', () => {
    renderWithProviders(<NewBellPage />);
    expect(screen.getByText(/Nueva campana/i)).toBeTruthy();
    expect(screen.getByText('Nombre')).toBeTruthy();
  });
});

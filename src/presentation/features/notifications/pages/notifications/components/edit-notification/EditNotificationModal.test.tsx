import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import EditNotificationModal from './EditNotificationModal';

function renderWithDeps(ui: React.ReactNode) {
  const depsMock = {
    getNotificationById: { execute: vi.fn().mockResolvedValue({
      id: '1',
      name: 'N',
      title: 'T',
      description: 'D',
      profiles: [],
      statusId: 1,
      notificationTypeId: 1,
    }) },
    updateNotification: { execute: vi.fn().mockResolvedValue({}) },
    getNotificationStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]) },
    getNotificationTypes: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationCommon: { execute: vi.fn().mockResolvedValue([]) },
  } as any;

  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MemoryRouter>
        <DependencyContext.Provider value={depsMock}>{ui}</DependencyContext.Provider>
      </MemoryRouter>
    </LocalizationProvider>
  );
}

describe('EditNotificationModal', () => {
  test('renders when open and loads fields', async () => {
    renderWithDeps(
      <EditNotificationModal open={true} notificationId={'1'} onClose={() => {}} onSaved={() => {}} />
    );
    expect(await screen.findByText('Estado')).toBeTruthy();
  });
});

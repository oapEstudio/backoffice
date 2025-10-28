import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DependencyContext } from '../../../../../../contexts/DependencyContext';
import { StepTwoNewBell } from './StepTwoNewBell';

function renderWithProviders(ui: React.ReactNode) {
  const depsMock = {
    getNotificationStatuses: { execute: vi.fn().mockResolvedValue([{ id: 1, description: 'Activo' }]) },
    getNotificationTypes: { execute: vi.fn().mockResolvedValue([]) },
    getNotificationCommon: { execute: vi.fn().mockResolvedValue([]) },
  } as any;

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({
      mode: 'onChange',
      defaultValues: {
        title: '',
        subtitle: '',
        hasButton: false,
        buttonTitle: '',
        buttonLink: '',
        hasPublication: false,
        dateFrom: null,
        timeFrom: null,
        hasExpired: false,
        dateTo: null,
        timeTo: null,
        state: '1',
        notificationCommonTypeId: '0',
      },
    });
    return (
      <DependencyContext.Provider value={depsMock}>
        <FormProvider {...methods}>{children}</FormProvider>
      </DependencyContext.Provider>
    );
  };
  return render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Wrapper>{ui}</Wrapper>
    </LocalizationProvider>
  );
}

describe('StepTwoNewBell', () => {
  test('shows Estado select', () => {
    renderWithProviders(<StepTwoNewBell />);
    expect(screen.getByText('Estado')).toBeTruthy();
  });
});

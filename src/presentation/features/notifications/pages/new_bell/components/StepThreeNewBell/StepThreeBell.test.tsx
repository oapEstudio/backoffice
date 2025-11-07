import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import StepThreeBell from './StepThreeBell';

function renderWithForm(ui: React.ReactNode) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({
      mode: 'onChange',
      defaultValues: {
        title: 'Bell Title',
        subtitle: 'Subtitle',
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
        profiles: [],
        notificationCommonTypeId: '1',
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{ui}</Wrapper>);
}

describe('StepThreeBell', () => {
  test('renders preview info', () => {
    renderWithForm(<StepThreeBell />);
    expect(screen.getByText('Perfiles asignados')).toBeTruthy();
  });
});


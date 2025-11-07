import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import StepThreeNotifications from './StepThreeNotifications';

function renderWithForm(ui: React.ReactNode) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({
      mode: 'onChange',
      defaultValues: {
        title: 'Carousel Title',
        subtitle: 'Subtitle',
        img: undefined,
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
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{ui}</Wrapper>);
}

describe('StepThreeNotifications', () => {
  test('renders preview info', () => {
    renderWithForm(<StepThreeNotifications />);
    expect(screen.getByText('Perfiles asignados')).toBeTruthy();
  });
});


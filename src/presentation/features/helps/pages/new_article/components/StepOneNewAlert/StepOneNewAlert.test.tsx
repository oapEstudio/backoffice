import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import { StepOneNewAlert } from './StepOneNewAlert';
import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import { STATE_HELP_ACTIVE, STATE_HELP_NEW } from '../../../../shared/constants/helps';

const renderWithForm = (component: React.ReactElement) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  return render(component, { wrapper: Wrapper });
};

describe('StepOneNewAlert', () => {
  const mockSelectOptions: SelectOption[] = [
    { value: STATE_HELP_NEW, label: 'Nuevo' },
    { value: STATE_HELP_ACTIVE, label: 'Activo' },
  ];

  it('renderiza sin errores', () => {
    const { container } = renderWithForm(
      <StepOneNewAlert selectItemsStatuses={mockSelectOptions} />
    );
    
    expect(container).toBeTruthy();
    expect(container.firstChild).not.toBeNull();
  });

  it('renderiza con array vacío', () => {
    const { container } = renderWithForm(
      <StepOneNewAlert selectItemsStatuses={[]} />
    );
    
    expect(container.firstChild).not.toBeNull();
  });

  it('usa el valor por defecto cuando no se pasa selectItemsStatuses', () => {
    const { container } = renderWithForm(
      <StepOneNewAlert selectItemsStatuses={undefined as any} />
    );
    
    expect(container.firstChild).not.toBeNull();
  });
});
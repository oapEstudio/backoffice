import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import { StepOneNewInvisibleDocument } from './StepOneNewInvisibleDocument';
import { STATE_HELP_NEW, STATE_HELP_ACTIVE, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from '../../../../shared/constants/helps';

const renderWithForm = (component: React.ReactElement) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(component, { wrapper: Wrapper });
};

const mockSelectOptions: SelectOption[] = [
  { value: STATE_HELP_NEW, label: 'Nuevo' },
  { value: STATE_HELP_ACTIVE, label: 'Activo' },
];

const mockDocumentTypeOptions: SelectOption[] = [
  { value: HELP_DOCUMENT_LINK, label: 'Link a otra pagina' },
  { value: HELP_DOCUMENT_PDF, label: 'PDF' },
];

describe('StepOneNewInvisibleDocument', () => {

  it('renderiza sin errores', () => {
    const { container } = renderWithForm(
      <StepOneNewInvisibleDocument selectItemsStatuses={mockSelectOptions} selectItemsDocumentType={mockDocumentTypeOptions} />
    );

    expect(container).toBeTruthy();
    expect(container.firstChild).not.toBeNull();
  });

  it('renderiza con array vacío', () => {
    const { container } = renderWithForm(
      <StepOneNewInvisibleDocument selectItemsStatuses={[]} selectItemsDocumentType={[]}/>
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('usa el valor por defecto cuando no se pasa selectItemsStatuses', () => {
    const { container } = renderWithForm(
      <StepOneNewInvisibleDocument selectItemsStatuses={undefined as any} selectItemsDocumentType={[]}/>
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('usa los valores por defecto cuando no se pasa selectItemsDocumentType', () => {
    const { container } = renderWithForm(
      <StepOneNewInvisibleDocument selectItemsStatuses={[]} selectItemsDocumentType={undefined as any} />
    );

    expect(container.firstChild).not.toBeNull();
  });
});
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormProvider, useForm } from 'react-hook-form';
import type { SelectOption } from '../../../../../../components/ui/inputs/select/select.interface';
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF, STATE_HELP_ACTIVE, STATE_HELP_NEW } from '../../../../shared/constants/helps';
import { StepOneNewDocument } from './StepOneNewDocument';

const renderWithForm = (component: React.ReactElement) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  
  return render(component, { wrapper: Wrapper });
};

describe('StepOneNewDocument', () => {
  const mockSelectStatuses: SelectOption[] = [
    { value: STATE_HELP_NEW, label: 'Nuevo' },
    { value: STATE_HELP_ACTIVE, label: 'Activo' },
  ];

  const mockSelectDocumentTypes: SelectOption[] = [
    { value: HELP_DOCUMENT_LINK, label: 'Link a pagina' },
    { value: HELP_DOCUMENT_DOWNLOAD, label: 'Documento Descargable' },
    { value: HELP_DOCUMENT_PDF, label: 'PDF' },
  ];

  it('renderiza sin errores con ambas props', () => {
    const { container } = renderWithForm(
      <StepOneNewDocument 
        selectItemsStatuses={mockSelectStatuses}
        selectItemsDocumentType={mockSelectDocumentTypes}
      />
    );
    
    expect(container).toBeTruthy();
    expect(container.firstChild).not.toBeNull();
  });

  it('renderiza con arrays vacíos', () => {
    const { container } = renderWithForm(
      <StepOneNewDocument 
        selectItemsStatuses={[]}
        selectItemsDocumentType={[]}
      />
    );
    
    expect(container.firstChild).not.toBeNull();
  });

  it('renderiza solo con selectItemsStatuses', () => {
    const { container } = renderWithForm(
      <StepOneNewDocument 
        selectItemsStatuses={mockSelectStatuses}
        selectItemsDocumentType={[]}
      />
    );
    
    expect(container.firstChild).not.toBeNull();
  });

  it('renderiza solo con selectItemsDocumentType', () => {
    const { container } = renderWithForm(
      <StepOneNewDocument 
        selectItemsStatuses={[]}
        selectItemsDocumentType={mockSelectDocumentTypes}
      />
    );
    
    expect(container.firstChild).not.toBeNull();
  });

  it('usa valores por defecto cuando no se pasan props', () => {
    const { container } = renderWithForm(
      <StepOneNewDocument 
        selectItemsStatuses={undefined as any}
        selectItemsDocumentType={undefined as any}
      />
    );
    
    expect(container.firstChild).not.toBeNull();
  });

  it('maneja diferentes cantidades de opciones', () => {
    const singleStatus: SelectOption[] = [{ value: 1, label: 'Único' }];
    const multipleDocTypes: SelectOption[] =  [
    { value: HELP_DOCUMENT_LINK, label: 'Link a pagina' },
    { value: HELP_DOCUMENT_DOWNLOAD, label: 'Documento Descargable' },
    { value: HELP_DOCUMENT_PDF, label: 'PDF' },
  ]
    
    const { container } = renderWithForm(
      <StepOneNewDocument 
        selectItemsStatuses={singleStatus}
        selectItemsDocumentType={multipleDocTypes}
      />
    );
    
    expect(container.firstChild).not.toBeNull();
  });
});
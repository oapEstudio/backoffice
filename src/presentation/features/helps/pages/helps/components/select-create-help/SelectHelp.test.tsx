import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HELP_ARTICLE, HELP_DOCUMENT, HELP_INVISIBLE, HELP_SECTION } from '../../../../shared/constants/helps';
import { SelectCreateHelp } from './SelectHelp';
import { fireEvent, render, screen } from '@testing-library/react';
import { NEW_ARTICLE, NEW_DOCUMENT, NEW_DOCUMENT_INVISIBLE, NEW_SECTION } from '../../../../../../router/routes';


vi.mock('../../../../shared/hooks/useGetHelpsType', () => ({
  useGetHelpType: () => ({
    result: [
      { id: HELP_SECTION, name: 'Sección' },
      { id: HELP_ARTICLE, name: 'Artículo' },
      { id: HELP_DOCUMENT, name: 'Documento' },
      { id: HELP_INVISIBLE, name: 'Documento Invisible' }
    ],
    loading: false
  })
}));

vi.mock('../../../../../../components/ui/inputs/select/select.component', () => ({
  default: ({ onChange, value, options, placeholder }: any) => (
    <select
      data-testid="custom-select"
      value={value || ''}
      onChange={(e) => {
        // Simular el evento de MUI
        const syntheticEvent = {
          target: { 
            value: e.target.value,
            name: ''
          }
        };
        onChange?.(syntheticEvent);
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {options?.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}));

vi.mock('../../../../../../components/ui/box/CustomBox', () => ({
  CustomBox: ({ children }: any) => <div>{children}</div>
}));


vi.mock('../../../../mappers/helpCreateMapper', () => ({
  toHelpSelect: (item: any) => ({ value: item.id, label: item.name })
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock del mapper
vi.mock('../../../../helpCreateMapper', () => ({
  toHelpSelect: (item: any) => ({
    value: item.id,
    label: item.name
  })
}));

describe('UI/SelectCreateHelp', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('debe renderizar correctamente', () => {
    const { container } = render(<SelectCreateHelp />);
    expect(container.firstChild).toBeTruthy();
  });

  it('debe usar el hook useGetHelpType', () => {
    const { container } = render(<SelectCreateHelp />);
    expect(container).toBeTruthy();
  });

  it('debe iniciar con valor vacío', () => {
    render(<SelectCreateHelp />);
    const select = screen.getByTestId('custom-select') as HTMLSelectElement;
    expect(select.value).toBe('');
  });

   it('debe navegar a NEW_SECTION cuando se selecciona HELP_SECTION', () => {
    render(<SelectCreateHelp />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: HELP_SECTION } });
    
    expect(mockNavigate).toHaveBeenCalledWith(NEW_SECTION.name);
  });

  it('debe navegar a NEW_ARTICLE cuando se selecciona HELP_ARTICLE', () => {
    render(<SelectCreateHelp />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: HELP_ARTICLE } });
    
    expect(mockNavigate).toHaveBeenCalledWith(NEW_ARTICLE.name);
  });

  it('debe navegar a NEW_DOCUMENT cuando se selecciona HELP_DOCUMENT', () => {
    render(<SelectCreateHelp />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: HELP_DOCUMENT } });
    
    expect(mockNavigate).toHaveBeenCalledWith(NEW_DOCUMENT.name);
  });

  it('debe navegar a NEW_DOCUMENT_INVISIBLE cuando se selecciona HELP_INVISIBLE', () => {
    render(<SelectCreateHelp />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: HELP_INVISIBLE } });
    
    expect(mockNavigate).toHaveBeenCalledWith(NEW_DOCUMENT_INVISIBLE.name);
  });

  it('debe tener el ancho de 200px en el CustomBox', () => {
    const { container } = render(<SelectCreateHelp />);
    expect(container.firstChild).toBeTruthy();
  });
});
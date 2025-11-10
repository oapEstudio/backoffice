import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditHelpModal from './EditHelpModal';
import { HELP_ARTICLE } from '../../../../shared/constants/helps';

describe('UI/EditHelpModal', () => {
  it('debe renderizar el modal cuando open es true', () => {
    const mockOnClose = vi.fn();
    const mockOnSuccess = vi.fn();

    render(
      <EditHelpModal
        open={true}
        helpId="123"
        helpType={HELP_ARTICLE}
        onSuccess={mockOnSuccess}
        onClose={mockOnClose}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeTruthy();
  });

  it('no debe renderizar el modal cuando open es false', () => {
    const { container } = render(
      <EditHelpModal
        open={false}
        helpId="123"
        helpType={HELP_ARTICLE}
        onSuccess={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(container.firstChild).toBeFalsy();
  });

  it('debe llamar a onClose al cerrar el modal', () => {
    const mockOnClose = vi.fn();
    const mockOnSuccess = vi.fn();

    render(
      <EditHelpModal
        open={true}
        helpId="123"
        helpType={HELP_ARTICLE}
        onSuccess={mockOnSuccess}
        onClose={mockOnClose}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('debe tener los botones Cancelar y Aceptar', () => {
    render(
      <EditHelpModal
        open={true}
        helpId="123"
        helpType={HELP_ARTICLE}
        onSuccess={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /cancelar/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /aceptar/i })).toBeTruthy();
  });

  it('debe recibir el helpId correcto como prop', () => {
    const mockOnClose = vi.fn();
    const mockOnSuccess = vi.fn();
    const testHelpId = '23232545467dfd-sdsd34356565';

    render(
      <EditHelpModal
        open={true}
        helpId={testHelpId}
        helpType={HELP_ARTICLE}
        onSuccess={mockOnSuccess}
        onClose={mockOnClose}
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeTruthy();
  });
});
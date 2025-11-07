import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CopyUrlButton } from './CopyUrlButton';
import { Toast } from '../../ui/toast/CustomToastService';

vi.mock('../../ui/toast/CustomToastService', () => ({
  Toast: vi.fn(),
  eToast: {
    Info: 'info',
    Error: 'error',
  },
}));

describe('UI/CopyUrlButton', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders success copy text', () => {
    render(<CopyUrlButton url='Copy test!' />);
  });

  it('copia la URL al hacer click', async () => {
    // Mock del clipboard
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CopyUrlButton url="https://ejemplo.com" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(writeTextMock).toHaveBeenCalledWith('https://ejemplo.com');
    
    await vi.waitFor(() => {
      expect(Toast).toHaveBeenCalledWith({
        message: 'Link copiado',
        type: 'info',
      });
    });
  });

});


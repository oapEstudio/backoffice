import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomModal from './modal.component';

describe('UI/Modal', () => {
  const setup = (props?: Partial<React.ComponentProps<typeof CustomModal>>) => {
    const onClose = vi.fn();
    const onOk = vi.fn();
    const onCancel = vi.fn();
    render(
      <CustomModal
        open={true}
        onClose={onClose}
        title="My Title"
        subtitle="Sub"
        onOk={onOk}
        onCancel={onCancel}
        disabled={false}
        maxWidth="sm"
        {...props}
      >
        <div>Body content</div>
      </CustomModal>
    );
    return { onClose, onOk, onCancel };
  };

  it('renders title and body when open', () => {
    setup();
    expect(screen.getByText('My Title')).toBeTruthy();
    expect(screen.getByText('Body content')).toBeTruthy();
  });

  it('calls onClose when clicking close icon', () => {
    const { onClose } = setup();
    const closeBtn = screen.getByLabelText('close');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onOk and onCancel buttons', () => {
    const { onOk, onCancel } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onOk).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it('disables OK button when disabled', () => {
    setup({ disabled: true });
    const ok = screen.getByRole('button', { name: 'Aceptar' });
    expect(ok.getAttribute('disabled') !== null).toBe(true);
  });
});

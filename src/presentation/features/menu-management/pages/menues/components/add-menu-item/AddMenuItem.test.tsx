import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock hook that performs creation
vi.mock('../../../../hooks/useCreateMenu', () => ({
  useCreateMenu: () => ({ create: vi.fn().mockResolvedValue('new-id'), loading: false, error: null })
}));

// Stub MenuForm to expose a ref with submit/reset and report valid state
vi.mock('../menu-form/MenuForm', () => {
  const React = require('react');
  const MenuForm = React.forwardRef((props: any, ref: any) => {
    React.useEffect(() => { props.onValidityChange?.(true); }, [props]);
    React.useImperativeHandle(ref, () => ({
      submit: () => props.onSubmit({ name: 'Item A', hasLink: true, link: 'https://ex.com', index: 5 }),
      reset: () => {},
      isValid: () => true,
      getValues: () => ({ name: 'Item A', hasLink: true, link: 'https://ex.com', index: 5 })
    }));
    return React.createElement('div', null, 'MenuFormStub');
  });
  return { MenuForm };
});

import { AddMenuItemModal } from './AddMenuItem';

describe('MenuManagement/AddMenuItemModal', () => {
  it('enables Aceptar when valid and calls onSaved+onClose after submit', async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();

    render(
      <AddMenuItemModal
        open={true}
        onClose={onClose}
        onSaved={onSaved}
        order={1}
        parentId={undefined}
      />
    );

    const ok = screen.getByRole('button', { name: 'Aceptar' });
    fireEvent.click(ok);

    await waitFor(() => {
      expect(onSaved).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});


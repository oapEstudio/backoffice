import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Mock hook that performs update
vi.mock('../../../../hooks/useUpdateMenu', () => ({
  useUpdateMenu: () => ({ update: vi.fn().mockResolvedValue(true), loading: false })
}));

// Stub MenuForm as in AddMenuItem test
vi.mock('../menu-form/MenuForm', () => {
  const React = require('react');
  const MenuForm = React.forwardRef((props: any, ref: any) => {
    React.useEffect(() => { props.onValidityChange?.(true); }, [props]);
    React.useImperativeHandle(ref, () => ({
      submit: () => props.onSubmit({ name: 'Edit A', hasLink: false, link: '', index: 2 }),
      reset: () => {},
      isValid: () => true,
      getValues: () => ({ name: 'Edit A', hasLink: false, link: '', index: 2 })
    }));
    return React.createElement('div', null, 'MenuFormStub');
  });
  return { MenuForm };
});

import { EditMenuItemModal } from './EditMenuItem';

describe('MenuManagement/EditMenuItemModal', () => {
  it('submits update via Aceptar', async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();

    render(
      <EditMenuItemModal
        open={true}
        onClose={onClose}
        onSaved={onSaved}
        initialMenu={{ id: '1', name: 'Old', hasLink: false, link: '', index: 1, parendId: null, ordenIndex: 1 }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));

    await waitFor(() => {
      expect(onSaved).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});


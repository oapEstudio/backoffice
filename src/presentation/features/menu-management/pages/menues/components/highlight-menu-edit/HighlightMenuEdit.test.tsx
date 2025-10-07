import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('../../../../hooks/useHighlightMenu', () => ({
  useHighlightMenu: () => ({ update: vi.fn().mockResolvedValue(true), loading: false })
}));

vi.mock('../highlight-form/HighlightForm', () => {
  const React = require('react');
  const HighlightForm = React.forwardRef((props: any, ref: any) => {
    React.useEffect(() => { props.onValidityChange?.(true); }, [props]);
    React.useImperativeHandle(ref, () => ({
      submit: () => props.onSubmit({ title: 'T2', description: 'D2', isHighlighted: true, profilesIds: [] }),
      reset: () => {},
      isValid: () => true,
      getValues: () => ({ title: 'T2', description: 'D2', isHighlighted: true, profilesIds: [] })
    }));
    return React.createElement('div', null, 'HighlightFormStub');
  });
  return { HighlightForm };
});

import { HighlightMenuEditModal } from './HighlightMenuEdit';

describe('MenuManagement/HighlightMenuEditModal', () => {
  it('fires onOk and onCancel flows', async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();
    render(
      <HighlightMenuEditModal
        open={true}
        onClose={onClose}
        onSaved={onSaved}
        initialMenu={{ id: 'id1', title: 'A', description: 'B', profiles: ['p1'] }}
      />
    );
    // OK path
    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    await waitFor(() => expect(onSaved).toHaveBeenCalled());
    // Cancel path triggers submit with isHighlighted=false and closes
    fireEvent.click(screen.getByRole('button', { name: 'Dejar de destacar' }));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});


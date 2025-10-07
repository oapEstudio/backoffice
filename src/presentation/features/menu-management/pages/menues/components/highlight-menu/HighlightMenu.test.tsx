import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('../../../../hooks/useHighlightMenu', () => ({
  useHighlightMenu: () => ({ update: vi.fn().mockResolvedValue(true), loading: false, error: null })
}));

// Stub inner form to be valid and trigger submit
vi.mock('../highlight-form/HighlightForm', () => {
  const React = require('react');
  const HighlightForm = React.forwardRef((props: any, ref: any) => {
    React.useEffect(() => { props.onValidityChange?.(true); }, [props]);
    React.useImperativeHandle(ref, () => ({
      submit: () => props.onSubmit({ title: 'T', description: 'D', isHighlighted: true, profilesIds: [] }),
      reset: () => {},
      isValid: () => true,
      getValues: () => ({ title: 'T', description: 'D', isHighlighted: true, profilesIds: [] })
    }));
    return React.createElement('div', null, 'HighlightFormStub');
  });
  return { HighlightForm };
});

import { HighlightMenuItemModal } from './HighlightMenu';

describe('MenuManagement/HighlightMenuItemModal', () => {
  it('submits and calls onSaved/onClose via Aceptar', async () => {
    const onSaved = vi.fn();
    const onClose = vi.fn();
    render(
      <HighlightMenuItemModal open={true} onClose={onClose} onSaved={onSaved} id={'42'} profiles={['p1']} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    await waitFor(() => {
      expect(onSaved).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});


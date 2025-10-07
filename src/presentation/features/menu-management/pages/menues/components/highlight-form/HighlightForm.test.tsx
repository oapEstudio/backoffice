import React, { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, act, waitFor } from '@testing-library/react';
import { HighlightForm, type HighlightFormHandle } from './HighlightForm';

describe('MenuManagement/HighlightForm', () => {
  it('calls onSubmit with trimmed values when submit()', async () => {
    const onSubmit = vi.fn();
    const ref = createRef<HighlightFormHandle>();
    render(
      <HighlightForm
        ref={ref}
        initialValues={{ title: '  Hola Mundo  ', description: 'Descripcion 123' }}
        onSubmit={onSubmit}
        onValidityChange={() => {}}
      />
    );

    await act(async () => {
      ref.current?.submit();
    });
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: 'Hola Mundo', description: 'Descripcion 123' }));
    });
  });
});

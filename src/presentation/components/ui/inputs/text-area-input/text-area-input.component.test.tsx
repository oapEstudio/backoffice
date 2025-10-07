import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomTextAreaInput from './text-area-input.component';

describe('UI/Inputs/TextAreaInput', () => {
  it('renders a textarea with given rows', () => {
    render(<CustomTextAreaInput value="" rows={4} onChange={vi.fn()} />);
    const textarea = document.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });
});


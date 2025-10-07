import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuForm } from './MenuForm';

describe('MenuManagement/MenuForm', () => {
  it('renders name field label', () => {
    render(<MenuForm onSubmit={() => {}} onValidityChange={() => {}} />);
    expect(screen.getByText('Nombre')).toBeTruthy();
  });
});

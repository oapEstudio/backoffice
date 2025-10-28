import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TitleStep } from './TitleStep';

describe('TitleStep', () => {
  test('renders provided title', () => {
    render(<TitleStep title="Mi Titulo" />);
    expect(screen.getByText('Mi Titulo')).toBeTruthy();
  });
});


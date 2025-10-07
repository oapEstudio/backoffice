import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TooltipCustomProfile from './TooltipCustomProfiles';

describe('MenuManagement/TooltipCustomProfiles', () => {
  it('renders title and lines', () => {
    render(
      <TooltipCustomProfile title="Perfiles asignados" lines={["Perfil 1", "Perfil 2"]} />
    );
    expect(screen.getByText('Perfiles asignados')).toBeTruthy();
    expect(screen.getByText('Perfil 1')).toBeTruthy();
    expect(screen.getByText('Perfil 2')).toBeTruthy();
  });
});


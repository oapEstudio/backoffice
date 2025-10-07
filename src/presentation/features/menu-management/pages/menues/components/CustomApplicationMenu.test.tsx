import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomApplicationMenu from './CustomApplicationMenu';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

function makeNode(partial?: any) {
  return {
    id: 'n1',
    label: 'Nodo A',
    orden: 1,
    isComposite: () => false,
    obj: {
      canBeHighlighted: true,
      isHighlighted: false,
      hierarchyIndex: '1',
      profiles: [{ id: 'p1', name: 'Perfil 1' }],
      ...partial?.obj,
    },
    ...partial,
  } as any;
}

describe('MenuManagement/CustomApplicationMenu', () => {
  it('renders label and highlight action, calls onAddChild on Destacar', () => {
    const onAddChild = vi.fn();
    const node = makeNode();

    render(
      <SimpleTreeView>
        <CustomApplicationMenu
          id="1"
          itemId="1"
          label={node.label}
          obj={node}
          onAddChild={onAddChild}
        />
      </SimpleTreeView>
    );

    expect(screen.getByText('Nodo A')).toBeTruthy();
    const destacarBtn = screen.getByRole('button', { name: /Destacar/i });
    fireEvent.click(destacarBtn);
    expect(onAddChild).toHaveBeenCalledWith(node);
  });
});

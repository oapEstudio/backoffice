import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CustomItemMenu from './CustomItemMenu';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

function makeNode(partial?: any) {
  return {
    id: 'n2',
    label: 'Nodo B',
    orden: 2,
    isComposite: () => true,
    obj: {
      isHighlighted: false,
      hasLink: false,
      link: '',
      ...partial?.obj,
    },
    ...partial,
  } as any;
}

describe('MenuManagement/CustomItemMenu', () => {
  it('renders label and controls area', () => {
    const node = makeNode();
    render(
      <SimpleTreeView>
        <CustomItemMenu
          id="2"
          itemId="2"
          label={node.label}
          obj={node}
          onAddChild={vi.fn()}
          onEditNode={vi.fn()}
          onDeleteNode={vi.fn()}
          onCustomNode={vi.fn()}
          onOrderUpNode={vi.fn()}
          onOrderDownNode={vi.fn()}
        />
      </SimpleTreeView>
    );
    expect(screen.getByText('Nodo B')).toBeTruthy();
  });
});

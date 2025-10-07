import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../../../../../../../components/widgets/multiselect-profile/MultiSelectProfile', () => ({
  default: (p: any) => <div>ProfileMultiSelectStub:{(p.valueIds||[]).join(',')}</div>,
}));

import { ToolbarTabsApplication } from './ToolbarTabsApplication';

describe('MenuManagement/ToolbarTabsApplication', () => {
  it('renders counter label and profile multiselect', () => {
    render(
      <ToolbarTabsApplication count={3} profileIds={["A","B"]} changeProfileMultiselect={() => {}} />
    );
    expect(screen.getByText('Aplicaciones destacadas 3/4')).toBeTruthy();
    expect(screen.getByText('ProfileMultiSelectStub:A,B')).toBeTruthy();
  });
});


import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../hooks/useTabsApplications', () => ({
  useTabsApplications: () => ({
    loading: false,
    treeItems: [],
    resultHighlighted: { count: 2, data: [] },
    openHighLightMenu: true,
    setOpenHighLightMenu: () => {},
    openHighLightMenuEdit: false,
    setOpenHighLightMenuEdit: () => {},
    saveHighLightSucess: () => {},
    setFilters: () => {},
    setFiltersHighlighted: () => {},
  }),
}));

vi.mock('../../../../../../components/ui/tree-view/CustomTreeView', () => ({
  default: () => <div>TreeViewStub</div>,
}));
vi.mock('../CustomApplicationMenu', () => ({
  default: () => <div>AppMenuItemStub</div>,
}));
vi.mock('../highlight-menu/HighlightMenu', () => ({
  HighlightMenuItemModal: (p: any) => <div>{p.open ? 'HLModalOpen' : 'HLModalClosed'}</div>,
}));
vi.mock('../highlight-menu-edit/HighlightMenuEdit', () => ({
  HighlightMenuEditModal: (p: any) => <div>{p.open ? 'HLEditOpen' : 'HLEditClosed'}</div>,
}));
vi.mock('./components/toolbar-tabs-applicattion/ToolbarTabsApplication', () => ({
  ToolbarTabsApplication: () => <div>ToolbarTabsApplicationStub</div>,
}));
vi.mock('../../../../../../components/widgets-home-page/relevant-applications/RelevantApplications', () => ({
  default: () => <div>RelevantAppsStub</div>,
}));

import { TabsApplications } from './TabsApplications';

describe('MenuManagement/TabsApplications', () => {
  it('renders highlight modal and tree view', () => {
    render(<TabsApplications />);
    expect(screen.getByText('HLModalOpen')).toBeTruthy();
    expect(screen.getByText('TreeViewStub')).toBeTruthy();
    expect(screen.getByText('ToolbarTabsApplicationStub')).toBeTruthy();
  });
});


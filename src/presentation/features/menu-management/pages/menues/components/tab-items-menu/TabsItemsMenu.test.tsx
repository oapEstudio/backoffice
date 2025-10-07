import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../hooks/useTabsItemMenu', () => ({
  useTabsItemMenu: () => ({
    loading: false,
    openEdit: false,
    openDelete: true,
    openEditProfiles: false,
    openAdd: true,
    calculateOrder: () => 1,
    setOpenAdd: () => {},
    handleAddChild: () => {},
    handleEdit: () => {},
    handleDelete: () => {},
    handleEditProfile: () => {},
    ButtonCreateMenu: null,
    saveMenuSucess: () => {},
    confirmDelete: () => {},
    treeItems: [],
    parentNode: null,
    setParentNode: () => {},
    setOpenEdit: () => {},
    setOpenEditProfiles: () => {},
    setOpenDelete: () => {},
    tick: 0,
    handleOrderUpNode: () => {},
    handleOrderDownNode: () => {},
    parentMenuProfiles: [],
    result: { count: 0, data: [] },
  }),
}));

// Stub heavy children
vi.mock('../../../../../../components/ui/tree-view/CustomTreeView', () => ({
  default: () => <div>TreeViewStub</div>,
}));
vi.mock('../add-menu-item/AddMenuItem', () => ({
  AddMenuItemModal: (p: any) => <div>{p.open ? 'AddOpen' : 'AddClosed'}</div>,
}));
vi.mock('../edit-menu-item/EditMenuItem', () => ({
  EditMenuItemModal: (p: any) => <div>{p.open ? 'EditOpen' : 'EditClosed'}</div>,
}));
vi.mock('../add-profile/AddProfile', () => ({
  AddProfile: (p: any) => <div>{p.open ? 'ProfilesOpen' : 'ProfilesClosed'}</div>,
}));
vi.mock('../../../../../../components/ui/confirm-dialog/ConfirmDialog', () => ({
  ConfirmDialog: (p: any) => <div>{p.open ? 'ConfirmOpen' : 'ConfirmClosed'}</div>,
}));
vi.mock('../../../../../../components/widgets/toolbar-table-count/ToolbarTableCount', () => ({
  ToolbarTableCount: () => <div>ToolbarTableCountStub</div>,
}));
vi.mock('../../../../../../components/widgets/empty-element-list/EmptyElementList', () => ({
  EmptyElementList: () => <div>EmptyElementListStub</div>,
}));
vi.mock('../CustomItemMenu', () => ({
  default: () => <div>ItemMenuStub</div>,
}));

import { TabsItemsMenu } from './TabsItemsMenu';

describe('MenuManagement/TabsItemsMenu', () => {
  it('renders modals and stubs based on hook state', () => {
    render(<TabsItemsMenu />);
    expect(screen.getByText('AddOpen')).toBeTruthy();
    expect(screen.getByText('ConfirmOpen')).toBeTruthy();
    expect(screen.getByText('TreeViewStub')).toBeTruthy();
  });
});


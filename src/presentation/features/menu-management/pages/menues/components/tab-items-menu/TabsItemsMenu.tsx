
import { useTabsItemMenu } from '../../hooks/useTabsItemMenu';

import type { IMenu } from '../../../../../../../domain/entities/IMenu';
import { ConfirmDialog } from '../../../../../../components/ui/confirm-dialog/ConfirmDialog';
import type { ItemTree } from '../../../../../../components/ui/tree-view/class/TreeItems';
import CustomTreeView from '../../../../../../components/ui/tree-view/CustomTreeView';
import { ToolbarTableCount } from '../../../../../../components/widgets/toolbar-table-count/ToolbarTableCount';
import { AddMenuItemModal } from '../add-menu-item/AddMenuItem';
import { AddProfile } from '../add-profile/AddProfile';
import CustomTreeItem from '../CustomItemMenu';
import { EditMenuItemModal } from '../edit-menu-item/EditMenuItem';
import { useEffect, useRef } from 'react';
import { EmptyElementList } from '../../../../../../components/widgets/empty-element-list/EmptyElementList';

export interface TabsItemsMenuProps {

  onLoadingChange?: (loading: boolean) => void;
  fireOnMount?: boolean;
}
export const TabsItemsMenu: React.FC<TabsItemsMenuProps> = ({
  onLoadingChange,
  fireOnMount = false,
}) => {
    const {
        loading,
        openEdit,
        openDelete,
        openEditProfiles,
        openAdd,
        calculateOrder,
        setOpenAdd,
        handleAddChild, 
        handleEdit,
        handleDelete, 
        handleEditProfile,
        ButtonCreateMenu,
        saveMenuSucess,
        confirmDelete,
        treeItems,
        parentNode,
        setParentNode,
        setOpenEdit,
        setOpenEditProfiles,
        setOpenDelete,
        tick,
        handleOrderUpNode,
        handleOrderDownNode,
        parentMenuProfiles,
        result: resultItemsMenu } = useTabsItemMenu();


  
        const first = useRef(true);

        useEffect(() => {
            if (!onLoadingChange) return;
            if (!fireOnMount && first.current) {
            first.current = false;
            return;
            }
            first.current = false;
            onLoadingChange(loading);
        }, [loading, onLoadingChange, fireOnMount]);

  return (
    <>
                        <AddMenuItemModal 
                              open={openAdd} 
                              onClose={()=>setOpenAdd(false)} 
                              order={calculateOrder(parentNode as ItemTree)}
                              onSaved={saveMenuSucess} 
                              parentId={parentNode?.id}
                              parentLabel={parentNode?.label}
                          />
                           <EditMenuItemModal 
                              open={openEdit} 
                              onClose={()=>setOpenEdit(false)} 
                              onSaved={saveMenuSucess} 
                              initialMenu={{
                                  id: parentNode?.id as string,
                                  name: (parentNode?.obj as IMenu)?.name,
                                  hasLink: (parentNode?.obj as IMenu)?.hasLink,
                                  link: (parentNode?.obj as IMenu)?.link,
                                  index: (parentNode?.obj as IMenu)?.hierarchyIndex,
                                  parendId: (parentNode?.obj as IMenu)?.parentId,
                                  ordenIndex: (parentNode?.obj as IMenu)?.orderIndex,
                              }}
                              parentLabel={parentNode?.label}
                          />
                        <AddProfile
                                menuID={parentNode?.id as string}                              
                                leftSeedProfiles={parentMenuProfiles}  
                                open={openEditProfiles} 
                                initialProfiles={{profiles: (parentNode?.obj as IMenu)?.profiles.map(x=>x.id)}} 
                                 selectedProfiles={(parentNode?.obj as IMenu)?.profiles.map(p => ({
                                  id: String(p.id),
                                  name: p.name, 
                                }))}
                                onClose={()=>setOpenEditProfiles(false)} 
                                onSaved={saveMenuSucess} />
                        
                        <ConfirmDialog 
                              open={openDelete} 
                              onOk={confirmDelete} 
                              onCancel={()=>setOpenDelete(false)}  />

                        <ToolbarTableCount count={resultItemsMenu?.count??0} actions={ButtonCreateMenu} />


                        {!loading && (resultItemsMenu?.count??0) === 0?
                          
                          <EmptyElementList message={'No hay items de menú disponibles'} />
                          
                          : <></>
                        }


                        <CustomTreeView 
                         key={tick}
                          onAddChild={handleAddChild}
                          onCustomNode={handleEditProfile} 
                          onEditNode={handleEdit}
                          onDeleteNode={handleDelete}
                          data={treeItems} 
                          customComponentItem={CustomTreeItem} 
                          onOrderUpNode={handleOrderUpNode}
                          onOrderDownNode={handleOrderDownNode}
                          />
                      </>
  )
}

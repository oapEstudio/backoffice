import { useEffect, useRef, useState } from "react";
import { arraysEqual } from "../../../../../../utils/arrayToEquals";
import { useTabsApplications } from "../../hooks/useTabsApplications";
import CustomTreeView from "../../../../../../components/ui/tree-view/CustomTreeView";
import CustomTreeItem from "../CustomApplicationMenu";
import { HighlightMenuItemModal } from "../highlight-menu/HighlightMenu";
import type { ItemTree } from "../../../../../../components/ui/tree-view/class/TreeItems";
import { ToolbarTabsApplication } from "./components/toolbar-tabs-applicattion/ToolbarTabsApplication";
import { HighlightMenuEditModal } from "../highlight-menu-edit/HighlightMenuEdit";
import RelevantApplications, { type QuickLink } from "../../../../../../components/widgets-home-page/relevant-applications/RelevantApplications";
import { toQuickLink } from "../../../../mappers/highlightMapper";
import type { SelectOption } from "../../../../../../components/ui/inputs/multiselect/multiselect.interface";

export interface TabsItemsMenuProps {

  onLoadingChange?: (loading: boolean) => void;
  fireOnMount?: boolean;
}
export const TabsApplications: React.FC<TabsItemsMenuProps> = ({
  onLoadingChange,
  fireOnMount = false,
}) => {


    const {
        loading,
        treeItems,
        resultHighlighted,
        openHighLightMenu,
        setOpenHighLightMenu,
        openHighLightMenuEdit,
        setOpenHighLightMenuEdit,
        saveHighLightSucess,
        setFilters,
        setFiltersHighlighted
    } = useTabsApplications();

    const [profileNames, setProfileNames] = useState<string[]>([]);
     const [profileIds, setProfileIds] = useState<string[]>([]);
    const [parentNode, setParentNode] = useState<ItemTree>();

    const HighlightMenuHandle = (node: ItemTree) => {   
          setParentNode(node)
          setOpenHighLightMenu(true)
      }
    const HighlightMenuEditHandle = (node: ItemTree) => {
        setParentNode(node)
        setOpenHighLightMenuEdit(true);
    }
    const changeProfileMultiselect = (ids: string[], options: SelectOption[]) => {   
                                                                           
                                                  setProfileNames(prev => (arraysEqual(prev, ids) ? prev : ids))
                                                  setFilters(options.map(x=>String(x.id)));
                                                  setFiltersHighlighted(options.map(x=>String(x.id)));
                                                  setProfileIds(options.map(x=>String(x.id)));

                                                }

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

    return (<>

             <HighlightMenuItemModal 
                        profiles={profileIds}
                        open={openHighLightMenu} 
                        onClose={()=>setOpenHighLightMenu(false)} 
                        onSaved={saveHighLightSucess} 
                        id={parentNode?.obj.id} 
                        />
            <HighlightMenuEditModal 
                       open={openHighLightMenuEdit} 
                       onClose={()=>setOpenHighLightMenuEdit(false)} 
                       onSaved={saveHighLightSucess} 
                       initialMenu={{
                            id: parentNode?.obj.id,
                            title: parentNode?.obj.title,
                            description: parentNode?.obj.description,
                            profiles: profileIds
                        }} />
           <ToolbarTabsApplication
                    count={resultHighlighted?.count as number} 
                    profileIds={profileNames} 
                    changeProfileMultiselect={changeProfileMultiselect} />
            <CustomTreeView 
                       data={treeItems}
                       onAddChild={HighlightMenuHandle}
                       onEditNode={HighlightMenuEditHandle} 
                       customComponentItem={CustomTreeItem} 
            />   
            <RelevantApplications items={(resultHighlighted?.data.map(toQuickLink) as QuickLink[])} />        
                                    
         </> );
}
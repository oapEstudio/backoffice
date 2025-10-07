import { TreeItemCheckbox, TreeItemContent, TreeItemGroupTransition, TreeItemIconContainer, TreeItemLabel, TreeItemRoot } from "@mui/x-tree-view/TreeItem";
import { TreeItemIcon } from "@mui/x-tree-view/TreeItemIcon";
import { TreeItemProvider } from "@mui/x-tree-view/TreeItemProvider";
import { useTreeItem, type UseTreeItemParameters } from "@mui/x-tree-view/useTreeItem";
import React from "react";
import { CustomBox } from "../../../../../components/ui/box/CustomBox";
import { CustomStack } from "../../../../../components/ui/stack/Stack";
import { AddActionIcon, ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteActionIcon, EditActionIcon, GroupActionIcon, LinksIcon, StarIcon } from "../../../../../components/ui/icons";
import type { ItemTree, TreeItemActionHandlers } from "../../../../../components/ui/tree-view/class/TreeItems";
import { Toast, eToast } from '../../../../../components/ui/toast/CustomToastService';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import  Typography  from "@mui/material/Typography";
import { colors } from '../../../../../common/colors';
import type { IMenu } from "../../../../../../domain/entities/IMenu";
import TooltipCustomProfile from "./tabs-applications/components/tooltip-custom-profiles/TooltipCustomProfiles";

interface CustomTreeItemProps
  extends Omit<UseTreeItemParameters, 'rootRef'>,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'>,
    TreeItemActionHandlers {
  obj?: ItemTree; canMoveUp?: boolean; canMoveDown?: boolean
}

const stop = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const stopEvents = {
  onClick: stop,
  onMouseDown: stop,
  onTouchStart: stop,
  onKeyDown: stop,
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    obj,
    onAddChild,
    onEditNode,
    onDeleteNode,
    onCustomNode,
    canMoveUp,
    canMoveDown,
    onOrderUpNode,
    onOrderDownNode,
    ...other
  } = props;

  const {
    getContextProviderProps,
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });


  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps(other)} >
        <TreeItemContent {...getContentProps()} style={{border: '0.5px solid '+colors.whiteSmoke, backgroundColor: !obj?.obj.canBeHighlighted? colors.whiteSmoke : colors.whiteSmokeLight }}>
          <TreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <TreeItemCheckbox {...getCheckboxProps()} />

          <CustomBox sx={{ flexGrow: 1, display: 'flex', gap: 1, width: '100%' }}>
            <CustomStack direction='row' sx={{ width: '100%', justifyContent: 'space-between' }}>

              <CustomStack direction="row" sx={{ minWidth: '30rem' }}>              
                <TreeItemLabel {...getLabelProps()} style={{ fontWeight: (!obj?.obj.canBeHighlighted? 600:400)}}/>
              </CustomStack>

              <CustomStack direction="row" spacing={4} {...stopEvents}>
                  <>
                  {obj?.obj.canBeHighlighted && 
                        <>
                        <Typography alignContent={"center"} fontWeight={600} color={obj?.obj.isHighlighted?colors.palette.primary.main :colors.palette.primary.disabled}>{obj?.obj.hierarchyIndex}</Typography>
                        {
                          obj?.obj.isHighlighted?  <Typography alignContent={"center"} style={{ marginLeft: '2rem'}} color={colors.palette.primary.main} fontWeight={600}>Destacado</Typography> :
                                                    <IconButton
                                                          tabIndex={-1}
                                                          style={{fontSize: '15px',fontWeight:600, padding: '0% 3%', borderRadius: '10%', border: '1px solid'}}                                                         
                                                          onClick={(e) => { stop(e); onAddChild?.(obj!); }}
                                                        >
                                                         <StarIcon /> Destacar
                                                    </IconButton>
                                                  
                        }
                       
                        {obj?.obj.isHighlighted && 
                                  <Tooltip title="Editar" placement="top-start">
                                    <IconButton
                                      tabIndex={-1}
                                      style={{ padding: 0, width: '20px', height: '20px', margin: '5px', marginLeft: '2rem' }}
                                      onClick={(e) => { stop(e); onEditNode?.(obj!); }}
                                    >
                                      <EditActionIcon />
                                    </IconButton>
                                  </Tooltip>                    
                          }
                          <Tooltip 
                             slotProps={{
                                tooltip: { sx: { bgcolor: colors.white, color: 'black', whiteSpace: 'pre-line' } },
                                arrow:   { sx: { color: colors.white } } 
                              }}
                              title={
                                
                                <TooltipCustomProfile 
                                  title= {'Perfiles asignados'}
                                  lines={(obj?.obj as IMenu)?.profiles?.map(p => p.name)}
                                />
                               
                              }
                              placement="top-start">
                              <IconButton
                                tabIndex={-1}
                                style={{ padding: 0, width: '20px', height: '20px', margin: '5px',marginLeft: '1rem' }}
                                onClick={(e) => { stop(e); onCustomNode?.(obj!); }}
                              >
                                <GroupActionIcon />
                              </IconButton>
                          </Tooltip>     
                        </>
                  }   
                  </>                                            
              </CustomStack>

            </CustomStack>
          </CustomBox>
        </TreeItemContent>

        {children && <TreeItemGroupTransition {...getGroupTransitionProps()} />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

export default CustomTreeItem;

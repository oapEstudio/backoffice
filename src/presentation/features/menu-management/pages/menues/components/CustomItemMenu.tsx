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
import { colors } from "../../../../../common/colors";

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
      <TreeItemRoot {...getRootProps(other)}>
        <TreeItemContent {...getContentProps()}  style={{border: '0.5px solid '+colors.whiteSmoke, backgroundColor: obj?.isComposite()? colors.whiteSmoke : colors.whiteSmokeLight }}>
          <TreeItemIconContainer {...getIconContainerProps()}>
            <TreeItemIcon status={status} />
          </TreeItemIconContainer>
          <TreeItemCheckbox {...getCheckboxProps()} />

          <CustomBox sx={{ flexGrow: 1, display: 'flex', gap: 1, width: '100%' }}>
            <CustomStack direction='row' sx={{ width: '100%', justifyContent: 'space-between' }}>

              <CustomStack direction="row" sx={{ minWidth: '30rem' }}>
                <>
                  {obj && (
                    <CustomBox
                      sx={{ display: 'flex', padding: 0, marginRight: '3%' }}
                      {...stopEvents}
                    >
                      <IconButton
                        tabIndex={-1}
                        disabled={obj.obj === 1}
                        style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                        onClick={(e) => { stop(e); onOrderUpNode?.(obj); }}
                      >
                        <ArrowUpIcon />
                      </IconButton>
                      <IconButton
                        tabIndex={-1}
                        style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                        onClick={(e) => { stop(e); onOrderDownNode?.(obj); }}
                      >
                        <ArrowDownIcon />
                      </IconButton>
                    </CustomBox>
                  )}
                </>
                <TreeItemLabel {...getLabelProps()} style={{ fontWeight: (obj?.isComposite()? 600:400)}} />
              </CustomStack>

              <CustomStack direction="row" spacing={2} {...stopEvents}>
               <>
                {obj && obj.obj?.isHighlighted ?  
                      <Tooltip title="Destacado" placement="top-start">
                          <IconButton
                            tabIndex={-1}
                            style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                            onClick={(e) => {
                              stop(e);                        
                            }}
                          >
                            <StarIcon />
                          </IconButton>
                      </Tooltip> : null}

                {obj && obj.obj?.hasLink ? (
                  <Tooltip title="Copiar link" placement="top-start">
                    <IconButton
                      tabIndex={-1}
                      style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                      onClick={(e) => {
                        stop(e);
                        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(obj?.obj.link);
                          Toast({ message: 'Link copiado', type: eToast.Info });
                        }
                      }}
                    >
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                ) : null}
               </>

                <Tooltip title="Seleccionar perfiles" placement="top-start">
                  <IconButton
                    tabIndex={-1}
                    style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                    onClick={(e) => { stop(e); onCustomNode?.(obj!); }}
                  >
                    <GroupActionIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Agregar" placement="top-start">
                  <IconButton
                    tabIndex={-1}
                    style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                    onClick={(e) => { stop(e); onAddChild?.(obj!); }}
                  >
                    <AddActionIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Editar" placement="top-start">
                  <IconButton
                    tabIndex={-1}
                    style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                    onClick={(e) => { stop(e); onEditNode?.(obj!); }}
                  >
                    <EditActionIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Eliminar" placement="top-start">
                  <IconButton
                    tabIndex={-1}
                    style={{ padding: 0, width: '20px', height: '20px', margin: '5px' }}
                    onClick={(e) => { stop(e); onDeleteNode?.(obj!); }}
                  >
                    <DeleteActionIcon />
                  </IconButton>
                </Tooltip>
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

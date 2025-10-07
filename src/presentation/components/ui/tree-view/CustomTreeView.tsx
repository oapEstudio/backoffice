import * as React from 'react'
import Box from '@mui/material/Box'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem, type TreeItemProps } from '@mui/x-tree-view/TreeItem'
import type { FatherItem, ItemTree, TreeItemActionHandlers } from './class/TreeItems';

interface CustomTreeViewProps extends TreeItemActionHandlers {
  customComponentItem?: React.ComponentType<
    TreeItemProps & { obj?: ItemTree; canMoveUp?: boolean; canMoveDown?: boolean } & TreeItemActionHandlers
  >
  data: ItemTree[]
}




const CustomTreeView: React.FC<CustomTreeViewProps> = ({
  customComponentItem,
  data,
  onAddChild,
  onEditNode,
  onDeleteNode,
  onOrderUpNode,
  onOrderDownNode,
  onCustomNode
}) => {

   const Item = (customComponentItem ?? TreeItem) as React.ComponentType<
    TreeItemProps & { obj?: ItemTree; canMoveUp?: boolean; canMoveDown?: boolean }  & TreeItemActionHandlers
  >

  
  const getSiblings = (node: ItemTree): ItemTree[] => {

    const parent = node.getParent();

    if (!parent) return data;
    // @ts-ignore
    return (parent.getChildren?.() ?? []) as ItemTree[]
  }

  const renderTree = (nodes: ItemTree[], prefix = ''): React.ReactNode[] => {

    return nodes.map((node, idx) => {
    
      const rawId = String(node.id ?? idx);      
      const itemId = prefix ? `${prefix}/${rawId}` : rawId;
      const key = itemId;
      const label = (node as any).label as string

      const siblings = getSiblings(node);
      const pos = siblings.findIndex(s => s === node);
      const canMoveUp = pos > 0;
      const canMoveDown = pos > -1 && pos < siblings.length - 1;

      let children: React.ReactNode[] | undefined
      
      if (node.isComposite()) {      
        children = renderTree((node as FatherItem).getChildren(),itemId)
      }


      return (
        <Item 
        key={key} 
        itemId={itemId} 
        label={label} 
        obj={node}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
        onAddChild={onAddChild}
        onEditNode={onEditNode}
        onDeleteNode={onDeleteNode}
        onCustomNode={onCustomNode}
        onOrderUpNode={onOrderUpNode}
        onOrderDownNode={onOrderDownNode}
        >
          {children}
        </Item>
      )
    });
  }

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        {renderTree(data)}
      </SimpleTreeView>
    </Box>
  )
}

export default CustomTreeView

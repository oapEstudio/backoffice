import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Button from '../../../../../components/ui/button/button.component';
import { DependencyContext } from '../../../../../contexts/DependencyContext';
import type { FatherItem, ItemTree } from '../../../../../components/ui/tree-view/class/TreeItems';
import { useDeleteMenu } from '../../../hooks/useDeleteMenu';
import { useGetMenues } from '../../../hooks/useGetMenues';
import { toMenuItem } from '../../../mappers/menuesMapper';
import { eToast, Toast } from '../../../../../components/ui/toast/CustomToastService';
import { normalizeAndGetOrderPayload,  swapSibling } from '../../../../../utils/tree-order';
import { useUpdateMenuOrder } from '../../../hooks/useUpdateMenuOrder';
import { useUpdateMenuRootOrder } from '../../../hooks/useUpdateMenuRootOrder';
import type { IMenu } from '../../../../../../domain/entities/IMenu';




export function useTabsItemMenu(){
  
 const { getMenues } = useContext(DependencyContext);
  const {update: updateMenuOrder,error: errorMenuOrder} = useUpdateMenuOrder();
  const { update: updateRootOrder, error: errorRootOrder } = useUpdateMenuRootOrder()
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditProfiles, setOpenEditProfiles] = useState(false);
  const [parentNode, setParentNode] = useState<ItemTree | null>(null);

  const {deleteAsync} = useDeleteMenu();


  const { result, loading, params, setParams, error } = useGetMenues(getMenues,
      {
        page: 1, pageSize: 1000,sortBy: null, sortDescending: true
      }
  );

  const mappedTree = useMemo(
    () => (result?.data ?? []).map(m => toMenuItem(m)),
    [result?.data]
  )

  const [treeItems, setTreeItems] = useState<ItemTree[]>([]);

  useEffect(() => {
    setTreeItems(mappedTree)
  }, [mappedTree])

  useEffect(() => {
      if (error) {
        Toast({
          message:  error.message,
          type: eToast.Error
        });
      }
    }, [error]);

   const handleAddChild = (node: ItemTree) => {   
      setParentNode(node)
      setOpenAdd(true)
  }

    const handleEdit = (node: ItemTree) => {
      setParentNode(node)
      setOpenEdit(true)
  }
    const handleDelete = (node: ItemTree) => {
      setParentNode(node)
      setOpenDelete(true)
  }

   const handleEditProfile = (node: ItemTree) => {
      setParentNode(node)
      setOpenEditProfiles(true);
  }

  const confirmDelete = async ()=>{
      try {
            setOpenDelete(false);

            await deleteAsync(parentNode?.id as string);

            Toast({ message: 'Menú eliminado correctamente', type: eToast.Success })

            refresh();
          } catch {    
            Toast({ message: 'Error al eliminar el menú', type: eToast.Error })
       }
  }

   const calculateOrder = (param: ItemTree): number => {

      if (!param) {
        return treeItems.length + 1;
      }

      if(param.isComposite()){
        return (param as FatherItem).getChildren().length + 1;
      }

      return 1;
   }
   const ButtonCreateMenu = (
      <Button
        variant="primary"
        title="Crear item padre"
        onClick={() => {
          setParentNode(null);
          setOpenAdd(true)
        }}
      />
    ) 
    const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams])

    const saveMenuSucess = ()=>{
         refresh();  
    }

   
      //fuerzo re render para el ordenamiento
    const [tick, setTick] = useState(0);
  
    const isRoot = (node: ItemTree) => !node.getParent();

    const swapInArray = <T,>(arr: T[], i: number, j: number) => {
      
      const next = arr.slice();
      const tmp = next[i]; next[i] = next[j]; next[j] = tmp;
      
      return next;
    };

    const reorderRootLocal = (node: ItemTree, dir: 'up' | 'down') => {
    
      setTreeItems(prev => {
        const i = prev.indexOf(node)
        if (i < 0) return prev
        const j = dir === 'up' ? i - 1 : i + 1
        if (j < 0 || j >= prev.length) return prev

        
        const next = swapInArray(prev, i, j);

        next.forEach((n, idx) => { n.orden = idx + 1 });

        return next
      })
    }
  
    const handleOrderUpNode = useCallback(async (node: ItemTree) => {
      try {
        if (isRoot(node)) {
         
          reorderRootLocal(node, 'up')

          
          const payload = treeItems
            .slice() 
            .sort((a, b) => a.orden - b.orden)
            .map((n, i) => ({ id: String(n.id), orden: i + 1 }))

          
           await updateRootOrder({ parents: payload.map((x)=>({id: x.id, orderIndex: x.orden})) });

           Toast({ message: 'Orden de menús (raíz) actualizado', type: eToast.Info });

        } else {
         
          const moved = swapSibling(node, 'up');

          if (!moved) return

          const payload = normalizeAndGetOrderPayload(node)
          await updateMenuOrder({
            id: payload.parentId,
            children: payload.children.map(x => ({ id: x.id, orderIndex: x.orden }))
          })
          Toast({ message: 'Orden actualizado', type: eToast.Info });
        }
      } catch (e) {
       
        Toast({ message: 'Error al ordenar', type: eToast.Error });
        saveMenuSucess();
      }
    }, [treeItems, updateRootOrder, updateMenuOrder, saveMenuSucess]);

    const handleOrderDownNode = useCallback(async (node: ItemTree) => {
      try {
        if (isRoot(node)) {
          
          reorderRootLocal(node, 'down');

          const payload = treeItems
            .slice()
            .sort((a, b) => a.orden - b.orden)
            .map((n, i) => ({ id: String(n.id), orden: i + 1 }))

          await updateRootOrder({ parents: payload.map((x)=>({id: x.id, orderIndex: x.orden})) });
          Toast({ message: 'Orden de menús (raíz) actualizado', type: eToast.Info })
        } else {
          const moved = swapSibling(node, 'down')
          if (!moved) return

          const payload = normalizeAndGetOrderPayload(node)
          await updateMenuOrder({
            id: payload.parentId,
            children: payload.children.map(x => ({ id: x.id, orderIndex: x.orden }))
          })
          Toast({ message: 'Orden actualizado', type: eToast.Info })
        }
      } catch (e) {

        Toast({ message: 'Error al ordenar', type: eToast.Error });
        saveMenuSucess();

      }
    }, [treeItems, updateRootOrder, updateMenuOrder, saveMenuSucess])

    const findNodeById = (nodes: ItemTree[], id?: string): ItemTree | undefined => {
      if (!id) return undefined;
      for (const n of nodes) {
        if (n.id === id) return n;
        const kids = (n as any).children ?? (n as any).items ?? [];
        const hit = findNodeById(kids, id);
        if (hit) return hit;
      }
      return undefined;
    };

    const parentMenuProfiles = useMemo(() => {

      const pid = (parentNode?.obj as IMenu)?.parentId;

      if (!pid) return undefined; 

      const parent = findNodeById(treeItems ?? [], pid);

      const profs = (parent?.obj as IMenu)?.profiles ?? [];

      return profs.map(p => ({ id: String(p.id), name: p.name })); 

    }, [treeItems, parentNode]);

    return {
        calculateOrder,
        loading,
        openAdd,
        openEdit,
        openDelete,
        openEditProfiles,
        setOpenAdd,
        setOpenEdit,
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
        setOpenEditProfiles,
        setOpenDelete,
        result,
        handleOrderUpNode,
        tick,
        updateMenuOrder,
        handleOrderDownNode,
        parentMenuProfiles }
}
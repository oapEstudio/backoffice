import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DependencyContext } from "../../../../../contexts/DependencyContext";
import { useGetMenues } from "../../../hooks/useGetMenues";
import { toMenuItem } from "../../../mappers/menuesMapper";
import type { ItemTree } from "../../../../../components/ui/tree-view/class/TreeItems";
import { useGetHighlighted } from "../../../hooks/useGetHighlighted";

export function useTabsApplications(){
 
  const { getMenues } = useContext(DependencyContext);

  const { result, loading, params, setParams, error } = useGetMenues(getMenues,
       {
         page: 1, pageSize: 1000,sortBy: '', sortDescending: true
       }
   );

  const { result: resultHighlighted, loading: loadingHighlighted, params: paramsHighlighted, setParams: setParamsHighlighted, error: errorHighlighted } = useGetHighlighted(
       {
         page: 1, pageSize: 1000,sortBy: '', sortDescending: true
       }
   );

  const [openHighLightMenu,setOpenHighLightMenu] = useState(false);
  const [openHighLightMenuEdit,setOpenHighLightMenuEdit] = useState(false);
  
  const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams]);
  const refreshHighlighted = useCallback(() => setParamsHighlighted(p => ({ ...p })), [setParamsHighlighted]);

   const mappedTree = useMemo(
       () => (result?.data ?? []).map(m => toMenuItem(m)),
       [result?.data]
   )
   
   const [treeItems, setTreeItems] = useState<ItemTree[]>([]);
   
    const setFilters = useCallback(
       (profiles: string[]) => {        
         setParams(p => ({
           ...p,
           filters: { profileIds: profiles },
           page: 1,
         }))
       },
       [setParams]
     );

    const setFiltersHighlighted = useCallback(
       (profiles: string[]) => {        
         setParamsHighlighted(p => ({
           ...p,
           filters: { profileIds: profiles },
           page: 1,
         }))
       },
       [setParamsHighlighted]
     );

   const saveHighLightSucess = ()=>{
      refresh();
      refreshHighlighted();
   }
   useEffect(() => {
       setTreeItems(mappedTree)
   }, [mappedTree])
 
   return {
    openHighLightMenu,
    setOpenHighLightMenu,
    saveHighLightSucess,
    resultHighlighted,
    treeItems,
    result,
    loading,
    openHighLightMenuEdit,
    setOpenHighLightMenuEdit,
    setFilters,
    setFiltersHighlighted
   }
}
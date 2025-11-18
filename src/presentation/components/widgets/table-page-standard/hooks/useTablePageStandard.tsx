import { useCallback, useMemo, useState } from "react";
import type { IPageParameters, IPaginatedResponse } from "../../../../../application/common/IPaginatedResponse";
import { INITIAL_PARAMS_TABLE } from "../../../../features/shared/constants/initialsParamTable";
import type { IEntity } from "../../../../../domain/entities/IEntity";
import type { IRow } from "../../../ui/table/table.interface";
import TableFilterBar from "../../table-filter-bar/TableFilterBar";
import type { IAction } from "../../../ui/table/table-actions/actions.interface";
import { Button } from "../../../ui/button";

interface IUseTableStandardProps<e extends IEntity>{
    useCase: (params: IPageParameters)=>{ 
                                    result: IPaginatedResponse<e> | null, 
                                    loading: boolean, 
                                    params: IPageParameters,
                                    setParams: React.Dispatch<React.SetStateAction<IPageParameters>>
                                },
    toMapper: (entity: e,callbackProfiles: (param: e)=>void, callbackCancelled: (param: e)=>void ) => IRow;
    actionsButton: React.ReactNode;
}

export function useTableStandard<e extends IEntity>(props: IUseTableStandardProps<e>){

    const {setParams,params,result,loading} = props.useCase(INITIAL_PARAMS_TABLE);

     const [rowId, setRowId] = useState<string>('');
     const [selectedProfiles, setSelectedProfiles] = useState<Array<{id: string; name: string}>>([]);
     const [openProfilesModal, setOpenProfilesModal] = useState(false);
     const [openDelete, setOpenDelete] = useState(false);
     const [pendingDeleteId, setPendingDeleteId] = useState<string>('');
     const [openEdit, setOpenEdit] = useState(false);
     const [openFilter, setOpenFilter] = useState(false);
         
    const callbackProfiles = useCallback((d: e)=>{
          
          setRowId(String(d.id));
          
          const profs = (d.profiles ?? []).map(p => ({ id: String(p.id), name: p.name }));
          
          setSelectedProfiles(profs);
          setOpenProfilesModal(true);
    
        },[]);
    const confirmDelete = useCallback((id: string) => {

          setPendingDeleteId(String(id));
          setOpenDelete(true);

     },[]);
     const callbackCancelled = useCallback((d: e)=>{
        
          confirmDelete(String(d.id));
        
        },[confirmDelete]);

    const rows: IRow[] = useMemo(
                () => (result?.data ?? []).map(p => props.toMapper(p, callbackProfiles,callbackCancelled)),
                [result?.data, callbackProfiles]
            );
   
    const clearFilters = useCallback(() => {
            setParams(p => ({
              ...p,
              filters: undefined,
              page: 1,
            }))
        }, [setParams]);
        
    const hasFilters = params.filters !== undefined && Object.keys(params.filters).length > 0;
    
    const filterButtons = useMemo(() => {
            
                return (
                    <TableFilterBar
                        onClearFilters={clearFilters}
                        onOpenFilter={() => setOpenFilter(true)}  
                        leftActions={props.actionsButton}
                        hasFilters={hasFilters}
                    />
                )
        }, [clearFilters, hasFilters]);
            
    const actions: IAction[] = useMemo(
            () => [
            {
                icon: <Button variant="secondary" title="Editar" />,
                onClick: (row: IRow) => {
                const d = row as unknown as e;
                setRowId(String(d.id));
                setOpenEdit(true);
                },
            }
            ],
            []
      );            
    return {
        openFilter,
        clearFilters, 
        setOpenFilter,
        openEdit, 
        setOpenEdit,
        openDelete,
        selectedProfiles,
        openProfilesModal,
        setOpenProfilesModal,
        rowId,
        setRowId,
        params,
        setParams,
        loading,
        result,
        filterButtons,
        setOpenDelete,
        pendingDeleteId,
        rows,
        actions       
    }
}
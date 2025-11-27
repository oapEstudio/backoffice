
import { useGetDynamicPages } from '../../../hooks/useGetDynamicPages';
import { toDynamicPageRow } from '../../../mappers/dynamicPagesMapper';
import type { IDynamicPage } from '../../../../../../domain/entities/IDynamicPage';

import { Headers } from '../constants/configTable';

import { useTableStandard } from '../../../../../components/widgets/table-page-standard/hooks/useTablePageStandard';
import { Button } from '../../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { EDIT_DYNAMIC_PAGE, MODE_ROUTE_UPDATE, NEW_DYNAMIC_PAGE } from '../../../../../router/routes';
import { useCallback, useEffect } from 'react';
import { useDynamicPageCancellation } from '../../../hooks/useCancellationDynamicPage';
import type { IFilterDynamicPageResult } from '../components/filter-dynamic-page/FilterDynamicPage';
import { eToast, Toast } from '../../../../../components/ui/toast/CustomToastService';
import type { IRow } from '../../../../../components/ui/table/table.interface';

export function useDynamicPagesPage(){

    const navigate = useNavigate();
    
    const { params,
            setParams,
            loading,
            result,
            openFilter,
            openDelete,
            openProfilesModal,
            setOpenProfilesModal,
            setOpenEdit,
            setOpenDelete,
            selectedProfiles,            
            setOpenFilter,
            pendingDeleteId,
            filterButtons,
            rows,
            rowId,
            openEdit,
            actions } = useTableStandard<IDynamicPage>({
            useCase: useGetDynamicPages,
            toMapper: toDynamicPageRow,
            actionsButton:  <Button
                            variant="primary"
                            title="Crear nueva página"
                            onClick={() => navigate(NEW_DYNAMIC_PAGE.name)}
                            />
    });


    useEffect(()=>{
        if(openEdit && rowId){
            navigate(EDIT_DYNAMIC_PAGE.name.replace(':id',rowId).replace(':mode',MODE_ROUTE_UPDATE))
        }
    },[openEdit,rowId]);

     const { cancellation } = useDynamicPageCancellation();
    
        const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams]);   
    
        const setFilters = useCallback(
                (f: IFilterDynamicPageResult) => {
                  setParams(p => ({
                    ...p,           
                    filters: {  ProfileIds: (f.profileIds ?? []).map(id => String(id).toLowerCase()), StatusIds: f.status},
                    page: 1,
                  }))
                },
                [setParams]
        );
    
       const doConfirmDelete = useCallback(async () => {
            try {
          
              setOpenDelete(false);
          
              await cancellation(pendingDeleteId);
          
              Toast({ message: 'Página dada de baja correctamente', type: eToast.Success })
          
              refresh();
          
            } catch {
              Toast({ message: 'Error al dar de baja la página', type: eToast.Error })
            }
          }, [cancellation, pendingDeleteId, refresh]);
    
    
        const currentFilters: IFilterDynamicPageResult = {
            profileIds: (params.filters?.ProfileIds as string[]) ?? [],
            status: (params.filters?.StatusIds as string[]) ?? []            
          }
        
        
    return {
        params,
        setParams,
        loading,
        setOpenFilter,
        result,
        doConfirmDelete,
        openProfilesModal,
        setOpenProfilesModal,
        openFilter,
        setOpenDelete,
        openDelete,
        setOpenEdit,
        setFilters,
        filterButtons,
        rowId,
        selectedProfiles,
        currentFilters,
        rows,
        actions,
        Headers,
    }
}

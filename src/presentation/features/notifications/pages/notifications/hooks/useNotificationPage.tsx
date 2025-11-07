import { useCallback } from "react";
import type { INotification } from "../../../../../../domain/entities/INotification";
import { useTableStandard } from "../../../../../components/widgets/table-page-standard/hooks/useTablePageStandard";
import { useNotificationCancellation } from "../../../hooks/useCancellationNotification";
import { useGetNotifications } from "../../../hooks/useGetNotifications";
import { toNotificationRow } from "../../../mappers/notificationMapper";
import { SelectCreateNotifications } from "../components/select-create-notifications/SelectCreateNotifications";
import type { IFilterNotificationResult } from "../components/filter-notification-page/FilterNotificationPage";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { Headers } from "../constants/configTable";

export function useNotificationPage(){
    

    const { params,
                openEdit, 
                setOpenEdit,
                openFilter, 
                setOpenFilter,
                openDelete,
                selectedProfiles,
                setOpenProfilesModal,
                openProfilesModal,
                rowId,
                setRowId,
                setParams,
                setOpenDelete,
                loading,
                result,
                pendingDeleteId,
                filterButtons,
                rows,
                actions } = useTableStandard<INotification>({
                                            useCase: useGetNotifications,
                                            toMapper: toNotificationRow,
                                            actionsButton:  <SelectCreateNotifications />
                                            })
          

    const { cancellation } = useNotificationCancellation();

    const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams]);   

    const setFilters = useCallback(
            (f: IFilterNotificationResult) => {
              setParams(p => ({
                ...p,           
                filters: {  ProfileIds: (f.profileIds ?? []).map(id => String(id).toLowerCase()), StatusIds: f.status, TypeIds: f.notificationsType },
                page: 1,
              }))
            },
            [setParams]
    );

   const doConfirmDelete = useCallback(async () => {
        try {
      
          setOpenDelete(false);
      
          await cancellation(pendingDeleteId);
      
          Toast({ message: 'Notificación dada de baja correctamente', type: eToast.Success })
      
          refresh();
      
        } catch {
          Toast({ message: 'Error al dar de baja la notificación', type: eToast.Error })
        }
      }, [cancellation, pendingDeleteId, refresh]);


    const currentFilters: IFilterNotificationResult = {
        profileIds: (params.filters?.ProfileIds as string[]) ?? [],
        status: (params.filters?.StatusIds as string[]) ?? [],
        notificationsType: (params.filters?.TypeIds as string[]) ?? [],
      }
    

    return {
        openEdit,
        rowId,
        setRowId,
        setOpenEdit,
        refresh,        
        openProfilesModal,       
        selectedProfiles,       
        setOpenProfilesModal,
        setParams,
        openFilter,
        currentFilters,
        setFilters,      
        setOpenFilter,
        openDelete,
        doConfirmDelete,
        setOpenDelete,
        params,        
        loading,
        result,
        filterButtons,
        rows,
        actions,
        Headers
    }
          
      
}
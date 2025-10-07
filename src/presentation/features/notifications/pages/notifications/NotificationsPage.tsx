import React, { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import TablePageStandard from '../../../../components/widgets/table-page-standard/TablePageStandard'
import { useGetNotifications } from '../../hooks/useGetNotifications'
import { INITIAL_PARAMS_TABLE } from '../../../shared/constants/initialsParamTable'
import { NOTIFICATION } from '../../../../router/routes'
import { Headers } from './constants/configTable';
import TableFilterBar from '../../../../components/widgets/table-filter-bar/TableFilterBar';

import { toNotificationRow, type INotificationRow } from '../../mappers/notificationMapper'
import { FilterNotificationPage, type IFilterNotificationResult } from './components/filter-notification-page/FilterNotificationPage'
import { SelectCreateNotifications } from './components/select-create-notifications/SelectCreateNotifications'
import type { IAction } from '../../../../components/ui/table/table-actions/actions.interface'
import Button from '../../../../components/ui/button/button.component'
import type { IRow } from '../../../../components/ui/table/table.interface'
import UpdateNotificationProfileCarousel from './components/update-notification-profile-carousel/UpdateNotificationProfileCarousel'
import type { INotification } from '../../../../../domain/entities/INotification'
import { ConfirmDialog } from '../../../../components/ui/confirm-dialog/ConfirmDialog'
import { eToast, Toast } from '../../../../components/ui/toast/CustomToastService'
import { useNotificationCancellation } from '../../hooks/useCancellationNotification'
import EditNotificationModal from './components/edit-notification/EditNotificationModal'



export const NotificationsPage = () => {
  
    const {setParams,params,result,loading} = useGetNotifications(INITIAL_PARAMS_TABLE);   
    const [openFilter, setOpenFilter] = useState(false);
    const [openProfilesModal, setOpenProfilesModal] = useState(false);
    const [selectedProfiles, setSelectedProfiles] = useState<Array<{id: string; name: string}>>([]);
    const [selectedNotificationId, setSelectedNotificationId] = useState<string>('');
    const [openDelete, setOpenDelete] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string>('');
    const { cancellation } = useNotificationCancellation()
    const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editNotificationId, setEditNotificationId] = useState<string>('');

    const hasFilters = params.filters !== undefined && Object.keys(params.filters).length > 0;

    const clearFilters = useCallback(() => {
        setParams(p => ({
          ...p,
          filters: undefined,
          page: 1,
        }))
    }, [setParams]);

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
    const callbackProfiles = useCallback((n: INotification)=>{
      
      setSelectedNotificationId(String(n.id));
      
      const profs = (n.profiles ?? []).map(p => ({ id: String(p.id), name: p.name }));
      
      setSelectedProfiles(profs);
      setOpenProfilesModal(true);

    },[]);
    
    const confirmDelete = useCallback((id: string) => {
      setPendingDeleteId(String(id));
      setOpenDelete(true);
    },[]);

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

    const callbackCancelled = useCallback((n: INotification)=>{
    
      confirmDelete(String(n.id));
    
    },[confirmDelete]);

    const rows: INotificationRow[] = useMemo(
        () => (result?.data ?? []).map(p => toNotificationRow(p, callbackProfiles,callbackCancelled)),
        [result?.data, callbackProfiles]
    )
    
    const currentFilters: IFilterNotificationResult = {
        profileIds: (params.filters?.ProfileIds as string[]) ?? [],
        status: (params.filters?.StatusIds as string[]) ?? [],
        notificationsType: (params.filters?.TypeIds as string[]) ?? [],
      }
    

    const filterButtons = useMemo(() => {
          
            return (
                <TableFilterBar
                    onClearFilters={clearFilters}
                    onOpenFilter={() => setOpenFilter(true)}  
                    leftActions={<SelectCreateNotifications />}
                    hasFilters={hasFilters}
                />
            )
    }, [clearFilters, hasFilters]);
          
      const actions: IAction[] = useMemo(
        () => [
          {
            icon: <Button variant="secondary" title="Editar" />,
            onClick: (row: IRow) => {
              const n = row as unknown as INotification;
              setEditNotificationId(String(n.id));
              setOpenEdit(true);
            },
          }
        ],
        []
      );
      
       
      return (
        <>
            <EditNotificationModal
              open={openEdit}
              notificationId={editNotificationId}
              onClose={() => setOpenEdit(false)}
              onSaved={() => refresh()} />
            <UpdateNotificationProfileCarousel 
              open={openProfilesModal}
              notificationId={selectedNotificationId}
              selectedProfiles={selectedProfiles}
              onClose={() => setOpenProfilesModal(false)}
              onSaved={() => {
                setOpenProfilesModal(false);
                setParams(p => ({ ...p }));
              }}
            />
            <FilterNotificationPage 
              open={openFilter} 
              initialFilters={currentFilters} 
              onOk={(filters: IFilterNotificationResult)=>{
                setFilters(filters);
                setOpenFilter(false);
              }} 
              onCancel={()=>setOpenFilter(false)} 
            />
             <ConfirmDialog 
                   open={openDelete} 
                   onOk={doConfirmDelete} 
                   onCancel={()=>setOpenDelete(false)}  />
            <TablePageStandard 
                    params={params} 
                    setParams={setParams}  
                    loading={loading} 
                    description={'NotificationsPage'} 
                    messageEmpty={'No hay notificaciones disponibles'}
                    title={NOTIFICATION.title} 
                    count={result?.count??0} 
                    filter={filterButtons}
                    data={rows} 
                    actions={actions}
                    columns={Headers} 
                    totalCount={result?.count ?? 0}        />
        </>
      )
}

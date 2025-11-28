import React, { useCallback, useMemo, useState, type ChangeEvent } from 'react'
import TablePageStandard from '../../../../components/widgets/table-page-standard/TablePageStandard'
import { NOTIFICATION } from '../../../../router/routes'
import { FilterNotificationPage, type IFilterNotificationResult } from './components/filter-notification-page/FilterNotificationPage'
import UpdateNotificationProfileCarousel from './components/update-notification-profile-carousel/UpdateNotificationProfileCarousel'
import { ConfirmDialog } from '../../../../components/ui/confirm-dialog/ConfirmDialog'
import EditNotificationModal from './components/edit-notification/EditNotificationModal'
import { useNotificationPage } from './hooks/useNotificationPage'



export const NotificationsPage = () => {
  

  const { openEdit,
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
          Headers} = useNotificationPage();

       
      return (
        <>
            <EditNotificationModal
              open={openEdit}
              notificationId={rowId}
              onClose={() => setOpenEdit(false)}
              onSaved={() => refresh()} />
            <UpdateNotificationProfileCarousel 
              open={openProfilesModal}
              notificationId={rowId}
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
                   icon = 'warning'
                   title = '¡Atención!'
                   subtitle= '¿Desea continuar con la operación? Su acción no puede revertirse.'  
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

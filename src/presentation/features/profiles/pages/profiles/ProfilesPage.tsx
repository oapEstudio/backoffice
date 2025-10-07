import React, {  useEffect, useState } from 'react'

import { Headers } from './constants/configTable';


import TablePageStandard from '../../../../components/widgets/table-page-standard/TablePageStandard';

import { FilterProfilePage } from './components/filter-profile-page/FilterProfilePage';
import { EditProfile } from './components/edit-profile/EditProfile';
import { EditGroups } from './components/edit-group/EditGroups';
import { eToast, Toast } from '../../../../components/ui/toast/CustomToastService';
import { useProfilesPage } from './hooks/useProfilesPage';
import { FATHER_PROFILE, ROUTES } from '../../../../router/routes';

export const ProfilesPage: React.FC = () => {
  const {
    rows,
    loading,
    count,
    params,
    setParams,
    openFilter,
    setOpenFilter,
    filterButtons,
    actions,
    toEdit,
    editOpen,
    setEditOpen,
    currentFilters,
    refresh,
    editGroupsOpen,
    editingProfile,
    setEditGroupsOpen, 
    currentGroups,
    setFilters,
    error,   
  } = useProfilesPage()



 useEffect(() => {
    if (error) {
      Toast({
        message:  error.message,
        type: eToast.Error
      });
    }
  }, [error]);



 return (
    <>
      <FilterProfilePage 
        open={openFilter}
        initialFilters={currentFilters} 
        onOk={(f) => {
          setFilters(f);
          setOpenFilter(false);
        }}
        onCancel={() => setOpenFilter(false)}/>
        
      {toEdit && (
          <EditProfile
            open={editOpen}
            initialData={toEdit}
            onClose={() => setEditOpen(false)}
            onSaved={() => {
               Toast({
                message: 'Perfil actualizado con éxito',
                type: eToast.Success
              });
              refresh();        
              setEditOpen(false);
            }}
          />
        )}
      
      <EditGroups
        open={editGroupsOpen}
        onClose={() => setEditGroupsOpen(false)}
        initialGroups={currentGroups}
        profile={editingProfile}
        onSaved={() => {
          Toast({
            message: 'Grupos actualizados con éxito',
            type: eToast.Success
          });

          refresh() 
        }}
      />
      <TablePageStandard
        description="ProfilesPage"
        title={FATHER_PROFILE.title}
        count={count}
        loading={loading}
        filter={filterButtons}
        columns={Headers}
        data={rows}
        setParams={setParams}
        params={params}               
        totalCount={count}
        actions={actions}
        contextType="profiles"
      />
    </>
  )
}

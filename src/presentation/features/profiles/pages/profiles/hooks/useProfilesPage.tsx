import { useContext, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IGroup } from '../../../../../../domain/entities/IGroup'
import type { IProfile } from '../../../../../../domain/entities/IProfile'
import type { IAction } from '../../../../../components/ui/table/table-actions/actions.interface'
import type { IRow } from '../../../../../components/ui/table/table.interface'
import { DependencyContext } from '../../../../../contexts/DependencyContext'
import { NEW_PROFILE } from '../../../../../router/routes'
import { INITIAL_PARAMS_TABLE } from '../../../../shared/constants/initialsParamTable'
import { useGetProfiles } from '../../../hooks/useGetProfiles'
import { type IProfileRow, toProfileRow } from '../../../mappers/profileMapper'
import type { IProfileFormValues } from '../../shared/components/profile-form-values/IProfileFormValues'
import type { IFilterProfileResult } from '../components/filter-profile-page/FilterProfilePage'
import { Button } from '../../../../../components/ui/button'
import TableFilterBar from '../../../../../components/widgets/table-filter-bar/TableFilterBar'
import { eToast, Toast } from '../../../../../components/ui/toast/CustomToastService'
import { useProfileCancellation } from '../../../hooks/useProfileCancellation'

export function useProfilesPage() {
  const navigate = useNavigate()
  const { getProfiles } = useContext(DependencyContext)

  const [editOpen, setEditOpen] = useState(false)
  const [toEdit, setToEdit] = useState<IProfileFormValues & { id: string }>()
  const [editGroupsOpen, setEditGroupsOpen] = useState(false)
  const [currentGroups, setCurrentGroups] = useState<IGroup[]>([])
  const [editingProfile, setEditingProfile] = useState<IProfile>()
  const [openDelete, setOpenDelete] = useState(false);
  const [openFilter, setOpenFilter] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<string>('');
  const { cancellation } = useProfileCancellation();

  const openEdit = useCallback((profile: IProfileFormValues & { id: string }) => {
    setToEdit(profile)
    setEditOpen(true)
  }, [])

  const openEditGroups = useCallback((row: IProfile) => {
    setEditingProfile(row)
    setCurrentGroups(row.groups)
    setEditGroupsOpen(true)
  }, [])

  const { result, loading, params, setParams, error } = useGetProfiles(
    getProfiles,
    INITIAL_PARAMS_TABLE
  )

  const clearFilters = useCallback(() => {
    setParams(p => ({
      ...p,
      filters: undefined,
      page: 1,
    }))
  }, [setParams])

  const setFilters = useCallback(
    (f: IFilterProfileResult) => {
      setParams(p => ({
        ...p,
        filters: { Names: f.profileIds, StatusIds: f.status },
        page: 1,
      }))
    },
    [setParams]
  )

  const hasFilters = params.filters !== undefined && Object.keys(params.filters).length > 0

  const filterButtons = useMemo(() => {
    const ButtonCreateProfile = (
      <Button
        variant="primary"
        title="Crear nuevo perfil"
        onClick={() => navigate(NEW_PROFILE.name)}
      />
    )

    return (
      <TableFilterBar
        onClearFilters={clearFilters}
        onOpenFilter={() => setOpenFilter(true)}  
        leftActions={ButtonCreateProfile}
        hasFilters={hasFilters}
      />
    )
  }, [navigate, clearFilters, hasFilters])

  const actions: IAction[] = useMemo(
    () => [
      {
        icon: <Button variant="secondary" title="Editar" />,
        onClick: (row: IRow) =>
          openEdit({
            id: String(row.id),
            description: String((row as any).description),
            name: String((row as any).name),
            statusId: Number((row as any).statusId),
            groups: [],
          }),
      },
    ],
    [openEdit]
  )
  const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams])

  const confirmDelete = useCallback((id: string) => {
    setPendingDeleteId(String(id));
    setOpenDelete(true);
  }, []);

  const doConfirmDelete = useCallback(async () => {
      try {
  
        setOpenDelete(false);
  
        await cancellation(pendingDeleteId);
  
        Toast({ message: 'Perfil dado de baja correctamente', type: eToast.Success })
  
        refresh();
  
      } catch (err: any) {
        const message = err?.error?.message;
        Toast({ message: message ? message : 'Error al dar de baja el perfil', type: eToast.Error });
      }
    }, [cancellation, pendingDeleteId, refresh]);
  
    const callbackCancelled = useCallback((p: IProfile) => {
  
      confirmDelete(String(p.id));
  
    }, [confirmDelete]);


  const rows: IProfileRow[] = useMemo(
    () => (result?.data ?? []).map(p => toProfileRow(p, openEditGroups, callbackCancelled)),
    [result?.data, openEditGroups]
  )

  const currentFilters: IFilterProfileResult = {
    profileIds: (params.filters?.Names as string[]) ?? [],
    status: (params.filters?.StatusIds as string[]) ?? [],
  }

  return {
    rows,
    loading,
    count: result?.count ?? 0,
    params,
    setParams,
    actions,
    // filtros
    filterButtons,
    hasFilters,
    filters: params.filters || {},
    currentFilters,
    setFilters,
    clearFilters,
    openFilter,                
    setOpenFilter,            

    // edición perfil
    toEdit,
    setToEdit,
    editOpen,
    setEditOpen,

    // edición grupos
    editGroupsOpen,
    setEditGroupsOpen,
    currentGroups,
    editingProfile,


    doConfirmDelete,
    openDelete,
    setOpenDelete,
    refresh,
    error,
  }
}

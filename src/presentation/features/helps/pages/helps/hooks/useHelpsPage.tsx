import { useCallback, useEffect, useMemo, useState } from 'react';
import type { IAction } from '../../../../../components/ui/table/table-actions/actions.interface';
import type { IRow } from '../../../../../components/ui/table/table.interface';
import type { IHelp } from '../../../../../../domain/entities/IHelp';
import { useGetHelps } from '../../../hooks/useGetHelps';
import { INITIAL_PARAMS_TABLE } from '../../../../shared/constants/initialsParamTable';
import Button from '../../../../../components/ui/button/button.component';
import TableFilterBar from '../../../../../components/widgets/table-filter-bar/TableFilterBar';
import { toHelpsRow, type IHelpRow } from '../../../mappers/helpMapper';
import type { IFilterHelpsResult } from '../components/filter-help-page/FilterHelpsPage';
import { SelectCreateHelp } from '../components/select-create-help/SelectHelp';
import { eToast, Toast } from '../../../../../components/ui/toast/CustomToastService';
import { useHelpCancellation } from '../../../hooks/useCancellationHelp';
import { HELP_INVISIBLE, HELP_SECTION } from '../../../shared/constants/helps';
import { useGetHelpsProfiles } from '../../../shared/hooks/useGetHelpsProfiles';

export const useHelpPage = () => {
  const { setParams, params, result, loading } = useGetHelps(INITIAL_PARAMS_TABLE);
  const [openFilter, setOpenFilter] = useState(false);
  const [editHelpId, setEditHelpId] = useState<string>('');
  const [editHelpType, setEditHelpTypeId] = useState<number>(0);
  const [openEdit, setOpenEdit] = useState(false);
  const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams]);
  const [openProfilesModal, setOpenProfilesModal] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<Array<{ id: string; name: string }>>([]);
  const [leftSeedProfiles, setLeftSeedProfiles] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedHelpParentId, setSelectedHelpParentId] = useState<string>('');
  const [selectedHelpId, setSelectedHelpId] = useState<string>('');
  const [openDelete, setOpenDelete] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string>('');
  const { cancellation } = useHelpCancellation()

  const hasFilters = useMemo(
    () => params.filters !== undefined && Object.keys(params.filters).length > 0,
    [params.filters]
  );

  const currentFilters: IFilterHelpsResult = {
    profileIds: (params.filters?.ProfileIds as string[]) ?? [],
    status: (params.filters?.StatusIds as string[]) ?? [],
    helpType: (params.filters?.TypeIds as string[]) ?? [],
  }

  const count = result?.count ?? 0;

  const setFilters = useCallback(
    (f: IFilterHelpsResult) => {
      setParams(p => ({
        ...p,
        filters: { ProfileIds: (f.profileIds ?? []).map(id => String(id).toLowerCase()), StatusIds: f.status, TypeIds: f.helpType },
        page: 1,
      }))
    },
    [setParams]
  );

  const clearFilters = useCallback(() => {
    setParams(p => ({
      ...p,
      filters: undefined,
      page: 1,
    }));
  }, [setParams]);

  const callbackProfiles = useCallback((h: IHelp) => {

    setSelectedHelpId(String(h.id));
    setSelectedHelpParentId(String(h.helpTypeId !== HELP_SECTION && h.helpTypeId !== HELP_INVISIBLE ? h.parentId : ''));

    const profs = (h.profile ?? []).map(p => ({ id: String(p.profileId), name: p.profiles.name }));

    setSelectedProfiles(profs);
    setOpenProfilesModal(true);

  }, []);

  const confirmDelete = useCallback((id: string) => {
    setPendingDeleteId(String(id));
    setOpenDelete(true);
  }, []);

  const doConfirmDelete = useCallback(async () => {
    try {

      setOpenDelete(false);

      await cancellation(pendingDeleteId);

      Toast({ message: 'Item de ayuda dado de baja correctamente', type: eToast.Success })

      refresh();

    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ message: message ? message : 'Error al dar de baja el item de ayuda', type: eToast.Error });
    }
  }, [cancellation, pendingDeleteId, refresh]);

  const callbackCancelled = useCallback((n: IHelp) => {

    confirmDelete(String(n.id));

  }, [confirmDelete]);

  const toggleFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  // Table rows
  const rows: IHelpRow[] = useMemo(
    () => (result?.data ?? []).map(p => toHelpsRow(p, callbackProfiles, callbackCancelled)),
    [result?.data, callbackProfiles]
  );

  // Table actions
  const actions: IAction[] = useMemo(
    () => [
      {
        icon: <Button variant="secondary" title="Editar" />,
        onClick: (row: IRow) => {
          const h = row as unknown as IHelp;
          setEditHelpId(String(h.id));
          setEditHelpTypeId(h.helpTypeId);
          setOpenEdit(true);
        },
      }
    ],
    []
  );

  const filterButtons = useMemo(() => {
    return (
      <TableFilterBar
        onClearFilters={clearFilters}
        onOpenFilter={() => setOpenFilter(true)}
        leftActions={<SelectCreateHelp />}
        hasFilters={hasFilters}
      />
    );
  }, [clearFilters, hasFilters, setOpenFilter]);

  const { result: profiles, loading: isLoadingProfiles } = useGetHelpsProfiles(
    selectedHelpParentId ? { parentFilter: { parentId: selectedHelpParentId }} : undefined);

  useEffect(() => {
    if (profiles && Array.isArray(profiles)) {
      setLeftSeedProfiles(profiles);
      setLeftSeedProfiles(profiles);
    }
  }, [profiles]);

  return {
    // State
    params,
    loading,
    openFilter,
    openProfilesModal,
    openDelete,
    editHelpId,
    editHelpType,
    selectedHelpId,
    leftSeedProfiles,
    openEdit,
    selectedProfiles,
    pendingDeleteId,
    isLoadingProfiles,

    // Computed
    currentFilters,
    hasFilters,
    count,
    rows,
    actions,
    filterButtons,

    // Methods
    setParams,
    setOpenFilter,
    setEditHelpId,
    setEditHelpTypeId,
    setOpenEdit,
    setFilters,
    refresh,
    doConfirmDelete,
    setOpenDelete,
    setOpenProfilesModal,
    clearFilters,
    toggleFilter,
  };
};
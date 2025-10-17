import { useCallback, useMemo, useState } from 'react';
import type { IAction } from '../../../components/ui/table/table-actions/actions.interface';
import type { IRow } from '../../../components/ui/table/table.interface';
import type { IHelp } from '../../../../domain/entities/IHelp';
import { useGetHelps } from './useGetHelps';
import { INITIAL_PARAMS_TABLE } from '../../shared/constants/initialsParamTable';
import Button from '../../../components/ui/button/button.component';
import TableFilterBar from '../../../components/widgets/table-filter-bar/TableFilterBar';
import { toHelpsRow, type IHelpRow } from '../mappers/helpMapper';
import type { IFilterHelpsResult } from '../pages/helps/components/filter-help-page/FilterHelpsPage';
import { SelectCreateHelp } from '../pages/helps/components/select-create-help/SelectHelp';

export const useHelpPage = () => {
  const { setParams, params, result, loading } = useGetHelps(INITIAL_PARAMS_TABLE);
  const [openFilter, setOpenFilter] = useState(false);
  const [editHelpId, setEditHelpId] = useState<string>('');
  const [editHelpType, setEditHelpTypeId] = useState<number>(0);
  const [openEdit, setOpenEdit] = useState(false);
  const refresh = useCallback(() => setParams(p => ({ ...p })), [setParams]);
  const [openProfilesModal, setOpenProfilesModal] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedHelpId, setSelectedHelpId] = useState<string>('');
  // Computed values
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

    const profs = (h.profile ?? []).map(p => ({ id: String(p.profileId), name: p.profiles.description }));

    console.log(profs)
    setSelectedProfiles(profs);
    setOpenProfilesModal(true);

  }, []);
  
  const toggleFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  // Table rows
  const rows: IHelpRow[] = useMemo(
    () => (result?.data ?? []).map(p => toHelpsRow(p, callbackProfiles)),
    [result?.data, callbackProfiles]
  );

  // Table actions
  const actions: IAction[] = useMemo(
    () => [
      {
        icon: <><div><Button variant="secondary" title="Editar" /></div></>,
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

   return {
    // State
    params,
    loading,
    openFilter,
    openProfilesModal,
    editHelpId,
    editHelpType,
    selectedHelpId,
    openEdit,
    selectedProfiles,

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
    setOpenProfilesModal,
    clearFilters,
    toggleFilter,
  };
};
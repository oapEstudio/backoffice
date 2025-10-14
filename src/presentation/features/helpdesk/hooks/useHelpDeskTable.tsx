import { useCallback, useMemo, useState } from 'react';
import type { IAction } from '../../../components/ui/table/table-actions/actions.interface';
import type { IRow } from '../../../components/ui/table/table.interface';
import type { IHelpDesk } from '../../../../domain/entities/IHelpDesk';
import { toHelpDeskRow, type IHelpDeskRow } from '../mappers/helpDeskMapper';
import { useGetHelpDesk } from './useGetHelpDesk';
import { INITIAL_PARAMS_TABLE } from '../../shared/constants/initialsParamTable';
import Button from '../../../components/ui/button/button.component';
import type { IFilteHelpDeskResult } from '../pages/components/filter-help-desk-page/FilterHelpDeskPage';
import TableFilterBar from '../../../components/widgets/table-filter-bar/TableFilterBar';
import { SelectCreateHelpDesk } from '../pages/components/select-create-help-desk/SelectHelpDesk';

export const useHelpDeskTable = () => {
  const { setParams, params, result, loading } = useGetHelpDesk(INITIAL_PARAMS_TABLE);
  const [openFilter, setOpenFilter] = useState(false);
  const [editHelpDeskId, setEditHelpDeskId] = useState<string>('');

  // Computed values
  const hasFilters = useMemo(
    () => params.filters !== undefined && Object.keys(params.filters).length > 0,
    [params.filters]
  );

  const currentFilters: IFilteHelpDeskResult = {
    profileIds: (params.filters?.ProfileIds as string[]) ?? [],
    status: (params.filters?.StatusIds as string[]) ?? [],
    helpDeskType: (params.filters?.TypeIds as string[]) ?? [],
  }

  const count = result?.count ?? 0;

  // Callbacks
  const openEdit = useCallback((helpDesk: any & { id: string }) => {
    // TODO: Implement edit logic here
    setEditHelpDeskId(helpDesk.id);
  }, []);

  const setFilters = useCallback(
    (f: IFilteHelpDeskResult) => {
      setParams(p => ({
        ...p,
        filters: { ProfileIds: (f.profileIds ?? []).map(id => String(id).toLowerCase()), StatusIds: f.status, TypeIds: f.helpDeskType },
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

  const callbackProfiles = useCallback((n: IHelpDesk) => {
    // TODO: Implement profile callback logic
  }, []);

  const toggleFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  // Table rows
  const rows: IHelpDeskRow[] = useMemo(
    () => (result?.data ?? []).map(p => toHelpDeskRow(p, callbackProfiles)),
    [result?.data, callbackProfiles]
  );

  // Table actions
  const actions: IAction[] = useMemo(
    () => [
      {
        icon: <><div><Button variant="secondary" title="Editar" /></div></>,
        onClick: (row: IRow) => {
          const helpDesk = row as unknown as IHelpDesk;
          setEditHelpDeskId(helpDesk.id);
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
        leftActions={<SelectCreateHelpDesk />}
        hasFilters={hasFilters}
      />
    );
  }, [clearFilters, hasFilters, setOpenFilter]);

  return {
    // State
    params,
    loading,
    openFilter,
    editHelpDeskId,
    currentFilters,
    filterButtons,

    // Computed
    count,
    rows,
    actions,

    // Methods
    setParams,
    setOpenFilter,
    setEditHelpDeskId,
    openEdit,
    setFilters,
    clearFilters,
    toggleFilter,
  };
};